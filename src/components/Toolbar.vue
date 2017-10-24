<template>
  <div>
    
  </div>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QSideLink,
  QItemMain
} from 'quasar'

export default {
  props: {
    //   toggleLeft: Function
  },
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  },
  mounted () {
      console.log(this.a)
  },
  data () {
    return {
      links: [
        { name: 'Currency', path: '/currency', icon: 'fa fa-money', sublabel: 'View all currencies' },
        { name: 'Settings', path: '/settings', icon: 'fa fa-cog', sublabel: 'View config settings' },
        // { name: 'Login', path: '/login', icon: 'fa fa-sign-in', sublabel: 'Already have an Account?' },
        // { name: 'Signup', path: '/signup', icon: 'fa fa-id-card', sublabel: "Don't have an Account?" }
      ]
    }
  },
  computed: {
    routeStack () {
      return this.$store.getters['route/stack']
    },
    currentRoute () {
      const stack = this.$store.getters['route/stack']
      return stack.filter((item, i) => stack.length === i + 1)
    },
    previousRoute () {
      return this.currentRoute[0].from.fullPath
    }
  },
  methods: {
    backButtonClicked () {
      this.$store.dispatch('route/setBackButtonPressed', true)
      // this.$router.go(-1)
    },
    handleLogout () {
      console.log('previousRoute ', this.previousRoute)
      // this.$store.dispatch('auth/logout')
    },
    goToRoute (path) {
      this.$router.push(path)
    }
  }
}
</script>