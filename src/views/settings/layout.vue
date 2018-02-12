<template>
  <q-layout class="bg-grey-3 layout-padding">

    <div class="row justify-center pa1">
        <h5 class="text-primary">Platform Information</h5>
        <div class="list bg-grey-4 layout-padding">
          <ul v-if="v == 'is'" class="fw5 pa2" v-for="(k, v) in $q.platform" :key="k">
            <li>
              {{ k }}
            </li>
          </ul>
        </div>  
    </div>
    
  </q-layout>
</template>

<script>
export default {
  name: 'views-settings'
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
