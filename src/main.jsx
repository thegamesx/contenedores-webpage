import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

//const domain = process.env.REACT_APP_AUTH0_DOMAIN
//const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={"dev-yllq83uuhnz8m2y5.us.auth0.com"}
    clientId={"WRp4S6TV8fyapby3mnfU3mt4jnKGUFzw"}
    redirect_uri={window.location.origin}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)


