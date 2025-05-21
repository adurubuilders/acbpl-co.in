const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
    context.log('Processing contact form submission');
    
    // Get form data from request body
    const name = req.body.txtname;
    const email = req.body.txtemail;
    const phone = req.body.txtphone;
    const message = req.body.msg;
    
    // Validate required fields
    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: "Please provide name, email, and message"
        };
        return;
    }
    
    try {
        // Create email transporter
        const transporter = nodemailer.createTransport({
            host: 'mail.acbl.co.in',
            port: 587,
            secure: false,
            auth: {
                user: 'noreplay@acbl.co.in',
                pass: 'noreplay@123'
            },
            tls: {
                rejectUnauthorized: false // Only use in development - consider removing in production
            }
        });
        
        // HTML email template
        const htmlContent = `
        <table width='600' align='center' cellpadding='0' cellspacing='0' style='border:10px solid #FF0000'>
            <tr>
                <td height='350' valign='top' class='boxbg'><br />
                    <br/>
                    <table width='85%' align='center' cellpadding='5' cellspacing='1' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#333333'>
                        <tr>
                            <td colspan='2' bgcolor='#FF9900' style='font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#FFFFFF'><strong>Acbl Contact Details</strong></td>
                        </tr>
                        <tr>
                            <td colspan='2'>&nbsp;</td>
                        </tr>
                        <tr>
                            <td width='27%'><strong>Name:</strong></td>
                            <td width='73%'><strong>${name}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td><strong>${email}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Phone:</strong></td>
                            <td><strong>${phone}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Message:</strong></td>
                            <td><strong>${message}</strong></td>
                        </tr>
                        <tr>
                            <td colspan='2'>&nbsp;</td>
                        </tr>
                    </table>
                    <br />
                </td>
            </tr>
        </table>
        `;
        
        // Define email options
        const mailOptions = {
            from: 'noreplay@acbl.co.in',
            to: 'reach@acbl.co.in',
            subject: 'Acbl Instant Contact Details',
            html: htmlContent
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        context.res = {
            status: 302,
            headers: {
                "Location": "/thanks.html"
            },
            body: "Form submitted successfully"
        };
    } catch (error) {
        context.log.error('Error sending email:', error);
        context.res = {
            status: 302,
            headers: {
                "Location": "/error.html"
            },
            body: "Error processing form"
        };
    }
};