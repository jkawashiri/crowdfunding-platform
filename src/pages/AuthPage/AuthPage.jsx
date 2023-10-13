import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react"
import { Link } from "react-router-dom"
import './AuthPage.css'

export default function AuthPage({setUser}) {
    const [clicked, setClicked] = useState(true)
    let buttonText = clicked === true ? 'Sign Up' : 'Login'
    function onClick() {
        setClicked(clicked => !clicked )
    }
    return (
        <main>
            { buttonText === 'Sign Up' ?
                <h1>Log In</h1>
            :
                <h1>Sign Up</h1>
            }

            <div className="auth-form-switch">
                { clicked === true ?
                    <div>New to Jumpstarter?</div>
                :
                    <div>Already have an account?</div>
                }
                <Link onClick={onClick} className="form-switch-link">{buttonText}</Link>
            </div>

            { clicked === true ? 
                <LoginForm setUser={setUser} />
                :
                <SignUpForm setUser={setUser} />
            }
        </main>
    )
}