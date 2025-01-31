import React from "react";
import { CiTwitter, CiInstagram, CiLinkedin } from "react-icons/ci";

function About() {
  const teamMembers = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: "/images/team/member1.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image: "/images/team/member2.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: "/images/team/member3.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Head",
      image: "/images/team/member4.jpg",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      image: "/images/team/member5.jpg",
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
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
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
          <img src="/images/about-image.jpg" alt="Shopping Experience" />
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
    </div>
  );
}

export default About;
