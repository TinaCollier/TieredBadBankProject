import { 
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Col
 } from 'reactstrap';
 import { useNavigate } from 'react-router-dom';
 import UserContext from '../components/UserContext';
 import { useContext } from 'react';

function SuccessfulLogin() {
    const navigate = useNavigate();
    function onClickTransactions() {
        navigate( '/transactions' );
    }
    function onClickDeposit() {
        navigate( '/deposit' )
    }
    function onClickWithdraw() {
        navigate( '/withdraw' )
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
                        Thank you for logging in. Your account balance is: ${ context.balance }. Would you like to complete a transaction?
                    </CardText>
                    <Button id="deposit" onClick={ onClickDeposit }>Deposit</Button>
                    <Button id="withdraw" onClick={ onClickWithdraw }>Withdraw</Button>
                    {/* <br />
                    <br />
                    <CardText>
                        Would you like to view your transaction data?
                    </CardText>
                    <Button onClick={ onClickTransactions }>Transactions</Button> */}
                </CardBody>
        </Card> 
    </Col>
    )
}

export default SuccessfulLogin;