<template>
  <div class="login mt-3">
  
    <q-card class="margin-top-30 width-550">
  
      <q-card-title class="text-center">
        <h4 class="card-title"> {{ cardHeader }}</h4>
        <!-- <h4 v-if="serviceError" class="card-title"> {{ serviceError }}</h4> -->
      </q-card-title>
      <q-card-separator />
  
      <q-card-main>
        <q-input v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="handleSubmit" :error="$v.form.email.$error" float-label="*Email" />
        <span class="text-negative" v-if="$v.form.email.$error">Please provide a valid email address.</span>
  
        <q-input type="password" v-model="form.password" @blur="$v.form.password.$touch" @keyup.enter="handleSubmit" :error="$v.form.password.$error" float-label="*Password" />
        <span class="text-negative" v-if="$v.form.password.$error">Please provide a valid password.</span>
        <br />
  
        <div class="text-grey-6 margin-top-15">
          Don't have an Account?
          <router-link to="/signup">
            <span class="text-primary">Signup here.</span>
          </router-link>
        </div>
  
        <q-btn :disabled="$v.form.$error" class="margin-top-20" color="primary" @click="handleSubmit">Submit</q-btn>
        <q-btn class="margin-top-20" color="secondary" @click="checkCookie">Check Cookie</q-btn>
      </q-card-main>
  
    </q-card>
  
    <q-inner-loading :visible="$isLoading('auth/login')" />
  
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'
import { delay } from 'src/util'

export default {
  name: 'app-login',
  data () {
    return {
      jumbotronHeader: 'Account Login',
      cardHeader: 'Login Below',
      serviceError: null,
      loading: false,
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
    go (path) {
      this.$router.push(path)
    },
    checkCookie () {
      this.$store.dispatch('auth/checkCookie')
    },

    async handleSubmit () {
      const { email, password } = this.form
      const userCredentials = { email, password, name: email }
      this.$startLoading('auth/login')
      try {
        await this.$store.dispatch('auth/login', userCredentials)
        await delay(1500)
        Toast.create.positive('Login successful!')
        this.$endLoading('auth/login')
        this.$router.push('/')
      }
      catch (error) {
        const { message } = error.data
        await delay(1500)
        Toast.create.negative(message)
        this.$endLoading('auth/login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>