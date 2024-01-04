'use strict';

import { api_key, fetchDataFromServer } from './api.js';

export function sidebar() {
  const genreList = {};

  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }

    genreLink();
  });

  const sidebarInner = document.createElement('div');
  sidebarInner.classList.add('sidebar-inner');

  sidebarInner.innerHTML = `
    <div class='sidebar-list'>
      <p class='title'>Genre</p>
    </div>

    <div class='sidebar-list'>
      <p class='title'>Language</p>

      <a
        href='./movie-list.html'
        menu-close
        class='sidebar-link'
        onclick="getMovieList('with_original_language=en', 'English')"
      >English
      </a>

      <a
        href='./movie-list.html'
        menu-close
        class='sidebar-link'
        onclick="getMovieList('with_original_language=ru', 'Russia')"
      >Russia
      </a>

      <a
        href='./movie-list.html'
        menu-close
        class='sidebar-link'
        onclick="getMovieList('with_original_language=uz', 'Uzbekistan')"
      >Uzbekistan
      </a>
    </div>

    <div class='sidebar-footer'>
      <p class='copyright'>Copyright by Azimkhan 2023</p>

      <img src='assets/images/tmdb-logo.svg' alt='tmdb logo'>
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement('a');
      link.classList.add('sidebar-link');
      link.setAttribute('href', './movie-list.html');
      link.setAttribute('menu-close', '');
      link.setAttribute('onclick', `getMovieList('with_genres=${genreId}', '${genreName}')`);
      link.textContent = genreName;

      sidebarInner.querySelectorAll('.sidebar-list')[0].appendChild(link);
    }

    const sidebar = document.querySelector('[sidebar]');
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector('[menu-btn]');
    const sidebarTogglers = document.querySelectorAll('[menu-toggler]');
    const sidebarClose = document.querySelectorAll('[menu-close]');
    const overlay = document.querySelector('[overlay]');

    addEventOnElements(sidebarTogglers, 'click', function () {
      sidebar.classList.toggle('active');
      sidebarBtn.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    addEventOnElements(sidebarClose, 'click', function () {
      sidebar.classList.remove('active');
      sidebarBtn.classList.remove('active');
      overlay.classList.remove('active');
    });
  };
}
