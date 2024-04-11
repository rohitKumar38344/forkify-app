import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    if (!this._data || (Array.isArray(this._data) && this._data.length === 0))
      this.renderError();
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(recipe) {
    const urlId = window.location.hash.slice(1);
    const { id, imageURL, title, publisher, key } = recipe;

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
          <div class="preview__user-generated ${key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
