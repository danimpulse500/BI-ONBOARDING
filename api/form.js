// api/form.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, role } = req.body;

    // Here you can process (save to DB, send email, etc.)
    return res.status(200).json({
      message: 'Form submitted successfully!',
      data: { name, email, role }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
