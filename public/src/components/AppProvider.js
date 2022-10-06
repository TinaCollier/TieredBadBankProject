import { useState } from 'react';

import UserContext from "./UserContext";

export default function AppProvider(props) {
    const [ id, setId ] = useState( 0 );
    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ balance, setBalance ] = useState(0);
    const [ transactionHistory, setTransactionHistory ] = useState( [] );
    const [ loggedIn, setLoggedIn ] = useState( false );

    const value = { id, setId, name, setName, email, setEmail, password, setPassword, balance, setBalance, transactionHistory, setTransactionHistory, loggedIn, setLoggedIn }
    return (
      <UserContext.Provider value={ value }>
        { props.children }
      </UserContext.Provider>
    )
  };