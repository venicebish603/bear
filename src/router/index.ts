import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FridgeInteriorView from '../views/FridgeInteriorView.vue';
import MilkPage from '../views/MilkPage.vue';
import CheesePage from '../views/CheesePage.vue';
import FruitPage from '../views/FruitPage.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/fridge-interior',
    name: 'fridgeInterior',
    component: FridgeInteriorView,
  },
  {
    path: '/milk',
    name: 'milkPage',
    component: MilkPage,
  },
  {
    path: '/cheese',
    name: 'cheesePage',
    component: CheesePage,
  },
  {
    path: '/fruit',
    name: 'fruitPage',
    component: FruitPage,
  },
  // 后面可以添加404页面
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
