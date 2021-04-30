<template>
<div id="nav">
  <b-navbar type="dark">
    <div>
      <!-- Adds an image as logo to the navbar -->
      <b-img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pearltrees.com%2Fs%2Fpic%2For%2Fiadt-38847394&f=1&nofb=1" fluid alt="Responsive image" style="max-width:500px; max-height:50px;"></b-img>
    </div>
    <!-- If user is logged in he is able to see the navbar items which are links that redirect to their given pages
     The navbar items except the logo are all aligned to the right of the page -->
    <b-navbar-nav v-if="loggedIn" class="ml-auto">
      <b-nav-item :to="{ name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item to="/enrolments">Enrolments</b-nav-item>
      <b-nav-item :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
      <b-button pill variant="outline-danger" @click="logout()">Logout</b-button>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
export default { //ES2015 syntax for making Navbar object available for use.
  name: 'NavBar',
  props: {
    loggedIn: Boolean
  },
  components: {

  },
  data() {
    return {}
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$emit('logout');
      this.$router.push('/');
    }
  },

}
</script>
<!-- This allows to style the HTML objects by using default CSS -->
<style>
#nav a {
  font-weight: light;
  color: #eee;
}

#nav a.router-link-exact-active {

  border-top: 1px solid white ;
  border-bottom: 1px solid white ;
}

#nav {
  padding: 0px;
  text-align: center;
  background-color: #212529;
  border-bottom: solid 5px red;
}
</style>
