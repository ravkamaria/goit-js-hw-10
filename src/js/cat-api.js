import { elements } from './index';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


elements.select.classList.replace('breed-select-hidden', 'breed-select');

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY =
    'live_Uedqd6mbrG08P2XhhOIDv14LHePtwKtKeKFm0DZ3BIclh3nQNBQNI9f5J7S8R8eR';
  const params = new URLSearchParams({
    'x-api-key': API_KEY,
  });
  const END_POINT = '/breeds';
  let storedBreeds = [];

  // elements.loader.classList.replace("loader-hidden", "loader");
  // elements.error.classList.replace("error", "error-hidden");
  return fetch(`${BASE_URL}${END_POINT}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => { 
    
      storedBreeds = data;
      for (let i = 0; i < storedBreeds.length; i++) {
        let breed = storedBreeds[i];
        let option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = `${breed.name}`;
        elements.select.appendChild(option);
        elements.loader.classList.replace('loader', 'loader-hidden');
      }  
      new SlimSelect({
        select: elements.select,
        setData: data
      })
    })
    .catch(err => {
      elements.loader.classList.replace('loader', 'loader-hidden');
      elements.select.classList.replace('breed-select', 'breed-select-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      // elements.error.classList.replace("error-hidden", "error")
    });
}

function fetchCatByBreed(breedId) {
  elements.catInfo.innerHTML = '';
  elements.loader.classList.replace('loader-hidden', 'loader');
  // elements.error.classList.replace("error", "error-hidden");
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_Uedqd6mbrG08P2XhhOIDv14LHePtwKtKeKFm0DZ3BIclh3nQNBQNI9f5J7S8R8eR`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      createMarkUp(data);
      elements.loader.classList.replace('loader', 'loader-hidden');
    })
    .catch(err => {
      elements.catInfo.innerHTML = '';
      elements.loader.classList.replace('loader', 'loader-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      // elements.error.classList.replace("error-hidden", "error")
    });
}

function createMarkUp(arr) {
  const url = arr[0].url;
  const description = arr[0].breeds[0].description;
  const name = arr[0].breeds[0].name;
  const temperament = arr[0].breeds[0].temperament;
  // const {description, name, temperament} = arr[0].breed[0];
  const markup = `<img src="${url}" alt="${name}">
  <div class="text-info"><h2 class="cat-name">${name}</h2>
  <p class="cat-discr"><span class="temperament">Temperament:</span> ${temperament}</p>
  <p class="cat-discr">${description}</p></div>`;

  elements.catInfo.insertAdjacentHTML('beforeend', markup);
}

export { fetchBreeds, fetchCatByBreed };
