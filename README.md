# Ecommerce Website

## Features
1. Product Listing Page
2. Product Filters
3. Product Details Page
4. User Authentication
5. User Cart and Wishlist
6. Razorpay Payment Gateway 
7. OTP Validation
8. Pagination


## Environment Variables

### Frontend
REACT_APP_SERVER_URL =  // server URL
REACT_APP_PAYMENT_CALLBACK= // razorpay payment callback server URL


### Backend
DB_URI= // mongodb url
Twilio_Phone_Number= // twilio phone number
Twilio_SID= // twilio SID
Twilio_Auth_Token=  // twilio auth token
RZP_KEY_ID= //razorpay key id
RZP_KEY_SECRET= //razorpay key secret
FRONTEND_REDIRECT= // frontend deployed URL (development or production mode)
BACKEND_URL= // backend deployed URL (development or production mode)


## Available Scripts - Frontend

In the client directory, you can run:

### `npm start`
Runs the app in the development mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\

## Available Scripts - Backend

In the backend directory, you can run

### `npm run develop`
Runs the app with nodemon to reflect live changes.

### `npm start`
Runs the app with node.
