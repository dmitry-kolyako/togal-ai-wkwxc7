import cors from 'cors';
import express from 'express';
import {imagesRouter} from "./routers/imagesRouter";
import {corsOptions} from "./middleware/corsOptions";
import {ApiConfig, ApiEndpoints} from "../../shared/config/api.config";

const app = express();
app.use(cors(corsOptions));

const {ServerPort} = ApiConfig

const PORT = process.env.PORT || ServerPort;

// Endpoint to imagesUploader an image


app.use(ApiEndpoints.ROOT, imagesRouter)

// Endpoint to
app.get(ApiEndpoints.HEALTH_CHECK, (req, res) => {
    res.json({status: 'OK', timestamp: new Date().toISOString()});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app