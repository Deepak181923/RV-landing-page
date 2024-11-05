import React from "react"
import {  Row, Col, Card, Carousel } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const KeyFeatures = () => {
    const texts = [
        "Agent App",
        "Agent Pro App",
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [animate, setAnimate] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setAnimate(true); // Trigger animation
        }, 1000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const settings1 = {
        dots: false,
        infinite: false,
        arrows: false,
        autoplay: false,
        loop: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    loop: false
                }
            }
        ]
    };

    return (
        <>
            <div className="assurance-section">
                <div className="transform" style={{ marginTop: '20px' }}>
                    <Row>
                        <Col data-aos="fade-up"
                            style={{ overflow: 'hidden' }}
                            data-aos-duration="1000">
                            <div className="transform-content">
                                <div>
                                    <h3 style={{ textAlign: 'center', fontSize: "30px", marginBottom: "0px", textTransform: "capitalize" }}>Key Features :</h3>
                                    <Carousel>
                                        <Carousel.Item>
                                            <Row className="accelerate-box">
                                                <Col xs={12} md={6} lg={3}>
                                                    <div className='flip-card'>
                                                        <Card className="flip-card-inner" >
                                                            <img src='/assets/images/1.png' className='img-fluid' alt="marketing tool"/>
                                                            <Card.Body className="text-center flip-card-front">
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <h5 style={{ margin: "0" }}>AI-Powered</h5>
                                                                    <h5>Marketing Tools</h5>
                                                                </div>
                                                            </Card.Body>
                                                            <div className='flip-card-back'>
                                                                <h4 style={{ color: "#fff", padding: "0  20px" }}>
                                                                    Effortlessly create customized, data-driven marketing materials in seconds.
                                                                </h4>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6} lg={3}>
                                                    <div className='flip-card'>
                                                        <Card className="flip-card-inner" >
                                                            <img src='/assets/images/2.png' className='img-fluid' alt="VR property tour" />
                                                            <Card.Body className="text-center flip-card-front">
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <h5 style={{ margin: "0" }}>Immersive VR</h5>
                                                                    <h5>Property Tours</h5>
                                                                </div>
                                                            </Card.Body>
                                                            <div className='flip-card-back'>
                                                                <h4 style={{ color: "#fff", padding: "0  20px" }}>
                                                                    Offer clients a true-to-life, virtual experience of off-plan projects—anytime, anywhere.
                                                                </h4>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6} lg={3}>
                                                    <div className='flip-card'>
                                                        <Card className="flip-card-inner" >
                                                            <img src='/assets/images/3.png' className='img-fluid' alt="CGI visual" />
                                                            <Card.Body className="text-center flip-card-front">
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <h5 style={{ margin: "0" }}>360-Degree</h5>
                                                                    <h5>CGI Visuals</h5>
                                                                </div>
                                                            </Card.Body>
                                                            <div className='flip-card-back'>
                                                                <h4 style={{ color: "#fff", padding: "0  20px" }}>
                                                                Explore properties through interactive 360-degree videos available on web, mobile, and VR headsets. Navigate using touch on the web, gyro controls on mobile, and enjoy a fully immersive experience with VR headsets.
                                                                </h4>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6} lg={3}>
                                                    <div className='flip-card'>
                                                        <Card className="flip-card-inner" >
                                                            <img src='/assets/images/4.png' className='img-fluid' alt="VR image"/>
                                                            <Card.Body className="text-center flip-card-front">
                                                                <div style={{ marginBottom: "10px" }}>
                                                                    <h5 style={{ margin: "0" }}>Real-Time</h5>
                                                                    <h5>Property Data</h5>
                                                                </div>
                                                            </Card.Body>
                                                            <div className='flip-card-back'>
                                                                <h4 style={{ color: "#fff", padding: "0  20px" }}>
                                                                    Stay ahead with live updates on the latest project availability, pricing, and trends.
                                                                </h4>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default KeyFeatures;

