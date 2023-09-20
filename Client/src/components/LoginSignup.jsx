import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import '../css/LoginSignup.css';
import axios from 'axios'; 
import { AuthContext } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {

    const navigate = useNavigate();

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

    const {signUserUp, logUserIn, token, userId} = useContext(AuthContext);

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

        const userNameValid = signupFormHolder.username.length >= 4;
        if (userNameValid) {
            newErrors.username = null;
        } else {
            newErrors.username = "Must contain at least 4 characters";
        }

        const passwordValid = signupFormHolder.password >= 4;
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

    const handleLoginButton = async(e) => {
        e.preventDefault();
        console.log('function running')
        const userInfo = {
            email: loginFormHolder.email, 
            password: loginFormHolder.password
        }
        const res = await logUserIn(userInfo);
        console.log(userId);
        if (res) {
            navigate('/game')
        }

    };

    const handleSignupButton = async (e) => {
        e.preventDefault();
        validateLocally();

        console.log('function running')

        const newUser = {
          userName: signupFormHolder.username,
          email: signupFormHolder.email,
          password: signupFormHolder.password,
          rePassword: signupFormHolder.rePassword,
          admin: false,
          highScore: 0
        }

        const res = await signUserUp(newUser, setSignupFormHolder);
        if (!res) {
            setShowError(true);
        }
        setLoginOrSignup(false);
    };

    return (
        <div className="login-signup">
            <div className="top-login-signup">
                <h1>Let's play</h1>
                <p className="branding">TETRIS</p>
            </div>

            <div className="bottom-login-signup">
                {!loginOrSignup ? (<><p>Log in to play:</p>
                <Form noValidate onSubmit={handleLoginButton}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"

                        >
                            <Form.Control type="email" placeholder="name@example.com" name="email" value={loginFormHolder.email} onChange={handleLoginFields} />
                        </FloatingLabel>

                        <FloatingLabel label="Password">
                            <Form.Control type="password" placeholder="Password" name="password" value={loginFormHolder.password} onChange={handleLoginFields} />
                        </FloatingLabel>

                        <Button type="submit" variant="dark">Log In</Button>
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