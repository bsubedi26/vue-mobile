<template>

  <div class="bg-grey-3 row">
    <div class="layout-padding col-6">
      <div class="row justify-center pa1">
        <img width="60" height="60" :src="'/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>
      <div class="row justify-center pa1">
        {{currency.name}}
      </div>
      <div class="row justify-center pa1">
        ${{currency.price_usd}}
      </div>

      <div class="row justify-center pa1" 
      :class="{ red: isPercentChangeNegative(currency.percent_change_7d), green: !isPercentChangeNegative(currency.percent_change_7d) }"
      >
        {{currency.percent_change_7d | checkPercentChange }}
      </div>

    </div>

    <div class="layout-padding col-6">
      <div class="row justify-center lh150 pa1">
        {{ currency.description }}
      </div>
    </div>

    <div class="row justify-center pa1 col-6 mb3">
      <q-btn @click="goBack()" color="primary">
          Go Back
      </q-btn>
    </div>

  </div>

</template>

<script>
  export default {
    methods: {
      goBack () {
        return this.$router.go(-1)
      },
      isPercentChangeNegative (percentChange) {
        // if first character is negative
        if (percentChange[0] === '-') {
          return true
        }
        return false
      }
    },
    computed: {
      currency () {
        const { name } = this.$route.params
        return this.$store.getters['crypto/currency'](name)
      }
    }
  }
</script>