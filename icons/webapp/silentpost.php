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
  $qString.="(orderID, ";
  $qString.="name, ";
  $qString.="email1, ";
  $qString.="status, ";
  $qString.="sku)";
 

  $qString.=" VALUES ";


  $qString.="('".$_POST['orderID']."', ";
  $qString.="'".$_POST['name']."', ";
  $qString.="'".$_POST['email1']."', ";
  $qString.="'".$_POST['status']."', ";
  $qString.="'".$_POST['sku']."')";

fwrite($myfile, " - ".$qString);
fclose($myfile);




  $mysqli->query($qString) or die("receipt not inserted? ");

echo('ran fine');
?>
