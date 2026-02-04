// Importing React core functionality
import React from "react";

// Importing Bootstrap layout components
import { Container, Row, Col } from "react-bootstrap";

// Importing icons from react-icons
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

// Importing global styles
import "../index.css"; // Ensure your theme styling is included

// Functional Component: Contact
// Purpose: Displays all contact details for Insight Archigraphic
const Contact = () => {
    return (
        <div className="contact-container">
            <Container className="text-center">
                {/* Company Logo */}
                <img
                    src="https://i.ibb.co/sptKQsxL/logo-insight-01-01.png"
                    alt="Insight Archigraphic"
                    className="contact-logo"
                />

                {/* Page Title */}
                <h1 className="contact-title">Contact Us</h1>

                <Row className="justify-content-center">
                    <Col md={8} className="contact-card">
                        {/* Phone */}
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>+961-70558800</span>
                        </div>

                        {/* Instagram */}
                        <div className="contact-item">
                            <a
                                href="https://www.instagram.com/insight.archigraphic?igsh=eTU4YXc0YmtjaTQ4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="contact-icon insta-icon" />
                            </a>
                            <span>@insightarchigraphic</span>
                        </div>

                        {/* Website */}
                        <div className="contact-item">
                            <FaGlobe className="contact-icon" />
                            <span>www.insightarchigraphic.com</span>
                        </div>

                        {/* Email */}
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>insight.archigraphic@gmail.com</span>
                        </div>

                        {/* Address */}
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>B1 DOHA bld. Fouad el monla, Tripoli 1300</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// Exporting the Contact component
export default Contact;
