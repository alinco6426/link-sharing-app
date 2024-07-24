import List from "./List";
import { StaticImageData } from "next/image";

interface LinkProps {
  link: {
    id: number;
    name: string;
    url: string;
    color?: string;
    icon?: StaticImageData;
    isVisible?: boolean;
  };
}

export default function Link({ link }: LinkProps) {
  // Function to remove the link
  const removeLink = (id: number) => {
    // Implement remove functionality
    console.log(`Removing link with id ${id}`);
  };

  return (
    <div>
      <span className="link-header">
        <h3 className="link-id">link #{link.id}</h3>
        <button
           type="button"
          className="remove-button"
          onClick={() => removeLink(link.id)}
        >
          Remove
        </button>
      </span>
      <List link={link} /> {/* Passing link prop to List */}
      <label htmlFor="url-getter">
        <p>Link</p>
        <input
          type="text"
          id="url-getter"
          className="url-getter"
          value={link.url}
          placeholder="e.g. https://www.github.com/johnappleseed"
          // Add onChange handler if needed
        />
        {/* Add error handling if needed */}
      </label>
    </div>
  );
}
