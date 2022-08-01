<script>
import axios from "axios";

export default {
  data: function () {
    return {
      recipe: {},
    };
  },
  created: function () {
    this.showRecipe();
  },
  methods: {
    showRecipe: function () {
      axios.get("/recipes/1.json").then((response) => {
        this.recipe = response.data;
        console.log("One recipe: ", response.data);
      });
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ recipe.title }}</h1>
    <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
    <p>Chef: {{ recipe.chef }}</p>
    <a href="/recipes">Back to all Recipes</a>
  </div>
</template>

<style scoped></style>
