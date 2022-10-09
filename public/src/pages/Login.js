import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { useNavigate } from "react-router-dom";
import { 
    Button, 
    Col, 
    Card, 
    CardBody, 
    CardText,
    CardTitle,
    CardSubtitle,
    Form,
    FormGroup,
    Label,
    Input
     } from 'reactstrap';
import UserContext from '../components/UserContext';

const Login = () => {
    const { setId, setName, setEmail, setPassword, setBalance, setLoggedIn, balance, loggedIn } = useContext( UserContext );
    const navigate = useNavigate();
    const [ invalid, setInvalid ] = useState( false );
    const [ userEmail, setUserEmail ] = useState( '' );
    const [ userPassword, setUserPassword ] = useState( '' );
    function rerouteToSuccessfulLogin() {
        navigate( '/successfulLogin' );
    }

    async function findAccount(){
        const uri = '/user/search';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                email: userEmail
            } )
        };

        await fetch( uri, requestOptions)
        .then( async response => await response.json() )
        .then( data => {
            if ( userPassword === data.password ){
                setId( data.id );
                setName( data.name );
                setEmail( data.email );
                setBalance( data.balance );
                setLoggedIn( true );
                setUserEmail( '' );
                setUserPassword( '' );
                rerouteToSuccessfulLogin();
            } 
        })
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        findAccount();
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            <Card >

                <CardBody>
                    <CardTitle tag="h5">
                    Access your Bad Bank Account
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                    </CardSubtitle>
                    <Form onSubmit={ handleSubmit }>
                        <FormGroup floating>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={ userEmail }
                            onChange={ ( e ) => setUserEmail( e.target.value ) }
                        />
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        </FormGroup>
                        {' '}
                        <FormGroup floating>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={ userPassword }
                            onChange={ ( e ) => setUserPassword( e.target.value ) }
                        />
                        <Label for="examplePassword">
                            Password
                        </Label>
                        </FormGroup>
                        {' '}
                        {invalid ? 
                        <p style={{ color: "red" }}>The user email or password is incorrect</p> : <p></p>}
                        <Button >
                        Submit
                        </Button>
                    </Form>

                </CardBody>
        </Card> 
    </Col>
    )
}

export default Login;