<template>
  <div class="bg-grey-3 row">
    <div class="button-back">
      <q-btn @click="goBack()" color="dark">
        <i class="fa fa-arrow-left fa-lg pa2"/></a>
        Go Back
      </q-btn>
    </div>
    <currency-details-item :currency="currency" />
  </div>

</template>

<script>
import CurrencyDetailsItem from './item'

  export default {
    name: 'currency-details',
    components: {
      CurrencyDetailsItem
    },
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

<style>
  .button-back {
    position: absolute;
  }
</style>
