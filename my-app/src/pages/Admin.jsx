// Importing necessary components from react-bootstrap for UI design
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// Importing useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";
// Importing the main CSS file for custom styling
import "../index.css";

// Admin Component
// This component represents the Admin dashboard where different admin options are displayed in cards.

const Admin = () => {
    const navigate = useNavigate();  // Hook for navigation to different routes

    // Array of admin options with titles, image URLs, and corresponding paths for navigation
    const adminOptions = [
        { title: "Manage Employees", image: "https://i.ibb.co/qMFJXmXb/Lystloc4.webp", path: "/employees" },
        { title: "Manage Users", image: "https://i.ibb.co/Pvf34CKy/user-management-features.webp", path: "/users" },
        { title: "Manage Products", image: "https://i.ibb.co/TxgtkkJp/Stages-in-Product-Management-Process.webp", path: "/products" },
        { title: "Manage Stock", image: "https://i.ibb.co/7d5PFwt9/shutterstock-2232272531.webp", path: "/stock" },
        { title: "Manage Shop Info", image: "https://i.ibb.co/PZjYPTQQ/istockphoto-1273309272-612x612.jpg", path: "/shop-info" }
    ];

    return (
        <div className="admin-container">
            {/* Logo at the top */}
            <div className="logo-container">
                <img src="https://i.ibb.co/sptKQsxL/logo-insight-01-01.png" alt="Logo" className="logo" />
            </div>

            {/* First Container (Row 1 - 3 Cards) */}
            <Container className="cards-container mb-4">
                <Row className="justify-content-center">
                    {adminOptions.slice(0, 3).map((item, index) => (
                        <Col key={index} md={4} className="d-flex justify-content-center">
                            <Card className="admin-card same-size-card">
                                <Card.Img variant="top" src={item.image} alt={item.title} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Button variant="primary" onClick={() => navigate(item.path)}>
                                        Manage
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Second Container (Row 2 - 2 Cards) */}
            <Container className="cards-container">
                <Row className="justify-content-center">
                    {adminOptions.slice(3, 5).map((item, index) => (
                        <Col key={index} md={4} className="d-flex justify-content-center">
                            <Card className="admin-card same-size-card">
                                <Card.Img variant="top" src={item.image} alt={item.title} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Button variant="primary" onClick={() => navigate(item.path)}>
                                        Manage
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

// Exporting the Admin component to be used in other parts of the application
export default Admin;
