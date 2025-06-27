const { EmailClient } = require('@azure/communication-email');
require('dotenv').config();

// Initialize Azure Communication Services Email Client
let emailClient;
try {
  if (process.env.AZURE_COMMUNICATION_CONNECTION_STRING) {
    emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING);
  } else {
    console.warn('Azure Communication Services connection string not found. Email reminders will not work.');
  }
} catch (error) {
  console.error('Failed to initialize Azure Email Client:', error.message);
}

const setReminder = async (req, res) => {
  try {
    const { medicineName, datetime, email } = req.body;

    // Validate required fields
    if (!medicineName || !datetime || !email) {
      return res.status(400).json({
        success: false,
        message: 'Medicine name, datetime, and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate datetime format and ensure it's in the future
    const reminderDate = new Date(datetime);
    const currentDate = new Date();
    
    if (isNaN(reminderDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid datetime format'
      });
    }

    if (reminderDate <= currentDate) {
      return res.status(400).json({
        success: false,
        message: 'Reminder time must be in the future'
      });
    }

    // Calculate the time to send the reminder (5 minutes before the specified time)
    const reminderSendTime = new Date(reminderDate.getTime() - 5 * 60 * 1000); // 5 minutes before
    const timeUntilReminder = reminderSendTime.getTime() - currentDate.getTime();

    if (timeUntilReminder <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Not enough time to set reminder (needs at least 5 minutes from now)'
      });
    }

    // Check if email service is available
    const emailServiceAvailable = emailClient && process.env.AZURE_SENDER_EMAIL;
    
    if (!emailServiceAvailable) {
      console.log(`⚠️  Email service not configured. Simulating reminder for ${medicineName} to ${email}`);
      
      // Schedule a console log instead of email for testing
      setTimeout(() => {
        console.log(`🔔 SIMULATED REMINDER: Medicine "${medicineName}" scheduled for ${reminderDate.toLocaleString()}`);
        console.log(`📧 Would have sent email to: ${email}`);
      }, timeUntilReminder);

      return res.json({
        success: true,
        message: `Reminder set successfully! (Email service not configured - simulation mode)\nYou would receive an email reminder 5 minutes before ${reminderDate.toLocaleString()}`,
        reminderTime: reminderDate.toISOString(),
        emailTime: reminderSendTime.toISOString(),
        note: 'Email service not configured - reminder scheduled in simulation mode'
      });
    }

    // Schedule the email to be sent
    setTimeout(async () => {
      try {
        await sendReminderEmail(email, medicineName, datetime);
        console.log(`✅ Reminder email sent successfully for ${medicineName} to ${email}`);
      } catch (error) {
        console.error('❌ Failed to send reminder email:', error.message);
      }
    }, timeUntilReminder);

    // Return success response
    res.json({
      success: true,
      message: `Reminder set successfully! You'll receive an email reminder 5 minutes before ${reminderDate.toLocaleString()}`,
      reminderTime: reminderDate.toISOString(),
      emailTime: reminderSendTime.toISOString()
    });

  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set reminder',
      error: error.message
    });
  }
};

const sendReminderEmail = async (email, medicineName, medicineTime) => {
  try {
    if (!emailClient) {
      throw new Error('Email client not initialized');
    }

    // Check if sender email is configured
    const senderEmail = "donotreply@5777a8af-399a-4ba9-94b7-ae81cd194172.azurecomm.net";
    if (!senderEmail) {
      throw new Error('AZURE_SENDER_EMAIL environment variable not configured');
    }

    console.log(`Attempting to send email from: ${senderEmail} to: ${email}`);

    const emailMessage = {
      senderAddress: senderEmail,
      content: {
        subject: `Medicine Reminder: ${medicineName}`,
        plainText: `Reminder: It's time to take your medicine!\n\nMedicine: ${medicineName}\nScheduled Time: ${new Date(medicineTime).toLocaleString()}\n\nThis is an automated reminder from GeniMeds AI Assistant.\n\nStay healthy!\nGeniMeds Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🏥 Medicine Reminder</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">GeniMeds AI Assistant</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 25px;">
                <div style="font-size: 48px; margin-bottom: 10px;">💊</div>
                <h2 style="color: #333; margin: 0;">Time to take your medicine!</h2>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Medicine</p>
                <p style="margin: 5px 0 15px 0; font-size: 20px; font-weight: bold; color: #333;">${medicineName}</p>
                
                <p style="margin: 0; color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Scheduled Time</p>
                <p style="margin: 5px 0 0 0; font-size: 18px; color: #333;">${new Date(medicineTime).toLocaleString()}</p>
              </div>
              
              <div style="text-align: center; margin: 25px 0;">
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                  This is your automated reminder from GeniMeds AI Assistant.<br>
                  Taking your medication on time is important for your health.
                </p>
              </div>
              
              <div style="border-top: 2px solid #eee; padding-top: 20px; text-align: center;">
                <p style="color: #999; font-size: 14px; margin: 0;">
                  Stay healthy! 💚<br>
                  <strong>GeniMeds Team</strong>
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #999; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        `
      },
      recipients: {
        to: [{ address: email }]
      }
    };

    const poller = await emailClient.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
    
    if (result.status === 'Succeeded') {
      console.log('Reminder email sent successfully');
      return { success: true, messageId: result.id };
    } else {
      throw new Error(`Email sending failed with status: ${result.status}`);
    }
  } catch (error) {
    console.error('Error sending reminder email:', error);
    throw error;
  }
};

module.exports = {
  setReminder
};
