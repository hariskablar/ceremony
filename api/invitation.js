import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

export default async function handler(req, res) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { family } = req.query;
    if (!family) {
      return res.status(400).json({ error: 'Missing family param' });
    }
    const families =
      await sql`SELECT id, family_name, family_slug, invite_string, prefix, welcome FROM families WHERE family_slug = ${family} LIMIT 1`;

    if (families.length === 0) {
      return res.status(404).json({ error: 'Family not found' });
    }
    const guests =
      await sql`SELECT full_name, accepted, pos FROM guests WHERE family_id = ${families[0].id} ORDER BY pos ASC`;

    res.status(200).json({
      family: families[0],
      guests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
}
