import { query } from "../config/db.js";

const Planning = {
  async create(data) {
    const sql = `INSERT INTO reservation (reunion_title, organizer, start_date, end_date, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
    const [result] = await query(sql, [
      data.reunion_title,
      data.organizer,
      data.start_date,
      data.end_date,
      data.user_id,
    ]);
    return result;
  },
  async findAll() {
    const sql = `SELECT * FROM reservation`;
    const [rows] = await query(sql);
    return rows;
  },
  async findById(id) {
    const sql = `SELECT * FROM reservation WHERE id = ?`;
    const [rows] = await query(sql, [id]);
    return rows[0];
  },
  async update(id, data) {
    const sql = `UPDATE reservation SET reunion_title = ?, organizer = ?, start_date = ?, end_date = ?, user_id = ?, updated_at = NOW() WHERE id = ?`;
    const [result] = await query(sql, [
      data.reunion_title,
      data.organizer,
      data.start_date,
      data.end_date,
      data.user_id,
      data.updated_at,
      id,
    ]);
    return result;
  },
  async delete(id) {
    const sql = `DELETE FROM reservation WHERE id = ?`;
    const [result] = await query(sql, [id]);
    return result;
  },
};

export default Planning;
