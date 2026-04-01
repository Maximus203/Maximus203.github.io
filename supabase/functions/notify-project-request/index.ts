import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const TO_EMAIL = 'cherif.diouf203@gmail.com'; // Ton adresse mail

serve(async (req: Request) => {
  // Supabase envoie un POST avec le payload de la nouvelle ligne
  const payload = await req.json();
  const record = payload.record;

  if (!record) {
    return new Response('No record found', { status: 400 });
  }

  const { first_name, last_name, email, details, file_url, file_name, created_at } = record;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: #4F46E5; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">📬 Nouvelle demande de projet</h1>
        <p style="color: #C7D2FE; margin: 4px 0 0;">Reçue le ${new Date(created_at).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
      </div>

      <div style="border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 12px 12px; padding: 24px; background: #FAFAFA;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px; width: 130px;">Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; font-weight: 600; color: #111827;">${first_name} ${last_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6;">
              <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6B7280; font-size: 13px; vertical-align: top; padding-top: 14px;">Détails</td>
            <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${details}</td>
          </tr>
          ${file_url ? `
          <tr>
            <td style="padding: 10px 0; border-top: 1px solid #F3F4F6; color: #6B7280; font-size: 13px;">Fichier joint</td>
            <td style="padding: 10px 0; border-top: 1px solid #F3F4F6;">
              <a href="${file_url}" style="color: #4F46E5; text-decoration: none;">📎 ${file_name}</a>
            </td>
          </tr>` : ''}
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re: Votre demande de projet"
             style="display: inline-block; background: #4F46E5; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Répondre à ${first_name}
          </a>
        </div>
      </div>

      <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 16px;">
        Cherif.Dev — Portfolio
      </p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [TO_EMAIL],
      reply_to: email,
      subject: `📬 Nouveau projet de ${first_name} ${last_name}`,
      html,
    }),
  });

  const data = await res.json();
  console.log('Resend response:', JSON.stringify(data));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
