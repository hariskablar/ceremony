import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
const sql = neon(`${process.env.DATABASE_URL}`);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    for (const u of updates) {
      if (!u || !u.id) continue;
      await sql`UPDATE guests SET accepted = ${u.accepted}, updated_at = now() WHERE id = ${u.id}`;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
}
