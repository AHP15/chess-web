import app from './app.js';
import DB from './model/index.js';

const databaseUrl = process.env.DATABASE_URL || '';
DB.connect(databaseUrl, 'chess');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
