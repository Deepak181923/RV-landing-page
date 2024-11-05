import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Input, Select, Button, Typography, Image, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { AppContext } from "../context/Appcontext";
import { PhoneNumberUtil, PhoneNumberType } from "google-libphonenumber";
import { validateLandlinePhoneNumber, validatePhoneNumber } from "../common/PhoneNumberValidation";
import { getGdprUserDetails, updateUserRegistered, createAgent, createUser } from "../common/API";
import CountryData from "../countries.json";
import "./Register.scss";

export const Register = () => {

    const { setRegisterForm } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([]);
    const [mobileerror, setMobileError] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [username, setUsername] = useState('');

    const [form] = useForm();
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const { Title } = Typography;

    useEffect(() => {
        getCountryDropdown();
    }, []);

    const getCountryDropdown = () => {
        const countryList = CountryData?.data.map((data) => data);
        setCountry(countryList);
    };

    const handleChangeCountry = (value) => {
        setCountryCode(value.split(' ')[0]);
    };

    message.config({
        duration: 8,
    });

    const checkTheLandlineAndPhoneNumber = (PhoneNumber) => {
        const validationData = PhoneNumber && countryCode ? `${countryCode}${PhoneNumber}` : "";
        if (validationData.length < 6) {
            setMobileError(true);
            return;
        }
        try {
            const parsedNumber = phoneNumberUtil.parse(validationData);
            const isoCode = parsedNumber ? phoneNumberUtil.getRegionCodeForNumber(parsedNumber) : "";

            if (isoCode) {
                if (validateLandlinePhoneNumber(validationData, isoCode, phoneNumberUtil, PhoneNumberType) ||
                    validatePhoneNumber(validationData, isoCode, phoneNumberUtil)) {
                    setMobileError(false);
                } else {
                    setMobileError(true);
                }
            } else {
                setMobileError(true);
            }
        } catch (error) {
            setMobileError(true);
            console.error("Error parsing phone number:", error);
        }
    };

    const handleUserDetails = async () => {
        try {
            const { data } = await getGdprUserDetails(username);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        const { firstName, lastName, email, Phone, city, country } = values;
        setLoading(true);
        try {
            const user = await handleUserDetails();

            if (user.data && user?.data?.migratedUser && !user?.data?.isActive) {

                const postData = {
                    id: user?.data?.id,
                    isMigratedUserRegistered: true,
                };
                await updateUserRegistered(postData);
                message.info("We are verifying your details and will activate your account soon. Confirmation will be sent to your email.");
                setLoading(false);
                return;
            }
            const postDataValue = {
                fullName: firstName + " " + lastName,
                firstEmail: email,
                firstPhone: countryCode + Phone,
                originalSource: "LANDING_PAGE",
                iysCity: city,
                iysCountry: country?.split(' ')[1],
                fromWebsite: true
            };

            const agentCall = await createAgent(postDataValue);
            const agentStatus = agentCall.data.status;
            if (agentStatus === "Success") {
                const { data } = agentCall.data;
                const postData = {
                    agentId: data.identifiers[0]?.id,
                    name: firstName + " " + lastName,
                    firstName: firstName,
                    lastName: lastName,
                    phone: countryCode + Phone,
                    email: email,
                    country: country?.split(' ')[1],
                    source: "LANDING_PAGE_BL",
                    city: city
                };

                const userCall = await createUser(postData);
                const { status, message: userCallMessage } = userCall.data;
                if (status === "Waring") {
                    message.info(userCallMessage);
                    setLoading(false);
                    return;
                } else {
                    message.info("Your account has been created successfully. Check your email for more details.");
                }
            } else {
                if (agentStatus === "Indicate") {
                    const messageContent = (
                        <>Already you have access to agent portal please login with this email <span className="entrollment-form-email">{agentCall?.data?.message}</span></>
                    );
                    message.info(messageContent);
                    setLoading(false);
                }
            }

        } catch (error) {
            console.error("Registration Error :", error);
        } finally {
            setLoading(false);
            setRegisterForm(false);
        }
    };

    return (<>
        <Col className="Register-section">
            <Col className="img-div">
                <Image width={100} alt="logo" src="../logoWithName.png" preview={false} />
            </Col>
            <p className="title-card">
                <> <Title className="title-contents" level={3}>Create your Realtyverse account</Title></>
                <hr className="hrline" />
            </p>
            <Row justify={"center"}>
                <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 23 }} lg={{ span: 23 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                    <Form
                        form={form}
                        name="registration"
                        requiredMark={false}
                        onFinish={onFinish}
                        layout="vertical"
                        className="form-group"
                    >
                        <Row justify={"center"}>
                            <Col span={24}>
                                <Form.Item
                                    name="firstName"
                                    requiredMark={false}
                                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                                >
                                    <Input placeholder="* First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="lastName"
                                    requiredMark={false}
                                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                                >
                                    <Input placeholder="* Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col span={24}>
                                <Form.Item
                                    name="email"
                                    requiredMark={false}
                                    rules={[
                                        { required: true, message: 'Please enter your email!' },
                                        { type: 'email', message: 'Please enter a valid email address!' },
                                    ]}
                                >
                                    <Input placeholder="* Email" onChange={(e) => setUsername(e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"between"}>
                            <Col span={24}>
                                <Form.Item
                                    name="country"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Select country!',
                                        },
                                    ]}
                                >
                                    <Select options={country?.map((countryList) => ({
                                        value: `${countryList.dial_code} ${countryList.country_name.toLowerCase()}`,
                                        label: countryList.country_name
                                    }))}
                                        placeholder="* Select a country"
                                        style={{ fontSize: '16px' }}
                                        onChange={handleChangeCountry}
                                        showSearch />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="city"
                                    requiredMark={false}
                                    rules={[{ required: true, message: 'Please enter your city!' }]}
                                >
                                    <Input placeholder="* City" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"between"}>
                            <Col span={24}>
                                <Form.Item name="Phone" requiredMark={false}
                                    rules={[{
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Please enter your phone number!");
                                            }
                                            else if (mobileerror) {
                                                return Promise.reject("Please enter a valid phone number!");
                                            } else {
                                                return Promise.resolve();
                                            }
                                        }
                                    }]}
                                >
                                    <Input placeholder="* Phone Number" addonBefore={countryCode ? countryCode : <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-telephone-plus" viewBox="0 0 16 16">
                                        <path fill="#08428D" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        <path fillRule="evenodd" fill="#08428D" d="M12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></>} onChange={(e) => checkTheLandlineAndPhoneNumber(e.target.value)} />

                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={24}>
                            <Form.Item className="ant-form">
                                <div className="btn-div">
                                    <Button loading={loading} disabled={loading} className="register-btn" type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Col>
    </>)
}