<template>
    <div class="bg-grey-3 row justify-center items-center">
        <div class="layout-padding col-6">
            <div class="row justify-center">
                <q-btn color="primary" @click="fetchAll()">
                    All Coins
                </q-btn>
            </div>
        </div>

        <div class="layout-padding col-6">
            <div class="row">
                <q-input
                    class=""
                    v-model="searchInput"
                    type="text"
                    float-label="Filter Coins"
                />
            </div>
            <div class="row">
                <q-btn class="" color="dark">
                    Submit
                </q-btn>
            </div>
        </div>

        <div @click="routeChange(currency)" class="bg-washed-yellow layout-padding col-6 cursor-pointer ba bw1 b--black grow2" v-for="currency in allCurrencies" :key="currency.name">
            <search-result-item :currency="currency"></search-result-item>
        </div>

        <q-inner-loading :visible="$isLoading('crypto/getAllCoins')" />

    </div>
</template>

<script>
import { Toast } from 'quasar'
import SearchResultItem from './item'

export default {
    data () {
        return {
            searchInput: ''
        }
    },
    components: {
        SearchResultItem
    },
    name: 'search-list',
    computed: {
        allCurrencies() {
            return this.$store.getters['crypto/allCurrencies'].slice(0, 50)
        }
    },
    methods: {
        routeChange(path) {
          this.$router.push(`search/details/${path.id}`)
        },

        async fetchAll() {
            try {
                this.$startLoading('crypto/getAllCoins')
                await this.$store.dispatch('crypto/getAllCoins')
                this.$endLoading('crypto/getAllCoins')
            }
            catch (error) {
                const message = error.message ? error.message : 'There was a problem. Try again later.'
                Toast.create.negative(message)
                this.$endLoading('crypto/getAllCoins')
            }

        }
    }
}

</script>

<style>

</style>
