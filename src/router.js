import Vue from 'vue' //Imports the Vue dependencies
import Router from 'vue-router' //Imports the Vue Router dependencies
import Home from './views/HomePage' // Imports the Homepage view

//Imports CRUD for Courses
import CoursesIndex from './views/courses/Index'
import CoursesCreate from './views/courses/Create'
import CoursesEdit from './views/courses/Edit'
import CoursesShow from './views/courses/Show'

//Imports CRUD for Enrolments
import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsCreate from './views/enrolments/Create'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsShow from './views/enrolments/Show'

//Imports CRUD for Lecturers
import LecturersIndex from './views/lecturers/Index'
import LecturersCreate from './views/lecturers/Create'
import LecturersShow from './views/lecturers/Show'
import LecturersEdit from './views/lecturers/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{ //Redirects to Home
      path: '/',
      name: 'home',
      component: Home,

    },
    { //Redirects to the Course Page which displays all the courses
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    { //Redirects to the Course Create page giving the ability to create new course
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },
    { // Redirects to the Course Show page which displays the data information about a given course
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },

    { //Redirects to the Course Edit page which allows to update the course which was chosen to be edited
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
    { //Redirects to the Enrolments Page which displays all the enrolments
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    { //Redirects to the Enrolment Create page giving the ability to create new enrolment
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentsCreate
    },
    { //Redirects to the Enrolment Show  page which displays the data information about a given enrolment
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentsShow
    },

    { //Redirects to the Enrolment Edit page allowing to update the information about the given enrolment
      path: '/enrolments/:id/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit
    },
    { //Redirects to the Lectueres Show page which displays all the lecturers
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    { //Redirects to the Lecturer Create page which allows to create a new lecturer
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturersCreate
    },
    { // Redirects to a Lecturer Show page which allows to view all the dat information about a given lecturer
      path: '/lecturers/:id',
      name: 'lecturers_show',
      component: LecturersShow
    },

    { //Redirects to the Lectuer Edit page which allows to update the infromation about a given lecturer
      path: '/lecturers/:id/edit',
      name: 'lecturers_edit',
      component: LecturersEdit
    }
  ]
});
