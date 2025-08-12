import express from 'express';
import db from './eatfit.backend/models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
db.sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado a la base de datos MySQL');
  })
  .catch((error) => {
    console.error('🔴 Error al conectar a la base de datos:', error);
  });

app.get('/', (req, res) => {
  res.send('API de Eatfit funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
