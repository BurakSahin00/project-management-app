import React from 'react'

const GetStarted: React.FC = () => {
  return (
    <div>
      <div className="">
        <h2>Login and Start</h2>
        <p>Login to your account to start using our services.</p>
      </div>
      <div className="">
        <label htmlFor="email">Email Address</label>
        <input type="email" name="Email" id="email" placeholder="Email" required />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input type="password" name="Password" id="password" placeholder='Password' required/>
      </div>
      <input type="button" value="Login"/>
    </div>
  )
}

export default GetStarted
