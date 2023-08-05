// script.js
document
  .getElementById("promptForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const qrCodeData = document.getElementById("qrCodeData").value;
    const textPrompt = document.getElementById("textPrompt").value;

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable the button
    submitButton.textContent = "Loading..."; // Change the button text

    try {
      const response = await fetch("/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCodeData, textPrompt }),
      });

      if (!response.ok) {
        prompt("Error: " + response.status);
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const result = await response.json();
      document.getElementById("qrCodeImage").src = result.qr_code_image;
    } catch (error) {
      console.error("Error:", error);
      prompt("Something went wrong.");
    } finally {
      submitButton.disabled = false; // Re-enable the button
      submitButton.textContent = "Generate QR Code"; // Change the button text
    }
  });
