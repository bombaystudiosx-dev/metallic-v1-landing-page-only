const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const LEADS_TO_EMAIL = process.env.LEADS_TO_EMAIL || 'internetkartel@icloud.com';
const RESEND_FROM = process.env.RESEND_FROM || 'Metallic.V1 <onboarding@resend.dev>';

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function buildEmail(data) {
  const type = data.type === 'contact' ? 'contact' : 'waitlist';
  const title = type === 'contact' ? 'New Metallic.V1 contact submission' : 'New Metallic.V1 waitlist signup';
  const fields = [
    ['Type', type],
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company],
    ['Interest', data.interest],
    ['Message', data.message]
  ].filter(([, value]) => value);

  const htmlRows = fields
    .map(([label, value]) => `<tr><td style="padding:6px 12px;font-weight:700;">${escapeHtml(label)}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`)
    .join('');

  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');

  return {
    from: RESEND_FROM,
    to: [LEADS_TO_EMAIL],
    reply_to: data.email,
    subject: title,
    text,
    html: `<h1>${escapeHtml(title)}</h1><table>${htmlRows}</table>`
  };
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return json(response, 500, { error: 'Email service is not configured.' });
  }

  const data = typeof request.body === 'object' && request.body
    ? request.body
    : JSON.parse(request.body || '{}');

  if (!isEmail(data.email)) {
    return json(response, 400, { error: 'A valid email is required.' });
  }

  if (data.type === 'contact' && !String(data.message || '').trim()) {
    return json(response, 400, { error: 'A message is required.' });
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(buildEmail(data))
  });

  if (!resendResponse.ok) {
    const error = await resendResponse.text();
    console.error('Resend error:', error);
    return json(response, 502, { error: 'Email service rejected the submission.' });
  }

  return json(response, 200, { ok: true });
};
