import express from 'express';
import bodyParser from 'body-parser'
import generateRoutes from './routes/generateRoutes'
import metadataRoutes from './routes/metadataRoutes'

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/generate', generateRoutes);
app.use('/api/metadata', metadataRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});