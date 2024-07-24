/* eslint-disable react/no-unescaped-entities */
"use client"
import useAuthStore from "@/store/login";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo-devlinks-large.svg";
import "../../styles/login.css"
import "../../styles/main.css"
import { useRouter } from "next/navigation";

export default function Login() {
  const { email, password, updateEmail, updatePassword, emailError, passwordError  , login} = useAuthStore();
  const router = useRouter()
  return (
    <main className="login">
      <div className="logo-container">
        <Image src={logo} alt="logo-image" />
      </div>

      <form method="POST">
        <h1>Login</h1>
        <p className="heading-message">Add your details to get back into the app</p>

        <label htmlFor="user-email-getter">
          <p>Email address</p>
          <input
            onChange={(e) => updateEmail(e.target.value)}
            value={email}
            type="email"
            id="user-email-getter"
            className="user-email-getter"
            placeholder="e.g user@example.com"
            autoComplete="on"
          />
          {emailError ? <small>{emailError}</small> : null}
        </label>

        <label htmlFor="password-getter">
          <p>Password</p>
          <input
            onChange={(e) => updatePassword(e.target.value)}
            value={password}
            type="password"
            id="password-getter"
            className="password-getter"
            placeholder="Enter your password"
            autoComplete="off"
          />
          {passwordError ? <small>{passwordError}</small> : null}
        </label>

        <button type="button" className="create-account-button" onClick={() => login(router)}>Login</button>
        <div className="user-action">
          <p>
            Don't have an account? <Link href="/signup" className="link">Create account</Link>
          </p>
        </div>
      </form>
    </main>
  );
}
