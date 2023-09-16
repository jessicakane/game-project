import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import './LoginSignup.css';

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
    const [showError, setShowError] = useState(false);

    const handleLoginFields = (e) => {
        const { name, value } = e.target;
        setLoginFormHolder({ ...loginFormHolder, [name]: value });
    };
    const handleSignupFields = (e) => {
        const { name, value } = e.target;
        setSignupFormHolder({ ...signupFormHolder, [name]: value });
    };

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
        setLoginOrSignup(false);
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
                <h1>Welcome to</h1>
                <p class="branding">TETRIS</p>
            </div>

            <div className="bottom-login-signup">
                {!loginOrSignup ? (<><p>Log in to play:</p>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"

                    >
                        <Form.Control type="email" placeholder="name@example.com" name="email" value={loginFormHolder.email} onChange={handleLoginFields} />
                    </FloatingLabel>

                    <FloatingLabel label="Password">
                        <Form.Control type="password" placeholder="Password" name="password" value={loginFormHolder.password} onChange={handleLoginFields} />
                    </FloatingLabel>

                    <Button variant="dark" onClick={handleLoginButton}>Log In</Button>
                    <p>Don't have an account yet? <a href="#" onClick={e => setLoginOrSignup(true)}>Sign up</a></p></>)

                    : (<><p>Enter your details:</p>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="User name"
                        >
                            <Form.Control placeholder="username" name="email" value={signupFormHolder.username} onChange={handleSignupFields} />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                        >
                            <Form.Control type="email" placeholder="name@example.com" name="email" value={signupFormHolder.email} onChange={handleSignupFields} />
                        </FloatingLabel>

                        <FloatingLabel label="Password">
                            <Form.Control type="password" placeholder="Password" name="password" value={signupFormHolder.password} onChange={handleSignupFields} />
                        </FloatingLabel>

                        <FloatingLabel label="Confirm password">
                            <Form.Control type="password" placeholder="rePassword" name="rePassword" value={signupFormHolder.rePassword} onChange={handleSignupFields} />
                        </FloatingLabel>

                        <Button variant="dark" onClick={handleSignupButton}>Sign up</Button>
                    </>)}


            </div>
        </div >
    );
};

export default LoginSignup;