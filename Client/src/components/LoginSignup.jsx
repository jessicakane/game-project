import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import '../css/LoginSignup.css';

const LoginSignup = () => {
    const [loginFormHolder, setLoginFormHolder] = useState({
        email: '',
        password: ''
    });
    const [signupFormHolder, setSignupFormHolder] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: ''
    });
    const [loginOrSignup, setLoginOrSignup] = useState(false);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    const handleLoginFields = (e) => {
        const { name, value } = e.target;
        setLoginFormHolder({ ...loginFormHolder, [name]: value });
    };
    const handleSignupFields = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: null })
        setSignupFormHolder({ ...signupFormHolder, [name]: value });
    };

    const validateLocally = () => {
        const newErrors = {};

        const emailValid = /\S+@\S+\.\S+/.test(signupFormHolder.email);
        if (emailValid) {
            newErrors.email = null;
        } else {
            newErrors.email = "Invalid email";
        }

        const userNameValid = /^[a-zA-Z]{4,}$/.test(signupFormHolder.username);
        if (userNameValid) {
            newErrors.username = null;
        } else {
            newErrors.username = "Must contain at least 4 characters";
        }

        const passwordValid = /^[a-zA-Z]{4,}$/.test(signupFormHolder.password);
        if (passwordValid) {
            newErrors.password = null;
        } else {
            newErrors.password = "Password must contain at least 4 characters";
        }

        const rePasswordValid = signupFormHolder.rePassword === signupFormHolder.password;
        if (rePasswordValid) {
            newErrors.rePassword = null;
        } else {
            newErrors.rePassword = "Must match the password";
        }

        setErrors(newErrors);
    }

    const handleLoginButton = async (e) => {
        // try {
        //     const res = await axios.post('http://localhost:8080/login', { email: loginFormHolder.email, password: loginFormHolder.password });
        //     setToken(res.data.token);
        //     localStorage.setItem('token', res.data.token);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const handleSignupButton = async (e) => {
        e.preventDefault();
        console.log('Hi');
        //validateLocally();

        //setLoginOrSignup(false);
        // const newUser = {
        //     first_name: signupFormHolder.first_name,
        //     last_name: signupFormHolder.last_name,
        //     email: signupFormHolder.email,
        //     phone_number: signupFormHolder.phone_number,
        //     password: signupFormHolder.password,
        //     rePassword: signupFormHolder.rePassword
        // }

        // try {
        //     const res = await axios.post('http://localhost:8080/signup', newUser);
        //     if (res.data.ok) {
        //         setSignupFormHolder({
        //             first_name: '',
        //             last_name: '',
        //             email: '',
        //             phone_number: '',
        //             password: '',
        //             rePassword: ''
        //         });
        //     }
        // } catch (err) {
        //     setShowError(true);
        //     console.log(err);
        // }
    };

    return (
        <div className="login-signup">
            <div className="top-login-signup">
                <h1>Let's play</h1>
                <p className="branding">TETRIS</p>
            </div>

            <div className="bottom-login-signup">
                {!loginOrSignup ? (<><p>Log in to play:</p>
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"

                        >
                            <Form.Control type="email" placeholder="name@example.com" name="email" value={loginFormHolder.email} onChange={handleLoginFields} />
                        </FloatingLabel>

                        <FloatingLabel label="Password">
                            <Form.Control type="password" placeholder="Password" name="password" value={loginFormHolder.password} onChange={handleLoginFields} />
                        </FloatingLabel>

                        <Button type="submit" variant="dark" onClick={handleLoginButton}>Log In</Button>
                        <p>Don't have an account yet? <a href="#" onClick={e => setLoginOrSignup(true)}>Sign up</a></p></Form></>)

                    : (<><p>Fill your details:</p>
                        <Form noValidate onSubmit={handleSignupButton}>
                            <Form.Group>
                                <FloatingLabel label="User name">
                                    <Form.Control
                                        type="text"
                                        placeholder="username"
                                        name="username"
                                        value={signupFormHolder.username}
                                        onChange={handleSignupFields}
                                        isInvalid={!!errors.username} />
                                    <Form.Control.Feedback type="invalid" >{errors.username}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group>
                                <FloatingLabel label="Email address">
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        name="email"
                                        value={signupFormHolder.email}
                                        onChange={handleSignupFields}
                                        isInvalid={!!errors.email} />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <FloatingLabel label="Password">
                                <Form.Control type="password" placeholder="Password" name="password" value={signupFormHolder.password} onChange={handleSignupFields} isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid" >{errors.password}</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel label="Confirm password">
                                <Form.Control type="password" placeholder="rePassword" name="rePassword" value={signupFormHolder.rePassword} onChange={handleSignupFields} isInvalid={!!errors.rePassword} />
                                <Form.Control.Feedback type="invalid" >{errors.rePassword}</Form.Control.Feedback>
                            </FloatingLabel>

                            <Button type="submit" variant="dark">Sign up</Button>
                        </Form>
                    </>)}


            </div>
        </div >
    );
};

export default LoginSignup;