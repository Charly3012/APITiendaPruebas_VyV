import express, { Application } from 'express';
import mainRouter from './routes/index';

const app: Application = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!, VyV y vivan los elotes');
});

// Rutas principales
app.use("/api", mainRouter);

// Handler para rutas no encontradas
app.use((req, res) => {
    res.status(4404).json({ message: "Endpoint no encontrado" });
});

export default app;