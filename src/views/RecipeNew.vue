<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newRecipeParams: {},
      errors: [],
    };
  },
  methods: {
    createRecipe: function () {
      axios
        .post("/recipes.json", this.newRecipeParams)
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
    <h1>New Recipe</h1>
    <form v-on:submit.prevent="createRecipe()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div>
        Title:
        <input class="form-control" type="text" v-model="newRecipeParams.title" />
      </div>
      <div>
        Chef:
        <input class="form-control" type="text" v-model="newRecipeParams.chef" />
      </div>
      <div>
        PrepTime:
        <input class="form-control" type="number" v-model="newRecipeParams.prep_time" />
      </div>
      <div>
        Ingredients:
        <input class="form-control" type="text" v-model="newRecipeParams.ingredients" />
      </div>
      <div>
        Directions:
        <input class="form-control" type="text" v-model="newRecipeParams.directions" />
      </div>
      <div>
        ImageUrl:
        <input class="form-control" type="text" v-model="newRecipeParams.image_url" />
      </div>
      <input class="btn btn-success mt-4" type="submit" value="Submit Recipe" />
    </form>
  </div>
</template>
