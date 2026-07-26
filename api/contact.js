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

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill in all required fields."
      });
    }

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
        },

        body: JSON.stringify({

          from: "Eddy Creative Co. <onboarding@resend.dev>",

          to: ["eddyhope15@gmail.com"],

          reply_to: email,

          subject: `New Project Enquiry — ${service || "General Enquiry"}`,

          html: `

<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>


<body style="margin:0; padding:0; background:#f2f2f2; font-family:Arial, Helvetica, sans-serif;">

  <div style="max-width:680px; margin:40px auto; background:#ffffff;">

    <!-- HEADER -->

    <div style="background:#111111; padding:32px 36px;">

      <div style="font-size:24px; font-weight:bold; letter-spacing:2px; color:#ffffff;">

        EDDY

      </div>

      <div style="font-size:11px; letter-spacing:3px; color:#c8ff00; margin-top:5px;">

        CREATIVE CO.

      </div>

    </div>


    <!-- INTRO -->

    <div style="padding:36px;">

      <div style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#777777; margin-bottom:12px;">

        New project enquiry

      </div>

      <h1 style="font-size:30px; line-height:1.15; margin:0 0 16px; color:#111111;">

        Someone wants to<br>

        build something great.

      </h1>

      <p style="font-size:16px; line-height:1.7; color:#555555; margin:0;">

        A new enquiry has been submitted through the Eddy Creative Co. website.

      </p>

    </div>


    <!-- CLIENT DETAILS -->

    <div style="margin:0 36px; border-top:1px solid #eeeeee; border-bottom:1px solid #eeeeee; padding:26px 0;">

      <div style="margin-bottom:20px;">

        <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:6px;">

          Client name

        </div>

        <div style="font-size:17px; color:#111111;">

          ${name}

        </div>

      </div>


      <div style="margin-bottom:20px;">

        <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:6px;">

          Email address

        </div>

        <div style="font-size:17px; color:#111111;">

          ${email}

        </div>

      </div>


      <div>

        <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:6px;">

          Interested in

        </div>

        <div style="font-size:17px; color:#111111;">

          ${service || "General Enquiry"}

        </div>

      </div>

    </div>


    <!-- MESSAGE -->

    <div style="padding:36px;">

      <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#999999; margin-bottom:12px;">

        Project message

      </div>

      <div style="background:#f7f7f7; padding:24px; font-size:16px; line-height:1.7; color:#333333; white-space:pre-wrap;">

        ${message}

      </div>

    </div>


    <!-- CTA -->

    <div style="padding:0 36px 36px;">

      <a

        href="mailto:${email}"

        style="display:inline-block; background:#111111; color:#ffffff; padding:16px 24px; text-decoration:none; font-size:13px; font-weight:bold; letter-spacing:1px;"

      >

        REPLY TO ${name.toUpperCase()} ↗

      </a>

    </div>


    <!-- FOOTER -->

    <div style="background:#111111; padding:24px 36px;">

      <div style="font-size:12px; color:#888888;">

        Eddy Creative Co.

      </div>

      <div style="font-size:11px; color:#666666; margin-top:6px;">

        Creative work for ambitious ideas.

      </div>

    </div>

  </div>

</body>

</html>

          `

        })

      }

    );


    const resendData =
      await resendResponse.json();


    if (!resendResponse.ok) {

      console.error(
        "Resend Error:",
        resendData
      );

      return res.status(500).json({

        message:
          "Email could not be sent."

      });

    }


    return res.status(200).json({

      success: true,

      message:
        "Your enquiry has been sent successfully!"

    });


  } catch (error) {

    console.error(
      "Server Error:",
      error
    );

    return res.status(500).json({

      message:
        "Something went wrong."

    });

  }

}
