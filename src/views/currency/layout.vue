<template>
    <q-layout>
      <transition name="transitions"
        enter-active-class="animated slideInLeft"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </q-layout>
</template>

<script>

export default {

}
</script>
