<template>
  <div class="login mt-3">


    <q-card class="margin-top-30 width-550">

      <q-card-title class="text-center">
        <h4 class="card-title"> {{ cardHeader }}</h4>
      </q-card-title>
      <q-card-separator />
          
      <q-card-main>
        <q-input v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="submit" :error="$v.form.email.$error" float-label="*Email" />
        <span class="text-negative" v-if="$v.form.email.$error">Please provide a valid email address.</span>
      
        <q-input type="password" v-model="form.password" @blur="$v.form.password.$touch" @keyup.enter="submit" :error="$v.form.password.$error" float-label="*Password" />
        <span class="text-negative" v-if="$v.form.password.$error">Please provide a valid password.</span>
        <br />
      
        <div class="text-grey-6 margin-top-15">
          Don't have an Account?
          <router-link to="/signup">
            <span class="text-primary">Signup here.</span>
          </router-link>
        </div>
      
        <q-btn :disabled="$v.form.$error" class="margin-top-20" color="primary" @click="submit">Submit</q-btn>
      </q-card-main>



    </q-card>


<!--
    <el-card style="max-width:550px;margin:auto;">
      <el-alert class="p-2 mb-3" v-if="serviceError" :title="serviceError.message" type="error" show-icon>
      </el-alert>
  
      <h4 class="card-title"> {{ cardHeader }}</h4>
  
      <el-form @keyup.enter.native="handleSubmit(loginForm)" ref="loginForm" :model="loginForm" :rules="rules">
        <el-form-item label="Email Address" prop="email">
          <el-input v-model="loginForm.email" type="text" name="email" placeholder="Email"></el-input>
        </el-form-item>
  
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" name="password" placeholder="Password"></el-input>
        </el-form-item>
  
        <el-form-item class="text-left" prop="remember">
          <el-checkbox label="Remember Me" name="remember" v-model="loginForm.remember"></el-checkbox>
          <div class="text-muted">
            Don't have an Account?
            <router-link to="/signup">
              <span class="text-primary">Signup here.</span>
            </router-link>
          </div>
  
        </el-form-item>
  
        <el-button style="width:222px;" type="primary" size="large" @click="handleSubmit(loginForm)">Submit</el-button>
        <el-button style="width:222px;" type="success" size="large" @click="go('/')">Home</el-button>
      </el-form>
    </el-card>-->
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

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
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields again.')
      }
    },
    go (path) {
      this.$router.push(path)
    },
    handleSubmit (form) {
      const { email, password } = form
      // const loader = this.$loading({ text: 'Loading...', target: "form" })
      // this.$startLoading('auth/authenticate')
      this.$store.dispatch('auth/authenticate', {
        strategy: 'local',
        email: email,
        password: password
      })
        .then((response) => {
          console.log('.then ', response)
          // this.$endLoading('auth/authenticate')
          this.$router.push('/account/settings')
        })
        .catch((error) => {
          console.log('.catch ', error)
          this.serviceError = error
          // this.$endLoading('auth/authenticate')
        })
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