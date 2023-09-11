import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

// elements.error.classList.add("error-hidden");
elements.select.addEventListener('change', hendlerChooseBreed);



function hendlerChooseBreed(evt) {
  let idOfBreed = evt.target.value;

  fetchCatByBreed(idOfBreed);
}

fetchBreeds();
export { elements, select };
