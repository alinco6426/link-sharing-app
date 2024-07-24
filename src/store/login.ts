import { create } from 'zustand';
import { StaticImageData } from 'next/image';

// Define types for Platform and Link
interface Platform {
  id: number;
  name: string;
  iconSrc: StaticImageData;
  color: string;
}

interface Link {
  id: number;
  name: string;
  url: string;
  color?: string;
  icon?: StaticImageData;
  isVisible?: boolean;
}

interface AuthState {
  valid: boolean;
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  response: string | null;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  checkEmail: () => void;
  checkPassword: () => void;
  validate: () => void;
  login: (router: any) => void;
  addLink: () => void;
  setPlatform: (index: number, value: string, platforms: Platform[]) => void; 
  links: Link[];
}

const useAuthStore = create<AuthState>((set, get) => ({
  valid: true,
  email: '',
  password: '',
  emailError: null,
  passwordError: null,
  response: null,
  links: [], // Initialize with an empty array

  updateEmail: (email) => {
    set({ email });
  },

  updatePassword: (password) => {
    set({ password });
  },

  checkEmail: () => {
    const email = get().email;
    let emailError = '';
    if (email === '') {
      emailError = "Can't be empty";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError = 'Wrong format';
    } else {
      emailError = '';
    }
    set({ emailError });
  },

  checkPassword: () => {
    const password = get().password;
    let passwordError = '';
    if (password === '') {
      passwordError = "Can't be empty";
    } else {
      passwordError = '';
    }
    set({ passwordError });
  },

  validate: () => {
    get().checkEmail();
    get().checkPassword();
    const { emailError, passwordError } = get();
    if (emailError === '' && passwordError === '') {
      set({ valid: true });
    } else {
      set({ valid: false });
    }
  },

  login: async (router) => {
    get().validate();
    const { valid, email, password } = get();
    if (!valid) {
      return;
    }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 404) {
        set({ emailError: data.message });
      } else if (response.status === 200) {
        set({ response: data.message });
        router.push("/");
      } else if (response.status === 403) {
        set({ passwordError: data.message });
      } else {
        set({ response: data.message });
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  },

  addLink: () => {
    const { links } = get();
    let newId = links.length === 0 ? 1 : links[links.length - 1].id + 1;

    const newLink: Link = {
      id: newId,
      name: '',
      url: '',
      color: '',
      icon: undefined,
      isVisible: false,
    };

    set({ links: [...links, newLink] });
  },

  setPlatform: (index, value, platforms) => {
    const { links } = get();
    const linkToUpdate = links.find(link => link.id === index);

    if (linkToUpdate) {
      const platformToSet = platforms.find(platform => platform.name === value);

      if (platformToSet) {
        linkToUpdate.name = platformToSet.name;
        linkToUpdate.color = platformToSet.color;
        linkToUpdate.icon = platformToSet.iconSrc;

        set({ links: [...links] }); 
      }
    }
  }
}));

export default useAuthStore;
