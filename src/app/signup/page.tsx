/* eslint-disable react/no-unescaped-entities */
"use client"
import useAuthStore from "@/store/signup";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo-devlinks-large.svg";
import "../../styles/signup.css";
import "../../styles/main.css";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { email, password, confirmPassword, updateEmail, updatePassword, updateConfirmPassword, emailError, passwordError, confirmPasswordError, signUp } = useAuthStore();
  const router = useRouter();

  return (
    <main className="sign-up">
      <div className="logo-container">
        <Image src={logo} alt="logo-image" />
      </div>

      <form>
        <h1>Create account</h1>
        <p className="heading-message">Let's get you started sharing your links</p>

        <label htmlFor="user-email-getter">
          <p>Email address</p>
          <input onChange={(e) => updateEmail(e.target.value)} value={email} type="email" id="user-email-getter" className="user-email-getter" placeholder="e.g user@example.com" />
          <small>{emailError}</small>
        </label>

        <label htmlFor="password-getter">
          <p>Create password</p>
          <input onChange={(e) => updatePassword(e.target.value)} value={password} type="password" id="password-getter" className="password-getter" placeholder="At least 8 characters" />
          <small>{passwordError}</small>
        </label>

        <label htmlFor="confirm-password-getter">
          <p>Confirm password</p>
          <input onChange={(e) => updateConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirm-password-getter" className="password-getter" placeholder="At least 8 characters" />
          <small>{confirmPasswordError}</small>
        </label>

        <p>Password must be at least 8 characters</p>

        <button type="button" className="create-account-button" onClick={() => signUp(router)}>Create new account</button>

        <div className="user-action">
          <p>Already have an account?<Link href="/login" className="link">Login</Link></p>
        </div>
      </form>
    </main>
  );
}
