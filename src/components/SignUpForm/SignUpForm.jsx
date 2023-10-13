import { signUp } from "../../utilities/users-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUpForm.css'

export default function SignUpForm(props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })
    const disable = user.password !== user.confirm;
    const navigate = useNavigate()

    function handleChange(evt) {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        try {
            const formData = {...user}
            delete formData.error
            delete formData.confirm
            const newUser = await signUp(formData)
            props.setUser(newUser)
            navigate('/')
        } catch {
            setUser(user => ({...user, error: 'Sign Up Failed - Try Again'}))
        }
    }
        return (
            <div className="signup-form-container">
                <form autoComplete="off" onSubmit={handleSubmit} className="signup-form">
                    <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="signup-input" required />
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="signup-input" required />
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="signup-input" required />
                    <input type="password" name="confirm" placeholder="Confirm Password" value={user.confirm} onChange={handleChange} className="signup-input" required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
                <p className="error-message">&nbsp;{user.error}</p>
            </div>
        );
}