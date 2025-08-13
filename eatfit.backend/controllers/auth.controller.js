import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../config/database.js';
import { Op } from 'sequelize';


const User = db.User;

// Registro
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
     // 1️⃣ Verificar si el email ya existe
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // 2️⃣ Verificar si el username ya existe
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    // 3️⃣ Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Crear usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });


    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparar contraseñas
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

   
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      error: "Error en el servidor",
      details: error.message // 👈 Esto te dirá el motivo real
    });
  }
};
