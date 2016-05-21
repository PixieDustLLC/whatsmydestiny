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
$myItems=array();
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
    $items=returnItemsWhere("consumerUserId", $userId);
    $item='{"name":"myCorePassion", "linkUrl":"http://corepassion.com/web-app"}';
    array_push($myItems, $item);    
    foreach($items as $theObj){
      if($theObj['deliverable'] != "cpa"){
        $item='{"name":"'.$theObj['name'].'", "linkUrl":"'.$theObj['linkUrl'].'"}';
        array_push($myItems, $item);
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

function returnItemsWhere($key, $value){
  global $mysqli;
  global $dbugStr;

  $iqString="SELECT items.*, products.name, products.marketingUrl, products.description, products.deliverable, products.linkUrl, products.productType, products.disposition, products.contentRequiresAssessed FROM items INNER JOIN products ON items.productId = products.id WHERE items.".$key." = '".strtolower ($value)."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  $dbugStr.='returnItemsWhere('.$key.', '.$value.') = '.count($resultArray).'';
  return $resultArray;
  }



$dbugStr.=' isAdmin='.$isAdmin;

if($isAdmin == 1){
  $dbugStr.=" always gets access ";
  $access="granted";
  }
//if($userId == 69){$access="denied";}
echo '{"access":"'.$access.'", "protected":"'.$protected.'", "wpUserLogin":"'.$wpUserLogin.'", "itemCount": '.count($myItems).', "myItems":['.implode(", ", $myItems).'],"gf_token":"'.$gf_token.'", "dbugStr":"'.$dbugStr.'",  "userId":'.$userId.'}';
?>