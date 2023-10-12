import { signUp } from "../../utilities/users-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} required />
                        <label>Email</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} required />
                        <label>Confirm</label>
                        <input type="password" name="confirm" value={user.confirm} onChange={handleChange} required />
                        <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{user.error}</p>
            </div>
        );
}