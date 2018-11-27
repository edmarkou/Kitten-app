import {KITTEN_CLICKED, ADD_KITTEN_IMAGES} from "../types/actionTypes";

export const clickedKitten = (data) => {
  return {
    type: KITTEN_CLICKED,
    payload: data
  }
};

export const addKittenImages = (data) => {
  return {
    type: ADD_KITTEN_IMAGES,
    payload: data
  }
};