'use strict';

import axios from 'axios';

export default async function fetchImages(filter, page) {
  return await axios.get('https://pixabay.com/api', {
    params: {
      key: '47493519-a1c562378b8b6eff6e1575382',
      q: filter,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 15,
    },
  });
}
