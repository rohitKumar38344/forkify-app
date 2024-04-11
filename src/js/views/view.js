import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    // console.log(this._data);
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    // updating TEXT content
    newElements.forEach(function (el, i) {
      if (
        !el.isEqualNode(currElements[i]) &&
        el.firstChild?.nodeValue.trim() !== ''
      ) {
        currElements[i].textContent = el.textContent;
      }

      // updating attributes
      if (!el.isEqualNode(currElements[i])) {
        Array.from(el.attributes).forEach(attr =>
          currElements[i].setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    this._parentEl.innerHTML = `
    <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
