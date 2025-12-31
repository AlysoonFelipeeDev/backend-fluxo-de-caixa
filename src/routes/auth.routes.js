import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const senhaHash = bcrypt.hashSync(senha, 10);

  await pool.query(
    "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)",
    [nome, email, senhaHash]
  );

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount === 0) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  const usuario = result.rows[0];

  const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

  if (!senhaCorreta) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  const token = jwt.sign(
    { userId: usuario.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
