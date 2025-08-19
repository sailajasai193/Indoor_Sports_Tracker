import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import 'bootstrap/dist/css/bootstrap.min.css';
const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual client ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1045088483338-1duu0l586duimuj6qup7q9r1ljn2ovlm.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();