<template>
  <q-btn @click="trigger">Trigger Actionsheet </q-btn>
</template>

<script>
    import { ActionSheet } from 'quasar'
    export default {
        methods: {
            trigger () {

                const options = {
                    title: 'Article Actions',
                    // specify ONLY IF you want gallery mode:
                    gallery: true,
                    actions: [
                        {
                            label: 'Delete',
                            // Choose one of the following two:
                            icon: 'delete', // specify ONLY IF using icon
                            avatar: 'assets/some-avatar.png', // specify ONLY IF using avatar
                            handler: function() {
                                console.log('Deleted Article')
                            }
                        }
                    ]
                }
                
                ActionSheet.create(options)
            }
        }

    }
</script>
