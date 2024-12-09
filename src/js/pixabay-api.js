'use strict';

export default function fetchImages(filter) {
  const params = new URLSearchParams({
    key: '47493519-a1c562378b8b6eff6e1575382',
    q: filter,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`https://pixabay.com/api/?${params}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
