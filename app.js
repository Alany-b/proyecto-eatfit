import express from 'express';
import dotenv from 'dotenv';
import db from './eatfit.backend/models/index.js';
import authRoutes from './eatfit.backend/routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Permite leer JSON en req.body

// Rutas
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Eatfit funcionando');
});

// Iniciar servidor con conexión a la base de datos
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('🟢 Conectado a la base de datos MySQL');

    await db.sequelize.sync({ alter: true }); // Crea o actualiza tablas
    console.log('🗃️ Modelos sincronizados con la base de datos');

    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  } catch (error) {
    console.error('🔴 Error al conectar a la base de datos:', error);
  }
});
