
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

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
          {!showSignUp ? (
            <>
              <div className={styles.mainText}>
                <h2>Login and Start</h2>
                <p className={styles.subText}>Login to your account to start using our services.</p>
              </div>
              <div className={styles.inputLabel}>
                <IoMail className={styles.icon} />
                <input className={styles.inputBox} type="email" name="Email" id="email" placeholder="Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              </div>
              <div className={styles.inputLabel}>
                <RiLockPasswordFill className={styles.icon} />
                <input className={styles.inputBox} type="password" name="Password" id="password" placeholder='Password' required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <input className={`${styles.button} ${styles.bgPrimary} ${styles.cWhite}`} type="button" value="Login" onClick={handleLogin} />
              {message && <div style={{ color: message.includes("success") ? "green" : "red", marginTop: 8 }}>{message}</div>}
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <span className={styles.link} onClick={() => { setShowSignUp(true); setMessage(""); }}>Don't have an account? <b>Sign Up</b></span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mainText}>
                <h2>Sign Up</h2>
                <p className={styles.subText}>Create your account to start using our services.</p>
              </div>
              <div className={styles.inputLabel}>
                <IoMail className={styles.icon} />
                <input className={styles.inputBox} type="email" name="signUpEmail" id="signUpEmail" placeholder="Email" required value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
              </div>
              <div className={styles.inputLabel}>
                <input className={styles.inputBox} type="text" name="signUpName" id="signUpName" placeholder="Name" required value={signUpName} onChange={e => setSignUpName(e.target.value)} />
              </div>
              <div className={styles.inputLabel}>
                <RiLockPasswordFill className={styles.icon} />
                <input className={styles.inputBox} type="password" name="signUpPassword" id="signUpPassword" placeholder='Password' required value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} />
              </div>
              <div className={styles.inputLabel}>
                <RiLockPasswordFill className={styles.icon} />
                <input className={styles.inputBox} type="password" name="signUpPasswordAgain" id="signUpPasswordAgain" placeholder='Repeat Password' required value={signUpPasswordAgain} onChange={e => setSignUpPasswordAgain(e.target.value)} />
              </div>
              <input className={`${styles.button} ${styles.bgPrimary} ${styles.cWhite}`} type="button" value="Sign Up" onClick={handleSignUp} />
              {message && <div style={{ color: message.includes("success") ? "green" : "red", marginTop: 8 }}>{message}</div>}
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <span className={styles.link} onClick={() => { setShowSignUp(false); setMessage(""); }}>Already have an account? <b>Login</b></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetStarted
