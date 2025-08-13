import { Router } from "express";
import { verifyToken } from "../middleware/middleware.auth.js";

const router = Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Acceso a perfil autorizado",
    userData: req.user
  });
});

export default router;
