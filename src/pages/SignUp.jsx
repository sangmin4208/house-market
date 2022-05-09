import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase.config'
function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  })
  const { email, password, name } = formData
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    } catch (err) {}
  }
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
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
          <div className="signUpBar">
            <div className="signUpText">Sign Up</div>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width="34px" />
            </button>
          </div>
        </form>
        {/* Google OAuth */}
        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
