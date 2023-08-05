document
  .getElementById("promptForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const qrCodeData = document.getElementById("qrCodeData").value;
    const textPrompt = document.getElementById("textPrompt").value;
    const qrCodeImage = document.getElementById("qrCodeImage");

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Loading...";

    try {
      const response = await fetch("/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCodeData, textPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.qr_code_image) {
        qrCodeImage.src = result.qr_code_image;
      } else {
        qrCodeImage.src = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Generate QR Code";
    }
  });
