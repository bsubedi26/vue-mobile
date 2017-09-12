<template>
  <div class="bg-grey-3 home-page">
    <div class="home-content">
      Main Page
    </div>
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
