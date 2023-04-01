import chalk from "chalk";
import express from "express";
import router from "./router/CURD.js"


// dotenv.config( )
const PORT = 3300;

// Setting up app back-end
const app = express();

// Using express middlewere
app.use(express.static('../public'));
app.use(express.json());
app.use(router);



// Start server.
app.listen(PORT, () => {
    console.log("Server started at:", chalk.blueBright.inverse(`localhost:${PORT}`));
})


