import Link from 'next/link';
import Image from 'next/image';
// import { useMediaQuery } from 'react-responsive';
import logoSmall from '../assets/logo-devlinks-small.svg';
import logoLarge from '../assets/logo-devlinks-large.svg';
import iconLink from '../assets/icon-link.svg';
import iconProfile from '../assets/icon-profile-details-header.svg';
import iconPreview from '../assets/icon-preview-header.svg';
import "../styles/navbar.css"

export default function Navbar() {
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <nav>
      <div className="logo-container">
        {/* {isMobile ? ( */}
          <Image src={logoSmall} alt="devlinks-logo" />
        {/* ) : ( */}
          {/* <Image src={logoLarge} alt="devlinks-logo" /> */}
        {/* )} */}
      </div>

      <div className="nav-links-container">
        <Link href="/" className="nav-link active">
            <Image src={iconLink} alt="icon-link" />
            <p>Links</p>
        </Link>

        <Link href="/profile" className="nav-link">
            <Image src={iconProfile} alt="icon-profile-details-header" />
            <p>Profile Details</p>
        </Link>
      </div>

      <div className="preview-button-container">
        <Link href="/preview" className="preview-button">
            <Image src={iconPreview} alt="icon-preview-header" />
            <p>Preview</p>
        </Link>
      </div>
    </nav>
  );
}
