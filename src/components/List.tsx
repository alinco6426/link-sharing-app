import codepenIcon from "@/assets/icon-codepen.svg";
import codewarsIcon from "@/assets/icon-codewars.svg";
import devtoIcon from "@/assets/icon-devto.svg";
import emailIcon from "@/assets/icon-email.svg";
import facebookIcon from "@/assets/icon-facebook.svg";
import frontendMentorIcon from "@/assets/icon-frontend-mentor.svg";
import freecodecampIcon from "@/assets/icon-freecodecamp.svg";
import githubIcon from "@/assets/icon-github.svg";
import gitlabIcon from "@/assets/icon-gitlab.svg";
import hashnodeIcon from "@/assets/icon-hashnode.svg";
import linkedinIcon from "@/assets/icon-linkedin.svg";
import stackOverflowIcon from "@/assets/icon-stack-overflow.svg";
import twitchIcon from "@/assets/icon-twitch.svg";
import twitterIcon from "@/assets/icon-twitter.svg";
import youtubeIcon from "@/assets/icon-youtube.svg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { platform } from "os";

interface Platform {
  id: number;
  name: string;
  iconSrc: StaticImageData;
  color: string;
}

const platforms: Platform[] = [
  {
    id: 1,
    name: "codepen",
    iconSrc: codepenIcon,
    color: "hsl(204, 86%, 53%)"
  },
  {
    id: 2,
    name: "codewars",
    iconSrc: codewarsIcon,
    color: "rgba(138, 26, 80, 1)"
  },
  {
    id: 3,
    name: "devto",
    iconSrc: devtoIcon,
    color: "rgba(51, 51, 51, 1)"
  },
  {
    id: 4,
    name: "email",
    iconSrc: emailIcon,
    color: "hsl(240, 50%, 50%)"
  },
  {
    id: 5,
    name: "facebook",
    iconSrc: facebookIcon,
    color: "rgba(36, 66, 172, 1)"
  },
  {
    id: 6,
    name: "frontend-mentor",
    iconSrc: frontendMentorIcon,
    color: "rgba(255, 255, 255, 1)"
  },
  {
    id: 7,
    name: "freecodecamp",
    iconSrc: freecodecampIcon,
    color: "rgba(48, 34, 103, 1)"
  },
  {
    id: 8,
    name: "github",
    iconSrc: githubIcon,
    color: "rgba(26, 26, 26, 1)"
  },
  {
    id: 9,
    name: "gitlab",
    iconSrc: gitlabIcon,
    color: "rgba(235, 73, 37, 1)"
  },
  {
    id: 10,
    name: "hashnode",
    iconSrc: hashnodeIcon,
    color: "rgba(3, 48, 209, 1)"
  },
  {
    id: 11,
    name: "linkedin",
    iconSrc: linkedinIcon,
    color: "rgba(45, 104, 255, 1)"
  },
  {
    id: 12,
    name: "stack-overflow",
    iconSrc: stackOverflowIcon,
    color: "rgba(236, 113, 0, 1)"
  },
  {
    id: 13,
    name: "twitch",
    iconSrc: twitchIcon,
    color: "rgba(238, 63, 200, 1)"
  },
  {
    id: 14,
    name: "twitter",
    iconSrc: twitterIcon,
    color: "rgba(67, 183, 233, 1)"
  },
  {
    id: 15,
    name: "youtube",
    iconSrc: youtubeIcon,
    color: "rgba(238, 57, 57, 1)"
  }
];

interface LinkProps {
  link: {
    id: number;
    name: string;
    url: string;
    color?: string;
    icon?: StaticImageData;
  };
}

export default function List({ link }: LinkProps) {
  const [platformName, setPlatformName] = useState(platforms[0].name);
  const [platformIcon, setPlatformIcon] = useState(platforms[0].iconSrc);

  const [display , setDisplay] = useState(false)

  const handlePlatformClick = (platform: Platform) => {
    setDisplay(!display)
    setPlatformName(platform.name);
    setPlatformIcon(platform.iconSrc);
  };

  return (
    <div className="list-container">
      <p>Platform</p>
      <button type="button" className="platform-getter" onClick={() => setDisplay(!display)}>
        <Image src={link.icon ? link.icon : platformIcon} alt="platform-icon" />
        <p>{link.name ? link.name : platformName}</p>
      </button>
       {display ? (<section className="platform-setter-container">
        {platforms.map((platform) => (
          <button type="button" value={platform.name} key={platform.id} className="platform-setter" onClick={() => handlePlatformClick(platform)}>
            <Image src={platform.iconSrc} alt="platform-icon" />
            <p>{platform.name}</p>
          </button>
        ))}
      </section>)
       : "" }
    </div>
  );
}
