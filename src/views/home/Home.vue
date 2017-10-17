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
        Environment: {{ env }}
      </div>
    </div>

    <div @click="routeChange(currency)"
      class="bg-washed-yellow layout-padding col-6 cursor-pointer ba bw1 b--black grow2"
      v-for="currency in currencies"
      :key="currency.name"
    >
      <currency-item :currency="currency"></currency-item>
    </div>

  </div>
</template>

<script>
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
  name: 'views-home',
  data () {
    return {
      env: ''
    }
  },
  methods: {
    routeChange (path) {
      console.log(path)
      this.$router.push(`currency/${path.id}`)
    },
    fetchData () {
      this.$store.dispatch('crypto/fetch')
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