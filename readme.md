# Forkify Web App

## ![Search your favorite recipes!](forkify.png 'Forkify')

## Overview:

Forkify is a web application built using HTML, CSS, JavaScript, Sass, and Parcel bundler. It allows users to search for recipes, display them with pagination, view recipe details including cooking time, servings, and ingredients, change servings, bookmark recipes, upload their own recipes, and view only their own uploaded recipes.

## Features:

1. **Search Functionality:**

   - Includes an input field to send requests to the API with searched keywords.

2. **Display Results with Pagination:**

   - Results are displayed with pagination for easier navigation.

3. **Display Recipe Details:**

   - Shows cooking time, servings, and ingredients for each recipe.

4. **Change Servings Functionality:**

   - Updates all ingredients according to the current number of servings.

5. **Bookmarking Functionality:**

   - Allows users to bookmark recipes.
   - Displays a list of all bookmarked recipes.
   - User-uploaded recipes are automatically bookmarked.

6. **User Recipe Upload:**

   - Users can upload their own recipes.

7. **View Only User's Own Recipes:**

   - Users can only see their own uploaded recipes, not recipes from other users.

8. **Local Storage:**

   - Stores bookmark data in the browser using local storage.
   - On page load, reads saved bookmarks from local storage and displays them.

9. **Architecture and Patterns:**

   - Follows the MVC (Model-View-Controller) architecture.
   - Implements the publisher-subscriber pattern for better communication between components.

10. **Optimizations:**
    - Implemented DOM update algorithm to optimize UI rendering.

## How to Run:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.
4. Access the application in your browser at the provided URL.

## Credits:

- This project is built using the Forkify API for recipe data.
- Parcel bundler is used for project bundling and asset management.
