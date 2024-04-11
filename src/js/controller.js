import * as model from './model.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeVeiw.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

///////////////////////////////////////
async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 1: loading recipe
    await model.loadRecipe(id);

    // 2: rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
}

// subscriber
async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    // initial button rendering
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
}

function controlPagination(page) {
  // render new page results
  resultsView.render(model.getSearchResultsPage(page));
  // render new button rendering
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // update state
  model.updateServings(newServings);

  // render UI
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmars() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // uploading recipe
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // show success message
    addRecipeView.renderMessage();

    // renders bookmark
    bookmarksView.render(model.state.bookmarks);

    // change URL id
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
}

function init() {
  bookmarksView.addHandlerBookmark(controlBookmars);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
