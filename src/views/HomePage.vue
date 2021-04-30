
<template>
  <!-- Login Form -->
  <v-container style="margin-left:270px; padding-top: 150px;">
    <v-card class="col-md-8 ">
      <!-- Login Form Header -->
        <v-card-title>Login Form for Iadt College</v-card-title>
        <!-- Login Form Header -->
        <v-card-text>
          <!-- Login Form input fields with validation -->
          <v-form>
        <v-text-field label="Email" type="email" v-model="form.email" :rules="[v => !!v || 'Email is required']"
        required></v-text-field>
        <v-text-field label="Password" type="password" v-model="form.password" :rules="[v => !!v || 'Password is required']"
        required></v-text-field>
    </v-form>
    <!-- Login Form input fields with validation -->
        </v-card-text>
        <!-- Login button which allows the user to login on click if the input fields are filled out correctly -->
        <v-card-actions>
          <v-btn @click="login()" color="primary">Login</v-btn>
        </v-card-actions>
    <!-- Login button which allows the user to login on click if the input fields are filled out correctly -->
    </v-card>
  </v-container>
  <!-- Login Form -->
</template>

<script>
//Imports axios dependencies
import axios from 'axios';
export default {
  name: 'HomePage',
  components: {
  },
  data() { //Data information from the Login Form input fields is returned
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send POST request. This then checks
      // if the user exists inside of the database and access token is assigned to him allowing the user to login, else errors appear.
      axios.post('http://dawid.college:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => { //If response occours it assigns the user with access token and allows him to login then redirects him to the course index page set as default
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'courses_index' });
      })
      .catch(error => { //If response occurs and the user does not exist or fills in the data information in the login form incorrectly make errors appear
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>
