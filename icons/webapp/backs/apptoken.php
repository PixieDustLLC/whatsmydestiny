<?php
//header("Access-Controll-Allow-Origin: *");
$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
// globals
$action="";
$appToken="";
// first get hashes and wpUserMeta into variables
$actionFound=false;
foreach ($_POST as $key => $value){
  if($key == "action"){$action =$value;}
  if($key == "appToken"){$appToken=$value;}
  }
if($action=="saveResults"){
  $actionFound=true;
  $qString="SELECT id ";
  $qString.="FROM users WHERE careerSeekerToken = '".$appToken."'";
  $result = $mysqli->query($qString) or die("Error");
  $userId=0;
  if($result !== false ) { 
    $found=true;
    while ($record = $result ->fetch_assoc()) {
      $userId=$record['id'];
      }
    }
  if($userId==0){
    die("Error no match");
    }

  $fieldsArray= array();
  $valuesArray= array();

  array_push($fieldsArray, "userId");
  array_push($valuesArray, "'".$userId."'");
  array_push($fieldsArray, "yyyymmdd");
  array_push($valuesArray, "'".$_POST['yyyymmdd']."'");
    
  array_push($fieldsArray, "pNum");
  array_push($valuesArray, "'".$_POST['pNum']."'");
  array_push($fieldsArray, "hNum");
  array_push($valuesArray, "'".$_POST['hNum']."'");
  array_push($fieldsArray, "dNum");
  array_push($valuesArray, "'".$_POST['dNum']."'");

  array_push($fieldsArray, "code0");
  array_push($valuesArray, "'".$_POST['code0']."'");
  array_push($fieldsArray, "code1");
  array_push($valuesArray, "'".$_POST['code1']."'");
  array_push($fieldsArray, "code2");
  array_push($valuesArray, "'".$_POST['code2']."'");

  array_push($fieldsArray, "environment");
  array_push($valuesArray, "'".$_POST['environment']."'");
  array_push($fieldsArray, "category");
  array_push($valuesArray, "'".$_POST['category']."'");
  array_push($fieldsArray, "industry");
  array_push($valuesArray, "'".$_POST['industry']."'");
  array_push($fieldsArray, "occupation");
  array_push($valuesArray, "'".$_POST['occupation']."'");
  array_push($fieldsArray, "askString");
  array_push($valuesArray, "'". $mysqli->real_escape_string($_POST['askString']) ."'");


  $refLabelByNum=array("", "pn", "hd", "d", "cp", "t", "v");
  for($ref=1; $ref<=6; $ref++){
    $refLabel=$refLabelByNum[$ref];
    for($i=1; $i<=3; $i++){
      array_push($fieldsArray, $refLabel.$i."id");
      array_push($valuesArray, "'".$_POST[$refLabel.$i."id"]."'");
      array_push($fieldsArray, $refLabel.$i."score");
      array_push($valuesArray, "'".$_POST[$refLabel.$i."score"]."'");
      }
    }
  $fields=implode(", ", $fieldsArray);
  $values=implode(", ", $valuesArray);

  $qString="INSERT INTO careerSeekerResults (".$fields.") VALUES (".$values.")";

  $mysqli->query($qString) or die("result not inserted? " . $qString);
  echo '{"qString":"'.$qString.'", "userId":'.$userId.'}';
  }
if($action=="careerSeekerToken"){
  $actionFound=true;
  $qString="SELECT * ";
  $qString.="FROM users WHERE careerSeekerToken = '".$appToken."'";
  $result = $mysqli->query($qString) or die("Error returnProducts ");
  $stateString='""';
  $userId=0;
  $wpDisplayName="";
  $isAssessed=0;
  if($result !== false ) { 
    $found=true;
    while ($record = $result ->fetch_assoc()) {
      $isAssessed=$record['isAssessed'];
      if($isAssessed==1){
        $stateString=$record['stateObj'];
        //if($stateString==''){$stateString='""';}
        }
      $userId=$record['id'];
      $wpDisplayName=$record['wpDisplayName'];
      }
    }
  echo '{"wpDisplayName":"'.$wpDisplayName.'", "state":'.$stateString.', "isAssessed":'.$isAssessed.', "userId":'.$userId.'}';
  }
if($actionFound==false){
  echo 'INVALID REQUEST';
  }
