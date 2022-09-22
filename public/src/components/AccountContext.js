import { createContext, useContext } from 'react';

const ctx = {
    "accounts": [
        {
            "id": 0,
            "name": "stephen",
            "email": "king@mit.edu",
            "balance": 0,
            "password": "secret",
            "transactionHistory": [],
            "loggedin": false
        }
    ]
}

const AccountContext = createContext(ctx);

export default AccountContext;