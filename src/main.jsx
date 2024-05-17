import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'


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


