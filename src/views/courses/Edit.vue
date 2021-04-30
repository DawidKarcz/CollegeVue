<template>
<v-container style="margin-top:50px;">
  <v-card style="border:solid 2px grey; box-shadow: 10px 10px 5px 5px grey;">
    <!-- Card Header  -->
    <v-card-title style="background-color:orange; color:black;">
      <h2 class="font-weight-light center">Edit The Course</h2>
    </v-card-title>
    <!-- Card Header  -->
    <!-- Form to edit the course -->
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
            <!-- Button which on click calls back to the editTheCourse method which allows the user to edit the given course -->
            <v-btn style="margin-top: 25px; margin-bottom: 25px; " rounded color="warning" dark @click="editTheCourse()">Create Course</v-btn>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Form to edit the course -->
  </v-card>
</v-container>
</template>

<script>
//Imports axios dependencies
import axios from 'axios';
export default { //ES2015 syntax for making CourseEdit object available for use.
  name: 'CourseEdit',
  components: {},
  data() { //The data information is returned for each input field in the form
    return {
      form: {
        code: "",
        title: "",
        points: "",
        level: "",
        description: "",
      },
      errors: {} //Errors appear if the input fields are not correctly completed and validation takes place
    }
  },
  mounted() {
    this.getTheCourse(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the course using its ID.
  },
  methods: {
    getTheCourse() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its course id and allows to display the given course and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get(`http://dawid.college:8000/api/courses/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If reponse occours it retrives the data information from database about the given course and fills the input fields with correct data
          console.log(response.data);
          this.form.title = response.data.data.title;
          this.form.code = response.data.data.code;
          this.form.description = response.data.data.description;
          this.form.points = response.data.data.points;
          this.form.level = response.data.data.level;

        })
        .catch(error => { //If the course can not be retrived from the database make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    editTheCourse() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send PUT request. This allows
      // any new data information filled in the form about course, to be updated in the database and stored as new.
      let token = localStorage.getItem('token');
      axios.put(`http://dawid.college:8000/api/courses/${this.$route.params.id}`, {
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
        .then(response => { //If response occurs and the course is successfully updated the user would be redirected back to the course index page
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
          });
        })
        .catch(error => { //Errors will appear if the data information inside of the input fields is not filled in correctly
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
