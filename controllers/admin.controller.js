import * as adminService from "../services/admin.service.js";

export async function createCategory(req, res) {
  try {
    const { name, parentId } = req.body;
    const category = await adminService.createCategory({ name, parentId });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

export async function verifyUser(req, res) {
  try {
    const id = Number(req.param.id);

    const user = await adminService.verifyUser({ id });
    await res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
