<?php
$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
// globals
$productSkus="";
$categorySlugsString="";
$dbugStr="dbugStr ";
// first get hashes and wpUserMeta into variables
foreach ($_POST as $key => $value){
  if($key == "categorySlugsString"){$categorySlugsString =$value;}
  }
$dbugStr.='categorySlugsString='.$categorySlugsString;
if($categorySlugsString != ""){
  $qString="SELECT * ";
  $qString.="FROM products WHERE contentSlug  = '".$categorySlugsString."'";
  $result = $mysqli->query($qString) or die("Error");
  if($result !== false ) {
    $productSkus.='<b>Access Controlled by Products</b><br />';
    while ($record = $result->fetch_assoc()) {
      $productSkus.=$record['sku'] .' &nbsp; ('. $record['productType'].')<br />';
      }
    }
  }
echo '{"productSkus":"'.$productSkus.'", "dbugStr":"'.$dbugStr.'"}';
