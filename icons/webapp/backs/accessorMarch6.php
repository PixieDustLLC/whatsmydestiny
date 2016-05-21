<?php
// loaded using footer php in organic-purpose/
$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
// globals
$dbugStr="dbugStr ";
$action="";
$userId=0;
$isAdmin=0;
$gf_token="";

$wpUserLogin="";
$catSlugsString="";
$windowLocation="";
// first get hashes and wpUserMeta into variables
foreach ($_POST as $key => $value){
  if($key == "action"){$action =$value;}
  if($key == "wpUserLogin"){$wpUserLogin=$value;}
  if($key == "catSlugsString"){$catSlugsString=$value;}
  if($key == "windowLocation"){$windowLocation=$value;}
  }
$dbugStr.='catSlugsString='.$catSlugsString;

$protected="false";
$qString="SELECT * ";
$qString.="FROM products WHERE contentSlug  = '".$catSlugsString."'";
$result = $mysqli->query($qString) or die("Error catSlug ");
if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $dbugStr.=' found contentSlug:'.$record['contentSlug'].' so protected=true ';
      $protected="true";
      }
  }
if($catSlugsString==""){$protected="false";}
$dbugStr.='wpUserLogin='.$wpUserLogin;
$access="denied";
if($protected=="false"){
  $access="granted";
  }
else{
  $qString="SELECT * FROM users WHERE wpLogin='" . $wpUserLogin. "'";
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $userId=$record['id'];
      $isAdmin=$record['isAdmin'];
      }
    }
  if($userId != 0){
    $iqString="SELECT items.*, products.contentSlug FROM items INNER JOIN products ON items.productId = products.id WHERE products.contentSlug = '" .$catSlugsString. "' AND items.consumerUserId = ".$userId;
    $iqResult = $mysqli->query($iqString);
    if($iqResult !== false ) {
      while ($record = $iqResult->fetch_assoc()) {
        $dbugStr.=$record["linkUrl"]. " ";
        $access="granted";
        }
      }
    $iqString="SELECT * FROM products WHERE contentSlug='" .$catSlugsString. "' and productType = 'Free'";
    $iqResult = $mysqli->query($iqString);
    if($iqResult !== false ) {
      while ($record = $iqResult->fetch_assoc()) {
        $dbugStr.=" Free found ";
        $access="granted";
        }
      }
    }
  }
if($windowLocation == "http://www.corepassion.com/"){
  $dbugStr.=" Homepage found ";
  $protected="false";
  $access="granted";
  }
$iqString="SELECT * FROM gravityTokens WHERE userId = ".$userId." AND url = '".$windowLocation."'";
   $dbugStr.=' iqString=' . $iqString;

    $iqResult = $mysqli->query($iqString);
    if($iqResult !== false ) {
      while ($record = $iqResult->fetch_assoc()) {
        $gf_token.=$record["token"];
        $dbugStr.=' found token=' . $gf_token;
        }
      }



$dbugStr.=' isAdmin='.$isAdmin;

if($isAdmin == 1){
  $dbugStr.=" always gets access ";
  $access="granted";
  }
echo '{"access":"'.$access.'", "protected":"'.$protected.'", "wpUserLogin":"'.$wpUserLogin.'", "gf_token":"'.$gf_token.'", "dbugStr":"'.$dbugStr.'",  "userId":'.$userId.'}';
