# Storage App API
> **this api is not hosted, due to the lack of resources and costs it generates.**

You can read the endpoints here: [Documentation](https://documenter.getpostman.com/view/20174110/UzBmNTRS)

## Backend
This Project uses the **Services Oriented Architecture**, use streams to storage the files on a cloud thirdparty service as cloud storage, implements subscriptions and payment method with stripe.
The Api implement auth for the login and register of the users by their email.
The Subscriptions has diferents levels free,Premium and enterprise, each one has a limit of space to upload files, so with each level the space increase.
The Deploy was configured in Compute Engine uses Nginx and other services to Store the data and files as Cloud SQL and Cloud Storage.

> To Use it you need the credentials in json by cloud storage, put it in the dir of backend folder, and complete the envs, also if you are in development mode you has to change the stripe endpointSecret who are static in the Service/subscriptons.js line 6.

*Main Technologies:*
- Javascript
- NodeJs
- Database Mysql

*External Services:*
- Stripe for Payments
- Google cloud for hosting

*Google Cloud Services:*
- Compute Engine
- Cloud Storage
- Cloud SQL

*Third party Libraries:*
```json
    "dependencies": {
        "@google-cloud/storage": "^5.20.5",
        "@prisma/client": "^3.14.0",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.0.1",
        "express": "^4.18.1",
        "jsonwebtoken": "^8.5.1",
        "multer": "^1.4.4",
        "prisma": "^3.14.0",
        "stripe": "^9.8.0",
        "uuid": "^8.3.2"
    },
    "devDependencies": {
        "nodemon": "^2.0.16"
    }
```

## Frontend
The Frontend was programmed by development mode only, only to test features and needed functionalities, it has syles and icons for better user experience.

- Javascript
- Nodejs
- vite
- React
  
*External Services:*
- Firebase for hosting

*Third party Libraries:*
```json
    "dependencies": {
        "@reduxjs/toolkit": "^1.8.2",
        "@stripe/react-stripe-js": "^1.8.1",
        "@stripe/stripe-js": "^1.31.0",
        "axios": "^0.27.2",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "react-icons": "^4.4.0",
        "react-redux": "^8.0.2",
        "react-router-dom": "^6.3.0"
    },
    "devDependencies": {
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "@vitejs/plugin-react": "^1.3.0",
        "autoprefixer": "^10.4.7",
        "postcss": "^8.4.14",
        "tailwindcss": "^3.0.24",
        "vite": "^2.9.9"
    }
```


