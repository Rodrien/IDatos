import express from 'express';
import eventsRouter from './routes/eventsRouter.js';
import jobsManger from './jobs.js';

const app = express();

jobsManger.usePythonJob();
app.use(express.json());

// Add routes
app.use('/events', eventsRouter);

app.get('/', (req, res) => {
    res.send("API online.");
});

// Start server
app.listen(3000, () => {
    console.log("server iniciado");
});