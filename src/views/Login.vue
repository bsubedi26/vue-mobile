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
  
    <q-inner-loading :visible="$isLoading('auth/authenticate')" />
  
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
      const userCredentials = { strategy: 'local', email, password }
      this.$startLoading('auth/authenticate')
      try {
        await this.$store.dispatch('auth/authenticate', userCredentials)
        await delay(1500)
        Toast.create.positive('Login successful!')
        this.$endLoading('auth/authenticate')
        this.$router.push('/')
      }
      catch (error) {
        console.log(error)
        const message = 'Invalid Credentials. Try again.'
        await delay(1500)
        Toast.create.negative(message)
        this.$endLoading('auth/authenticate')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  /* background: url(data:image/jpeg;base64,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) no-repeat center center fixed;
  background-size: cover;
  filter: brightness(70%); */
}
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