<template>
  <div class="bg-grey-3 home-page">
    <div class="home-content">

      <img src="statics/quasar-logo.png" alt="" />

    </div>
    
    <app-modal />
<!--    
  <q-modal ref="basicModal">
    <h4>Basic Modal</h4>
    <q-btn color="primary" @click="$refs.basicModal.close()">Close</q-btn>
  </q-modal>
  
  <q-btn color="primary" @click="$refs.basicModal.open()">Open</q-btn>-->
  

    
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
.home-page {
  width: 600px;
  height: 300px;
  max-width: 768px;
  margin: auto;
}
.home-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
      
</style>
