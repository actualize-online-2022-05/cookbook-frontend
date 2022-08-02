<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipe: {},
      errors: [],
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
    editRecipe: function () {
      axios
        .patch("/recipes/" + this.recipe.id + ".json", this.recipe)
        .then((response) => {
          console.log("Success!", response.data);
          this.$router.push("/recipes");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div>
    <h1>Edit Recipe</h1>
    <form v-on:submit.prevent="editRecipe()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div>
        Title:
        <input type="text" v-model="recipe.title" />
      </div>
      <div>
        Chef:
        <input type="text" v-model="recipe.chef" />
      </div>
      <div>
        PrepTime:
        <input type="number" v-model="recipe.prep_time" />
      </div>
      <div>
        Ingredients:
        <input type="text" v-model="recipe.ingredients" />
      </div>
      <div>
        Directions:
        <input type="text" v-model="recipe.directions" />
      </div>
      <div>
        ImageUrl:
        <input type="text" v-model="recipe.image_url" />
      </div>
      <input type="submit" value="Submit Recipe" />
    </form>
  </div>
</template>
