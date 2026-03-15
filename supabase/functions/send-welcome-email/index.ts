import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email } = await req.json();

    if (!fullName || !email) {
      return new Response(JSON.stringify({ error: 'Missing fullName or email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // TODO: Plug in your email service here (Resend, SendGrid, etc.)
    // Example with Resend:
    //
    // const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    // const res = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${RESEND_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     from: 'TerraTech <noreply@terratech.club>',
    //     to: [email],
    //     subject: 'Welcome to TerraTech! 🎉 Application Received',
    //     html: `<p>Hi ${fullName},</p>
    //            <p>Thanks for applying to TerraTech! We've received your application and will review it within a week.</p>
    //            <p>Stay tuned — we'll reach out via this email.</p>
    //            <p>– The TerraTech Team</p>`,
    //   }),
    // });

    console.log(`[send-welcome-email] Would send email to ${email} for ${fullName}`);

    return new Response(JSON.stringify({
      success: true,
      message: `Welcome email queued for ${email}`,
      // Email content that would be sent:
      subject: 'Welcome to TerraTech! 🎉 Application Received',
      body: `Hi ${fullName}, thanks for applying to TerraTech! We've received your application and will review it within a week. Stay tuned — we'll reach out via this email. – The TerraTech Team`,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
