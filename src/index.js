// import fetchBreeds from "./cat-api";

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector(".cat-info");

select.addEventListener("change", hendlerChooseBreed);

function hendlerChooseBreed(evt){
    let idx = evt.target.value;
    fetchCatByBreed(idx);
}

function fetchBreeds() {
  let storedBreeds = [];
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const API_KEY =
    'live_Uedqd6mbrG08P2XhhOIDv14LHePtwKtKeKFm0DZ3BIclh3nQNBQNI9f5J7S8R8eR';
  const params = new URLSearchParams({
    'x-api-key': API_KEY,
  });
  return fetch(`${BASE_URL}${END_POINT}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      //    //filter to only include those with an `image` object
      //    data = data.filter(img=> img.image?.url!=null)
      storedBreeds = data;
      for (let i = 0; i < storedBreeds.length; i++) {
        let breed = storedBreeds[i];
        let option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = `${breed.name}`;
        select.appendChild(option);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
fetchBreeds();

function fetchCatByBreed(breedId){
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_Uedqd6mbrG08P2XhhOIDv14LHePtwKtKeKFm0DZ3BIclh3nQNBQNI9f5J7S8R8eR`)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        createMarkUp(data)
      })
      .catch(error => {
        console.log(error);
      });
}

function createMarkUp(arr){
    const url = arr[0].url;
    const description = arr[0].breeds[0].description;
    const name = arr[0].breeds[0].name;
    const temperament = arr[0].breeds[0].temperament;
    // const {description, name, temperament} = arr[0].breed[0];
    const markup =`<img src="${url}" alt="${name}">
<h2 class="cat-name">${name}</h2>
<p class="cat-discription">${temperament}</p>
<p class="cat-discription">${description}</p>`
    catInfo.insertAdjacentHTML("beforeend", markup);
}