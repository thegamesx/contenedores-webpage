import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

//const domain = process.env.REACT_APP_AUTH0_DOMAIN
//const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={"dev-j84dukhxiu3f6z5d.us.auth0.com"}
    clientId={"Z0FAxoijbyHTACSLyCDGWsHMiYRV0R2G"}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)


