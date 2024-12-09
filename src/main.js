'use strict';

import {
  fillGalery,
  displayAlert,
  clearGallery,
  toggleLoader,
} from './js/render-functions';
import fetchImages from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');
const ALLERT_MSG =
  'Sorry, there are no images matching your search query. Please try again!';

function handleImages(data) {
  if (!data.hits.length) {
    displayAlert(ALLERT_MSG);
  }
  fillGalery(data.hits, gallery);
  lightbox.refresh();
  form.reset();
}

function loadGallery(condition) {
  clearGallery();
  toggleLoader();

  fetchImages(condition)
    .then(d => {
      handleImages(d);
    })
    .catch(e => {
      displayAlert(e.message);
    })
    .finally(() => {
      toggleLoader();
    });
}

function handleSubmit(evt) {
  evt.preventDefault();
  const condition = form.elements.input.value.trim();
  if (condition.length) {
    loadGallery(condition);
  }
}

form.addEventListener('submit', handleSubmit);
