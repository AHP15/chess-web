import express, { Request, Response } from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ message: 'Hello from the server!' });
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

export default app;
