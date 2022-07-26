<script>
export default {
  data: function () {
    return {
      message: "All Recipes",
      recipes: [
        { id: 1, title: "Raw Eggs", chef: "Jay Wengrow" },
        { id: 1, title: "Empty Sandwich", chef: "Jay Wengrow" },
        { id: 1, title: "Ice", chef: "Peter Jang" },
      ],
    };
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>Title: {{ recipe.title }}</h2>
      <p>Chef: {{ recipe.chef }}</p>
    </div>
  </div>
</template>

<style></style>
