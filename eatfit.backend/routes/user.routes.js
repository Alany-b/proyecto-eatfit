import { Router } from "express";
import { verifyToken } from "../middleware/middleware.auth.js";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Acceso a perfil autorizado",
    userData: req.user
  });
});

// Ruta protegida para obtener datos del usuario logueado
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await db.User.findByPk(req.userId, {
      attributes: ["id", "username", "email", "createdAt"]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Perfil obtenido con éxito", user });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;
