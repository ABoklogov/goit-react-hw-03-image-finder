import PropTypes from 'prop-types';

const apiOptions = {
  API_KEY: '22144472-c4d53a495baf7d3490978ff95',
  BASE_URL: 'https://pixabay.com/api/',
  PER_PAGE: 12,
};

async function fetchImage(name, page) {
  const response = await fetch(
    `${apiOptions.BASE_URL}?q=${name}&page=${page}&key=${apiOptions.API_KEY}&image_type=photo&orientation=horizontal&per_page=${apiOptions.PER_PAGE}`,
  );
  const images = await response.json();
  return images;
}

fetchImage.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export { fetchImage, apiOptions };
