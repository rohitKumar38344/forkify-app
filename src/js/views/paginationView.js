import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  /*
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  }
  */
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Case 1: We are at page 1 and there are some pages
    if (currPage === 1 && numPages > 1) {
      return `
        <button data-goto=${
          currPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Case 4: We are at last page
    if (currPage === numPages && numPages > 1) {
      return `
      <button data-goto=${
        currPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
    </button>`;
    }
    // Case 3: We are somewhere between pages
    if (currPage < numPages) {
      return `
      <button data-goto=${
        currPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
    </button>
    <button data-goto=${currPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // Case 2: We are at page 1 and there are no more pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      console.log(btn);
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
}

export default new PaginationView();
