// scss
import '../scss/home';

// controller
import HomeController from './controller/HomeController';

const homeController = new HomeController();

document.addEventListener('DOMContentLoaded', () => {
  homeController.init();
});
