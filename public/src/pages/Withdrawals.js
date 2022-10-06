import { useContext, useState, useEffect } from "react";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { 
    Card, 
    CardHeader,
    CardBody, 
    Button 
} from "reactstrap";



function Withdraw() {
    const context = useContext( UserContext );
    const [ withdrawal, setWithdrawal ] = useState( 0) ;
    const [ total, setTotal ] = useState( context.balance );
    const [ error, setError ] = useState( '' );
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        if ( withdrawal > total ){
            setError( 'Withdraw request larger than account balance.' )
        } else {
            let newTotal = total - withdrawal;
        setTotal( newTotal );
        }
    }

    const handleChange = event => {
        const input = event.target.value;
        if ( isNaN( input ) ) {
            setError( 'Please input a valid number' )
        } else { 
            setWithdrawal( Number( input ) ); 
        }
    }  
    
    // update account balance in mongodb
    const updateAccountBalance = () => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                email: context.email,
                amount: total,
            } )
          };

        fetch( 'http://localhost:4000/updatebalance', requestOptions)
        .then( response => response.json() )
        .then( data => {
            console.log( `Previous balance updated from $${ data.value.balance } to $${ context.balance }` )
        } );
    }

    useEffect (() => {
        if ( 0 === withdrawal ) {
            return;
        }
        context.balance = total;
        updateAccountBalance();
        const thisTransaction = { name: context.name, ts: new Date().getTime(), type: 'Withdrawal', amount: withdrawal };
        context.transactionHistory.push( thisTransaction );
        navigate( '/success' )
    }, [ total ])
    return (
        <Card 
        className="text-center"
        style={{
          width: '18rem'
        }}
      >

        <CardHeader>Account Balance: <br/>${ total }</CardHeader>
        <CardBody>
        <p>Please input your withdrawal amount and click submit!</p>
        <form onSubmit={ handleSubmit }>
                <h2></h2>
                <h4>Withdrawal Amount: </h4>
                <input 
                className="inputAmount"
                type="text"  
                width="200" 
                value={ withdrawal }
                onChange={ handleChange }
                placeholder="0"
                ></input>
                <div className="error" >{ error }</div>
                <Button disabled={ !withdrawal ? true : false}>Submit</Button>
            </form>
        </CardBody>
    </Card>
    );
}

export default Withdraw;