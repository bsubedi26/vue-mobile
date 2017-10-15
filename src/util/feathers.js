import feathers from 'feathers/client'
import fHooks from 'feathers-hooks'
import fAuthentication from 'feathers-authentication-client'
import io from 'socket.io-client'
import fSocketio from 'feathers-socketio/client'
// import * as rest from 'feathers-rest/client'
// import axios from 'axios'
import getHost from './getHost'

const app = feathers()
const socket = io(getHost())
// const restClient = rest(getHost())

app
  .configure(fHooks())
  // .configure(restClient.axios(axios))
  .configure(fSocketio(socket))
  .configure(fAuthentication({
    storage: window.localStorage
  }))

export default app
