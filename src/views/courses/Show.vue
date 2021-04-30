<template>
<!-- Displays all of the data information about a given course -->
<div class="card" style="margin-top:50px;">
  <div class="card-header" style="background-color: darkblue; color:white;">
    This Course is
    <!-- Button which redirects back to the Course index page -->
    <v-btn style="float:right" outlined color="white" :to="{ name: 'courses_index' }"><a>Back</a></v-btn>
  </div>

  <div class="card-body">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#Course Code</th>
          <th scope="col">Course Title</th>
          <th scope="col">Course Points</th>
          <th scope="col">Course Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ course.code }}</th>
          <td>{{ course.title }}</td>
          <td>{{ course.points }}</td>
          <td>{{ course.level }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <h2>Course Description</h2>
    <p>{{ course.description }}</p>
  </div>
  <!-- Displays all of the data information about a given course -->
  <!-- Displays all of the data information about the enrolments for this course -->
  <div class="card-header" style="background-color: blue; color:white;">
    Enrolments for this course
  </div>
  <!-- Loops through and gets the enrolments data for a given course -->
  <b-table striped hover :items="course.enrolments">
    <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
    </template>
  </b-table>
  <!-- Displays all of the data information about the enrolments for this course -->
</div>
</template>
<script>
//Imports axios dependencies
import axios from 'axios';

export default { //ES2015 syntax for making CourseShow object available for use.
  name: 'CourseShow',
  components: {},
  data() {
    return {
      course: {} //Returns the data information for a given course
    }
  },
  mounted() { // Displays the course data information on the page and attaches the access token to the get request in order
    // for the backend restful api to retrive the given course by checking its course id. If the user is not logged he would not
    // be authorized to process the request. Whenever the access token is assigned to the request and user is authorized the response
    // will retrive the given course data information, else if this does not occur errors should appear
    let token = localStorage.getItem('token');
    axios.get(`http://dawid.college:8000/api/courses/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => { //Displays the given course from the databse if it exists
        console.log(response.data);
        this.course = response.data.data;

      })
      .catch(error => {
        console.log(error) //Errors appear if the given course can not be retrived from the database
        console.log(error.response.data)
      })
  },
  methods: {},
}
</script>
<!-- This allows to style the HTML objects by using default CSS -->
<style>
.home {
  text-align: center;
}
</style>
