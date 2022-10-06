import { createContext, useState } from 'react';

const user = {
  id: 0,
  name: '',
  email: '',
  password: '',
  balance: 0,
  transactionHistory: [],
  loggedIn: false
};

const UserContext = createContext(user);

export default UserContext;