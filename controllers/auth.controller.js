import * as authService from "../services/auth.service.js";

export async function auth(req, res) {
  try {
    const { initData } = req.body;
    if (!initData) {
      return res.status(400).json({ error: "Missing initData" });
    }

    const user = await authService.auth(initData);
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
