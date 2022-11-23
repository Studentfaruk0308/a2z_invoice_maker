# A2Z INVOICE MAKER (Frontend)

This application is the frontend part of "a2z_invoice_maker" web app.

## Table of Contents
# Objectives
# System Requirements
# How to Setup
# Usage
# License
# Terms & Conditions



# Objectives
* a2z_Invoice_Maker is a web application to generate invoices for client from a Company.

# System Requirements
Following is the ideal system requirements to run the applicaiton smoothly:
* node v16.15.0
* npm 8.10.0
* React v18.2.0
* ruby 2.6.1p33
* Rails 6.1.7

# How to Setup (Frontend)
* Fork the Repository to your Github Account.
* Then clone the repisotry yo your local machine.
* Then in the local machiine go to this directory by typing: cd A2Z_INVOICE_MAKER
* Then type: 'npm install' to initialize the local machine.
* Follow below steps for Auth0 Setup:
> Create an account in 'https://auth0.com/'
> Create an Application and get Client ID.
> Create a .env file in the root directory that exports the DOMAIN & CLIENT ID as per below example:
        - REACT_APP_AUTH0_DOMAIN=<Domain Name goes here>
        - REACT_APP_AUTH0_CLIENT_ID=<Client ID goes here>
> Add this file in .gitignore in the root directory to prevent the above two details being exposed to others in the Github Repository. 
* Then type: 'npm start' to start the application and view it in your browser.
* This frontend application will start in 'http://localhost:3010' by default.


# Usage (All the UI will be from Frontend)
* As a first time user you need to create an account by Logging in to this application.
* Create a Profile in 'Profile' Tab with your Company Details of the floowing:
> Profile Name: This will not be displayed in the Invoice.
> Company Name, Address, ABN, Email, Contact Number, Bank Details: All these fileds will be displayed in the invoice.
> Please note only one Profile can be created. The profile can be updated if required. All invoices created by you will be linked to this Profile.
* Create a Client in the 'Client' Tab to whom invoice will be issued. 
* Create an Invoice in the 'Invoice" Tab.
> Submitting a created invoice will send the invoice to the Client.
> A created invoice can be viewed, edited, downloaded for printing or saving as pdf file or can be copied to create a new invoice.
> All submitted invoice after creation or modification will eamil the invoice to the Client.

# License
Copyright (c) 2022 by Md Faruk Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following Terms & Conditions:

# Terms & Conditions
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



