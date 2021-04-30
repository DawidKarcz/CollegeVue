<template>
<div class="col-12" style="margin-top:50px;">
  <!-- Card Header -->
  <div class="card-header" style="background-color: grey; color:white;">
    Enrolments List
    <!-- Create button which redirects to the Enrolment Create page allowing for the creation of new enrolment -->
    <router-link :to="{ name:'enrolments_create' }" style="background-color:#1cffac;" class="btn btn-sm btn-primary float-right">Create</router-link>
  </div>
  <!-- Card Header -->
  <!-- Table with the data information of enrolments -->
  <div class="card-body">
    <table class="table table-striped table-hover" v-if="enrolments.length != 0">
      <thead>
        <tr>
          <th scope="col">Lecturer</th>
          <th scope="col">Course</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <!--.Enrolments loop -->
      <tbody>
        <tr v-for="enrolment in enrolments" :key="enrolment.id">
          <td>{{ enrolment.lecturer.name }}</td>
          <td>{{ enrolment.course.title }}</td>
          <td>{{ enrolment.status }}</td>
          <td scope="row">{{ enrolment.date }}</td>
          <td>{{ enrolment.time }}</td>
          <td>
            <!-- Buttons group allowing to View, Edit and Delete the enrolment -->
            <div class="btn-group" role="group">
              <router-link :to="{ name:'enrolments_show', params: { id:enrolment.id }}" class="btn btn-primary">View</router-link>
              <router-link :to="{ name:'enrolments_edit', params: { id:enrolment.id }}" class="btn btn-warning">Edit</router-link>
              <button type="button" class="btn btn-danger" @click="deleteTheEnrolment(enrolment.id)">Delete</button>
            </div>
            <!-- Buttons group allowing to View, Edit and Delete the enrolment -->
          </td>
        </tr>
      </tbody>
      <!--/.Enrolments loop -->
    </table>
  </div>
  <!-- Table with the information of enrolments -->
</div>
<!--/.Card -->
</template>

<script>
//Imports axios dependencies
import axios from 'axios'
export default { //ES2015 syntax for making EnrolmentsIndex object available for use.
  name: 'EnrolmentsIndex',
  components: {},
  data() {
    return {
      enrolments: [], //Retrives the enrolments array
    }
  },
  mounted() {
    this.getTheEnrolments(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the enrolments using its ID.
  },
  methods: {
    getTheEnrolments() { //This method checks if the user is authorized and access token is assigned to him,if true the request is send to the
      // Laravel backend Restful API and databse to receive and output which would be all the enrolments in this case.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/enrolments', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occours the array of enrolments is retrived
          console.log(response.data.data);
          this.enrolments = response.data.data;
        })
        .catch(error => { //If the enrolments can not be retrived let errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },
  }
}
</script>
<!-- This allows to style the HTML objects by using default CSS -->
<style>
.home {
  text-align: center;
}
</style>
