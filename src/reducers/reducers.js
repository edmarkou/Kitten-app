import { KITTEN_CLICKED } from '../types/actionTypes';

const initialState = {
  kitten: 'meow'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case KITTEN_CLICKED:
      return {
        kitten: action.payload
      };
    default:
      return state;
  }
}