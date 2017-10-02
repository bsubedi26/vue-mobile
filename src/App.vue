<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
      <!-- NAVBAR -->
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
    
        <q-toolbar-title>
          Vue Mobile
          <div slot="subtitle">Version: {{$q.version}}</div>
        </q-toolbar-title>
      </q-toolbar>

      <!-- Left Side Panel -->
      <div slot="left">
        <!--
              Use <q-side-link> component
              instead of <q-item> for
              internal vue-router navigation
            -->
        <q-list no-border link inset-delimiter>
          <q-list-header>Routes</q-list-header>

          <q-side-link class="side-nav-link" :to="link.path" v-for="link in links" :key="link.name">
            <q-item>
              <q-item-side>
                <i :class="link.icon" aria-hidden="true"></i>
              </q-item-side>
              <q-item-main class="text-primary" :sublabel="link.sublabel" :label="link.name" />
            </q-item>
          </q-side-link>
    
        </q-list>
      </div>
      
      <!-- DYANMIC PAGE ROUTES -->
      <router-view />
    </q-layout>
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

/*
 * Root component
 */
export default {
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
  data () {
    return {
      links: [
        { name: 'Home', path: '/', icon: 'fa fa-home', sublabel: 'Go to Home Page' },
        { name: 'Login', path: '/login', icon: 'fa fa-sign-in', sublabel: 'Already have an Account?' },
        { name: 'Signup', path: '/signup', icon: 'fa fa-id-card', sublabel: "Don't have an Account?" }
      ]
    }
  },
  methods: {
    goToRoute (path) {
      console.log(path)
      console.log(this.$router)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus">
  // ~variables is a Webpack alias (defined in /config/index.js)
  // which points to /src/themes/quasar.variables.styl
  @import '~variables'
  @import 'assets/styles/main.styl'
</style>
