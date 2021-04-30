<template>
<div class="col-12" style="margin-top:50px;">
  <!-- Card Header -->
  <div class="card-header" style="background-color: grey; color:white;">
    Lecturers List
    <!-- Create button which redirects to the Lecturer Create page allowing for the creation of new lecturer -->
    <router-link :to="{ name:'lecturers_create' }" style="background-color:#1cffac;" class="btn btn-sm btn-primary float-right">Create</router-link>
  </div>
  <!-- Card Header -->
  <div class="col-lg-12">
    <table class="table center">

      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email Address</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Looping through the array of lecturers -->
        <tr v-for="lecturer in lecturers" v-bind:key="lecturer.id">
          <td>{{lecturer.name}}</td>
          <td>{{lecturer.email}}</td>
          <td>{{lecturer.phone}}</td>
          <td>{{lecturer.address}}</td>
          <td>
            <!-- Looping through the array of lecturers -->
            <!-- Button group - View, Edit and Delete for all the lecturers -->
            <div class="btn-group" role="group">
              <router-link :to="{ name:'lecturers_show', params: { id:lecturer.id }}" class="btn btn-primary">View</router-link>
              <router-link :to="{ name:'lecturers_edit', params: { id:lecturer.id }}" class="btn btn-warning">Edit</router-link>
              <button type="button" class="btn btn-danger" @click="deleteTheLecturers(lecturer.id)">Delete</button>
            </div>
            <!-- Button group - View, Edit and Delete for all the lecturers -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
//Imports axios dependencies
import axios from 'axios'
export default { //ES2015 syntax for making LecturersIndex object available for use.
  name: 'LecturersIndex',
  components: {},
  data() { //Retrives and returns the array of lecturers from the database
    return {
      lecturers: []
    }
  },
  mounted() {
    this.getTheLecturers(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the lecturers using their IDs.
  },
  methods: {
    getTheLecturers() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its lecturer id and allows to display the given lecturers and its data information in the data table.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If response occours the array of lecturers is retrived from the database
          console.log(response.data);
          this.lecturers = response.data.data
        })
        .catch(error => { //If the lecturers can not be retrived let errors appear
          console.log(error)
          console.log(error.response.data)
        })
    },

  },
}
</script>
