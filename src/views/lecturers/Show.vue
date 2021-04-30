<template>
<!-- Displays all of the data information about a given lecturer -->
<div class="col-md-12" style="margin-top:50px;">
  <!-- Card Header -->
  <div class="card-header" style="background-color: darkblue; color:white;">
    This Lecturer is
    <!-- Button which redirects back to the Lecturers index page -->
    <v-btn style="float:right; margin-top: -5px;" outlined color="white" :to="{ name: 'lecturers_index' }"><a>Back</a></v-btn>
  </div>
  <!-- Card Header -->
  <div class="card-body">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Lecturers Name</th>
          <th scope="col">Lecturers Email Address</th>
          <th scope="col">Lecturers Phone Number</th>
          <th scope="col">Lecturers Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Fetches the data information about the given lecturer from database -->
          <td scope="row">{{ lecturers.name }}</td>
          <td>{{ lecturers.email }}</td>
          <td>{{ lecturers.phone }}</td>
          <td>{{ lecturers.address }}</td>
          <!-- Fetches the data information about the given lecturer from database -->
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Displays all of the data information about a given lecturer -->
</div>
</template>

<script>
//Imports the axios dependencies
import axios from 'axios'
export default { //ES2015 syntax for making LecturersShow object available for use.
  name: 'LecturersShow',
  components: {},
  data() { //Returns the data information for a given lecturer from the database
    return {
      lecturers: {}
    }
  },
  mounted() {
    this.getTheLecturer(); //Lifecycle hook, which allows Vue application to add the component to the DOM, it is used
    //to send HTTP requests to fetch data that the component will render in this case it gets the lecturer using its ID.
  },
  methods: {
    getTheLecturer() { //Attaches the access token from local storage to the axios request being sent to the backend restful api for the user.
      //If the access token is correct and user is authorized the axios query tells the restful api to send GET request. This fetches the
      // data information by its lecturer id and allows to display the given lecturer and its data information in the data table.
      let token = localStorage.getItem('token');
      axios.get('http://dawid.college:8000/api/lecturers/' + this.$route.params.id, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => { //If respones occurs it retrives the lecturer from the database.
          console.log(response.data);
          this.lecturers = response.data.data
        })
        .catch(error => { //Errors appear if the lecturer can not be retrived from the database
          console.log(error)
          console.log(error.response.data)
        })
    },

  },
}
</script>
