import React from "react";
import { CiTwitter, CiInstagram, CiLinkedin } from "react-icons/ci";
import gaston from "../assets/image/gaston.jpg"
import houssem from "../assets/image/houssam.jpg"
import lilia from "../assets/image/lilia01.jpg"
import nour from "../assets/image/nour.jpg"
import anas from "../assets/image/anas.jpg"
import about from "../assets/image/aboutus.jpg"
import { MdLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";

function About() {
  const teamMembers = [
    {
      name: "Ghassen Kharrat",
      role: "product OWNER",
      image: gaston,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "houssem saad bennani",
      role: "scrum master ",
      image: houssem,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Lilia Ghezaiel",
      role: "member and frontend developer",
      image: lilia,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Nour Tebourski",
      role: "member and backend developer",
      image: nour,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "saoudi khemiri anas",
      role: "member and full stack developer",
      image: anas,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <div className="about-container">
      <section className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Launched in 2025, Exclusive is South africa's premier online shopping
            marketplace with an active presence in Tunisia. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive has
            10,500 sellers and 300 brands and serves 3 millions customers across
            the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a very
            fast. Exclusive offers a diverse assortment in categories ranging from
            consumer.
          </p>
        </div>
        <div className="story-image">
          <img src={about} alt="Shopping Experience" />
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-links">
                  <a href={member.social.twitter}>
                    <CiTwitter size={20} />
                  </a>
                  <a href={member.social.instagram}>
                    <CiInstagram size={20} />
                  </a>
                  <a href={member.social.linkedin}>
                    <CiLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="service-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <MdLocalShipping />
            </div>
            <h3>FREE AND FAST DELIVERY</h3>
            <p>Free delivery for all orders over $140</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <BiSupport />
            </div>
            <h3>24/7 CUSTOMER SERVICE</h3>
            <p>Friendly 24/7 customer support</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <RiSecurePaymentLine />
            </div>
            <h3>MONEY BACK GUARANTEE</h3>
            <p>We return money within 30 days</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
