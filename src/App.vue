<template>
<v-app id="app">
  <NavBar :loggedIn="this.loggedIn" v-on:login="isLoggedIn" v-on:logout="isLoggedOut" />
  <v-container>
    <v-row>
      <router-view :loggedIn="this.loggedIn" v-on:login="isLoggedIn" v-on:logout="isLoggedOut" />
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import NavBar from './components/NavBar.vue' //Imports the Navbar from the components directory
export default { //ES2015 syntax for making App object available for use.
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      loggedIn: false
    }
  },
  created() { // This function tells the Vue Application to get the access token from the local storage whenever user is logged
    // however if the user is not logged in the else statement is used to tell the application not to allow for the user to get access token get assigned
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ", this.loggedIn);
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    logout() {  // This function tells the Vue Application
      // to update the logged in status and do something which in this case is to logout and root to path containing home page
      localStorage.removeItem('token');
      this.$emit('logout');
      this.$router.push('/');
    },
    isLoggedIn() { //Method that tells the Vue Application to set the status as logged in whenever user logs in
      this.loggedIn = true;
      // inside of this method you can store the token in local storage
    },
    isLoggedOut() { //Method that tells the Vue Application to set the status as logged out whenever user logs out
      this.loggedIn = false;
      // the logout process could be also triggered here

    }
  }
}
</script>
