import chalk from "chalk";
import express from "express";
import router from "./router/CURD.js"
import dotenv from "dotenv";

// config the path
dotenv.config( { path: "./config.env" } )


const PORT = process.env.PORT || 3300;

// Setting up app back-end
const app = express();

// Using express middlewere

// This middleware will allow to perform CURD operation using fetch()
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(express.static('public'));
app.use(express.json());
app.use(router);




// Start server.
app.listen(PORT, () => {
    console.log("Server started at:", chalk.blueBright.inverse(`localhost:${PORT}`));
})


