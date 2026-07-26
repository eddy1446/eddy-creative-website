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

          subject: `New Project Enquiry from ${name}`,

          reply_to: email,

          html: `
            <h2>New Project Enquiry</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Service:</strong> ${service}</p>

            <h3>Project Details</h3>

            <p>${message}</p>

            <hr>

            <p>
              Sent from the Eddy Creative Co. website.
            </p>
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
