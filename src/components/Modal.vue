<template>
  <div>

    ss
    
  <q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layoutModal.close()">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <div class="q-toolbar-title">
          Header
        </div>
      </q-toolbar>
      <q-toolbar slot="header">
        <q-search inverted v-model="search" color="none" />
      </q-toolbar>
      <q-toolbar slot="footer">
        <div class="q-toolbar-title">
          Footer
        </div>
      </q-toolbar>
      <div class="layout-padding">
        <h1>Modal</h1>
        <q-btn color="primary" @click="$refs.layoutModal.close()">Close</q-btn>
        <!--<p class="caption" v-for="n in 15">This is a Modal presenting a Layout.</p>-->
      </div>
    </q-modal-layout>
  </q-modal>
  
  <q-btn color="primary" @click="$refs.layoutModal.open()">Open</q-btn>


    </div>
</template>
<script>
  import { QModal, QModalLayout, QToolbar, QSearch, QIcon } from 'quasar'

  export default {
    name: 'app-modal',
    components: {
      QModal,
      QModalLayout,
      QToolbar,
      QSearch,
      QIcon
    },
    data () {
      return {
        search: ''
      }
    }
  }
</script>