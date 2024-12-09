'use strict';

import {
  fillGalery,
  displayAlert,
  clearGallery,
  toggleLoader,
  showLoadBtn,
  hideLoadBtn,
} from './js/render-functions';
import fetchImages from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loadBtn = document.querySelector('.load-btn');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');
const BAD_QUERY_MSG =
  'Sorry, there are no images matching your search query. Please try again!';
const LAST_PAGE_MSG =
  "We're sorry, but you've reached the end of search results.";
const IMAGES_PER_PAGE = 15;

const search = {
  setQuery(query) {
    this.query = query;
    this.page = 1;
    this.hasNext = true;
  },

  async fetchPage() {
    const data = (await fetchImages(this.query, this.page)).data;

    if (Math.ceil(data.total / IMAGES_PER_PAGE) <= this.page) {
      this.hasNext = false;
    }
    this.page++;
    return data;
  },
};

function handleData(data) {
  if (!data.hits.length) {
    displayAlert(BAD_QUERY_MSG);
  }
  fillGalery(data.hits, gallery);
  lightbox.refresh();
}

async function loadPage() {
  toggleLoader();
  hideLoadBtn();
  try {
    const d = await search.fetchPage();
    handleData(d);
  } catch (e) {
    displayAlert(e.message);
    console.log(e.stack);
  } finally {
    toggleLoader();
    if (search.hasNext) {
      showLoadBtn();
    }
  }
}

function handleSearch(evt) {
  evt.preventDefault();
  const query = form.elements.input.value.trim();
  if (query.length) {
    search.setQuery(query);
    clearGallery();
    loadPage();
  }
}

async function handleLoadMore(evt) {
  const lastCard = gallery.childElementCount;

  await loadPage();
  if (!search.hasNext) {
    displayAlert(LAST_PAGE_MSG, 'blue');
  }

  const h = gallery.children[lastCard].getBoundingClientRect().top;
  scrollDown(h);
}

function scrollDown(h) {
  window.scrollTo({
    top: h + window.scrollY - 10,
    left: 0,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', handleLoadMore);
