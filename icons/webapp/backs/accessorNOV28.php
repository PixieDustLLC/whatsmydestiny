<?php

$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
// globals
$action="";
$wpUserLogin="";
$href="";
// first get hashes and wpUserMeta into variables
foreach ($_POST as $key => $value){
  if($key == "action"){$action =$value;}
  if($key == "wpUserLogin"){$wpUserLogin=$value;}
  if($key == "href"){$href=$value;}
  }
$protected="false";
$qString="SELECT * ";
$qString.="FROM products WHERE linkUrl = '".$href."'";
$result = $mysqli->query($qString) or die("Error returnProducts ");
if($result !== false ) { 
  $protected="true";
  }

$access="denied";
if($protected=="false"){
  $access="granted";
  }
else{
  $userId=0;
  $qString="SELECT * FROM users WHERE wpLogin='" . $wpUserLogin. "'";
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $userId=$record['id'];
      }
    }
  if($userId != 0){
    $iqString="SELECT items.*, products.linkUrl FROM items INNER JOIN products ON items.productId = products.id WHERE products.linkUrl = '" .$href. "' AND items.consumerUserId = ".$userId;
    $iqResult = $mysqli->query($iqString);
    if($iqResult !== false ) { 
      $access="granted";
      }
    }
  }
echo '{"access":"'.$access.'", "protected":"'.$protected.'", "wpUserLogin":"'.$wpUserLogin.'",  "userId":'.$userId.'}';
