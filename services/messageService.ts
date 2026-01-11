
// If you want to receive these messages, create a Discord Webhook or Formspree URL 
// and paste it here.
// Discord: Server Settings -> Integrations -> Webhooks -> New Webhook -> Copy Webhook URL
const WEBHOOK_URL = "";

export const sendAnonymousMessage = async (message: string): Promise<boolean> => {
    // Simulate network delay for "hacking" effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!WEBHOOK_URL) {
        console.warn("Message not sent (No Webhook URL configured):", message);
        return true; // Return true to simulate success for the user
    }

    try {
        // Simple POST request to Discord Webhook
        // Discord expects { "content": "message" }
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `**Incoming Anonymous Transmission:**\n${message}`
            })
        });
        return true;
    } catch (error) {
        console.error("Transmission failed:", error);
        return false;
    }
};
