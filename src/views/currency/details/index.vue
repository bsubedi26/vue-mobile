<template>
  <div class="bg-grey-3 row">
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
