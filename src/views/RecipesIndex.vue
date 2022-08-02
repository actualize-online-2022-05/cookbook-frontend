<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes.json").then((response) => {
        this.recipes = response.data;
        console.log("All recipes: ", response.data);
      });
    },
  },
};
</script>

<template>
  <div>
    <h1>All Recipes</h1>
    <div class="row">
      <div class="col-sm-4" v-for="recipe in recipes" v-bind:key="recipe.id">
        <div class="card mb-4">
          <img class="card-img-top" v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">Chef: {{ recipe.chef }}</p>
            <a v-bind:href="`/recipes/${recipe.id}`" class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <p>Chef: {{ recipe.chef }}</p>
      <a v-bind:href="`/recipes/${recipe.id}`">More info</a>
    </div> -->
  </div>
</template>

<style scoped>
.card img {
  object-fit: cover;
  height: 250px;
}
</style>
