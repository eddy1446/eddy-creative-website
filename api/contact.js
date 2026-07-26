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

    // For now, this confirms that the enquiry was received.
    // We will connect actual email delivery next.
    return res.status(200).json({
      success: true,
      message: "Your enquiry has been received!"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong."
    });

  }
}
