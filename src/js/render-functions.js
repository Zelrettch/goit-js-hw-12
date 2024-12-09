'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader-wrapper');
const gallery = document.querySelector('.gallery');

export function fillGalery(images, gallery) {
  const cardset = images.map(e => {
    return createCard(e);
  });
  gallery.append(...cardset);
}

function createCard(data) {
  const img = document.createElement('img');
  const stats = document.createElement('div');
  const link = document.createElement('a');
  const card = document.createElement('li');

  card.classList.add('card');
  stats.classList.add('stats');

  link.href = data.largeImageURL;
  const thumb = setupImg(img, data);

  stats.append(...createFields(data));
  link.append(thumb, stats);
  card.append(link);

  return card;
}

function setupImg(img, data) {
  const thumb = document.createElement('div');

  thumb.classList.add('thumb');
  img.src = data.webformatURL;
  img.alt = data.tags;

  thumb.append(img);
  return thumb;
}

function createFields(data) {
  return ['likes', 'views', 'comments', 'downloads'].map(el => {
    const field = document.createElement('div');
    const label = document.createElement('span');
    const value = document.createElement('span');

    field.classList.add('field');
    label.classList.add('label');
    value.classList.add('value');

    label.textContent = el;
    value.textContent = data[el];

    field.append(label, value);

    return field;
  });
}

export function displayAlert(message) {
  iziToast.show({
    transitionIn: 'fadeInDown',
    position: 'topRight',
    color: 'red',
    message,
  });
}

export function toggleLoader() {
  loader.classList.toggle('is-hidden');
}

export function clearGallery() {
  gallery.innerHTML = '';
}
