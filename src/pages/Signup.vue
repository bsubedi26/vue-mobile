<template>
  <div>

    <q-card class="margin-top-30 width-550">
      
      <q-card-title class="text-center">
        <h4 class="card-title"> {{ cardHeader }}</h4>
      </q-card-title>
      <q-card-separator />
    
      <q-card-main>
        <q-input v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="submit" :error="$v.form.email.$error" float-label="*Email" />
        <span class="text-negative" v-if="$v.form.email.$error">Please provide a valid email address.</span>
              
        <q-input  type="password" v-model="form.password" @blur="$v.form.password.$touch" @keyup.enter="submit" :error="$v.form.password.$error" float-label="*Password" />
        <span class="text-negative" v-if="$v.form.password.$error">Please provide a valid password.</span>
        <br />
              
        <div class="text-grey-6 margin-top-15">
          Already have an Account?
          <router-link to="/login">
            <span class="text-primary">Login here.</span>
          </router-link>
        </div>

        <q-btn outline :disabled="$v.form.$error" class="margin-top-20" color="primary" @click="submit">Submit</q-btn>
      </q-card-main>
    
    </q-card>

    <q-inner-loading :visible="$isLoading('users/create')" />

  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

export default {
  name: 'app-signup',
  data () {
    return {
      cardHeader: 'Signup Below',
      serviceError: null,
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        minLength: minLength(4),
        email
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    submit () {
      const { email, password } = this.form
      this.$startLoading('users/create')
      this.$store.dispatch('users/create', { email, password })
        .then(doc => {
          console.log('.then ', doc)
          this.$endLoading('users/create')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log('.catch ', error)
          this.loading = false
          this.serviceError = error
          Toast.create.negative('There was a problem. Please try again later.')
          this.$endLoading('users/create')
        })
    }
  },
  mounted () {
    Toast.create.negative('Please review fields again.')
  }
}
</script>
