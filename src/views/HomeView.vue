<script>
// var axios = require("axios");
import axios from "axios";

export default {
  data: function () {
    return {
      message: "All Recipes",
      recipes: [],
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("http://localhost:3000/recipes.json").then((response) => {
        this.recipes = response.data;
        console.log("All recipes: ", response.data);
      });
    },
    createRecipe: function () {
      console.log("new recipe created!");

      var params = {
        title: "example title 1",
        chef: "example chef",
        // prep_time: 10,
        ingredients: "example ingredients",
        directions: "example directions",
        image_url: "example url",
      };

      axios
        .post("http://localhost:3000/recipes.json", params)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Recipe</h1>
    <button v-on:click="createRecipe()">Create Recipe</button>
    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <p>Chef: {{ recipe.chef }}</p>
    </div>
  </div>
</template>

<style></style>
