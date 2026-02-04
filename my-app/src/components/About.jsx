// Importing React core functionality
import React from "react";

// Importing React-Bootstrap components for responsive layout and images
import { Container, Row, Col, Image } from "react-bootstrap";

// Importing global styles from index.css to apply consistent theming
import "../index.css"; // Keep your theme styles

// Functional Component: About
// Purpose: Displays an informative "About" section for Insight Archigraphic,
//          including the company's Brief, Mission, Vision, and About Us sections,
//          along with supporting images and layout styling.
const About = () => {
    return (
        <div className="about-container">
            {/* Page Title */}
            <h1 className="about-title">About Insight Archigraphic</h1>

            <Container>
                {/* BRIEF Section */}
                <Row className="about-section">
                    {/* Text content for the Brief section */}
                    <Col md={6} className="text-section">
                        <h2>Brief</h2>
                        <p>
                            Welcome to INSIGHT ARCHIGRAPHIC, your one-stop solution for all your signage needs.
                            With a passion for creativity and a commitment to quality, we specialize in designing, producing,
                            and installing eye-catching signs that make your business stand out. Explore our portfolio to
                            see how we can help elevate your brand and drive success.
                        </p>
                    </Col>

                    {/* Image representing the Brief section */}
                    <Col md={6} className="image-section">
                        <Image src="https://i.ibb.co/SDwCGkhb/3d-printing-production.jpg" fluid alt="Brief Image" />
                    </Col>
                </Row>

                {/* MISSION Section */}
                <Row className="about-section flex-row-reverse">
                    {/* Text content for the Mission section */}
                    <Col md={6} className="text-section">
                        <h2>Mission</h2>
                        <p>
                            At INSIGHT ARCHIGRAPHIC, our purpose is to bring your brand to life through creative and
                            top-quality signage solutions. We are committed to producing visually compelling and effective
                            signs that enhance your business, convey your message, and encapsulate the essence of your brand.
                        </p>
                    </Col>

                    {/* Image representing the Mission section */}
                    <Col md={6} className="image-section">
                        <Image src="https://i.ibb.co/vCjMB7Mh/3-D-printing-768x432.jpg" fluid alt="Mission Image" />
                    </Col>
                </Row>

                {/* VISION Section */}
                <Row className="about-section">
                    {/* Text content for the Vision section */}
                    <Col md={6} className="text-section">
                        <h2>Vision</h2>
                        <p>
                            Our vision is to become the foremost provider of cutting-edge and influential signage solutions.
                            We strive to redefine creativity, quality, and customer satisfaction, empowering brands to leave
                            a lasting impact and inspiring businesses to thrive.
                        </p>
                    </Col>

                    {/* Image representing the Vision section */}
                    <Col md={6} className="image-section">
                        <Image src="https://i.ibb.co/jvsDyHks/3d.jpg" fluid alt="Vision Image" />
                    </Col>
                </Row>

                {/* ABOUT US Section */}
                <Row className="about-section flex-row-reverse">
                    {/* Text content for the About Us section */}
                    <Col md={6} className="text-section">
                        <h2>About Us</h2>
                        <p>
                            Established with a passion for transforming spaces through visually stunning signage, we help
                            businesses communicate their brand message effectively. Our skilled designers and artisans bring
                            years of expertise, ensuring high-quality and innovative solutions tailored to your needs.
                        </p>
                    </Col>

                    {/* Image representing the About Us section */}
                    <Col md={6} className="image-section">
                        <Image src="https://i.ibb.co/s9DYSX5M/print.jpg" fluid alt="About Us Image" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// Exporting the About component as default for use in routing or rendering elsewhere
export default About;
