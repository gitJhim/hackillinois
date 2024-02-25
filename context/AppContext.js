import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  currID: 0,
  currTaskId: 0,
  currHatching: -1,
  eggs: [],
  pets: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EGG':
      return {
        ...state,
        eggs: [...state.eggs, action.payload],
        currID: state.currID + 1
      };
    case 'REMOVE_EGG':
      return {
        ...state,
        eggs: state.eggs.filter(egg => egg.id !== action.payload.id),
      };
    case 'ADD_PET':
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    case 'SET_HATCHING':
      return {
        ...state,
        currHatching: action.payload.id
      };
      case 'ADD_TASK_TO_PET':
      // Clone the state to avoid direct state mutations
      const newState = { ...state };

      // Find the index of the pet to which the task should be added
      const petIndex = newState.pets.findIndex(pet => pet.id === action.payload.id);
      
      // If the pet is found
      if (petIndex > -1) {
        // Clone the pet object to avoid direct state mutations
        const updatedPet = { ...newState.pets[petIndex] };

        // Add the task to the pet's tasks array
        updatedPet.tasks = updatedPet.tasks ? [...updatedPet.tasks, { ...action.payload.task, id: state.currTaskId }] : [action.payload.task];

        // Update the pet in the new state
        newState.pets[petIndex] = updatedPet;

      }

      return {...newState, currTaskId: state.currTaskId + 1};

    case 'TOGGLE_TASK':
      // Clone the state to avoid direct state mutations
      const newState2 = { ...state };

      // Find the index of the pet to which the task should be added
      const petIndex2 = newState2.pets.findIndex(pet => pet.id === action.payload.petId);
      
      // If the pet is found
      if (petIndex2 > -1) {
        // Clone the pet object to avoid direct state mutations
        const updatedPet2 = { ...newState2.pets[petIndex2] };

        // Add the task to the pet's tasks array
        updatedPet2.tasks = updatedPet2.tasks.map(task => {
          if (task.id === action.payload.taskId) {
            task.completed = !task.completed;
          }
          return task;
        });

        // Update the pet in the new state
        newState2.pets[petIndex2] = updatedPet2;

      }

      return newState2;
      
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);