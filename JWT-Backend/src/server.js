import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
import bodyparser from "body-parser";

require("dotenv").config();

const app = express();

// Config view engine
configViewEngine(app);

// Config body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 1409;

const server = app.listen(PORT, () => {
    console.log(`>>> App is running at the PORT = ${PORT} <<<`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
    // Add custom error handling logic if needed
});

// Handle termination signals
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted');
    });
});
