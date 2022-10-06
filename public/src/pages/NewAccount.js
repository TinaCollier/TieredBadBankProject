import { 
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    ButtonGroup,
    Col
 } from 'reactstrap';
 import { useNavigate } from 'react-router-dom';
 import UserContext from '../components/UserContext';
 import { useContext } from 'react';

function NewAccount() {
    const navigate = useNavigate();
    function onClickNewAccount() {
        navigate( '/createaccount' );
    }
    function onClickLoginToExistingAccount() {
        navigate( '/login' );
    }
    function onClickDeposit() {
        navigate( '/deposit' );
    }
    function onClickWithdraw() {
        navigate( '/withdraw' );
    }
    const context = useContext( UserContext );

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            <Card >

                <CardBody>
                    <CardTitle tag="h5">
                    Success!
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                        Hello, { context.name }!
                    </CardSubtitle>
                    <CardText>
                        You have created an account with Bad Bank. Your account balance is: ${ context.balance }. Would you like to create another account or login to a different account?
                    </CardText>
                    <ButtonGroup style={{ backgroundColor: "#5c636a" }}>
                        <Button outline style={{ color: "white" }} href="#/createaccount">Create Account</Button>
                        <Button outline style={{ color: "white" }} href="#/login">Login</Button>
                    </ButtonGroup>
                    <br/>
                    <br/>
                    <CardText>
                        Or choose an option below:
                    </CardText>
                    <Button id="deposit" onClick={ onClickDeposit }>Deposit</Button>
                    <Button id="withdraw" onClick={ onClickWithdraw }>Withdraw</Button>
                </CardBody>
        </Card> 
    </Col>
    )
}

export default NewAccount;