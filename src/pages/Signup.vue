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

    <q-inner-loading :visible="$isLoading('auth/signup')" />

  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'
import { delay } from 'src/util'

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
        minLength: minLength(1),
        email
      },
      password: {
        required,
        minLength: minLength(1)
      }
    }
  },
  methods: {
    async submit () {
      const { email, password } = this.form
      const userCredentials = { email, password, name: email }
      this.$startLoading('auth/signup')
      try {
        await this.$store.dispatch('auth/signup', userCredentials)
        await delay(1500)
        Toast.create.positive('Successfully registered an account. Please login.')
        this.$endLoading('auth/signup')
        this.$router.push('/login')
      }
      catch (error) {
        const { message } = error.data
        await delay(1500)
        Toast.create.negative(message)
        this.$endLoading('auth/signup')
      }
    }
  },
  mounted () {

  }
}
</script>
