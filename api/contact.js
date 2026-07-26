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

        message:
          "Please fill all required fields."

      });

    }



    const resendHeaders = {

      "Content-Type":
        "application/json",

      "Authorization":
        `Bearer ${process.env.RESEND_API_KEY}`

    };



    /*
      EMAIL 1:
      SEND ENQUIRY TO EDDY
    */


    const ownerResponse =
      await fetch(
        "https://api.resend.com/emails",
        {

          method: "POST",

          headers: resendHeaders,


          body: JSON.stringify({

            from:
              "onboarding@resend.dev",


            to:
              [
                "eddyhope15@gmail.com"
              ],


            reply_to:
              email,


            subject:
              `New Enquiry - ${service || "General"}`,



            html: `

            <div style="
              font-family:Arial;
              max-width:600px;
              margin:auto;
              background:#ffffff;
              border:1px solid #eee;
              padding:30px;
            ">


              <h1 style="
                background:#111;
                color:white;
                padding:20px;
              ">

                EDDY CREATIVE CO.

              </h1>



              <h2>
                New Project Enquiry
              </h2>



              <p>
                <strong>Name:</strong>
                ${name}
              </p>


              <p>
                <strong>Email:</strong>
                ${email}
              </p>


              <p>
                <strong>Service:</strong>
                ${service}
              </p>


              <hr>


              <h3>
                Message
              </h3>


              <p>
                ${message}
              </p>



            </div>

            `


          })

        }

      );



    const ownerData =
      await ownerResponse.json();



    if (!ownerResponse.ok) {

      console.log(
        "Owner email failed:",
        ownerData
      );


      return res.status(500).json({

        message:
          "Unable to send enquiry."

      });

    }




    /*
      EMAIL 2:
      CONFIRMATION TO CLIENT
    */


    const clientResponse =
      await fetch(
        "https://api.resend.com/emails",
        {


          method:"POST",


          headers:
            resendHeaders,


          body:JSON.stringify({

            from:
              "onboarding@resend.dev",


            to:
              [
                email
              ],


            subject:
              "Thanks for contacting Eddy Creative Co.",



            html:`


            <div style="
              font-family:Arial;
              max-width:600px;
              margin:auto;
              padding:30px;
              background:#ffffff;
              border:1px solid #eee;
            ">



            <h1 style="
              background:#111;
              color:white;
              padding:20px;
            ">

            EDDY CREATIVE CO.

            </h1>




            <h2>
              Thanks ${name} 👋
            </h2>



            <p>
              Your enquiry has been received successfully.
            </p>



            <p>
              I will review your project details and get back to you as soon as possible.
            </p>



            <p>
              <strong>
              Requested service:
              </strong>
              ${service}
            </p>




            <br>


            <a href="https://wa.me/254704278052"
            style="
              background:#111;
              color:white;
              padding:15px 25px;
              text-decoration:none;
            ">

            Chat on WhatsApp

            </a>



            </div>


            `


          })


        }

      );



    const clientData =
      await clientResponse.json();



    if (!clientResponse.ok) {

      console.log(
        "Client confirmation failed:",
        clientData
      );

      // Do not fail the whole form

    }




    return res.status(200).json({

      success:true,

      message:
        "Your enquiry has been sent successfully!"

    });



  }

  catch(error) {


    console.error(
      "SERVER ERROR:",
      error
    );


    return res.status(500).json({

      message:
        "Something went wrong."

    });


  }


}
