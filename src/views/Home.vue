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
        Environment: {{ env.NODE_ENV }}
      </div>
    </div>

    <div @click="handleClick(currency)" class="bg-washed-yellow layout-padding col-6 cursor-pointer grow" v-for="currency in currencies" :key="currency.name">

      <div v-if="$q.platform.is.cordova" class="row justify-center pa1">
        <img width="60" height="60" :src="'/android_asset/www/statics/img/currencies/'+currency.image+'.png'" :alt="currency.name">
      </div>
      
      <div v-if="$q.platform.is.desktop" class="row justify-center pa1">
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

  </div>
</template>

<script>
export default {
  computed: {
    currencies () {
      return this.$store.getters['crypto/currencies']
    }
  },
  mounted () {
    this.env = process.env
    // console.log('isDesktop ', this.$q.platform.is.desktop)
    // console.log('isMobile? ', Platform.is.mobile)
    // console.log('isCordova ', Platform.is.cordova)
  },
  name: 'index',
  data () {
    return {
      env: {},
      error: '',
      returnedData: {}
    }
  },
  methods: {
    handleClick (currency) {
      // console.log(currency)
      this.$router.push(`currency/${currency.id}`)
    },
    fetchData () {
      this.$store.dispatch('crypto/fetch')
    },
    isPercentChangeNegative (percentChange) {
      // if first character is negative
      if (percentChange[0] === '-') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus">
.home-page {
}

// .home-page {
// width: 600px;
// height: 300px;
// max-width: 768px;
// margin: auto;
// }
// .home-content {
// display: flex;
// align-items: center;
// justify-content: center;
// height: 100%;
// }
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
