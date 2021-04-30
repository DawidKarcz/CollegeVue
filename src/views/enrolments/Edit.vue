<template>
<v-container style="margin-top:50px;">
  <v-card style="border:solid 2px grey; box-shadow: 10px 10px 5px 5px grey;">
    <!-- Card Header  -->
    <v-card-title style="background-color:orange; color:black;">
      <h2 class="font-weight-light center">Edit the Enrolment</h2>
    </v-card-title>
    <!-- Card Header  -->
    <!-- Form to edit the enrolment -->
    <form action="" method="POST" @submit.prevent="editEnrolment()">
      <div class="form-control" style="margin-top:15px;">
        <label>Date :</label><input style="margin-left:5px; border:solid 1px black;" type="date" name="date" v-model="form.date" placeholder="Date">
      </div>
      <div class="form-control" style="margin-top:15px;">
        <label>Time :</label> <input style="border:solid 1px black;" type="time" name="time" v-model="form.time" placeholder="Course Title">
      </div>
      <!-- Looping through the courses array in order to display them in the dropdown menu -->
      <div class="form-control" style="margin-top:15px;">
        <label for="course">List of Courses</label>
        <select style="margin-left:5px; border:solid 1px black; padding-left:9px;" name="course" id="course" v-model="form.course_id">
          <option v-for="course in courses" v-bind:key="course.id" v-bind:value="course.id">
            {{course.title}}
          </option>
        </select>
      </div>
      <!-- Looping through the courses array in order to display them in the dropdown menu -->
      <!-- Looping through the status array in order to display them in the dropdown menu -->
      <div class="form-control" style="margin-top:15px;">
        <label for="status">Status Types :</label>
        <select style="margin-left:5px; border:solid 1px black; padding-left:9px;" name="status" id="status" v-model="form.status">
          <option value="Career_break">
            Career Break
          </option>
          <option value="assigned">
            Assigned
          </option>
          <option value="associate">
            Associate
          </option>
          <option value="interested">
            Interested
          </option>
        </select>
      </div>
      <!-- Looping through the status array in order to display them in the dropdown menu -->
      <!-- Looping through the lecturers array in order to display them in the dropdown menu -->
      <div class="form-control" style="margin-top:15px;">
        <label for="lecturer">List of Lecturers :</label>
        <select style="margin-left:5px; border:solid 1px black; padding-left:9px;" name="lecturer" id="lecturer" v-model="form.lecturer_id">
          <option v-for="lecturer in lecturers" v-bind:key="lecturer.id" v-bind:value="lecturer.id">
            {{lecturer.name}}
          </option>
        </select>
      </div>
      <!-- Looping through the lecturers array in order to display them in the dropdown menu -->
      <v-row>
        <v-col>
        </v-col>
        <v-col>
          <!-- Button to redirect back to the enrolments index page -->
          <v-btn style="margin-right: 5px; " rounded color="grey " :to="{ name: 'enrolments_index' }">Back</v-btn>
          <!-- Button which on click calls back to the editTheEnrolments method which allows the user to update the enrolment -->
          <v-btn style="margin-top: 25px; margin-bottom: 25px; " rounded color="warning" dark @click="editTheEnrolment()">Edit the Enrolment</v-btn>
        </v-col>
        <v-col>
        </v-col>
      </v-row>
    </form>
    <!-- Form to edit the enrolemnt -->
  </v-card>
</v-container>
</template>

<script>
// Imports the axios dependencies
import axios from 'axios'
export default { //ES2015 syntax for making EnrolmentsEdit object available for use.
  name: 'EnrolmentEdit',
  components: {},
  data() { //The data information is returned for each input field in the form
    return {
      courses: [],
      lecturers: [],
      form: {
        date: '',
        time: '',
        status: '',
        course_id: '',
        lecturer_id: '',
      }
    }
  },
  mounted() {
    this.getTheEnrolments() //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the enrolment using its ID.
    this.getTheCourses(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the course using its ID.
    this.getTheLecturers(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the lecturer using its ID.
  },
  methods: {
    getTheCourses() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its course id and allows to display the given course and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occurs retrive all the courses from database
          console.log(response.data);
          this.courses = response.data.data
        })
        .catch(error => { // If courses are not able to be retrived make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    getTheLecturers() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its lecturer id and allows to display the given lecturer and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occurs retrive all the lecturers from database
          console.log(response.data);
          this.lecturers = response.data.data
        })
        .catch(error => { // If lecturers are not able to be retrived make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    getTheEnrolments() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its enrolment id and allows to display the given enrolment and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/enrolments/' + this.$route.params.id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })

        .then(response => { //If reponse occours it retrives the data information from database about the given enrolment and fills the input fields with correct data
          console.log(response.data);
          this.form.date = response.data.data.date
          this.form.time = response.data.data.time
          this.form.status = response.data.data.status
          this.form.course_id = response.data.data.course_id
          this.form.lecturer_id = response.data.data.lecturer_id
        })
        .catch(error => { //If the enrolments can not be retrived from the database make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    editTheEnrolment() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send PUT request. This allows
      // any new data information filled in the form about enrolment, to be updated in the database and stored as new.
      let token = localStorage.getItem('token');
      axios.put('http://dawid.college:8000/api/enrolments/' + this.$route.params.id, {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.form.course_id,
          lecturer_id: this.form.lecturer_id
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If user updated the enrolment successfully he would be redirected to the Enrolments Index page
          console.log(response.data);
          this.$router.push({
            name: 'enrolments_index'
          });
        })
        .catch(error => { //If user have not field the input fields correctly errors would appear
          console.log(error)
          console.log(error.response.data)
        })

    },
  },

}
</script>
