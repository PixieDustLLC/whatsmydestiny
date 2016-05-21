<?php

$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');

$returnStack = array();
$errorStack=array();
$debugStack=array();
$messagesStack=array();
$loginStack= array();
$postStack= array();
$wpUserMeta=array ();
$action="";
$sessionHashAction="";
$sessionHashId="";
$sessionUserId=0;
$sessionEmail="";
$sessionIsAdmin=0;
$loggedInUserObject=array();

// first get hashes and wpUserMeta into variables
foreach ($_POST as $key => $value){
  if($key == "action"){$action =$value;}
  if(!(strpos($key, "wpUser")===false)){$wpUserMeta[$key]=$value;}
  $fieldString='"' .htmlspecialchars($key). '":"' .htmlspecialchars($value).'"';
  //echo $fieldString;
  array_push($postStack, $fieldString);
  }
$postString='"post":{' . implode(", ", $postStack) . '}';
array_push($returnStack, $postString);

// check for session
session_start();
readSession();

if($sessionUserId == 0){//extant session no
  if($action != "login"){//not login and no session so error
    if($action=="hashSession"){
      insertHashSession($_POST['hashAction'], $_POST['hashId']);
      }
    else{
      array_push($errorStack, '"ERROR no session, should be action=login"');
      }
    }
  else{//action==login
    array_push($debugStack, '"attempt login"');
    $records=returnUsersWhereEmail($wpUserMeta['wpUserEmail']);
    if(count($records)==0){// post email has record no
      array_push($debugStack, '"insert user"');
      insertUser($_POST['nowYYYYMMDD']);
      $records=returnUsersWhereEmail($wpUserMeta['wpUserEmail']);
      if(count($records)>0){
        $loggedInUserObject=$records[0];
        array_push($messagesStack, '"user created"');
        }
      else{// no record error
        array_push($errorStack, '"ERROR session email has no record"');
        }
      }
    else{// post email has record yes
      $loggedInUserObject=$records[0];
      array_push($debugStack, '"extant user"');
      }
    //set globals to record?
    array_push($debugStack, '"insert session"');
    insertSession($_POST['nowYYYYMMDD']);
    }
  }
else{//extant session
  array_push($debugStack, '"extant session"');

  $records=returnUsersWhereEmail($sessionEmail);
  if(count($records)==0){// session  has record no
    // error
    array_push($errorStack, '"ERROR session email has no record"');
    }
  else{
    if($sessionEmail==$wpUserMeta['wpUserEmail']){
      $loggedInUserObject=$records[0];

      array_push($debugStack, '"extant session logged in "');
      if($_POST['hashAction']=="accept"){
        attemptAcceptItem($_POST['hashId']);
        }

      }
    else{
      array_push($errorStack, '"ERROR session email mismatch wpUserMeta"');
      }
    }
  }
$myUsersList=array();
$usersList=array();


if(count($errorStack)==0){// can return data
  $loginString='"login":[' . implode(", ", $loginStack) . ']';
  array_push($returnStack, $loginString);

  $irResult=returnOpenUserReceipts();
  $receiptsString='"receipts":'.json_encode($irResult);
  array_push($returnStack, $receiptsString);
  foreach($irResult as $receipt){
    processReceipt($receipt);
    }
  // seek and accept inviteEmails matching user email// gifts or invites
  $ir=returnItemsWhere("inviteEmail", $sessionEmail);
  foreach($irResult as $item){
    attemptAcceptItem($item['id']);
    }
  $iqResult = returnUnusedGiftsOfUser($sessionUserId);
  $loggedInUserObject['unusedGifts']=count($iqResult);

  $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
  $loggedInUserObject['unusedInvites']=count($iqResult);


  array_push($debugStack, '"action='.$action.'"');

  if($action=="updateProfile"){
    array_push($debugStack, '"updateProfile"');
    $qString="UPDATE users SET ";
    $qString.="`company` = '".$_POST['company']."', ";
    $qString.="`website` = '".$_POST['website']."', ";
    $qString.="`phone` = '".$_POST['phone']."'";
    $qString.=" WHERE id = ".$sessionUserId;
    $mysqli->query($qString) or die("passions not updated? ".$qString);
    $loggedInUserObject['company']=$_POST['company'];
    $loggedInUserObject['website']=$_POST['website'];
    $loggedInUserObject['phone']=$_POST['phone'];
    array_push($messagesStack, '"Profile updated"');
    }
/*
passions not updated? UPDATE users SET research = '91', creativity = '90', mastership = '85', partnership = '82', enlightenment = '80', recognition = '79', service = '77', form = '77', change = '74', compassion = '71', power = '70' WHERE id = 18
*/

/*moved to item, in progress
  if($action=="toggleBlind"){
    $qString="UPDATE users SET isBlind = ".$_POST['isBlind']." WHERE id = ".$_POST['userId'];
    array_push($debugStack, '"'.$qString.'"');
    $mysqli->query($qString) or die("isBlind not updated? ");
    }
*/

  if($sessionIsAdmin==1){
    if($action=="assignConsultant"){
      $qString="UPDATE users SET consultantUserId = ".$_POST['consultantUserId']." WHERE id = ".$_POST['userId'];
      //array_push($debugStack, '"'.$qString.'"');
      $mysqli->query($qString) or die("consultantUserId not updated? ");
      }
    if($action=="toggleConsultant"){
      $qString="UPDATE users SET isConsultant = ".$_POST['isConsultant']." WHERE id = ".$_POST['userId'];
      //array_push($debugStack, '"'.$qString.'"');
      $mysqli->query($qString) or die("isConsultant not updated? ");
      if($_POST['isConsultant']==0){
        $qString="UPDATE users SET consultantUserId = 0 WHERE consultantUserId=".$_POST['userId'];
        //array_push($debugStack, '"'.$qString.'"');
        $mysqli->query($qString) or die("consultantUserId matches not cleared? ");
        }
      }
    if($action=="login"){
      $usersList=array();
      }
    if(($action=="searchUsers")||($action=="assignConsultant")||($action=="toggleConsultant")){
      $usersList=returnUsersWhereFilter($_POST['filterString']);
      }
    }
  if($action=="createTeam"){
    $qString="INSERT INTO teams ";
    $qString.="(teamName, creatorUserId) VALUES ";
    $qString.="('".$_POST['newName']."', '".$loggedInUserObject["id"]."')";
    $mysqli->query($qString) or die("team not inserted? " . $loggedInUserObject["id"]);
    array_push($messagesStack, '"new team created"');
    }
  if($action=="deleteTeam"){
    $qString="DELETE FROM teamMembers ";
    $qString.="WHERE teamId =". $_POST['teamId'];
    $mysqli->query($qString) or die("members not deleted? " . $_POST['teamId']);
    array_push($debugStack, '"team member deleted"');
 
    $qString="DELETE FROM teams ";
    $qString.="WHERE id = ". $_POST['teamId'];
    $mysqli->query($qString) or die("team not deleted? " . $_POST['teamId']);
    array_push($messagesStack, '"removed team '.$_POST['teamId']. '"');
    }
  if($action=="resortMembers"){
    $sortedArray=json_decode($_POST['sortedArray']);
    foreach($sortedArray as $member){
      array_push($debugStack, '"member['. $member->id .'] to '.$member->sortNum. '"');
      $qString="UPDATE teamMembers SET sortNum = '".$member->sortNum."' WHERE teamId = ".$member->teamId . " AND memberUserId = ".$member->memberUserId;
      $mysqli->query($qString) or die("member sortNum not updated? ".$qString); 
      }
    }
  if($action=="swapMembers"){
    array_push($debugStack, '"swapMembers ran"');
    $qString ="UPDATE teamMembers SET sortNum = '". $_POST['swapSortNum'] ."'";
    $qString.=" WHERE teamId = ". $_POST['teamId'] . " AND memberUserId = ". $_POST['memberUserId'] ;
    array_push($debugStack, '"swapMembers '.$qString.'"');
    $mysqli->query($qString) or die("member sortNum not updated? ".$qString); 
    $qString ="UPDATE teamMembers SET sortNum = '". $_POST['memberSortNum'] ."'";
    $qString.=" WHERE teamId = ". $_POST['teamId'] . " AND memberUserId = ". $_POST['swapUserId'] ;
      array_push($debugStack, '"swapMembers '.$qString.'"');
    $mysqli->query($qString) or die("swap sortNum not updated? ".$qString); 

    }
  if($action=="removeTeamMember"){
    $qString="DELETE FROM teamMembers ";
    $qString.="WHERE memberUserId =". $_POST['memberUserId'];
    $qString.=" AND teamId =". $_POST['teamId'];
    $mysqli->query($qString) or die("member not dropped? " . $_POST['memberUserId']);
    array_push($debugStack, '"removed member '.$_POST['memberUserId'].' from '.$_POST['teamId']. '"');
    }
  if($action=="addTeamMember"){
    $qString="INSERT INTO teamMembers ";
    $qString.="(memberUserId, teamId) VALUES ";
    $qString.="('".$_POST['memberUserId']."', '".$_POST['teamId']."')";
    $mysqli->query($qString) or die("member not inserted? " . $_POST['userId']);
    array_push($debugStack, '"add member '.$_POST['memberUserId'].' to '.$_POST['teamId']. '"');
    }
  if(($action=="login")||($action=="createTeam")||($action=="deleteTeam")||($action=="resortMembers")||($action=="swapMembers")||($action=="addTeamMember")||($action=="removeTeamMember")||($action=="assignConsultant")){
    $teamsList=returnTeamsWhereConsultant($sessionUserId);
    $teamsString='"teamsList":' .json_encode($teamsList);
    array_push($returnStack, $teamsString);
    $membersList=returnTeamMembersWhereConsultant($sessionUserId);
    $membersString='"membersList":' .json_encode($membersList);
    array_push($returnStack, $membersString);
    array_push($debugStack, '"pop myUsersList ' .$sessionUserId.'"');
    $myUsersList=returnUsersWhereConsultant($sessionUserId);
    }
  if($action=="login"){
    $productsList=returnProducts();
    $productsString='"productsList":' .json_encode($productsList);
    array_push($returnStack, $productsString);
    }
  if($action=="grant"){
    // create items
    array_push($debugStack, '"grant"');
    if($_POST['disposition']=="gift"){
      // create item, grants only one.
      insertItem($_POST['sku'], $_POST['productId'], 'gift', $_POST['targetUserId'], 0, 0, '');
      // giftEmail
      // happens later
      array_push($messagesStack, '"Granted one gift '.$_POST['targetUserId']. '"');
      $iqResult = returnUnusedGiftsOfUser($sessionUserId);
      $loggedInUserObject['unusedGifts']=count($iqResult);
      }      
    if($_POST['disposition']=="invite"){
      for ($i=0; $i<$_POST['units']; $i++){
        insertItem($_POST['sku'], $_POST['productId'], 'grant', $sessionUserId, $_POST['targetUserId'], 0, '');
        }
      array_push($messagesStack, '"Granted '.$_POST['units']. ' invites to '.$_POST['targetUserId']. '"');
      $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
      $loggedInUserObject['unusedInvites']=count($iqResult);
      }

    
    $productsList=returnProducts();
    $productsString='"productsList":' .json_encode($productsList);
    array_push($returnStack, $productsString);
    }
/*
Login: invitations@corepassionlife.com (use the whole thing!)
Password: ZAZb3McF

Username: fsODJHSDFIAGSF //sandbox?
Password: yQN7sa7D6JMJ
*/
  if($action=="sendGift"){
    $item=returnFirstUnusedGift();
    $message = "You have a gift waiting for you at corepassionlife.com. Click to accept ". $item['sku'] ."\r\n http://corepassionlife.com/?page_id=66#id=".$item['id']."&action=accept";
    $headers = 'From: invitation@corepassionlife.com';

    $subject='Gift Notification from Core Passion Life';
    if(@mail($_POST['giftEmail'], $subject, $message, $headers)){
      $res="Mail Sent Successfully to:".$_POST['giftEmail'];
      updateItemKeyValue($item['id'], "inviteEmail", $_POST['giftEmail']);
      $iqResult = returnUnusedGiftsOfUser($sessionUserId);
      $loggedInUserObject['unusedGifts']=count($iqResult);
      }
    else{
      $res= "Mail Not Sent to:".$_POST['giftEmail'];
      }
    array_push($messagesStack, '"'.$res.'"');

    }
  if($action=="unsendGift"){
    $item=returnItemWhere("inviteEmail", $_POST['ungiftEmail']);
    updateItemKeyValue($item['id'], "inviteEmail", '');
    $iqResult = returnUnusedGiftsOfUser($sessionUserId);
    $loggedInUserObject['unusedGifts']=count($iqResult);
    }

  if($action=="sendInvite"){
//$pieces = explode(" ", $pizza);comma sep multiples.
//use consultant email for replyto

    $item=returnFirstUnusedInvite();
    $message = $_POST['inviteMessage'];
    $message .= " Click to accept ". $item['sku'] ."\r\n http://corepassionlife.com/?page_id=66#id=".$item['id']."&action=accept";
    $headers = 'From: invitation@corepassionlife.com';
    //$headers = 'From: invitation@corepassionlife.com' . "\r\n" .
    //'Reply-To: invitation@corepassionlife.com' . "\r\n" .
    //'X-Mailer: PHP/' . phpversion();

    //if(@mail($item['inviteEmail'], 'Invitation to Core Passion Life', $message, $headers, '-finvitation@corepassionlife.com')){
    $subject='Invitation to Core Passion Life';
    if(@mail($_POST['inviteEmail'], $subject, $message, $headers)){
      $res="Mail Sent Successfully to:".$_POST['inviteEmail'];
      updateItemKeyValue($item['id'], "inviteEmail", $_POST['inviteEmail']);
      updateItemKeyValue($item['id'], "isBlind", $_POST['inviteBlind']);
      $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
      $loggedInUserObject['unusedInvites']=count($iqResult);
      }
    else{
      $res= "Mail Not Sent";
      }
    //array_push($debugStack, '"'.$res.' inviteEmail:'.$_POST['inviteEmail'].' subject:'.$subject.' message:'.$message.' '.$headers.'"');
    array_push($messagesStack, '"'.$res.'"');
    
    }
  if($action=="unsendInvite"){
    $item=returnItemWhere("inviteEmail", $_POST['uninviteEmail']);
    updateItemKeyValue($item['id'], "inviteEmail", '');
    $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
    $loggedInUserObject['unusedInvites']=count($iqResult);
    }
  $consultantsList=array();
  if($sessionIsAdmin==1){
    $consultantsList=returnUsersWhereIsConsultant(1);
    }
  $consultantsString='"consultantsList":' .json_encode($consultantsList);
  array_push($returnStack, $consultantsString);

  $pendingInvitesList=array();
  if($loggedInUserObject['isConsultant']==1){
    $pendingInvitesList = returnPendingInvitesOfConsultant($sessionUserId);
    }
  $pendingString='"pendingInvitesList":' .json_encode($pendingInvitesList);
  array_push($returnStack, $pendingString);

  $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
  $loggedInUserObject['unusedInvites']=count($iqResult);


  $redeemInvites=returnItemsWhere("inviteEmail", $sessionEmail);
  foreach($redeemInvites as $invite){
    array_push($debugStack, '"redeem id:'.$invite['id'].'"');
    attemptAcceptItem($invite['id']);
    }
 
  if($action=="prioritizeItemId"){
    array_push($debugStack, '"store state"'); 
    updateUserKeyValue($sessionUserId, "assessmentItemId", $_POST['itemId']);
    $loggedInUserObject['assessmentItemId']=$_POST['itemId'];
    $thisItem=returnItemWhere("id", $_POST['itemId']);
    $itemStateObj=$thisItem['stateObj'];
    updateUserKeyValue($sessionUserId, "stateObj", $itemStateObj);
    updateUserKeyValue($sessionUserId, "isAssessed", 1);
    $loggedInUserObject['isAssessed']=1;
    }
  if($action=="storeState"){
    array_push($debugStack, '"store state"'); 
    $itemArray=returnItemsWhere("id", $_POST['itemId']);
    if(count($itemArray)>0){
      $item=$itemArray[0];
      if($item['consumerUserId']==$sessionUserId){
        updateItemKeyValue($_POST['itemId'], "stateObj", $_POST['stateObj']);
        updateItemKeyValue($_POST['itemId'], "updatedYYYYMMDD", $_POST['nowYYYYMMDD']);
        updateItemKeyValue($_POST['itemId'], "consumed", $_POST['consumed']);
        updateItemKeyValue($_POST['itemId'], "completed", $_POST['completed']);
        if($_POST['completed']==1){
          updateUserKeyValue($sessionUserId, "isAssessed", $_POST['isAssessed']);
          $loggedInUserObject["isAssessed"]= $_POST['isAssessed'];
          updateUserKeyValue($sessionUserId, "stateObj", $_POST['stateObj']);
          updateUserKeyValue($sessionUserId, "assessmentItemId", $_POST['itemId']);
          $loggedInUserObject["stateObj"]= $_POST['stateObj'];
          $loggedInUserObject["assessmentItemId"]= $_POST['itemId'];
          }
        }
      else{
        array_push($errorStack, '"ERROR storeState '.$item['consumerUserId']. ' != '.$sessionUserId.'"');
        }
      }
    }
  if($action=="resumeItem"){
    $itemArray=returnItemsWhere("id", $_POST['itemId']);
    if(count($itemArray)>0){
      $item=$itemArray[0];
      if($item['consumerUserId']==$sessionUserId){
        $stateString='"stateObj":' .$item['stateObj'].'';
        array_push($returnStack, $stateString);
        }
      else{
        array_push($errorStack, '"ERROR  '.$item['consumerUserId']. ' != '.$sessionUserId.'"');
        }
      }
    }

  $loggedInUserObject['items']=returnItemsWhere("consumerUserId", $sessionUserId);

  $loggedInUserObject['messages']=$messagesStack;

  $pendingGiftsList = returnPendingGiftsOfUser($sessionUserId);
  $pendingString='"pendingGiftsList":' .json_encode($pendingGiftsList);
  array_push($returnStack, $pendingString);


  $userString='"user":' .json_encode($loggedInUserObject);
  array_push($returnStack, $userString);

  $usersString='"usersList":' .json_encode($usersList);
  array_push($returnStack, $usersString);

  $myUsersString='"myUsersList":' .json_encode($myUsersList);
  array_push($returnStack, $myUsersString);


  }// end of valid session, can return data

$debugString='"debug":[' . implode(", ", $debugStack) . ']';
array_push($returnStack, $debugString);
$errorString='"errors":[' . implode(", ", $errorStack) . ']';
array_push($returnStack, $errorString);

$returnString='{'.implode(", ", $returnStack).'}';
echo $returnString;


function updateReceiptKeyValue($transId, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE receipt '.$transId.' SET '.$key.'='.$value.'"');
  $qString="UPDATE receipts SET ".$key." = '".$value."' WHERE x_trans_id = ".$transId;
  $mysqli->query($qString) or die("receipt not updated? ".$qString); 
  }
function updateItemKeyValue($id, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE item '.$id.' SET '.$key.'"');
  $qString="UPDATE items SET ".$key." = '".$value."' WHERE id = ".$id;
  $mysqli->query($qString) or die("item not updated? ".$qString); 
  }
function updateUserKeyValue($id, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE user '.$id.' SET '.$key.'"');
  $qString="UPDATE users SET ".$key." = '".$value."' WHERE id = ".$id;
  $mysqli->query($qString) or die("user not updated? ".$qString); 
  }
function insertItem($sku, $productId, $receiptTransaction, $creatorUserId, $consultantUserId, $consumerUserId, $inviteEmail){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"insert item"');
  $qString="INSERT INTO items ";
  $qString.="(sku, productId, receiptTransaction, creatorUserId, consultantUserId, consumerUserId, stateObj, inviteEmail) VALUES ";
  $qString.="('".$sku."', ";
  $qString.="'". $productId."', ";
  $qString.="'". $receiptTransaction."', ";
  $qString.="'". $creatorUserId."', ";
  $qString.="'". $consultantUserId."', ";
  $qString.="'". $consumerUserId."', ";
  $qString.="'{}', ";
  $qString.="'". $inviteEmail."') ";
  $mysqli->query($qString) or die("item not inserted?"); 
  }

function insertHashSession($hashAction, $hashId){
  global $mysqli;
  global $debugStack;

  $qString="INSERT INTO hashSessions ";
  $qString.="(sessionId, hashAction, hashId) VALUES ";
  $qString.="('".session_id()."', ";
  $qString.="'".$hashAction."', ";
  $qString.="'".$hashId."')";
  $mysqli->query($qString) or die("hash session not inserted? " .session_id(). " " . $hashAction);
  array_push($debugStack, '"new hash session created"');
  }
function processReceipt($receipt){
  global $mysqli;
  global $messagesStack;
  global $loggedInUserObject;
  if($receipt['disposition']==""){
    array_push($messagesStack, "You purchased one ".$receipt['name']);
    insertItem($receipt['sku'], $receipt['id'], $receipt['x_trans_id'], $loggedInUserObject['id'], $loggedInUserObject['consultantUserId'], $loggedInUserObject['id'], "");    
    updateReceiptKeyValue($receipt['x_trans_id'], "itemCreated", 1);
    }
  if($receipt['disposition']=="Gift"){
    array_push($messagesStack, "You purchased  one ".$receipt['name']. " to gift");
    insertItem($receipt['sku'], $receipt['id'], $receipt['x_trans_id'], $loggedInUserObject['id'], 0, 0, "");    
    updateReceiptKeyValue($receipt['x_trans_id'], "itemCreated", 1);
    }
  if($receipt['disposition']=="Invite"){
    array_push($messagesStack, "You purchased ".$receipt['units']." ".$receipt['name']. " to invite");
    for($u=0; $u<$receipt['units']; $u++){
      insertItem($receipt['sku'], $receipt['id'], $receipt['x_trans_id'], $loggedInUserObject['id'], $loggedInUserObject['id'], 0, "");    
      }
    updateReceiptKeyValue($receipt['x_trans_id'], "itemCreated", 1);
    }
  }
//insertItem($sku, $productId, $receiptTransaction, $creatorUserId, $consultantUserId, $consumerUserId, $inviteEmail){
  
function attemptAcceptItem($itemId){
  global $debugStack;
  global $messagesStack;
  global $loggedInUserObject;
  $item=returnItemWhere("id", $itemId);
  if($item['inviteEmail'] == $loggedInUserObject["email"]){
    array_push($messagesStack, '"item accepted for '.$loggedInUserObject["email"].'"');
    // so update item
    updateItemKeyValue($itemId, "inviteEmail", "");
    updateItemKeyValue($itemId, "consumerUserId", $loggedInUserObject["id"]);
    }
  else{
    array_push($debugStack, '"item '.$item['inviteEmail'].' email mismatches. '.$loggedInUserObject["email"].'"');
    // so error
    }
  }
//$_POST['hashAction'], $_POST['hashId']
function insertSession($yyyymmdd){
  global $mysqli;
  global $wpUserMeta;
  global $loggedInUserObject;
  global $sessionUserId;
  global $sessionHashId;
  global $sessionHashAction;
  global $sessionEmail;//100
  global $sessionIsAdmin;
  global $debugStack;
  $hashSessions=readHashSessions();
  $qString="INSERT INTO sessions ";
  $qString.="(sessionId, hashAction, hashId, userId, email, isAdmin, sessionYYYYMMDD) VALUES ";
  $qString.="('".session_id()."', ";
  $qString.="'".$sessionHashAction."', ";
  $qString.="'".$sessionHashId."', ";
  $qString.="'".$loggedInUserObject["id"]."', ";
  $qString.="'".$loggedInUserObject["email"]."', ";
  $qString.="'".$loggedInUserObject["isAdmin"]."', ";
  $qString.="'".$yyyymmdd."')";
  $mysqli->query($qString) or die("session not inserted? " .session_id(). " " . $loggedInUserObject["id"]);
  array_push($debugStack, '"new session created"');
  $sessionUserId=$loggedInUserObject["id"];
  $sessionEmail=$loggedInUserObject["email"];
  $sessionIsAdmin=$loggedInUserObject["isAdmin"];
  }

function readHashSessions(){
  global $mysqli;
  global $sessionUserId;
  global $sessionHashAction;
  global $sessionHashId;
  global $sessionEmail;
  global $sessionIsAdmin;
  global $debugStack;
  global $wpUserMeta;
  $hashSessions=array();
  $qString="SELECT * FROM hashSessions WHERE sessionId='" . session_id(). "'";
  $sessionResult = $mysqli->query($qString) or die("Error reading hash session " .session_id());
  $sessionHashId=0;
  $sessionHashAction="";
  while ($session = $sessionResult->fetch_assoc()) {
    $sessionHashId=$session['hashId'];
    $sessionHashAction=$session['hashAction'];
    array_push($hashSessions, $session);
    array_push($debugStack, '"read hash session. '.$sessionHashAction.' '.$sessionHashId.'"');
    }
  return $hashSessions;
  }

function insertUser($yyyymmdd){
  global $mysqli;
  global $wpUserMeta;
  $isAdmin=0;
  $isConsultant=0;
  if($wpUserMeta['wpUserLevel'] ==10){$isAdmin=1;}
  if($wpUserMeta['wpUserLevel'] ==10){$isConsultant=1;}
  $qString="INSERT INTO users ";
  $qString.="(wpDisplayName, email, wpLogin, firstName, lastName, isAdmin, isConsultant, createdYYYYMMDD) VALUES";
  $qString.="('".$wpUserMeta['wpUserDisplayName']."', ";
  $qString.="'".$wpUserMeta['wpUserEmail']."', ";
  $qString.="'".$wpUserMeta['wpUserLogin']."', ";
  $qString.="'".$wpUserMeta['wpUserFirstName']."', ";
  $qString.="'".$wpUserMeta['wpUserLastName']."', ";
  $qString.="'".$isAdmin."', '".$isConsultant."', '" . $yyyymmdd . "') ";
  $mysqli->query($qString) or die("users not inserted?"); 
  }
function readSession(){
  global $mysqli;
  global $sessionUserId;
  global $sessionHashAction;
  global $sessionHashId;
  global $sessionEmail;
  global $sessionIsAdmin;
  global $debugStack;
  global $wpUserMeta;
  $qString="SELECT * FROM sessions WHERE sessionId='" . session_id(). "'";
  $sessionResult = $mysqli->query($qString) or die("Error reading session " .session_id());
  $sessionUserId=0;
  $sessionEmail="";
  $sessionIsAdmin=0;
  while ($sessions = $sessionResult->fetch_assoc()) {
    $sessionUserId=$sessions[userId];
    $sessionEmail=$sessions[email];
    $sessionIsAdmin=$sessions[isAdmin];
    array_push($debugStack, '"read extant session."');
    }
  }

function returnTeamsWhereConsultant($consultantUserId){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $teams= array();

  $qString="SELECT * ";
  $qString.="FROM teams ";
  $qString.="WHERE creatorUserId = ". $consultantUserId;
  $result = $mysqli->query($qString) or die("Error teams " . $consultantUserId);
  while ($record = $result->fetch_assoc()) {
    array_push($teams, $record);
    }
  return $teams;
  }
function returnProducts(){
  global $loggedInUserObject;
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $debugStack;
  global $errorStack;
  $products= array();
  
  $qString="SELECT * ";
  $qString.="FROM products";
  $result = $mysqli->query($qString) or die("Error returnProducts ");
  while ($record = $result->fetch_assoc()) {

    $mayView=0;
    if($sessionIsAdmin==1){
      array_push($debugStack, '"Admin Products"');
      $mayView=1;
      if($record["consultantMayView"]==1){
        //$mayView=0;
        }
      }
    else{
      if($loggedInUserObject["isConsultant"]==1){ 
        if($record["consultantMayView"]==1){
          array_push($debugStack, '"Consultant Products"');
          $mayView=1;
          }
        }
      else{// not consultant or admin, so is user
        if($record["userMayView"]==1){
          array_push($debugStack, '"User Products"');
          $mayView=1;
          }
        }
      }
    if($mayView==1){
      array_push($products, $record);
      }
    }
  return $products;
  }

function returnTeamMembersWhereConsultant($consultantUserId){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $teamMembers= array();

  $qString="SELECT teamMembers.memberUserId, teamMembers.sortNum, teamMembers.teamId, teams.teamName, teams.creatorUserId ";
  $qString.="FROM teamMembers ";
  $qString.="INNER JOIN teams on teamMembers.teamId = teams.id ";
  
  $qString.="WHERE creatorUserId = ". $consultantUserId;
  $result = $mysqli->query($qString) or die("Error teamMembers " . $consultantUserId);
  while ($record = $result->fetch_assoc()) {
    array_push($teamMembers, $record);
    }
  return $teamMembers;
  }
function returnUsersWhereConsultant($consultantUserId){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $users=array();
  $qString="SELECT * FROM users WHERE consultantUserId = ". $consultantUserId;
  $result = $mysqli->query($qString);
  while ($record = $result->fetch_assoc()) {
    array_push($users, $record);
    }
  return $users;
  }
function returnUsersWhereIsConsultant($val){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  global $debugStack;
  $users=array();
  $qString="SELECT * FROM users WHERE isConsultant = ". $val;
  $result = $mysqli->query($qString);
  while ($record = $result->fetch_assoc()) {
    //array_push($debugStack, '"'.$record['id'].'"');
    $iqResult = returnUnusedInvitesOfConsultant($record['id']);
    $record['unusedInvites']=count($iqResult);
    array_push($users, $record);
    }
  return $users;
  }

function returnOpenUserReceipts(){
  global $loggedInUserObject;
  global $mysqli;
  $iqString="SELECT products.*, receipts.x_trans_id, receipts.x_email, receipts.x_catalog_link_id FROM receipts INNER JOIN products ON receipts.x_catalog_link_id = products.catalogLinkId WHERE receipts.itemCreated = 0 AND receipts.x_email = '".$loggedInUserObject['email']."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }


function returnItemWhere($key, $value){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE items.".$key." = '".$value."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray[0];
  }

function returnItemsWhere($key, $value){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE items.".$key." = '".$value."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }










function returnFirstUnusedGift(){
  global $sessionUserId;
  $unusedItems=returnUnusedGiftsOfUser($sessionUserId);
  return $unusedItems[0];
  }
function returnUnusedGiftsOfUser($userId){
  global $mysqli;
  global $debugStack;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail = '' AND consultantUserId = 0 AND creatorUserId = " . $userId;
  //array_push($debugStack, '"'.$iqString.'"');
    $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }
function returnPendingGiftsOfUser($userId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail != '' AND consultantUserId = 0 AND creatorUserId = " . $userId;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }


function returnFirstUnusedInvite(){
  global $sessionUserId;
  $unusedItems=returnUnusedInvitesOfConsultant($sessionUserId);
  return $unusedItems[0];
  }
function returnUnusedInvitesOfConsultant($consultantUserId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail = '' AND consultantUserId = " . $consultantUserId;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }
function returnPendingInvitesOfConsultant($consultantUserId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail != '' AND consultantUserId = " . $consultantUserId;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  while ($record = $iqResult->fetch_assoc()) {
    array_push($resultArray, $record);
    }
  return $resultArray;
  }





function returnAcceptedInvitesOfConsultant($consultantUserId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId != 0 AND inviteEmail = '' AND consultantUserId = " . $consultantUserId;
  $iqResult = $mysqli->query($iqString);
  return $iqResult;
  }

function returnUsersWhereEmail($email){//returns one or matches in array.
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $users=array();
  if($email == ""){
    if($sessionIsAdmin==1){
      $qString="SELECT * FROM users";
      }
    else{// WTF
      $qString="SELECT * FROM users WHERE email='error'";
      array_push($errorStack, '"ERROR not admin requested users"');
      }
    }
  else{
    $qString="SELECT * FROM users WHERE email='" . $email . "'";
    }
  $result = $mysqli->query($qString);
  while ($record = $result->fetch_assoc()) {
    if($record['consultantUserId']==0){
      array_unshift($users, $record);
      }
    else{
      array_push($users, $record);
      }
    }
  return $users;
  }
function returnUsersWhereFilter($filter){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $users=array();
  if($filter != ""){
    $qString="SELECT * FROM users WHERE firstName LIKE '%".$filter."%' OR lastName LIKE '%".$filter."%' ";
    }
  $result = $mysqli->query($qString);
  while ($record = $result->fetch_assoc()) {
    if($record['consultantUserId']==0){
      array_unshift($users, $record);
      }
    else{
      array_push($users, $record);
      }
    }
  return $users;
  }

?>