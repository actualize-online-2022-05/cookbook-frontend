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
      editRecipe: {},
      newRecipeTitle: "",
      newRecipeChef: "",
      newRecipePrepTime: 0,
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
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
        title: this.newRecipeTitle,
        chef: this.newRecipeChef,
        prep_time: this.newRecipePrepTime,
        ingredients: this.newRecipeIngredients,
        directions: this.newRecipeDirections,
        image_url: this.newRecipeImageUrl,
      };
      // console.log(params);
      axios
        .post("http://localhost:3000/recipes.json", params)
        .then((response) => {
          console.log("Success!", response.data);
          this.recipes.push(response.data);
          this.newRecipeTitle = "";
          this.newRecipeChef = "";
          this.newRecipePrepTime = "";
          this.newRecipeIngredients = "";
          this.newRecipeDirections = "";
          this.newRecipeImageUrl = "";
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showRecipe: function (recipe) {
      console.log(recipe);
      this.currentRecipe = recipe;
      this.editRecipe = recipe;
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
    <input type="text" v-model="newRecipeTitle" />
    Chef:
    <input type="text" v-model="newRecipeChef" />
    PrepTime:
    <input type="number" v-model="newRecipePrepTime" />
    Ingredients:
    <input type="text" v-model="newRecipeIngredients" />
    Directions:
    <input type="text" v-model="newRecipeDirections" />
    ImageUrl:
    <input type="text" v-model="newRecipeImageUrl" />
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
        <p>Title: {{ currentRecipe.title }}</p>
        <p>Chef: {{ currentRecipe.chef }}</p>
        <p>Ingredients: {{ currentRecipe.ingredients_list }}</p>
        <p>Directions: {{ currentRecipe.directions_list }}</p>
        <p>Prep Time: {{ currentRecipe.friendly_prep_time }}</p>
        <h1>Edit Recipe</h1>
        <p>
          Title:
          <input type="text" v-model="editRecipe.title" />
        </p>
        <p>
          Chef:
          <input type="text" v-model="editRecipe.chef" />
        </p>
        <p>
          Prep Time:
          <input type="text" v-model="editRecipe.prep_time" />
        </p>
        <button v-on:click="updateRecipe(editRecipe)">Update</button>
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
