import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
    navigate('/')
  }

  return (
    <div className="login-form-container">
      <form autoComplete="off" onSubmit={handleSubmit} className="login-form">
        <input type="text" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} className="login-input" required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="login-input" required />
        <button type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}