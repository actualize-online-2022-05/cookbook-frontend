<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      currentRecipe: {},
      titleSearch: "eggs",
    };
  },
  created: function () {
    this.indexRecipes();
  },
  watch: {
    currentRecipe: function () {
      console.log(this.currentRecipe);
    },
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes.json").then((response) => {
        this.recipes = response.data;
        console.log("All recipes: ", response.data);
      });
    },
    filterRecipes: function () {
      return this.recipes.filter((recipe) => {
        var lowerTitle = recipe.title.toLowerCase();
        var lowerTitleSearch = this.titleSearch.toLowerCase();
        return lowerTitle.includes(lowerTitleSearch);
      });
    },
  },
};
</script>

<template>
  <div>
    <h1>All Recipes</h1>
    <div class="row">
      <div class="row p-3">
        Search:
        <input type="text" v-model="titleSearch" />
      </div>
      <div
        class="col-sm-4"
        v-for="recipe in filterRecipes()"
        v-bind:key="recipe.id"
        v-on:mouseover="currentRecipe = recipe"
      >
        <div class="card mb-4" v-bind:class="{ selected: recipe === currentRecipe }">
          <img class="m-auto card-img-top" v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">Chef: {{ recipe.chef }}</p>
            <a v-bind:href="`/recipes/${recipe.id}`" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card img {
  object-fit: cover;
  height: 250px;
}
.selected {
  /* color: white; */
  background-color: #e6e6e6;
  transition: background-color 1s ease;
}
</style>
