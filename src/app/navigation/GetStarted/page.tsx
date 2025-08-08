
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const GetStarted: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordAgain, setSignUpPasswordAgain] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  // Login API
  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:8082/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, passwordHash: loginPassword })
      });
      if (res.ok) {
        const data = await res.json();
        // userId'yi localStorage'a kaydet
        if (typeof window !== 'undefined' && data && data.id) {
          localStorage.setItem('userId', data.id);
        }
        setMessage("Login successful!");
        // home page'e yönlendir
        router.push("/home");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setMessage("Login error. Server unreachable.");
    }
  };

  // Sign Up API
  const handleSignUp = async () => {
    setMessage("");
    if (signUpPassword !== signUpPasswordAgain) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8082/user/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signUpName,
          email: signUpEmail,
          password: signUpPassword,
          role: "USER"
        })
      });
      if (res.ok) {
        setMessage("Sign up successful! You can now log in.");
        setShowSignUp(false);
      } else {
        setMessage("Sign up failed. Email or name may already be in use.");
      }
    } catch (err) {
      setMessage("Sign up error. Server unreachable.");
    }
  };

  return (
    <div className={styles.master}>
      <div className={styles.centerBox}>
        <div className={styles.cardBox}>
          {/* Modern üst başlık ve açıklama */}
          <div style={{ width: '100%', textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: 26, margin: 0, color: '#1677ff', letterSpacing: '-1px' }}>{!showSignUp ? 'Sign in' : 'Sign up'}</h2>
            <div style={{ color: '#6b7280', fontSize: 15, marginTop: 4 }}>{!showSignUp ? 'Welcome! Please enter your credentials.' : 'Create your account to start using our services.'}</div>
          </div>
          <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} onSubmit={e => { e.preventDefault(); !showSignUp ? handleLogin() : handleSignUp(); }}>
            {!showSignUp ? (
              <>
                <input className={styles.inputBox} type="email" name="Email" id="email" placeholder="Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                <input className={styles.inputBox} type="password" name="Password" id="password" placeholder='Password' required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                <input className={styles.button} type="submit" value="Login" />
                {message && <div style={{ color: message.includes("success") ? "green" : "red", marginTop: 8 }}>{message}</div>}
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <span className={styles.link} onClick={() => { setShowSignUp(true); setMessage(""); }}>Don't have an account? <b>Sign Up</b></span>
                </div>
              </>
            ) : (
              <>
                <input className={styles.inputBox} type="email" name="signUpEmail" id="signUpEmail" placeholder="Email" required value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
                <input className={styles.inputBox} type="text" name="signUpName" id="signUpName" placeholder="Name" required value={signUpName} onChange={e => setSignUpName(e.target.value)} />
                <input className={styles.inputBox} type="password" name="signUpPassword" id="signUpPassword" placeholder='Password' required value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} />
                <input className={styles.inputBox} type="password" name="signUpPasswordAgain" id="signUpPasswordAgain" placeholder='Repeat Password' required value={signUpPasswordAgain} onChange={e => setSignUpPasswordAgain(e.target.value)} />
                <input className={styles.button} type="submit" value="Sign Up" />
                {message && <div style={{ color: message.includes("success") ? "green" : "red", marginTop: 8 }}>{message}</div>}
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <span className={styles.link} onClick={() => { setShowSignUp(false); setMessage(""); }}>Already have an account? <b>Login</b></span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default GetStarted
