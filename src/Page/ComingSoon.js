import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import { Button, Modal } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Register } from "./Register";
import KeyFeatures from "../components/KeyFeatures";
import WhyRealtyverse from "../Page/WhyRealtyverse"
import logoImg from '../logo.png'
import "../components/style.scss";
import "./Register.scss";


const Comingsoon = () => {

    const { registerform, setRegisterForm } = useContext(AppContext);
    const targetDate = new Date('2024-11-01');

    // State to store remaining days
    const [firstDigit, setfirstDigit] = useState(0);
    const [secondDigit, setSecondDigit] = useState(0);

    useEffect(() => {
        // Function to calculate the difference in days
        const calculateDaysRemaining = () => {
            const currentDate = new Date();
            const timeDiff = targetDate.getTime() - currentDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
            const numberString = daysDiff.toString();
            const firstDigit = numberString.charAt(0); // '2'
            setfirstDigit(firstDigit);
            const secondDigit = numberString.charAt(1); // '6'
            setSecondDigit(secondDigit);
        };

        // Call the function initially
        calculateDaysRemaining();

        // Update the countdown every day (optional)
        const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60 * 24); // Update every 24 hours

        // Clear the interval when component unmounts
        return () => clearInterval(interval);
    }, [targetDate]);



    return (
        <>

            <div className="bannerSection">
                <div className="row">
                    <div className="col-5" style={{ backgroundColor: "#ffffff" }}>
                        <div className="banner-content">
                            <div>
                                <img src={logoImg} className="logo-img" />
                            </div>
                            <h2 className=" comingSoon">COMING SOON</h2>
                            <h3 className="headingBanner" style={{ color: "#1E2430" }}>The Future of <span className="boldHeading">Real Estate</span> is Coming – <span className="boldHeading">November 1, 2024</span></h3>
                            <p className="margin-subheading">Experience Real Estate Like Never Before with VR, AI, and Real-Time Tools</p>
                            <div>
                                <input className="border-opacity-10 border border-1 p-3 rounded inputMargin" type="text" placeholder="Enter your email" />
                                <button className="btnsignUp"><span>SIGN UP</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="banner-image">
                            <img className="coming-soon-img" src='/assets/images/architecture.png' />
                        </div>
                    </div>
                </div>
            </div>


            <div className="coming-soon-content">
                <Container>
                    <div style={{ marginTop: "50px" }}>
                        <div>
                            <p className="text-center sub-heading">Experience Real Estate Like Never Before with VR, AI, and Real-Time Tools</p>
                        </div>
                        <div className="xtraMargin">
                            <p>
                                Get ready to transform the way you explore, market, and sell properties. The REALTYVERSE Mobile App launches on November 1, 2024, bringing the most advanced real estate technologies directly to your fingertips. Whether you're a broker, developer, or investor, our app empowers you with cutting-edge tools designed to streamline your workflow, enhance client presentations, and immerse buyers in the future of real estate.
                            </p>
                        </div>
                        <div className="countdown">
                            <div className="countdown-container" >
                                <div className="row">
                                    <div className="col-8 d-flex flex-column justify-content-center align-items-center ">
                                        <div style={{ height: "20vh" }} className="d-flex flex-column justify-content-center align-items-center">
                                            <h3 style={{ color: "#F2F5F7", fontWeight: "400", marginBottom: "-5px" }}>Countdown to Launch</h3>
                                            <p style={{ color: "#F2F5F7", fontWeight: "300", fontSize: "21px" }}>Until the future of real estate arrives!</p>
                                        </div>
                                    </div>
                                    <div className="col col-lg-2" >
                                        <div className="d-flex flex-column justify-content-center" style={{ height: "20vh" }}>
                                            <p style={{ color: "#F2F5F7", fontWeight: "400", fontSize: "75px", opacity: ".33", margin: "0 -34px" }}>08</p>
                                            <p style={{ color: "#F2F5F7", fontWeight: "400", fontSize: "75px", margin: "-46px -34px" }}>07</p>
                                            <p style={{ color: "#F2F5F7", fontWeight: "400", fontSize: "75px", opacity: ".33", margin: "0 -34px" }}>06</p>
                                        </div>
                                    </div>
                                    <div className="col col-lg-2 d-flex flex-column justify-content-center align-items-start">
                                        <p style={{ color: "#F2F5F7", fontWeight: "400", margin: "0 -34px" }}>DAYS</p>
                                        <p style={{ color: "#F2F5F7", fontWeight: "400", margin: "0 -34px" }}>TO GO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <WhyRealtyverse />
                    </div>
                    <div>
                        <KeyFeatures />
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <h3 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '0' }}>Be the First to Experience It</h3>
                                <p style={{ textAlign: 'center' }}>
                                    Don’t miss out on the revolution! Sign up below to get early access to the REALTYVERSE Mobile App and be the first to take your real estate game to the next level.
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: "wrap", marginTop: '15px', alignItems: 'end' }}>
                                    <h4>Launch Date:<b> November 01, 2024</b></h4>
                                    <Button onClick={() => setRegisterForm(true)}>Sign Up Now</Button>
                                    {registerform && <Modal className="Model-div"
                                        open={registerform}
                                        onCancel={() => setRegisterForm(false)}
                                        footer={false}
                                    >
                                        <Register />
                                    </Modal>}
                                </div>
                            </Col>
                        </Row>
                    </div>


                </Container>
                <div style={{
                    marginTop: "50px", background: '#1E2430',
                    padding: '20px 0'
                }}>
                    <Row style={{ justifyContent: 'center', margin: '0' }}>
                        <Col>
                            <h3 style={{ textAlign: 'center', color: "#f2f5f7", textTransform: 'uppercase' }}>Countdown to Launch</h3>
                            <p style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#f2f5f7" }}><strong className="firstDigit">{0}</strong>
                                <strong style={{ marginLeft: "8px" }} className="firstDigit">{firstDigit} </strong>
                                <b style={{
                                    fontSize: '40px',
                                    margin: '0 8px',
                                    // color:"#08428d"
                                }} >Days </b> </p>
                            <p style={{ color: "#f2f5f7", textAlign: 'center', marginTop: '5px' }}><i>Until the future of real estate arrives!</i></p>
                        </Col>
                    </Row>
                </div>
                <Container>
                    <div style={{
                        padding: '20px 0'
                    }}>
                        <p style={{ color: "#1E2430", marginBottom: '10px' }}>Join the revolution. REALTYVERSE is about to change how you see, experience, and market properties.</p>
                        <div>
                            <Button onClick={() => setRegisterForm(true)}>Sign Up Now</Button>
                            <Link style={{ marginLeft: '20px', textDecoration: 'none', color: "#1E2430", fontWeight: '700' }}>Follow Us On</Link>
                            <Link style={{ marginLeft: '10px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </Link>
                            <Link style={{ marginLeft: '10px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Comingsoon;