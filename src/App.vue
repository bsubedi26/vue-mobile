<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
      <!-- NAVBAR -->
      <q-toolbar slot="header">
        <!-- v-go-back.single="lastRoute[0].from.fullPath" -->
        <!-- <q-btn v-if="routeStack.length > 1" @click="backButtonClicked" flat class=""> -->
        <q-btn v-if="routeStack.length > 1" v-go-back.single="previousRoute" @click="backButtonClicked" flat class="">
          <q-icon name="arrow_back" />
        </q-btn>

        <q-btn v-else flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
    
        <q-toolbar-title>
          Vue Cryptocurrency
          <div slot="subtitle">Version: {{$q.version}}</div>
        </q-toolbar-title>
        <q-btn flat @click="handleLogout()">
          Logout
        </q-btn>
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
      <!-- <transition name="transitions" enter-active-class="animated fadeInLeft" mode="out-in"> -->
        <router-view />
      <!-- </transition> -->

      <q-tabs color="dark" slot="navigation">
        <q-route-tab
          icon="fa-money"
          to="/"
          exact
          slot="title"
        />
        <q-route-tab
          icon="fa-search"
          to="/search"
          exact
          slot="title"
        />
        <q-route-tab
          icon="fa-address-card-o"
          to="/about"
          exact
          slot="title"
        />
        <!-- <q-route-tab
          icon="fa-plane"
          to="/settings"
          exact
          slot="title"
        /> -->
      </q-tabs>
      
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

<style lang="stylus">
  // ~variables is a Webpack alias (defined in /config/index.js)
  // which points to /src/themes/quasar.variables.styl
  @import '~variables'
  @import 'assets/styles/main.styl'
</style>
