import React from 'react';
import { useEffect, useState, useContext } from 'react';
import useForm from "./UseForm";
import validate from './LoginValidation';
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import UserContext from './UserContext';
import AccountContext from './AccountContext';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const accountContext = useContext(AccountContext)
  let newUser;
  const [data, setData] = React.useState([]);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  function login() {
    console.log('No errors, submit callback called!');
    navigate('/newaccount');
    newUser = context;
    accountContext.accounts.push(JSON.parse(JSON.stringify(newUser)))
    console.log(accountContext)
  }

  function handleCreate() {
    console.log( values.name, values.email, values.password);
    setName(values.name);
    setEmail(values.email);
    setPassword(values.password);
  }

  useEffect(() => {
    if (name !== '' && password.length > 7){
    console.log(`Account Created for ${name}`);
    context.id = new Date().valueOf();
    context.name = name;
    context.email = email;
    context.password = password;
    context.balance = 100;
    context.transactionHistory = [];
    context.loggedin = true;
  };

  }, [name]
  )

  return (
    <div className="section is-fullheight" >
      <div className="container">
        <div className="column is-4 is-offset-4">
          <div className="text-center">
            <form onSubmit={ handleSubmit } noValidate>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input 
                  autoComplete="off" 
                  className={ `input ${errors.name && 'is-danger'}` } 
                  type="name" 
                  name="name" 
                  onChange={ handleChange } 
                  value={ values.name || '' } 
                  required />
                  {errors.name && (
                    <p className="help is-danger" style={{ color: 'red' }}>
                      { errors.name }
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input 
                  autoComplete="off" 
                  className={ `input ${errors.email && 'is-danger'}` } 
                  type="email" 
                  name="email" 
                  onChange={ handleChange } 
                  value={ values.email || '' } 
                  required />
                  { errors.email && (
                    <p className="help is-danger" style={{ color: 'red' }}>
                      { errors.email }
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                  className={ `input ${errors.password && 'is-danger'}` } 
                  type="password" 
                  name="password" 
                  onChange={ handleChange } 
                  value={ values.password || '' } 
                  required />
                </div>
                { errors.password && (
                  <p className="help is-danger" style={{ color: 'red' }}>
                    { errors.password }
                  </p>
                )}
              </div>
              <Button  onClick={ handleCreate }
              id="formbutton"
              type="submit" 
              className="button is-block is-info is-fullwidth" 
              disabled={ !values.name || !values.email || !values.password ? true : false }>
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;