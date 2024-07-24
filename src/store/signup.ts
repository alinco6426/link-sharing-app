import { create } from "zustand";

interface AuthState {
  valid: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updateConfirmPassword: (confirmPassword: string) => void;
  checkEmail: () => void;
  checkPassword: () => void;
  checkConfirmPassword: () => void;
  validate: () => void;
  signUp: (router: any) => void;
  response: string;
}

const useAuthStore = create<AuthState>((set, get) => ({
  valid: true,
  email: "",
  password: "",
  confirmPassword: "",
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
  response: "",

  updateEmail: (email) => {
    set({ email });
  },

  updatePassword: (password) => {
    set({ password });
  },

  updateConfirmPassword: (confirmPassword) => {
    set({ confirmPassword });
  },

  checkEmail: () => {
    const email = get().email;
    let emailError = "";
    if (email === "") {
      emailError = "Can't be empty";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError = "Wrong format";
    } else {
      emailError = "";
    }
    set({ emailError });
  },

  checkPassword: () => {
    const password = get().password;
    let passwordError = "";
    if (password === "") {
      passwordError = "Can't be empty";
    } else if (password.length < 8) {
      passwordError = "Password must be at least 8 characters";
    } else {
      passwordError = "";
    }
    set({ passwordError });
  },

  checkConfirmPassword: () => {
    const confirmPassword = get().confirmPassword;
    const password = get().password;
    let confirmPasswordError = "";
    if (confirmPassword === "") {
      confirmPasswordError = "Can't be empty";
    } else if (confirmPassword !== password) {
      confirmPasswordError = "Passwords do not match";
    } else {
      confirmPasswordError = "";
    }
    set({ confirmPasswordError });
  },

  validate: () => {
    get().checkEmail();
    get().checkPassword();
    get().checkConfirmPassword();
    const { emailError, passwordError, confirmPasswordError } = get();
    if (!emailError && !passwordError && !confirmPasswordError) {
      set({ valid: true });
    } else {
      set({ valid: false });
    }
  },

  signUp: async (router) => {
    get().validate();
    const { valid, email, password } = get();
    if (!valid) {
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 403) {
        set({ emailError: data.message });
      } else if (response.status === 200) {
        set({ response: data.message });
        router.push("/login"); 
      } else {
        set({ response: data.message });
        console.log(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
