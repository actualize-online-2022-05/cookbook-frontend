<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/recipes">All Recipes</router-link>
          </li>
          <li>
            <router-link class="nav-link" aria-current="page" to="/recipe/new">New Recipe</router-link>
          </li>
          <li>
            <router-link v-if="!isLoggedIn" class="nav-link" aria-current="page" to="/signup">Signup</router-link>
          </li>
          <li>
            <router-link v-if="!isLoggedIn" class="nav-link" aria-current="page" to="/login">Login</router-link>
          </li>
          <li>
            <router-link v-if="isLoggedIn" class="nav-link" aria-current="page" to="/logout">Logout</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<style>
body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/concrete_wall_2.png");
}
</style>
