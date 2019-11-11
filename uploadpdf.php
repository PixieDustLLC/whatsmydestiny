<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/SMTP.php';// PHP code goes here

  $rnd=base64_encode($_POST['reportName']);
  $chunkNum=$_POST['chunkNum'];
  $pdf = base64_decode($_POST['pdfData']);
  $fname = "reports/" .$_POST['reportName'] . "_" . $rnd . ".pdf"; // name the file
  if($chunkNum=="0"){$file = fopen($fname, 'w');} // open the file write
  else{$file = fopen($fname, 'a');}// append chunk
  fwrite($file, $pdf); //save data
  fclose($file);
  echo '{"file":"' . $fname . '", "chunkNum":"' . $chunkNum . '"}';

  $file = fopen("info.txt", 'a');
  fwrite($file, $chunkNum . " ".strlen($pdf). "\n");
  if(strlen($pdf) < 300000){
    $emailTo=$_POST['emailto'];
    $emailFrom="wes@whatsmydestiny.com";
    $emailToName=$_POST['emailtoname'];
    $emailFromName="Wes Hamilton";
    $smtpPassword="BB6q3QQ2cpCfLf27DOitUgHKi9XNKGhoE8z/HuJa46D2";
    $smtpUsername="AKIAVRNCDDD5KYX4X76U";
    fwrite($file, $fname . " send? emailto:". $_POST['email']. " emailToName:".$emailToName."\n");

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
    $mail->Host = "email-smtp.us-west-2.amazonaws.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
    $mail->Port = 465; // TLS only
    $mail->SMTPSecure = 'ssl'; // ssl is depracated
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->setFrom($emailFrom, $emailFromName);
    $mail->addAddress($emailTo, $emailToName);
    $mail->Subject = 'PHPMailer GMail SMTP test';
    $mail->msgHTML("test body"); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
    $mail->AltBody = 'HTML messaging not supported';
    //$mail->addAttachment($fname); //Attach an image file

    if(!$mail->send()){
       echo "Mailer Error: " . $mail->ErrorInfo;
    }else{
       echo "Message sent!";
    }
  fclose($file);
  unlink($fname);
  }
  else{
    fclose($file);
  }

?>
