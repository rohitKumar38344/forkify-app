import icons from 'url:../../img/icons.svg';
import View from './view.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    if (!this._data || (Array.isArray(this._data) && this._data.length === 0))
      this.renderError();
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(recipe) {
    const urlId = window.location.hash.slice(1);
    const { id, imageURL, title, publisher } = recipe;

    return ` 
    <li class="preview">
      <a class="preview__link ${
        urlId === id ? 'preview__link--active' : ''
      }" href="#${id}">
        <figure class="preview__fig">
          <img src=${imageURL} alt=${title} />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${title}</h4>
          <p class="preview__publisher">${publisher}</p>
          
        </div>
      </a>
    </li>
    `;
  }
}

export default new BookmarksView();
