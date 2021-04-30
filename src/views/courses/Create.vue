<template>
<v-container style="margin-top:50px;">
  <v-card style="border:solid 2px grey; box-shadow: 10px 10px 5px 5px grey;">
    <!-- Card Header  -->
    <v-card-title style="background-color:#1cffac; color:black;">
      <h2 class="font-weight-light center">Create New Course</h2>
    </v-card-title>
    <!-- Card Header  -->
    <!-- Form to create new course -->
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <!--  Input fields to enter the data information, if data information is not specified for each input field erros would appear-->
            <v-text-field v-model="form.code" label="#Course Code" :error-messages="errors.code" required :counter="5"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="form.title" label="Course Title" :error-messages="errors.title" required :counter="30"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="form.points" label="Course Points" :error-messages="errors.points" required :counter="3"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="form.level" label="Course Level (Min:7 - Max:10)" :error-messages="errors.level" required :counter="2"></v-text-field>
          </v-col>
        </v-row>
        <v-col>
          <v-textarea v-model="form.description" color="blue" :error-messages="errors.description">
            <template v-slot:label>
              <div>
                Course Description
              </div>
            </template>
          </v-textarea>
        </v-col>
        <!--  Input fields to enter the data information, if data information is not specified for each input field erros would appear-->
        <v-row>
          <v-col>
          </v-col>
          <v-col>
            <!-- Button to redirect back to the courses index page -->
            <v-btn style="margin-right: 5px; " rounded color="grey " :to="{ name: 'courses_index' }">Back</v-btn>
            <!-- Button which on click calls back to the createTheCourse method which allows the user to create new course -->
            <v-btn style="margin-top: 25px; margin-bottom: 25px; " rounded color="green" dark @click="createTheCourse()">Create Course</v-btn>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Form to create new course -->
  </v-card>
</v-container>
</template>

<script>
//Imports axios dependencies
import axios from 'axios';

export default { //ES2015 syntax for making CourseCreate object available for use.
  name: 'CourseCreate',
  components: {

  },
  data() { //The data information is returned for each input field in the form
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      errors: {} //Errors appear if the input fields are not correctly completed and validation takes place
    }
  },
  methods: {
    createTheCourse() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send POST request. This stores
      // the form data information in database allowing for new course to be created,else let errors appear.
      let token = localStorage.getItem('token');
      axios.post('http://dawid.college:8000/api/courses', {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If user created the course successfully he would be redirected to the Courses Index page
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
          });
        })
        .catch(error => { //If user have not field the input fields correctly errors would appear
          console.log(error.response.data)
          if (error.response.data.errors) {
            this.errors = error.response.data.errors
          }
        })
    }
  },
}
</script>
