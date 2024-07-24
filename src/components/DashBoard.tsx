"use client";
import imageMockup from "../assets/illustration-phone-mockup.svg";
import Image from "next/image";
import EmptyLinksMessage from "@/components/EmptyLinksMessage";
import "../styles/dashboard.css";
import useAuthStore from "@/store/login";
import Link from "./Link";

export default function DashBoard() {
  const { links , addLink } = useAuthStore();

  return (
    <section className="dash-board">
      <div className="illustration-container">
        <div className="preview-link-container"></div>
        <Image src={imageMockup} alt="mockup" className="mockup-image" />
      </div>

      <div className="main-displayer">
        <h1 className="heading">Customize your links</h1>
        <p className="heading-message">
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
        <button className="add-new-link-button" type="button" onClick={() => addLink()}>+ Add new link</button>

        {links.length > 0 ? (
          <div>
            {links.map(link => (
              <Link key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <EmptyLinksMessage />
        )}

        <div className="save-button-container">
          <button type="button" className="save-button">Save</button>
        </div>
      </div>
    </section>
  );
}
