<?php
if(isset($_POST['sub1']) )
   {
   
		$name       = addslashes(trim($_POST['txtname']));
		$email       = addslashes(trim($_POST['txtemail']));
		$phno       = addslashes(trim($_POST['txtphone']));
		//$subj       = addslashes(trim($_POST['subj']));
		$msg      = addslashes(trim($_POST['msg']));
		 //$msg        = addslashes(trim($_POST['txtmsg']));
   
   
			
			 $subject  = "Acbl Contact Details";	
			
			
			  $html     ="<table width='600' align='center' cellpadding='0' cellspacing='0' style='border:10px solid  #FF0000'>
			  <tr>
				<td height='350' valign='top' class='boxbg'><br />
					
				  <br/>
					<table width='85%' align='center' cellpadding='5' cellspacing='1' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#333333'>
					  <tr>
						<td colspan='2' bgcolor='#FF9900' style='font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#FFFFFF'><strong> Acbl Contact Details</strong></td>
					  </tr>
					  <tr>
						<td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
						<td width='27%'><strong> Name : </strong></td>
						<td width='73%'><strong>$name</strong></td>
					  </tr>
					 
					  <tr>
						<td><strong> Email:</strong></td>
						<td><strong>$email</strong></td>
					  </tr>
					   <tr>
						<td><strong> Phone:</strong></td>
						<td><strong>$phno</strong></td>
					  </tr>
					 
					  <tr>
						<td><strong>Message  :</strong></td>
						<td><strong>$msg</strong></td>
					  </tr>
					  
					  <tr>
						<td colspan='2'>&nbsp;</td>
					  </tr>
					</table>
				  <br /></td>
			  </tr>
			</table>
			";
			
//			echo $html;
	    require 'PHPMailer-master/PHPMailerAutoload.php';
        $mail = new PHPMailer;
        //$mail->SMTPDebug = 1;                               // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Port = 587;
        $mail->Host = 'mail.acbl.co.in';                       // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'noreplay@acbl.co.in';                 // SMTP username
        $mail->Password = 'noreplay@123';                           // SMTP password ramki547@gmail.com
        $mail->SMTPSecure = 'tls';   // TCP port to connect to
        $mail->From = 'noreplay@acbl.co.in  ';
        $mail->FromName = 'Acbl Contact Details';
		$mail->addAddress('reach@acbl.co.in');
		//$mail->addAddress('balakrishna@aakrutisolutions.com');
	    $mail->addCC('');

        $mail->WordWrap = 50; // Set word wrap to 50 characters
  
        $mail->isHTML(true); 		// Set email format to HTML
		
		
		$mail->Subject = 'Acbl Instant Contact Details';
        $mail->Body = $html;
              if(!$mail->send())
			  {
			  
			    header("Location: error.html");
			  } 
			  else
			  {
			   
			    header("Location: thanks.html");
			  }	

}
?>