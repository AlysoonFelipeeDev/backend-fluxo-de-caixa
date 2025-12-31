import { Router } from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

// LISTAR transações do usuário logado
router.get("/", async (req, res) => {
  const userId = req.userId;

  const result = await pool.query(
    "SELECT * FROM transacoes WHERE user_id = $1 ORDER BY data DESC",
    [userId]
  );

  res.json(result.rows);
});

// CRIAR transação
router.post("/", async (req, res) => {
  const userId = req.userId;
  const { descricao, valor, tipo, data } = req.body;

  await pool.query(
    `
    INSERT INTO transacoes (descricao, valor, tipo, data, user_id)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [descricao, valor, tipo, data, userId]
  );

  res.status(201).json({ message: "Transação criada" });
});

// REMOVER transação
router.delete("/:id", async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  await pool.query(
    "DELETE FROM transacoes WHERE id = $1 AND user_id = $2",
    [id, userId]
  );

  res.json({ message: "Transação removida" });
});

export default router;
