import {AsyncStorage} from 'react-native';

import {ADD_KITTEN_IMAGES, KITTEN_CLICKED} from '../types/actionTypes';

const initialState = {
  kitten: null,
  kittenClicked: false,
  kittenImages: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case KITTEN_CLICKED:
      return {
        ...state,
        kitten: action.payload,
        kittenClicked: !state.kittenClicked
      };
    case ADD_KITTEN_IMAGES:
      //AsyncStorage.setItem('images', action.payload);
      return {
        ...state,
        kittenImages: action.payload
      };
    default:
      return state;
  }
}