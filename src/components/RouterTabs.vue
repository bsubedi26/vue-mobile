<template>
    <q-tabs color="dark" slot="navigation">
        <q-route-tab
            icon="fa-money"
            to="/"
            exact
            slot="title"
        />
        <!-- <q-route-tab
            icon="fa-search"
            to="/search"
            exact
            slot="title"
        /> -->
        <q-route-tab
            icon="fa-address-card-o"
            to="/about"
            exact
            slot="title"
        />
    </q-tabs>
</template>

<script>
export default {
  name: 'app-router-tabs'
}
</script>
