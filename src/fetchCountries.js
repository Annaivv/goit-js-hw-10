const BASE_URL = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(
        Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
};
