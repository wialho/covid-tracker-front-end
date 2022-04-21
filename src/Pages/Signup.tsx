import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import feathersClient from "../Api";
import { useAuth } from "../Auth/Auth";
import { PrimaryButton } from "../BaseStyledComponents/Button";
import { Col } from "../BaseStyledComponents/Col";
import { Row } from "../BaseStyledComponents/Row";
import { TextInput } from "../BaseStyledComponents/TextInput";
import { Wrapper } from "../BaseStyledComponents/Wrapper";
import ErrorContainer from "../Components/ErrorContainer";
import { IsEmailValid, IsPasswordValid, IsPhoneValid } from "../Utility/Validators";

const Signup = () => {
    const[name, setName] = useState('');
    const[nameValid, setNameValid] = useState(true);
    const[phone, setPhone] = useState('');
    const[phoneValid, setPhoneValid] = useState(true);
    const[email, setEmail] = useState('');
    const[emailValid, setEmailValid] = useState(true);
    const[password, setPassword] = useState('');
    const[passwordValid, setPasswordValid] = useState(true);
    const[confirmPassword, setConfirmPassword] = useState('');
    const[confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    useEffect(() => {
        setNameValid(name !== '');
        setPhoneValid(IsPhoneValid(phone));
        setEmailValid(IsEmailValid(email));
        setPasswordValid(IsPasswordValid(password));
        setConfirmPasswordValid(password === confirmPassword);
    }, [name, email, phone, password, confirmPassword])

    let navigate = useNavigate();
    let auth = useAuth();

    const submit = async () => {
        try{
            const result = await feathersClient.service('users').create({
                name: name,
                phone: phone,
                email: email,
                password: password
            });

            auth.autoSignin(() => {
                navigate('/');
            })
        }
        catch(error){
            //show error (toast or something)
        }
    }

    return (
        <Wrapper>
            <Row justifyContent="center">
                <Col>
                    <p>Fill out the form below to sign up for a free account</p>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Name</label>
                    <TextInput name='name'
                        placeholder='John Smith'
                        type='text'
                        onChange={(e) => setName(e.target.value)}/>
                    <ErrorContainer isError={!nameValid} 
                        errorText='Name is a required field.'
                        maxWidth={200}/>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Email</label>
                    <TextInput name='email'
                        placeholder='email@me.com'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}/>
                    <ErrorContainer isError={!emailValid} 
                        errorText='Please use a valid email.'
                        maxWidth={200}/>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Phone Number</label>
                    <TextInput name='phone'
                        placeholder='123-456-7891'
                        type='tel'
                        onChange={(e) => setPhone(e.target.value)}/>
                    <ErrorContainer isError={!phoneValid} 
                        errorText='Phone number requires 7 or 10 digits 
                            with no dividers such as / or -.'
                        maxWidth={200}/>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <label>Password</label>
                    <TextInput name='password'
                        type='password'
                        minLength={8}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        onChange={(e) => setPassword(e.target.value)}/>
                    <ErrorContainer isError={!passwordValid} 
                        errorText='Password requires one uppercase letter, 
                            one lowercase value, one number, one special character, and 8 total characters.'
                        maxWidth={200}/>
                </Col>
                <Col>
                    <label>Confirm Password</label>
                    <TextInput name='confirmPassword'
                        type='password'
                        minLength={8}
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <ErrorContainer isError={!confirmPasswordValid} 
                        errorText='Both password values should match.'
                        maxWidth={200}/>
                </Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
            <Row justifyContent="center">
                <Col>
                    <PrimaryButton disabled={!confirmPasswordValid
                        || (password === '' || !passwordValid)
                        || !nameValid
                        || (email === '' || !emailValid)
                        || (phone === '' || !phoneValid)}
                        onClick={submit}>Sign Up</PrimaryButton>
                </Col>
            </Row>
        </Wrapper>
    );
}

export default Signup;