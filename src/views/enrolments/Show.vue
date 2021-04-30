<template>
<!-- Displays all of the data information about a given enrolment -->
<div class="col-md-12" style="margin-top:50px;">
  <div class="card-header" style="background-color: darkblue; color:white;">
    The Enrolment is for {{ enrolment.lecturer.name }}
    <!-- Button which redirects back to the Enrolments index page -->
    <v-btn style="float:right; margin-top:-5px;" outlined color="white" :to="{ name: 'enrolments_index' }"><a>Back</a></v-btn>
  </div>
  <div class="card-body">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Lecturer</th>
          <th scope="col">Course</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ enrolment.lecturer.name }}</td>
          <td>{{ enrolment.course.title }}</td>
          <td>{{ enrolment.status }}</td>
          <td>{{ enrolment.date }}</td>
          <td>{{ enrolment.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<!-- Displays all of the data information about a given enrolment -->
</template>

<script>
//Imports axios dependencies
import axios from 'axios'
export default { //ES2015 syntax for making EnrolmentsShow object available for use.
  name: 'EnrolmentShow',
  components: {

  },
  data() {
    return { //Returns the data information for a given enrolment, course and lecturer from the database
      enrolment: {},
      course: {},
      lecturer: {},
    }
  },
  mounted() { // Displays the enrolments data information on the page and attaches the access token to the get request in order
    // for the backend restful api to retrive the given course by checking its enrolment id. If the user is not logged he would not
    // be authorized to process the request. Whenever the access token is assigned to the request and user is authorized the response
    // will retrive the given course data information, else if this does not occur errors should appear
    let token = localStorage.getItem('token');
    axios.get(`http://dawid.college:8000/api/enrolments/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => { //If respones occurs it retrives the enrolment, course and lecturer from the database.
        console.log(response.data.data);
        this.enrolment = response.data.data;
        this.getTheCourse(response.data.data);
        this.getTheLecturer(response.data.data);
      })
      .catch(error => { //Errors appear if the enrolment,course and lecturer can not be retrived from the database
        console.log(error)
        console.log(error.response.data)
      })

  },
  methods: {
    getTheCourse() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its course id and allows to display the given course and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get(`http://dawid.college:8000/api/courses/${this.enrolment.course_id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occurs retrive all the courses from database
          console.log(response.data.data);
          this.course = response.data.data;
        })
        .catch(error => { // If courses are not able to be retrived make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    getTheLecturer() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its lecturer id and allows to display the given lecturer and its data information in the input fields.
      let token = localStorage.getItem('token');
      axios.get(`http://dawid.college:8000/api/lecturers/${this.enrolment.lecturer_id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occurs retrive all the lecturers from database
          console.log(response.data.data);
          this.lecturer = response.data.data;
        })
        .catch(error => { // If lecturers are not able to be retrived make errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
  }
}
</script>
