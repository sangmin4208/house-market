import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from 'react-toastify'
import { auth } from '../firebase.config'
function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    } finally {
      setEmail('')
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sigin In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send ResetLink</div>
            <button className="signInButton">
              <ArrowRightIcon fill={'#fff'} width={34} height={34} />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
