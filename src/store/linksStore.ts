import { create } from "zustand";

// Define the Link interface
interface Link {
  id: number;
  name: string;
  url: string;
  color?: string; // Optional property
  icon?: string; // Optional property
  isVisible?: boolean; // Optional property
}

// Define the store's state and actions
interface LinksStore {
  links: Link[];
  setLinks: (links: Link[]) => void;
}

// Create the Zustand store
const useLinksStore = create<LinksStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links })
}));

export default useLinksStore;
