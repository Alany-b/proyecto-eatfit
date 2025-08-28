import { Users } from "../models/users.model.js";

// Obtener usuario por ID
export const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener usuario" });
    }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
};

// Crear usuario
export const createUsers = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({ msg: "No pueden haber campos vacíos" });
    }

    try {
        const existing = await Users.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ msg: "Ese email ya está en uso." });
        }

        const user = await Users.create({ name, email, password });
        res.status(201).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear usuario" });
    }
};

// Actualizar usuario
export const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({ msg: "El nombre no puede estar vacío" });
        }

        if (email !== undefined) {
            if (!email.trim()) {
                return res.status(400).json({ msg: "El email no puede estar vacío" });
            }
            const existing = await Users.findOne({ where: { email } });
            if (existing && existing.id !== parseInt(id)) {
                return res.status(400).json({ msg: "Ese email ya está en uso" });
            }
        }

        if (password !== undefined && !password.trim()) {
            return res.status(400).json({ msg: "La contraseña no puede estar vacía" });
        }

        await user.update({
            name: name ?? user.name,
            email: email ?? user.email,
            password: password ?? user.password,
        });

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

// Eliminar usuario
export const deleteUsers = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        await user.destroy();
        res.json({ msg: "Usuario eliminado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar" });
    }
};