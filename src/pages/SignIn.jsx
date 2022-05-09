import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
      console.log(error)
    }
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <div className="signInText">Sign In</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#fff" width="34px" />
            </button>
          </div>
        </form>
        {/* Google OAuth */}
        <OAuth />
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn
