import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const apiKey = '22593683-900dbddd4b86d221bedd65f3e';

export const fetchImgWithQuery = async (searchQuery = '', page = 1) => {
  try {
    const axiosResponse = await axios.get(
      `/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    );
    return axiosResponse.data;
  } catch (err) {
    throw err;
  }
}