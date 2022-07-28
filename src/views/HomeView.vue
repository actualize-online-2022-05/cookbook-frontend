<script>
// var axios = require("axios");
import axios from "axios";

export default {
  data: function () {
    return {
      recipes: [],
      errors: [],
      message: "All Recipes",
      currentRecipe: {},
      newRecipe: {},
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
      axios
        .post("http://localhost:3000/recipes.json", this.newRecipe)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
          this.newRecipe = {};
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showRecipe: function (recipe) {
      this.currentRecipe = recipe;
      document.querySelector("#recipe-info").showModal();
    },
    updateRecipe: function (recipeToEdit) {
      axios.patch("http://localhost:3000/recipes/" + recipeToEdit.id + ".json", recipeToEdit).then((response) => {
        console.log(response.data);
      });
    },
    destroyRecipe: function (recipe) {
      axios.delete(`http://localhost:3000/recipes/${recipe.id}`).then((response) => {
        console.log(response.data);
        var index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Recipe</h1>
    Title:
    <input type="text" v-model="newRecipe.title" />
    Chef:
    <input type="text" v-model="newRecipe.chef" />
    PrepTime:
    <input type="number" v-model="newRecipe.prep_time" />
    Ingredients:
    <input type="text" v-model="newRecipe.ingredients" />
    Directions:
    <input type="text" v-model="newRecipe.directions" />
    ImageUrl:
    <input type="text" v-model="newRecipe.image_url" />
    <button v-on:click="createRecipe()">Create Recipe</button>
    <div class="errors" v-for="error in errors" v-bind:key="error">
      {{ error }}
    </div>
    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <p>Chef: {{ recipe.chef }}</p>
      <button v-on:click="showRecipe(recipe)">More info</button>
    </div>
    <dialog id="recipe-info">
      <form method="dialog">
        <h1>Recipe Info:</h1>
        <p>
          Title:
          <input type="text" v-model="currentRecipe.title" />
        </p>
        <p>
          Chef:
          <input type="text" v-model="currentRecipe.chef" />
        </p>
        <p>
          Ingredients:
          <input type="text" v-model="currentRecipe.ingredients" />
        </p>
        <p>
          Directions:
          <input type="text" v-model="currentRecipe.directions" />
        </p>
        <p>
          Prep Time:
          <input type="text" v-model="currentRecipe.prep_time" />
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button v-on:click="destroyRecipe(currentRecipe)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img {
  max-width: 250px;
}
.errors {
  color: red;
}
</style>
