// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

function createRecipeObject(data) {
  const { recipe } = data.data;
  return {
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    sourceURL: recipe.source_url,
    imageURL: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    ...(recipe.key && { key: recipe.key }), //nice trick to conditionally add properties
  };
}

export async function loadRecipe(id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);

    // restructuring recipe obj
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(recipe);
  } catch (err) {
    console.log(`${err.message} 🎆🎆🎆`);
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    const res = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = res.data.recipes.map(recipe => {
      return {
        publisher: recipe.publisher,
        imageURL: recipe.image_url,
        title: recipe.title,
        id: recipe.id,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // newQt = old quantity * newServings / oldServings => 2 * 8 / 4
  state.recipe.servings = newServings;
}

function persistBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe) {
  // adding recipe to bookmarks array
  state.bookmarks.push(recipe);

  // marked recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
}

export function deleteBookmark(id) {
  const index = state.bookmarks.findIndex(recipe => recipe.id === id);
  state.bookmarks.splice(index, 1);
  // Mark currenct recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
}

export async function uploadRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingArr = ingredient[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );
        }
        const [quantity, unit, description] = ingArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      title: newRecipe.title,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
      publisher: newRecipe.publisher,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
}

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
init();
