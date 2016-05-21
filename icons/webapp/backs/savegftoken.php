<?php
// loaded using footer php in organic-purpose/
$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
// globals
$dbugStr="dbugStr ";
$gf_token="";
$userId="";
$windowLocation="";
// first get hashes and wpUserMeta into variables
foreach ($_POST as $key => $value){
  if($key == "userId"){$userId=$value;}
  if($key == "gf_token"){$gf_token=$value;}
  if($key == "windowLocation"){$windowLocation=$value;}
  }
$dbugStr.=$userID.' '.windowLocation.' '.$gf_token;

$iqString="SELECT * FROM gravityTokens WHERE userId = ".$userId." AND url = '".$windowLocation."'";
  $dbugStr.=' iqString=' . $iqString;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }  
  
  $dbugStr.=' count($resultArray)='.count($resultArray); 
  if(count($resultArray) >0){
    $qString="UPDATE gravityTokens SET ";
    $qString.="`token` = '".$gf_token."'";
    $qString.=" WHERE userId = ".$userId."  AND url = '".$windowLocation."'";
    $dbugStr.='  update token: '.$qString;
    $mysqli->query($qString) or die("token not updated? ".$qString);
    }
  else{
    $qString="INSERT INTO gravityTokens ";
    $qString.="(userId, url, token) VALUES ";
    $qString.="(".$userId.", '".$windowLocation."', '".$gf_token."')";
    $mysqli->query($qString) or die("token  not inserted? ".$qString);
    $dbugStr.=' new draft token created ';
    }
echo '{"stored":"true", "dbugStr":"'.$dbugStr.'"}';
