export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({
message: "Method not allowed"
});
}

try {
const {
name,
email,
service,
message
} = req.body;

```
if (!name || !email || !message) {
  return res.status(400).json({
    message: "Please fill in all required fields."
  });
}


/* =====================================================
   1. SEND ENQUIRY TO EDDY
===================================================== */

const ownerEmail = await fetch(
  "https://api.resend.com/emails",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "Authorization":
        `Bearer ${process.env.RESEND_API_KEY}`

    },

    body: JSON.stringify({

      from:
        "Eddy Creative Co. <onboarding@resend.dev>",

      to:
        ["eddyhope15@gmail.com"],

      reply_to:
        email,

      subject:
        `New Project Enquiry — ${service || "General Enquiry"}`,

      html: `
```

<!DOCTYPE html>

<html>

<body style="margin:0; padding:0; background:#f2f2f2; font-family:Arial, Helvetica, sans-serif;">

  <div style="max-width:680px; margin:40px auto; background:#ffffff;">

```
<div style="background:#111111; padding:32px 36px;">

  <div style="font-size:24px; font-weight:bold; letter-spacing:2px; color:#ffffff;">
    EDDY
  </div>

  <div style="font-size:11px; letter-spacing:3px; color:#c8ff00; margin-top:5px;">
    CREATIVE CO.
  </div>

</div>


<div style="padding:36px;">

  <div style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#777777; margin-bottom:12px;">
    New project enquiry
  </div>

  <h1 style="font-size:30px; line-height:1.15; margin:0 0 16px; color:#111111;">
    Someone wants to<br>
    build something great.
  </h1>

  <p style="font-size:16px; line-height:1.7; color:#555555;">
    A new enquiry has been submitted through the Eddy Creative Co. website.
  </p>

</div>


<div style="margin:0 36px; border-top:1px solid #eeeeee; border-bottom:1px solid #eeeeee; padding:26px 0;">

  <p>
    <strong>Client name:</strong><br>
    ${name}
  </p>

  <p>
    <strong>Email address:</strong><br>
    ${email}
  </p>

  <p>
    <strong>Interested in:</strong><br>
    ${service || "General Enquiry"}
  </p>

</div>


<div style="padding:36px;">

  <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:12px;">
    Project message
  </div>

  <div style="background:#f7f7f7; padding:24px; font-size:16px; line-height:1.7; color:#333333; white-space:pre-wrap;">
    ${message}
  </div>

</div>


<div style="padding:0 36px 36px;">

  <a
    href="mailto:${email}"
    style="display:inline-block; background:#111111; color:#ffffff; padding:16px 24px; text-decoration:none; font-size:13px; font-weight:bold; letter-spacing:1px;"
  >

    REPLY TO ${name.toUpperCase()} ↗

  </a>

</div>


<div style="background:#111111; padding:24px 36px;">

  <div style="font-size:12px; color:#888888;">
    Eddy Creative Co.
  </div>

  <div style="font-size:11px; color:#666666; margin-top:6px;">
    Creative work for ambitious ideas.
  </div>

</div>
```

  </div>

</body>

</html>

```
      `

    })

  }

);


const ownerData =
  await ownerEmail.json();


if (!ownerEmail.ok) {

  console.error(
    "Owner email error:",
    ownerData
  );

  return res.status(500).json({

    message:
      "Your enquiry could not be sent."

  });

}


/* =====================================================
   2. SEND CONFIRMATION TO CLIENT
===================================================== */

const clientEmail = await fetch(
  "https://api.resend.com/emails",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "Authorization":
        `Bearer ${process.env.RESEND_API_KEY}`

    },

    body: JSON.stringify({

      from:
        "Eddy Creative Co. <onboarding@resend.dev>",

      to:
        [email],

      subject:
        "Thanks for reaching out to Eddy Creative Co. ✦",

      html: `
```

<!DOCTYPE html>

<html>

<body style="margin:0; padding:0; background:#f2f2f2; font-family:Arial, Helvetica, sans-serif;">

  <div style="max-width:680px; margin:40px auto; background:#ffffff;">

```
<div style="background:#111111; padding:36px;">

  <div style="font-size:26px; font-weight:bold; letter-spacing:3px; color:#ffffff;">
    EDDY
  </div>

  <div style="font-size:11px; letter-spacing:3px; color:#c8ff00; margin-top:6px;">
    CREATIVE CO.
  </div>

</div>


<div style="padding:44px 36px;">

  <div style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#777777; margin-bottom:14px;">
    Enquiry received
  </div>

  <h1 style="font-size:34px; line-height:1.15; color:#111111; margin:0 0 20px;">
    Thanks for reaching out,
    ${name}.
  </h1>

  <p style="font-size:17px; line-height:1.8; color:#555555;">

    I've received your enquiry and will personally review your project details.

  </p>

  <p style="font-size:17px; line-height:1.8; color:#555555;">

    I'll get back to you as soon as possible so we can talk about your idea and explore how Eddy Creative Co. can help bring it to life.

  </p>

</div>


<div style="margin:0 36px; padding:24px; background:#f7f7f7;">

  <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:10px;">
    Your enquiry
  </div>

  <div style="font-size:16px; color:#111111;">

    ${service || "General Enquiry"}

  </div>

</div>


<div style="padding:36px;">

  <p style="font-size:16px; line-height:1.7; color:#555555;">

    In the meantime, you can also reach me directly on WhatsApp if you have anything you'd like to add.

  </p>

  <a
    href="https://wa.me/254704278052"
    style="display:inline-block; background:#111111; color:#ffffff; padding:16px 24px; text-decoration:none; font-size:13px; font-weight:bold; letter-spacing:1px;"
  >

    CHAT ON WHATSAPP ↗

  </a>

</div>


<div style="background:#111111; padding:28px 36px;">

  <div style="font-size:13px; color:#ffffff;">
    Eddy Creative Co.
  </div>

  <div style="font-size:11px; color:#888888; margin-top:8px;">
    Creative work for ambitious ideas.
  </div>

</div>
```

  </div>

</body>

</html>

```
      `

    })

  }

);


const clientData =
  await clientEmail.json();


if (!clientEmail.ok) {

  console.error(
    "Client confirmation error:",
    clientData
  );

  return res.status(200).json({

    success: true,

    message:
      "Your enquiry was received successfully."

  });

}


return res.status(200).json({

  success: true,

  message:
    "Your enquiry has been sent successfully!"

});
```

} catch (error) {

```
console.error(
  "Server error:",
  error
);

return res.status(500).json({

  message:
    "Something went wrong."

});
```

}

}
