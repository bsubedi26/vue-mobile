<template>
    <div class="bg-grey-3 row">
        <div class="layout-padding col-6">
            <div class="row justify-center">
                <q-btn color="primary" @click="searchAll()">
                    Search
                </q-btn>
            </div>
        </div>

        <div class="layout-padding col-6">
            <div class="row justify-center">
                <q-btn color="primary">
                    Filter Coins!
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
    components: {
        SearchResultItem
    },
    name: 'search-list',
    computed: {
        allCurrencies() {
            return this.$store.getters['crypto/allCurrencies'].slice(0, 90)
        }
    },
    methods: {
        routeChange(path) {

        },

        async searchAll() {
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
