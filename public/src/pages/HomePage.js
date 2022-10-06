import { 
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Col, 
    ButtonGroup
 } from 'reactstrap';
 import HomePageImg from './images/homepage.jpg'
 import { useContext, UserContext } from 'react';


function HomePage() {

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            <Card >
                <img
                className="homePageImg"
                alt="Card image"
                src={ HomePageImg }
                />
                <CardBody>
                    <CardTitle tag="h5">
                    Welcome
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                        Bad Bank
                    </CardSubtitle>
                    <CardText>
                        Thank you for choosing Bad Bank for all of your banking needs. Safe banking relies on you making good choices and decisions. You must first complete the Create Account Form prior to using your new account or log in using an existing account. Happy Banking!
                    </CardText>
                    <ButtonGroup style={{ backgroundColor: "#5c636a" }}>
                        <Button outline style={{ color: "white" }} href="#/createaccount">Create Account</Button>
                        <Button outline style={{ color: "white" }} href="#/login">Login</Button>
                    </ButtonGroup>
                </CardBody>
        </Card> 
    </Col>
    )
}

export default HomePage;