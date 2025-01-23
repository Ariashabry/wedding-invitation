import express from 'express';
import 'dotenv/config.js';
import './config/database.js';
import indexRouter from './routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Configurar CORS
app.use(bodyParser.json());

app.use("/api", indexRouter)


app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running on port ${PORT}`);
    }
})
