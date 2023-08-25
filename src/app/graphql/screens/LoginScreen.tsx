import React, { useState } from 'react';
import styles from './LoginScreen.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { useDarkMode } from '../../DarkModeContext';

import LOGIN_MUTATION from '../mutations/login';


export default function LoginScreen() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? 'white' : 'black',
    color: isDarkMode ? 'black' : 'white',
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? 'black' : '#dfdfdfdd',
    color: isDarkMode ? 'white' : 'black',
  };

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: {
          email: email,
          password: password,
        },
      });

      if (data && data.login && data.login.user) {
        const username = data.login.user.username;
        console.log('Login successful. User ID:', username);
        
        // Redirect to home screen
        window.location.href = '/';
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container} style={containerStyle}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cursif</h1>

        <div className={`${styles.cornerText} ${isDarkMode ? styles.whiteCornerText : styles.blackCornerText}`}>
          <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>

        <div className={styles.registerButtonContainer}>
          <button className={styles.registerButton} style={buttonStyle}>Register</button>
        </div>
      </div>

      <div className={styles.loginBox}>
        <h2><span className={styles.boldText}>LOG</span> IN</h2>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            style={inputStyle}
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className={styles.passwordInput}>
            <input
              className={styles.input}
              style={inputStyle}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className={styles.showPasswordButton}
              onClick={handlePasswordToggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className={styles.forgotPassword}>
            <a href="#">Forgot Password?</a>
          </div>

          <button className={styles.button} onClick={handleLogin}>Login</button>
    
        </div>
      </div>
    </div>
    </div>
  );
}
