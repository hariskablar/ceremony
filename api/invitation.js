/* eslint-env node */

import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL in /api/invitation:', dbUrl); // 👈 debug

    if (!dbUrl) {
      // Don't crash Vercel dev, just return an error JSON
      return res
        .status(500)
        .json({ error: 'DATABASE_URL is not set. Check .env.local.' });
    }

    const sql = neon(dbUrl);

    const { family } = req.query;
    if (!family) {
      return res.status(400).json({ error: 'Missing family param' });
    }
    const families =
      await sql`SELECT id, family_name, family_slug FROM families WHERE family_slug = ${family} LIMIT 1`;

    if (families.length === 0) {
      return res.status(404).json({ error: 'Family not found' });
    }
    const guests =
      await sql`SELECT id, full_name, accepted FROM guests WHERE family_id = ${families[0].id} ORDER BY full_name`;

    res.status(200).json({
      family: families[0],
      guests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
}
