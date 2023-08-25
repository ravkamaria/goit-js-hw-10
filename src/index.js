// import fetchBreeds from "./cat-api";

const select = document.querySelector(".breed-select");

const BASE_URL = "https://api.thecatapi.com/v1/breeds";
const API_KEY = "live_Uedqd6mbrG08P2XhhOIDv14LHePtwKtKeKFm0DZ3BIclh3nQNBQNI9f5J7S8R8eR";

// export function fetchBreeds(){
//     return fetch(BASE_URL)
//     // .then(response => {
//     //     console.log(response)
//     //   })
// }

fetch("https://api.thecatapi.com/v1/images/search")