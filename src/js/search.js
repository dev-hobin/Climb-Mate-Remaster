// scss
import '../scss/search';

// controller
import SearchController from './controller/SearchController';

const searchController = new SearchController();

document.addEventListener('DOMContentLoaded', () => {
  searchController.init();
});
