// Import dependencies
import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTiktok, FaPhoneAlt, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import "../index.css";

// Home component
const Home = () => {
    const navigate = useNavigate(); // Router hook
    const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

    // Toggle sidebar open/close
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Categories list for cards
    const categories = [
        { title: "Business Cards", image: "https://i.ibb.co/PZhTFRDx/business-Cards.jpg", path: "/business-cards" },
        { title: "Postcards & Advertising", image: "https://i.ibb.co/kgF9XxtQ/postcards.jpg", path: "/postcards" },
        { title: "Signs & Banners", image: "https://i.ibb.co/hJfL8wfb/banners.jpg", path: "/signs" },
        { title: "Clothing & Bags", image: "https://i.ibb.co/pr0Mm0TV/bags.jpg", path: "/clothing" },
        { title: "Promotional Products", image: "https://i.ibb.co/Dqs80kh/books-and-pens.jpg", path: "/promotional" },
        { title: "Home & Gifts", image: "https://i.ibb.co/ym9VxxLw/home-gifts.jpg", path: "/home-gifts" },
        { title: "Logomaker", image: "https://i.ibb.co/gLP8GvMc/logo-Maker.webp", path: "/logomaker" },
        { title: "Invitations & Wedding Cards", image: "https://i.ibb.co/gZFD36bQ/invitations.webp", path: "/invitations" },
        { title: "Labels & Stickers", image: "https://i.ibb.co/fVb9t6pq/labels.jpg", path: "/labels" }
    ];

    return (
        <div className="home-container">
            {/* Hamburger icon to toggle sidebar */}
            <div className="hamburger-menu" onClick={toggleSidebar}>
                ☰
            </div>

            {/* Sidebar navigation */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>×</button>

                {/* Info links */}
                <h3>Info</h3>
                <ul>
                    <li>
                        <a href="/contact">
                            <FaPhoneAlt className="social-icon" /> Contact Us
                        </a>
                    </li>
                    <li>
                        <a href="/about">
                            <FaInfoCircle className="social-icon" /> About Us
                        </a>
                    </li>
                    <li>
                        <a href="https://www.google.com/maps/place/INSIGHT+ARCHIGRAPHIC/..."
                            target="_blank" rel="noopener noreferrer">
                            <FaMapMarkerAlt className="social-icon" /> Location
                        </a>
                    </li>
                </ul>

                {/* Social media links */}
                <h3>Social Media</h3>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/insight.archigraphic?..." target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon insta-icon" /> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://www.tiktok.com/@insightarchigraphic?..." target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="social-icon tiktok-icon" /> TikTok
                        </a>
                    </li>
                </ul>
            </div>

            {/* Overlay to close sidebar */}
            {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            {/* Carousel / Slider */}
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img height="600" src="https://i.ibb.co/wr4zq1Tf/printing.jpg" className="d-block w-100" alt="Image1" />
                    </div>
                    <div className="carousel-item">
                        <img height="600" src="https://i.ibb.co/jvsDyHks/3d.jpg" className="d-block w-100" alt="Image2" />
                    </div>
                    <div className="carousel-item">
                        <img height="600" src="https://i.ibb.co/vCjMB7Mh/3-D-printing-768x432.jpg" className="d-block w-100" alt="Image3" />
                    </div>
                </div>
                {/* Carousel controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Category cards section (3 per row) */}
            <Container className="cards-container">
                {Array.from({ length: 3 }, (_, rowIndex) => (
                    <Row key={rowIndex} className="justify-content-center mb-4">
                        {categories.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
                            <Col key={index} md={4} className="d-flex justify-content-center">
                                <Card className="admin-card same-size-card">
                                    <Card.Img variant="top" src={item.image} alt={item.title} />
                                    <Card.Body className="d-flex flex-column align-items-center">
                                        <Button variant="primary" onClick={() => navigate(item.path)}>
                                            {item.title}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default Home;
