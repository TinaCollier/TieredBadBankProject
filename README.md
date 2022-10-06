# Tina Collier's Bad Bank App

## What Is It?
For this MITxPro Coding Bootcamp challenge, we were tasked with creating a banking app that allows the user to create an account, deposit and withdraw money, and keep track of the data using the MERN (MongoDB, ExpressJS, React, NodeJS) Stack.

## How To Use It
Visit my [BadBankApp](https://tinacollierbadbank.s3.amazonaws.com/index.html). Select `Create Account` and create a profile with a username, email, and password. If you already have an account, select login and use your previous email and password to access your account. Next, you may create another account or make a deposit or withdrawal. If you choose to make a deposit or withdrawal, you must input a valid number. Each deposit and withdrawal is saved in the transaction data for the current session. If you choose to create a new account, the previous user and their transaction data is replaced with the new user. You can choose to view your transaction for the current session by selecting `All Transactions`. If you would like to see all accounts, select All Data. 

## What I Found Challenging
The most challenging part was including the News Search page and pagination. I wanted to contain the results within the `Card` and keep the results below 5 items per page. Creating the back end was a struggle for me as well. It took a lot of trouble shooting, Postman, and help from a friend to set up my APIs, but it now it works great!

## Extras
I added a Calculator Page and a current News Page. This went beyond the parameters of the assignment, but I enjoyed the challenge of incorporating them into my project. I also included a News API that returns current financial news across the globe. 

## MIT License
Please see attached License

## To Run the Build
To start the server: `node server/index.js`.
To start React: `npm start`
Connect to MongoDB Client

![BadBank Image](public/src/pages/images/badbank.png)