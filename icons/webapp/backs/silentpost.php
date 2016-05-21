<?php
$postStack=array();

foreach ($_POST as $key => $value){
  $fieldString='"' .htmlspecialchars($key). '":"' .htmlspecialchars($value).'"';
  //echo $fieldString;
  array_push($postStack, $fieldString);
  }
$postString='{' . implode(", ", $postStack) . '}';
$myfile = fopen("silentpost.txt", "w") or die("Unable to open file!");
fwrite($myfile, $postString);


$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
  $qString="INSERT INTO receipts ";
  $qString.="(x_first_name, ";
  $qString.="x_last_name, ";
  $qString.="x_email, ";
  $qString.="x_type, ";
  $qString.="x_amount, ";
  $qString.="x_MD5_Hash, ";
  $qString.="x_catalog_link_id, ";

  $qString.="dateYYYYMMDD, ";

  $qString.="x_response_code, ";
  $qString.="x_response_reason_code, ";
  $qString.="x_response_reason_text, ";
  $qString.="x_avs_code, ";
  $qString.="x_auth_code, ";
  $qString.="x_trans_id, ";
  $qString.="x_method, ";
  $qString.="x_card_type, ";
  $qString.="x_account_number)";
 

  $qString.=" VALUES ";


  $qString.="('".$_POST['x_first_name']."', ";
  $qString.="'".$_POST['x_last_name']."', ";
  $qString.="'".$_POST['x_email']."', ";
  $qString.="'".$_POST['x_type']."', ";
  $qString.="'".$_POST['x_amount']."', ";
  $qString.="'".$_POST['x_MD5_Hash']."', ";
  $qString.="'".$_POST['x_catalog_link_id']."', ";

  $qString.="'".date("Ymd")."', ";

  $qString.="'".$_POST['x_response_code']."', ";
  $qString.="'".$_POST['x_response_reason_code']."', ";
  $qString.="'".$_POST['x_response_reason_text']."', ";
  $qString.="'".$_POST['x_avs_code']."', ";
  $qString.="'".$_POST['x_auth_code']."', ";
  $qString.="'".$_POST['x_trans_id']."', ";
  $qString.="'".$_POST['x_method']."', ";
  $qString.="'".$_POST['x_card_type']."', ";
  $qString.="'".$_POST['x_account_number']."')";

fwrite($myfile, " - ".$qString);
fclose($myfile);




  $mysqli->query($qString) or die("receipt not inserted? ");

echo('ran fine');
?>
