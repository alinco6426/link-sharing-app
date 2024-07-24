/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import EmptyLinksImage from "../assets/illustration-empty.svg"


export default function EmptyLinksMessage(){
     return(
     <section className="empty-links-container">
           <Image src={EmptyLinksImage} alt="empty-links-illustration-image" />
           <h2>Let's get you started</h2>
           <p>
             Use the “Add new link” button to get started. Once you have more than one link,
             you can reorder and edit them. We're here to help you share your profiles with everyone!
           </p>
     </section>
     )
}