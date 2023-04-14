import axios from 'axios';

const URL = 'https://swapi.dev/api';

export const getCharacters = async (page) => {
  try {
    const response = await axios.get(`${URL}/people?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
