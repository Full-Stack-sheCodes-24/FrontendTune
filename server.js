import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(process.cwd(), 'dist')));

// Handle all routes by returning the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});