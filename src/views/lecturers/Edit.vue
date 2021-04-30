<template>
<v-container style="margin-top:50px;">
  <v-card style="border:solid 2px grey; box-shadow: 10px 10px 5px 5px grey;">
    <!-- Card Header  -->
    <v-card-title style="background-color:orange; color:black;">
      <h2 class="font-weight-light center">Edit the Lectuer</h2>
    </v-card-title>
    <!-- Card Header  -->
    <!-- Form to edit the lecturer -->
    <v-form>
      <v-container>
        <!--  Input fields to enter the data information, if data information is not specified for each input field erros would appear-->
        <v-row>
          <v-col>
            <v-text-field v-model="form.name" label="Lecturers Name" :error-messages="errors.name" required :counter="50"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="form.email" label="Lecturers Email Address" :error-messages="errors.email" required :counter="50"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="form.phone" label="Lecturers Phone Number" :error-messages="errors.phone" required :counter="10"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="form.address" label="Lecturers Address" :error-messages="errors.address" required :counter="100"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          </v-col>
          <v-col>
            <!-- Button to redirect back to the lecturers index page -->
            <v-btn style="margin-right: 5px; " rounded color="grey " :to="{ name: 'lecturers_index' }">Back</v-btn>
            <!-- Button which on click calls back to the editTheLecturer method which allows the user to update data information for the given lecturer -->
            <v-btn style="margin-top: 25px; margin-bottom: 25px; " rounded color="warning" dark @click="editTheLecturer()">Edit the Lecturer</v-btn>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</v-container>
</template>

<script>
//Imports axios dependencies
import axios from 'axios';
export default { //ES2015 syntax for making LecturersEdit object available for use.
  name: 'LecturerEdit',
  components: {

  },
  data() { //The data information is returned for each input field in the form
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {} //Errors appear if the input fields are not correctly completed and validation takes place
    }
  },
  mounted() {
    this.getTheLecturer(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the lecturer using its ID.
  },
  methods: {
    getTheLecturer() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its lecturer id and allows to display the given lecturer and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get(`http://dawid.college:8000/api/lecturers/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If reponse occours it retrives the data information from database about the given lecturer and fills the input fields with correct data
          console.log(response.data);
          this.form.name = response.data.data.name;
          this.form.address = response.data.data.name;
          this.form.email = response.data.data.email;
          this.form.phone = response.data.data.phone;

        })
        .catch(error => { //If the lecturer can not be retrived from the database make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    editTheLecturer() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send PUT request. This allows
      // any new data information filled in the form about lecturer, to be updated in the database and stored as new.
      let token = localStorage.getItem('token');
      axios.put(`http://dawid.college:8000/api/lecturers/${this.$route.params.id}`, {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          phone: this.form.phone,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If user updated the lecturer successfully he would be redirected to the Lecturers Index page
          console.log(response.data);
          this.$router.push({
            name: 'lecturers_index'
          });
        })
        .catch(error => { //If user have not field the input fields correctly errors would appear
          console.log(error)
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>
