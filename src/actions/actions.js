import {KITTEN_CLICKED, ADD_KITTEN_IMAGES} from "../types/actionTypes";

export const clickedKitten = (data) => {
  console.log('clicked on a kitten');
  return {
    type: KITTEN_CLICKED,
    payload: data
  }
};

export const addKittenImages = (data) => {
  console.log('added kitten images');
  return {
    type: ADD_KITTEN_IMAGES,
    payload: data
  }
};