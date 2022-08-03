<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      name: "",
      errors: [],
    };
  },
  methods: {
    createUser: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="createUser()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
        <br />
        <small v-if="newUserParams.name">{{ 20 - newUserParams.name.length }} characters remaining</small>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
        <br />
        <small class="text-danger" v-if="newUserParams.password && newUserParams.password.length < 6">
          Must be at least 6 characters
        </small>
        <br />
        <small class="text-danger" v-if="newUserParams.password && newUserParams.password.length > 20">
          Must not be over 20 characters
        </small>
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <br />
        <small class="text-danger" v-if="newUserParams.password !== newUserParams.password_confirmation">
          Must match password
        </small>
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
