<template>
<div class="col-12" style="margin-top:50px;">
  <div class="card-header" style="background-color: grey; color:white;">
    Courses List
    <!-- Create button which redirects to the Course Create page allowing for the creation of new course -->
    <router-link :to="{ name:'courses_create' }" style="background-color:#1cffac;" class="btn btn-sm btn-primary float-right">Create</router-link>
  </div>
  <div class="card-body">
    <table class="table table-striped table-hover" v-if="courses.length != 0">
      <thead>
        <tr>
          <th scope="col">#Course Code</th>
          <th scope="col">Course Title</th>
          <th scope="col">Course Points</th>
          <th scope="col">Course Level</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Looping through the array of courses -->
        <tr v-for="course in courses" :key="course.id">
          <th scope="row">{{ course.code }}</th>
          <td>{{ course.title }}</td>
          <td>{{ course.points }}</td>
          <td>{{ course.level }}</td>
          <td>
            <!-- Button group - View, Edit and Delete for all the courses -->
            <div class="btn-group" role="group">
              <router-link :to="{ name:'courses_show', params: { id:course.id }}" class="btn btn-primary">View</router-link>
              <router-link :to="{ name:'courses_edit', params: { id:course.id }}" class="btn btn-warning">Edit</router-link>
              <button type="button" class="btn btn-danger" @click="deleteTheCourse(course.id)">Delete</button>
            </div>
          </td>
        </tr>
        <!--/.Courses Loop -->
      </tbody>
    </table>
  </div>
  <!--/.Card Body -->
</div>
<!--/.Card -->
</template>

<script>
//Imports the axios dependencies
import axios from 'axios';

export default { //ES2015 syntax for making CourseIndex object available for use.
  name: 'CourseIndex',
  components: {},
  data() {
    return {
      fields: [{
          key: 'title',
        },
        'code',
        'points',
        {
          key: 'level',
        }
      ],
      courses: [] // Retrievs course array from database
    }
  },
  mounted() {
    this.getThisCourses(); //Initializes the function to load in the courses
  },
  methods: {
    getThisCourses() { //This method checks if the user is authorized and access token is assigned to him,if true the request is send to the
      // Laravel backend Restful API and databse to receive and output
      let token = localStorage.getItem('token');
      console.log(token);
      axios.get('http://dawid.college:8000/api/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })

        .then(response => { //If response occours the array of courses is retrived
          console.log(response.data);
          this.courses = response.data.data;

        })
        .catch(error => { //If the courses can not be retrived let errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
    deleteTheCourse() {
      let token = localStorage.getItem("token");
      // loops through enrolments and sends delete request to delete them
      this.course.enrolments.forEach((enrolment) => {
        axios
          .delete("/api/enrolments/" + enrolment.id, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
      // delete course
      axios
        .delete("/api/courses/" + this.course.id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(function(response) {
          //delete the course as a response
          console.log(response.data);
          this.courses = response.data.data;

        })
        //if course is not able to get deleted make errors appear
        .catch(function(error) {
          console.log(error);
        });
    },


  },
}
</script>
<!-- This allows to style the HTML objects by using default CSS -->
<style>
.home {
  text-align: center;
}
</style>
