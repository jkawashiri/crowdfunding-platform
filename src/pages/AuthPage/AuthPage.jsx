import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react"

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
            <button onClick={onClick}>{buttonText}</button>
            { clicked === true ? 
                <LoginForm setUser={setUser} />
                :
                <SignUpForm setUser={setUser} />
            }
        </main>
    )
}