import express from 'express';
import { PackageEndpoints } from './endpoints/PackageEndpoints';

const app = express();
const port = process.env.PORT || 3000;

const baseURL = '/api/v1';

app.use(express.json());

const packageEndpoints = new PackageEndpoints();
app.use(baseURL, packageEndpoints.getRouter());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${baseURL}`);
});