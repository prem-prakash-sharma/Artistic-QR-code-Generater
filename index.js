const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());

app.post("/generate-qr", async (req, res) => {
  const payload = {
    qr_code_data: req.body.qrCodeData,
    text_prompt: req.body.textPrompt,
    output_width: 512,
    output_height: 512,
    num_outputs: 1,
  };

  try {
    const response = await fetch("https://api.gooey.ai/v2/art-qr-code/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.GOOEY_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();

    res.json({ qr_code_image: result.output.output_images[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
