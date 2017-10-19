<template>
    <search-details-item :currency="currency" />
</template>

<script>
import SearchDetailsItem from './item'

  export default {
    name: 'search-details',
    components: {
      SearchDetailsItem
    },
    computed: {
      currency () {
        const { name } = this.$route.params
        return this.$store.getters['crypto/filterAllCurrencies'](name)
      }
    }
  }
</script>
