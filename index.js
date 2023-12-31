import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.json());

app.post("/generate-qr", async (req, res) => {
  const payload = {
    qr_code_data: req.body.qrCodeData,
    text_prompt: req.body.textPrompt,
    output_width: 512,
    output_height: 512,
    num_outputs: 1,
    use_url_shortener: true,
  };

  try {
    const response = await fetch("https://api.gooey.ai/v2/art-qr-code/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env["GOOEY_API_KEY"],
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 200) {
      // Check response.status
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const result = await response.json();

    console.log({ image: result.output.output_images[0] });
    res.json({ qr_code_image: result.output.output_images[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
