import React from 'react';
import { useEffect, useState, useContext } from 'react';
import useForm from "./UseForm";
import validate from './LoginValidation';
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import UserContext from './UserContext';


const Form = () => {

  const navigate = useNavigate();
  const { name, setId, setName, setEmail, setPassword, setTransactionHistory, setBalance, setLoggedIn } = useContext( UserContext );

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm( login, validate );

  function login() {
    console.log( 'No errors, submit callback called!' );
    navigate( '/newaccount' );
  }

  async function handleCreate() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( {
        name: values.name,
        email: values.email,
        password: values.password,
      } )
    };

    const uri = '/user/create';

    await fetch( uri, requestOptions)
      .then( response => response.json() )
      .then( data => {
        JSON.stringify(data);
        console.log( 'data id', data.insertedId)
      } ); 
      // setName( values.name );
      // setEmail( values.email );
      // setPassword( values.password );
      // setTransactionHistory; 
      // setLoggedIn(true);
  }


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
                  className={ `input ${ errors.name && 'is-danger' }` } 
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
                  className={ `input ${ errors.email && 'is-danger' }` } 
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
                  className={ `input ${ errors.password && 'is-danger' }` } 
                  type="password" x
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