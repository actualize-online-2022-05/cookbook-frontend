import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import TestView from "../views/TestView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import RecipesIndex from "../views/RecipesIndex.vue";
import RecipeNew from "../views/RecipeNew.vue";
import RecipeShow from "../views/RecipeShow.vue";
import RecipeEdit from "../views/RecipeEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/recipes",
    name: "recipes-index",
    component: RecipesIndex,
  },
  {
    path: "/recipe/new",
    name: "recipe-new",
    component: RecipeNew,
  },
  {
    path: "/recipes/:id",
    name: "recipe-show",
    component: RecipeShow,
  },
  {
    path: "/recipes/:id/edit",
    name: "recipe-edit",
    component: RecipeEdit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
