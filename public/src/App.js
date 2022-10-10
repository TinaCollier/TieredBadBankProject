import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useContext, useEffect } from 'react';
import NavBar from './pages/NavBar';
import { List, ListInlineItem } from 'reactstrap';
import {
  HashRouter,
  Routes,
  Route,
  Link } from 'react-router-dom';
import Deposit from './pages/Deposits';
import Withdraw from './pages/Withdrawals';
import CreateAccount from './pages/CreateAccount';
import Transactions from './pages/Transactions';
import HomePage from './pages/HomePage';
import NewAccount from './pages/NewAccount';
import AllData from './pages/AllData';
import CalculatorCard from './pages/CalculatorCard';
import Success from './pages/Success';
import NewsPage from './pages/NewsPage';
import Login from './pages/Login';
import SuccessfulLogin from './pages/SuccessfulLogin';
import githubicon from './pages/images/githubicon.png';
import linkedinicon from './pages/images/linkedinicon.png';
import emailicon from './pages/images/emailicon.png'
import AppProvider from './components/AppProvider';




function App() {

  return (
    <AppProvider>
      <div className="App">
        <div className="wrapper">
          <HashRouter>
            <NavBar />
            <Routes>
              <Route path="/" exact element={ <HomePage /> } />
              <Route path="/createaccount" element={ <CreateAccount /> } />
              <Route path="/deposit" element={ <Deposit /> } />
              <Route path="/withdraw" element={ <Withdraw /> } />
              <Route path="/transactions" element={ <Transactions /> } />
              <Route path="/alldata" element={ <AllData /> } />
              <Route path="/newaccount" element={ <NewAccount /> } />
              <Route path="/success" element={ <Success /> } />
              <Route path="/calculator" element={ <CalculatorCard /> } />
              <Route path="/news" element={ <NewsPage /> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/successfulLogin" element={ <SuccessfulLogin /> } />

            </Routes>
          </HashRouter>
        </div>
        <footer className="text-center text-md-right">
          <List type="inline">
            <ListInlineItem>
              <a href="https://github.com/TinaCollier" target="_blank">
                <img src={ githubicon }/>
              </a>
            </ListInlineItem>
            <ListInlineItem>
              <a href="https://www.linkedin.com/in/tina-collier/" target="_blank">
                <img src={ linkedinicon }/>
              </a>
            </ListInlineItem>
            <ListInlineItem>
              <a href="mailto:tina.greda@yahoo.com" target="_blank">
                <img src={ emailicon }/>
              </a>
            </ListInlineItem>
          </List>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
