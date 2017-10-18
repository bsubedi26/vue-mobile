<template>
  <div class="bg-grey-3 home-page row items-center">
    <div class="layout-padding br bw2 b--black col-6">
      <div class="row justify-center">
        <q-btn color="primary" @click="fetchData()">
          Fetch Currencies
        </q-btn>
      </div>
    </div>

    <div class="layout-padding col-6">
      <div class="row justify-center">
        <span class="text-green">Environment: {{ env }}</span>
      </div>
    </div>

    <div @click="routeChange(currency)"
      class="bg-washed-yellow layout-padding col-6 cursor-pointer ba bw1 b--black grow2"
      v-for="currency in currencies"
      :key="currency.name"
    >
      <currency-item :currency="currency"></currency-item>
    </div>

    <q-inner-loading :visible="$isLoading('crypto/getTopTenCoins')" />

  </div>
</template>

<script>
import { Toast } from 'quasar'
import CurrencyItem from './item'

export default {
  components: {
    CurrencyItem
  },
  computed: {
    currencies () {
      return this.$store.getters['crypto/currencies']
    }
  },
  mounted () {
    this.env = process.env.NODE_ENV || ''
    // console.log('isDesktop ', this.$q.platform.is.desktop)
    // console.log('isMobile? ', Platform.is.mobile)
    // console.log('isCordova ', Platform.is.cordova)
  },
  name: 'currency-list',
  data () {
    return {
      env: ''
    }
  },
  methods: {
    routeChange (path) {
      this.$router.push(`currency/details/${path.id}`)
    },
    async fetchData () {
      try {
        this.$startLoading('crypto/getTopTenCoins')
        await this.$store.dispatch('crypto/getTopTenCoins')
        this.$endLoading('crypto/getTopTenCoins')
      }
      catch (error) {
        const message = error.message ? error.message : 'There was a problem. Try again later.'
        Toast.create.negative(message)
        this.$endLoading('crypto/getTopTenCoins')
      }
      
    }
  }
}
</script>

<style lang="stylus">
.logo-container {
  width: 255px;
  height: 242px;
  perspective: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.logo {
  position: absolute;
  transform-style: preserve-3d;
}
</style>