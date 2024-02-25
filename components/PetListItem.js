// test
import React, { useContext, useState } from 'react';
import {TextInput, Pressable, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useAppContext} from '../context/AppContext';
import Modal from "react-native-modal";

const nestImage = require("../assets/nest.png");




const PetListItem = ({name, image, id}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskName, onChangeName] = useState("");
    const {state, dispatch} = useAppContext();

    const handleExpansion = () => {
        setIsExpanded(!isExpanded);
    }

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const handlePress = () => {
       toggleModal()
    };

    const donePress = () => {
        toggleModal()
        dispatch({
            type: 'ADD_TASK_TO_PET',
            payload: {
                id: id, // ID of the pet to which the task should be added
                task: { description: taskName, completed: false }
            }
        });
    };

    return <>
    <View style={styles.petList}>   
        <View style={{flexDirection: 'row'}}>
        <Pressable onPress={handleExpansion} style={{flexDirection: 'row'}}>
            <Image source={image} style={styles.image}/>
            <View style={styles.petListDetails}>    
                <Text style={styles.text}>Name: {name}</Text>
                <Text style={styles.text}>Birthday: 7/13/04</Text>
                {Math.random()>0.4 ? (
                  <Text style={styles.text}>Status: Happy</Text>
                ): (
                  <Text style={styles.text}>Status: Hungry</Text>
                )}
            </View>
        </Pressable>
        <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.pressableText}>New Task</Text>
        </Pressable>
        </View>
        {isExpanded ? (
            <View>
            <Text style={styles.text}>+ Make pet breathe fire</Text>
            <Text style={styles.text}>+ Make pet jump</Text>
            </View>
        ): (
            <></>
        )}

        <Modal isVisible={isModalVisible} backdropOpacity={0.3}>
            <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Add Task</Text>
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={taskName}
                    />
                </View>

                <Pressable style={styles.button} onPress={donePress}>
                  <Text style={styles.buttonText}>Done</Text>
                </Pressable>
            </View>
        </Modal>


    </View>
    

    </>;
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    petList: {
        margin: 8,
        padding: 8,
        borderRadius: 4, 
        borderWidth: 2,
        borderColor: 'white',
    },
    petListDetails: {
    },
    text: {
        color: 'white',
        marginTop: 6,
        marginBottom: 6,
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: '33%' ,
        borderRadius: 4,
    },
    pressableText: {
        color: '#4F518C',
        fontSize: 22,
        fontWeight: 'bold',
    },
 modalView: {
    margin: 10,
    backgroundColor: '#4F518C',
    borderRadius: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    color: 'white',
    fontSize: 18,
    fontVariant: "bold"
  },
  modalContent: {
    alignItems: 'center'
  },
  input: {
    color: 'white',
    height: 40,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    margin: 4,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#4F518c',
  },
});

export default PetListItem;