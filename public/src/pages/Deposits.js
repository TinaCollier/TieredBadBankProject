import { useContext, useState, useEffect } from "react";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { 
    Card, 
    CardHeader,
    CardBody, 
    Button 
} from "reactstrap";

function Deposit() {
    const context = useContext( UserContext );
    const [ transaction, setTransaction ] = useState( {} );
    const [ deposit, setDeposit ] = useState( 0 );
    const [ total, setTotal ] = useState( context.balance );
    const [ error, setError ] = useState( '' );
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        let newTotal = total + deposit;
        setTotal( newTotal );   
    }

    const handleChange = event => {
        const input = event.target.value;
        if ( isNaN( input ) ) {
            setError( 'Please input a valid number' )
        } else { 
            setDeposit( Number( input ) ); 
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
        if ( 0 === deposit ) {
            return;
        }
        context.balance = total;
        updateAccountBalance();
        const thisTransaction = { name: context.name, ts: new Date().getTime(), type: 'Deposit', amount: deposit };
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
        <form onSubmit={ handleSubmit }>
                <p>Please input your deposit amount and click submit!</p>
                <h4>Deposit Amount: </h4>
                <input 
                className="inputAmount"
                type="text" 
                width="200" 
                value={ deposit }
                onChange={ handleChange }
                ></input>
                <div className="error">{ error }</div>
                <Button disabled={ !deposit ? true : false }>Submit</Button>
            </form>

        </CardBody>
    </Card>
    );
}

export default Deposit;