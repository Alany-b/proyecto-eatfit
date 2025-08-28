import express from 'express';
import sequelize from './eatfit.backend/config/database.js';
import { startDB } from './eatfit.backend/config/database.js';
import dotenv from 'dotenv';
import authRoutes from './eatfit.backend/routes/auth.routes.js';
import userRoutes from "./eatfit.backend/routes/users.routes.js";

dotenv.config();

const app = express();
app.use(express.json()); // Permite leer JSON en req.body

// Rutas
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes); // <-- Ruta protegida

// Puerto
const PORT = process.env.PORT || 3000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Eatfit funcionando perrooo');
});

// Iniciar servidor con conexión a la base de datos
/*app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('🟢 Conectado a la base de datos MySQL');

    await db.sequelize.sync({ alter: true }); // Crea o actualiza tablas
    console.log('🗃️ Modelos sincronizados con la base de datos');

    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  } catch (error) {
    console.error('🔴 Error al conectar a la base de datos:', error);
  }*/
  sequelize.authenticate()
  .then(() => {
    console.log("✅ Se estableció la conexión con la base de datos.");
    
    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("✅ Tablas sincronizadas con Sequelize.");
  })
  .catch((error) => {
    console.error("❌ Error al conectar o sincronizar la base de datos:", error);
  });

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en  http://localhost:${PORT}`);
}
);
app.listen(PORT,async () => {
  await startDB();
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})