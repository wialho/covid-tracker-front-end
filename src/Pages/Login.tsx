import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import { PrimaryButton } from "../BaseStyledComponents/Button";
import { Col } from "../BaseStyledComponents/Col";
import { Row } from "../BaseStyledComponents/Row";
import { TextInput } from "../BaseStyledComponents/TextInput";
import { Wrapper } from "../BaseStyledComponents/Wrapper"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
    let auth = useAuth();

    const submit = () => {
        auth.signin(email, password, () => {
            navigate('/');
        })
    }

    return (
        <Wrapper>
            <Row justifyContent="center">
                <Col>
                    <p>Please login or sign up for a free account to continue.</p>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Email</label>
                    <TextInput name='text'
                        type='email'
                        placeholder='email@me.com'
                        onChange={(e) => setEmail(e.target.value)}/>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Password</label>
                    <TextInput name='text'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}/>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <Link style={{marginTop: '25%'}} to='/signup'>Sign Up</Link>
                </Col>
                <Col>
                    <PrimaryButton onClick={submit}
                        disabled={!email && !password}>Login</PrimaryButton>
                </Col>
            </Row>
        </Wrapper>
    )
}

export default Login;