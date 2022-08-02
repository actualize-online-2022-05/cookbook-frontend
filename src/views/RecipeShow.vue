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
      axios.get("/recipes/" + this.$route.params.id + ".json").then((response) => {
        this.recipe = response.data;
        console.log("One recipe: ", response.data);
      });
    },
    destroyRecipe: function () {
      axios.delete("/recipes/" + this.$route.params.id + ".json").then((response) => {
        console.log(response.data);
        this.$router.push("/recipes");
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
    Ingredients:
    <div v-for="ingredient in recipe.ingredients_list" v-bind:key="ingredient">
      {{ ingredient }}
    </div>
    Directions:
    <div v-for="direction in recipe.directions_list" v-bind:key="direction">
      {{ direction }}
    </div>
    <p>Prep Time: {{ recipe.friendly_prep_time }}</p>
    <a v-bind:href="`/recipes/${recipe.id}/edit`">Edit Recipe</a>
    <button v-on:click="destroyRecipe()">Delete Recipe</button>
    <a href="/recipes">Back to all Recipes</a>
  </div>
</template>

<style scoped></style>
