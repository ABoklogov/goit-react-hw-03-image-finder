const API_KEY = '22144472-c4d53a495baf7d3490978ff95';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(image) {
  return fetch(
    `${BASE_URL}?q=${image}&page=${1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    return response.json();
  });
}

const api = {
  fetchImage,
};

export default api;
