import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const elements = {
    select : document.querySelector('.breed-select'),
    catInfo : document.querySelector('.cat-info'),
    loader: document.querySelector(".loader"),
    error : document.querySelector(".error")
};
// elements.error.classList.add("error-hidden");
elements.select.addEventListener('change', hendlerChooseBreed);

function hendlerChooseBreed(evt) {
  let idOfBreed = evt.target.value;
  
  fetchCatByBreed(idOfBreed);
}

fetchBreeds();
