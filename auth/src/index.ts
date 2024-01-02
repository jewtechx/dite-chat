import { Request, Response } from 'express';
import { app } from './app';

const PORT = process.env.PORT || 8080;

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
