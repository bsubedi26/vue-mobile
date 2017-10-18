<template>
  <q-layout class="bg-grey-3 layout-padding">

    <div class="row justify-center pa1">
        <h5 class="text-primary">$q.platform</h5>
        <ul class="list bg-grey-4 layout-padding">
          <li class="fw5 pa2" v-for="(k, v) in $q.platform" :key="k">
            {{v}}: {{k}}
          </li>
        </ul>  
    </div>
    
  </q-layout>
</template>

<script>
export default {
  name: 'views-settings'
}
</script>

<style>

</style>
