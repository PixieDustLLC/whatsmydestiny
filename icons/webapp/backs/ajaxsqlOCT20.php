<?php

$mysqli = new mysqli('mysql.corepassionlife.com', 'corepassiondba', '2014Magic', 'corepassion');
//UPDATE items SET `consumerUserId` = `creatorUserId` WHERE `completed` =1 AND `consumerUserId` = 0
// globals
$returnStack = array();
$errorStack=array();
$debugStack=array();
$messagesStack=array();
$loginStack= array();
$postStack= array();
$updateList=array();
$searchIdsList=array();


$wpUserMeta=array();
$action="";
$sessionHashAction="";
$sessionHashId="";
$sessionUserId=0;
$sessionEmail="";
$sessionWpLogin="";
$sessionIsAdmin=0;
$recover="0";
    
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
//array_push($returnStack, $postString);

   

// check for session
session_start();
readSession();
if($sessionUserId == 0){//extant session no
  if($action != "login"){//not login and no session so error
    if($action=="hashSession"){
      insertHashSession($_POST['hashAction'], $_POST['hashId']);
      array_push($errorStack, '"non ERROR iserted hash session  '.$_POST['hashAction'].'"');
      }
    else{
      array_push($errorStack, '"ERROR no session, should be action=login"');
      }
    }
  else{//action==login
    array_push($debugStack, '"attempt login"');
    //$records=returnUsersWhereEmail($wpUserMeta['wpUserEmail']);
    $wpLoginRecords=returnUsersWhereWpLogin($wpUserMeta['wpUserLogin']);
    if(count($wpLoginRecords)==0){// post login has record no
      // is post email in any user records? 
      $emailRecords=returnUsersWhereEmail($wpUserMeta['wpUserEmail']);
      if(count($emailRecords)>0){ // don't allow new user with extant email
        array_push($errorStack, '"ERROR '.$wpUserMeta['wpUserEmail'].' already in use. Log out, restart your browser and sign in as '.$emailRecords[0].wpLogin.'."');
        }
      else{
        array_push($debugStack, '"insert user"');
        insertUser($_POST['nowYYYYMMDD']);
        $wpLoginRecords=returnUsersWhereWpLogin($wpUserMeta['wpUserLogin']);
        if(count($wpLoginRecords)>0){
          $loggedInUserObject=$wpLoginRecords[0];
          array_push($messagesStack, '"user created"');
          }
        else{// no record error. should never
          array_push($errorStack, '"ERROR wpLogin has no user record created"');
          }
        }
      } // 
    else{// post wpUserLogin has record yes
      $loggedInUserObject=$wpLoginRecords[0];
      if($loggedInUserObject['email'] != $wpUserMeta['wpUserEmail']){
        array_push($messagesStack, '"wpUserEmail= '.$wpUserMeta['wpUserEmail'].' user.email='.$loggedInUserObject['email'].'"');
        // check to see if email already exists.  
        $emailRecords=returnUsersWhereEmail($wpUserMeta['wpUserEmail']);
        if(count($emailRecords)>0){// if yes, fail message
          array_push($errorStack, '"ERROR '.$wpUserMeta['wpUserEmail'].' already in use. Log out, restart your browser and sign in as '.$emailRecords[0].wpLogin.'."');
          }
        else{
          array_push($messagesStack, '"update user email'.$wpUserMeta['wpUserEmail'].'"');
          $qString="UPDATE users SET ";
          $qString.="`email` = '".$wpUserMeta['wpUserEmail']."'";
          $qString.=" WHERE id = ".$loggedInUserObject['id'];
          $mysqli->query($qString) or die("user email not updated? ".$qString);
          array_push($debugStack, '" updated email '.$qString.'"');
          }
        }
      array_push($debugStack, '"extant user"');
      }
    array_push($debugStack, '"insert session"');
    insertSession($_POST['nowYYYYMMDD']);
    }
  }
else{//extant session
  array_push($debugStack, '"extant session"');



 $records=returnUsersWhereWpLogin($sessionWpLogin);




  if(count($records)==0){// session  has record no
    array_push($errorStack, '"ERROR session email has no record"');
    }
  else{
    if($sessionWpLogin==$wpUserMeta['wpUserLogin']){
      $loggedInUserObject=$records[0];
      array_push($debugStack, '"extant session logged in "');
      if($_POST['hashAction']=="accept"){
        attemptAcceptItem($_POST['hashId']);
        }
      }
    else{
      array_push($errorStack, '"ERROR session wpLogin '.$sessionWpLogin .' mismatch wpUserMeta[wpUserLogin]'.$wpUserMeta['wpUserLogin'].'"');
      }
    }
  }





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
  $ir=returnItemsWhere("inviteEmail", strtolower($sessionEmail));
  foreach($irResult as $item){
    attemptAcceptItem($item['id']);
    }
  $iqResult = returnUnusedGiftsOfUser($sessionUserId);
  $loggedInUserObject['unusedGifts']=count($iqResult);

  $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
  $loggedInUserObject['unusedInvites']=count($iqResult);


  array_push($debugStack, '"action='.$action.'"');

  if($action=="login"){
    $isAdmin=0;
    $isConsultant=0;
    if(($wpUserMeta['wpUserDisplayName'] != $loggedInUserObject['wpDisplayName'])||($wpUserMeta['wpUserFirstName'] != $loggedInUserObject['firstName'])||($wpUserMeta['wpUserLastName'] != $loggedInUserObject['lastName'])){

      $qString="UPDATE users SET ";
      $qString.="`firstName` = '".$_POST['wpUserFirstName']."', ";
      $qString.="`lastName` = '".$_POST['wpUserLastName']."', ";
      $qString.="`wpDisplayName` = '".$_POST['wpUserDisplayName']."'";
      $qString.=" WHERE id = ".$sessionUserId;
      array_push($debugStack, '" update name '.$qString.'"');
      $mysqli->query($qString) or die("user fields not updated? ".$qString);
      }
    // give users all consultants until recovery is complete
    //$updateList = array_merge($updateList, returnUsersWhereIsConsultant(1)); 
    }
  // parse
  if($action=="updateUserProfile"){
    array_push($debugStack, '"updateUserProfile"');
    $qString="UPDATE users SET ";
    $qString.="`company` = '".$_POST['company']."', ";
    $qString.="`phone` = '".$_POST['phone']."', ";
    $qString.="`ethnicity_id` = '".$_POST['ethnicity_id']."', ";
    $qString.="`gender_id` = '".$_POST['gender_id']."', ";
    $qString.="`age_id` = '".$_POST['age_id']."', ";
    $qString.="`career_id` = '".$_POST['career_id']."'";
    $qString.=" WHERE id = ".$sessionUserId;
    $mysqli->query($qString) or die("profile not updated? ".$qString);
    $loggedInUserObject['company']=$_POST['company'];
    $loggedInUserObject['phone']=$_POST['phone'];
    $loggedInUserObject['ethnicity_id']=$_POST['ethnicity_id'];
    $loggedInUserObject['gender_id']=$_POST['gender_id'];
    $loggedInUserObject['age_id']=$_POST['age_id'];
    $loggedInUserObject['career_id']=$_POST['career_id'];

    $updateList = array_merge($updateList, returnUsersWhereId($sessionUserId));

    array_push($messagesStack, '"User profile was updated"');
    }
  if($action=="updateConsultantProfile"){
    $inviteText = $mysqli->real_escape_string($_POST['inviteText']);
    //$_POST['inviteText']=parse($_POST['inviteText']);
    array_push($debugStack, '"updateConsultantProfile"');
    $qString="UPDATE users SET ";
    $qString.="`ethnicity_id` = '".$_POST['ethnicity_id']."', ";
    $qString.="`gender_id` = '".$_POST['gender_id']."', ";
    $qString.="`age_id` = '".$_POST['age_id']."', ";
    $qString.="`career_id` = '".$_POST['career_id']."', ";
    $qString.="`company` = '".$_POST['company']."', ";
    $qString.="`website` = '".$_POST['website']."', ";
    $qString.="`phone` = '".$_POST['phone']."', ";
    $qString.="`inviteText` = '".$inviteText."'";
    $qString.=" WHERE id = ".$sessionUserId;
    $mysqli->query($qString) or die("passions not updated? ".$qString);
    $loggedInUserObject['company']=$_POST['company'];
    $loggedInUserObject['website']=$_POST['website'];
    $loggedInUserObject['phone']=$_POST['phone'];
    $loggedInUserObject['inviteText']=$inviteText;
    $loggedInUserObject['ethnicity_id']=$_POST['ethnicity_id'];
    $loggedInUserObject['gender_id']=$_POST['gender_id'];
    $loggedInUserObject['age_id']=$_POST['age_id'];
    $loggedInUserObject['career_id']=$_POST['career_id'];

    $updateList = array_merge($updateList, returnUsersWhereId($sessionUserId));

    array_push($messagesStack, '"Consultant profile is updated"');
    }
/*
passions not updated? UPDATE users SET research = '91', creativity = '90', mastership = '85', partnership = '82', enlightenment = '80', recognition = '79', service = '77', form = '77', change = '74', compassion = '71', power = '70' WHERE id = 18
*/

  if($sessionIsAdmin==1){ // admin only mod consultants and search
    if($action=="assignConsultant"){
      $qString="UPDATE users SET consultantUserId = ".$_POST['consultantUserId']." WHERE id = ".$_POST['userId'];
      //array_push($debugStack, '"'.$qString.'"');
      $mysqli->query($qString) or die("consultantUserId not updated? ");
      $updateList = array_merge($updateList, returnUsersWhereId($_POST['userId']));
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
      $updateList = array_merge($updateList, returnUsersWhereId($_POST['userId']));

      }
    if($action=="login"){// admin login
      $qString="DELETE FROM sessions ";
      $qString.="WHERE `sessionYYYYMMDD` < ". $_POST['expireYYYYMMDD'];
      $mysqli->query($qString) or die("sessions not dropped? " . $_POST['memberUserId']);
    

      //$qString="UPDATE users SET consultantUserId = 0 WHERE consultantUserId=".$_POST['userId'];
      //$_POST['expireYYYYMMDD'];

      $updateList = array_merge($updateList, returnUsersWhereIsAdmin(1));
      //array_push($messagesStack, '"admins '.count($updateList).'"');
    
      $updateList = array_merge($updateList, returnUsersWhereIsConsultant(1));
      //array_push($messagesStack, '"admins + cons'.count($updateList).'"');
      $updateList = array_merge($updateList, returnUsersWhereTeamCreator($sessionUserId));
      //array_push($messagesStack, '" + teams '.count($updateList).'"');

      $myUsersList=returnUsersWhereConsultantUserId($sessionUserId);
      //array_push($messagesStack, 'myUsersList ='.count(myUsersList));
      $updateList = array_merge($updateList, $myUsersList);
      }
    if($action=="searchUsers"){
      $searchUsersList=returnUsersWhereFilter($_POST['searchString']);
      $updateList = array_merge($updateList, $searchUsersList);
      $searchIdsList=idsInArray($searchUsersList);
      }
    }
  // consultant actions

  if($action=="login"){
    $updateList = array_merge($updateList, returnUsersWhereId($loggedInUserObject['id']));
    if($loggedInUserObject['consultantUserId'] != 0){ // get consultants' consutant i guess
      $updateList = array_merge($updateList, returnUsersWhereId($loggedInUserObject['consultantUserId']));
      }
    if($loggedInUserObject['isConsultant']==1){
      $myUsersList=returnUsersWhereConsultantUserId($sessionUserId);
      array_push($debugStack, '"myUsersList ='.count(myUsersList).'"');
      $updateList = array_merge($updateList, $myUsersList);
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


  if($action=="unhideItemIds"){
    array_push($debugStack, '"POST[itemIds]=' .$_POST['itemIds']. ' POST[userIds]=' .$_POST['userIds']. '"');
    
    updateItemsKeyValue($_POST['itemIds'], 'isBlind', 0, "unhideItemIds");
    updateUsersKeyValue($_POST['userIds'], 'assessmentIsBlind', 0);
    $unhidUsersArray=returnUsersWhereIds($_POST['userIds']);
    array_push($debugStack, '"unhidUsers array count=' .count($unhidUsersArray).'"');
    
    $updateList = array_merge($updateList, $unhidUsersArray);

    }
  
  if(($action=="login")||($action=="createTeam")||($action=="deleteTeam")||($action=="resortMembers")||($action=="swapMembers")||($action=="addTeamMember")||($action=="removeTeamMember")||($action=="assignConsultant")||($action=="unhideItemIds")){
    $teamsList=returnTeamsWhereConsultant($sessionUserId);
    $teamsString='"teamsList":' .json_encode($teamsList);
    array_push($returnStack, $teamsString);
    $membersList=returnTeamMembersWhereConsultant($sessionUserId);
    $membersString='"membersList":' .json_encode($membersList);
    array_push($returnStack, $membersString);
    array_push($debugStack, '"updated "');
    }
  if($action=="login"){
    $productsList=returnProducts();
    $productsString='"productsList":' .json_encode($productsList);
    array_push($returnStack, $productsString);
    }



  if($action=="deleteUnusedItems"){
    $iqResult = returnUnusedInvitesOfConsultant($_POST['targetUserId']);
    $unusedCount=count($iqResult);
    $deleteNumber=(int)$_POST['deleteNumber'];
    
    if($deleteNumber <= $unusedCount){

      $idArray=array();
      
      foreach($iqResult as $record){
        if(count($idArray)<$deleteNumber){
          array_push($idArray, $record['id']);
          }
        }
      $ids=implode(" ", $idArray);
      deleteItems($idArray);
      array_push($messagesStack, '"DELETED '.$deleteNumber. ' of ' .$unusedCount. ' unused items from '.$_POST['targetName'].'"');

      $updateList = array_merge($updateList, returnUsersWhereId($_POST['targetUserId']));


      }
    else{
      array_push($messagesStack, '"INVALID '.$deleteNumber. ' > '.$unusedCount.'"');
      }      
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
      array_push($messagesStack, '"Granted '.$_POST['units']. ' invites to '.$_POST['targetName']. '"');
      $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
      $loggedInUserObject['unusedInvites']=count($iqResult);
      $updateList = array_merge($updateList, returnUsersWhereId($_POST['targetUserId']));

      }

    
    $productsList=returnProducts();
    $productsString='"productsList":' .json_encode($productsList);
    array_push($returnStack, $productsString);
    }
// recovery actions
// end of recovery actions

/*
Login: invitations@corepassionlife.com (use the whole thing!)
Password: ZAZb3McF

Username: fsODJHSDFIAGSF //sandbox?
Password: yQN7sa7D6JMJ
*/
  if($action=="sendGift"){
    $item=returnFirstUnusedGift();
    $message = "You have a gift waiting for you at corepassion.com. Click to accept ". $item['sku'] ."\r\n http://corepassion.com/?page_id=130#id=".$item['id']."&action=accept";
    $headers = 'From: invitation@corepassion.com';

    $subject='Gift Notification from CorePassion.com';
    if(@mail($_POST['giftEmail'], $subject, $message, $headers)){
      $res="A gift Sent Successfully to:".$_POST['giftEmail'];
      updateItemKeyValue($item['id'], "inviteEmail", $_POST['giftEmail'], "sendGift");
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
    updateItemKeyValue($item['id'], "inviteEmail", '', "unsendGift");
    $iqResult = returnUnusedGiftsOfUser($sessionUserId);
    $loggedInUserObject['unusedGifts']=count($iqResult);
    }

  if($action=="sendInvite"){
    $inviteEmails = explode(",", $_POST['inviteEmails']);
    foreach($inviteEmails as $inviteEmail){
      $item=returnFirstUnusedInvite();
      $message = $_POST['inviteMessage'];
      $message .= " Click to accept ". $item['sku'] ."\r\n http://corepassion.com/?page_id=130#id=".$item['id']."&action=accept";
      $headers = "From: invitation@corepassion.com\r\nReply-to: ".$_POST['consultantEmail'];
      $subject='Invitation to Core Passion';
      if(@mail($inviteEmail, $subject, $message, $headers)){
        $res="Mail Sent Successfully to:".$inviteEmail;
        updateItemKeyValue($item['id'], "inviteEmail", $inviteEmail, "sendInvite");
        updateItemKeyValue($item['id'], "isBlind", $_POST['inviteBlind'], "sendInvite");
        $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
        $loggedInUserObject['unusedInvites']=count($iqResult);
        }
      else{
        $res= "Mail Not Sent";
        }
      array_push($messagesStack, '"'.$res.'"');
      }
    }
  if($action=="unsendInvite"){
    $item=returnItemWhere("inviteEmail", $_POST['uninviteEmail']);
    updateItemKeyValue($item['id'], "inviteEmail", '', "unsendInvite");
    $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
    $loggedInUserObject['unusedInvites']=count($iqResult);
    }

  $pendingInvitesList=array();
  if($loggedInUserObject['isConsultant']==1){
    $pendingInvitesList = returnPendingInvitesOfConsultant($sessionUserId);
    }
  $pendingString='"pendingInvitesList":' .json_encode($pendingInvitesList);
  array_push($returnStack, $pendingString);

  $iqResult = returnUnusedInvitesOfConsultant($sessionUserId);
  $loggedInUserObject['unusedInvites']=count($iqResult);


  $redeemInvites=returnItemsWhere("inviteEmail", strtolower($sessionEmail));

  foreach($redeemInvites as $invite){//move into completed when ready
    array_push($debugStack, '"redeem id:'.$invite['id'].'"');
    attemptAcceptItem($invite['id']);
    //returnUsersWhereId($item["consultantUserId"])[0]["email"].'"');
    }
 
  if($action=="prioritizeItemId"){
    array_push($debugStack, '"prioritizeItemId"'); 
    updateUserKeyValue($sessionUserId, "assessmentItemId", $_POST['itemId']);
    $loggedInUserObject['assessmentItemId']=$_POST['itemId'];
    $thisItem=returnItemWhere("id", $_POST['itemId']);
    $itemStateObj=$thisItem['stateObj'];
    updateUserKeyValue($sessionUserId, "stateObj", $itemStateObj);

    updateUserKeyValue($sessionUserId, "isAssessed", 1);
    $loggedInUserObject['isAssessed']=1;

    $itemIsBlind=$thisItem['isBlind'];
    updateUserKeyValue($sessionUserId, "assessmentIsBlind", $itemIsBlind);
    $loggedInUserObject["assessmentIsBlind"]=$itemIsBlind;

    }
  if($action=="storeState"){
    array_push($debugStack, '"store state"'); 
    $itemArray=returnItemsWhere("id", $_POST['itemId']);
    if(count($itemArray)>0){
      $item=$itemArray[0];
      if($item['consumerUserId']==$sessionUserId){
        updateItemKeyValue($_POST['itemId'], "stateObj", $_POST['stateObj'], "storeState");
        updateItemKeyValue($_POST['itemId'], "updatedYYYYMMDD", $_POST['nowYYYYMMDD'], "storeState");
        updateItemKeyValue($_POST['itemId'], "consumed", $_POST['consumed'], "storeState");
        updateItemKeyValue($_POST['itemId'], "completed", $_POST['completed'], "storeState");

        updateItemKeyValue($_POST['itemId'], "ethnicity_id", $_POST["ethnicity_id"], "storeState");
        updateItemKeyValue($_POST['itemId'], "gender_id", $_POST["gender_id"], "storeState");
        updateItemKeyValue($_POST['itemId'], "age_id", $_POST["age_id"], "storeState");
        updateItemKeyValue($_POST['itemId'], "career_id", $_POST["career_id"], "storeState");

        if($_POST['completed']==1){
          updateUserKeyValue($sessionUserId, "isAssessed", $_POST['isAssessed']);
          $loggedInUserObject["isAssessed"]= $_POST['isAssessed'];

          $itemIsBlind=$item['isBlind'];
          updateUserKeyValue($sessionUserId, "assessmentIsBlind", $itemIsBlind);
          $loggedInUserObject["assessmentIsBlind"]=$itemIsBlind;

          array_push($debugStack, '"itemIsBlind '.$itemIsBlind.'"');

          updateUserKeyValue($sessionUserId, "stateObj", $_POST['stateObj']);
          updateUserKeyValue($sessionUserId, "assessmentItemId", $_POST['itemId']);
          $loggedInUserObject["stateObj"]= $_POST['stateObj'];
          $loggedInUserObject["assessmentItemId"]= $_POST['itemId'];

          if($loggedInUserObject["consultantUserId"] != 0){// notify consultant
            $consultantEmail=returnUsersWhereId($loggedInUserObject["consultantUserId"])[0]["email"];
            $itemName=html_entity_decode($item['name']);
            array_push($debugStack, '"GRADE $consultantUserId = '.$loggedInUserObject["consultantUserId"].'"');
            array_push($debugStack, '"consultantEmail = '.$consultantEmail.'"');

            $message = $loggedInUserObject["email"]. " " .$loggedInUserObject["firstName"]. " " .$loggedInUserObject["lastName"]. " " . " has completed ".$itemName."\r\n http://corepassion.com/?page_id=130#id=".$loggedInUserObject["id"]."&action=infoUserId";
            $headers = 'From: invitation@corepassion.com';
            $subject=$loggedInUserObject["wpLogin"].' Completed '.$itemName;
            if(@mail($consultantEmail, $subject, $message, $headers)){
              $res="email sent to :".$consultantEmail;
              }
            else{
              $res= "Mail Not Sent to:".$consultantEmail;
              }
            array_push($debugStack, '"'.$res.'"');
            }

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
  array_push($debugStack, '"$sessionUserId = '.$sessionUserId.'"');

  $loggedInUserObject['items']=returnItemsWhere("consumerUserId", $sessionUserId);

  $loggedInUserObject['messages']=$messagesStack;

  $pendingGiftsList = returnPendingGiftsOfUser($sessionUserId);
  $pendingString='"pendingGiftsList":' .json_encode($pendingGiftsList);
  array_push($returnStack, $pendingString);

  //$recoverString='"recover":"' .$recover.'"';
  //array_push($returnStack, $recoverString);
  //$loggedInUserObject['recover']=$recover;


  $userString='"user":' .json_encode($loggedInUserObject);
  array_push($returnStack, $userString);

  $updateString='"updateList":' .json_encode($updateList);
  array_push($returnStack, $updateString);
  if($sessionIsAdmin==1){
    $searchIdsString='"searchIdsList":' .json_encode($searchIdsList);
    array_push($returnStack, $searchIdsString);
    }
/*

  $myUsersString='"myUsersList":' .json_encode($myUsersList);
  array_push($returnStack, $myUsersString);
  
  $teamUsersString='"teamUsersList":' .json_encode($teamUsersList);
  array_push($returnStack, $teamUsersString);
  $adminUsersString='"adminUsersList":' .json_encode($adminUsersList);
  array_push($returnStack, $adminUsersString);
  $consultantUsersString='"consultantUsersList":' .json_encode($consultantUsersList);
  array_push($returnStack, $consultantUsersString);
  $searchUsersString='"searchUsersList":' .json_encode($searchUsersList);
  array_push($returnStack, $searchUsersString);

*/
  }// end of valid session, can return data

$debugString='"debug":[' . implode(", ", $debugStack) . ']';
array_push($returnStack, $debugString);
$errorString='"errors":[' . implode(", ", $errorStack) . ']';
array_push($returnStack, $errorString);

$returnString='{'.implode(", ", $returnStack).'}';
echo $returnString;



/* FUNCTIONS */
function parse($text) {
    // Damn pesky carriage returns...
    $text = str_replace("\r\n", "\n", $text);
    $text = str_replace("\r", "\n", $text);

    // JSON requires new line characters be escaped
    //$text = str_replace("\n", "\\n", $text);
    return $text;
}
function idsInArray($theArray){
  $ids=array();
  foreach($theArray as $theObj){
    array_push($ids, $theObj['id']);
    }
  return $ids;
  }
function deleteItems($idArray){
  global $mysqli;
  global $debugStack;
  
  $idGlom=implode(",", $idArray);
  array_push($debugStack, '"DELETE FROM items where id IN('.$idGlom.')"');
  $qString="DELETE FROM items where id IN(".$idGlom.")";
  $mysqli->query($qString) or die("receipt not updated? ".$qString); 
  }
function updateReceiptKeyValue($transId, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE receipt '.$transId.' SET '.$key.'='.$value.'"');
  $qString="UPDATE receipts SET ".$key." = '".$value."' WHERE x_trans_id = ".$transId;
  $mysqli->query($qString) or die("receipt not updated? ".$qString); 
  }

function updateItemsKeyValue($ids, $key, $value, $debugString){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE items SET '.$key.'"');
  $qString="UPDATE items SET ".$key." = '".$value."',debugStr='".$debugString."' WHERE id IN (".$ids.")";
  $mysqli->query($qString) or die($ids . ":items not updated? ".$qString); 
  }
function updateItemKeyValue($id, $key, $value, $debugString){
  global $mysqli;
  global $debugStack;
  //array_push($debugStack, '"UPDATE item '.$id.' SET '.$key.'"');

  $qString="SELECT * ";
  $qString.="FROM items ";
  $qString.="WHERE id = ". $id;
  $iqResult = $mysqli->query($qString) or die("Error teams " . $consultantUserId);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }  
  //array_push($debugStack, '"'.$qString.' found = '. count($resultArray).' "');


  $qString="UPDATE items SET ".$key." = '".$value."',debugStr='".$debugString."' WHERE id = ".$id;
  //array_push($debugStack, '"updateItemKeyValue '.$qString.' '.$debugString.'"');

  $mysqli->query($qString) or die("item not updated? ".$qString); 
  }

function updateUsersKeyValue($ids, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE users '.$ids.' SET '.$key.'"');
  $qString="UPDATE users SET ".$key." = '".$value."' WHERE id IN (".$ids.")";
  $mysqli->query($qString) or die("users not updated? ".$qString); 
  }

function updateUserKeyValue($id, $key, $value){
  global $mysqli;
  global $debugStack;
  array_push($debugStack, '"UPDATE user '.$id.' SET '.$key.'"');
  $qString="UPDATE users SET ".$key." = '".$value."' WHERE id = ".$id;
  $mysqli->query($qString) or die("user not updated? ".$qString); 
  }

$last_id=0;
function insertItem($sku, $productId, $receiptTransaction, $creatorUserId, $consultantUserId, $consumerUserId, $inviteEmail){
  global $last_id;
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
  //$mysqli->query($qString) or die("item not inserted?"); 

  if ($mysqli->query($qString) === TRUE) {
    $last_id = $mysqli->insert_id;
    }
  }


function insertHashSession($hashAction, $hashId){
  global $mysqli;
  global $debugStack;

  $qString="INSERT INTO hashSessions ";
  $qString.="(sessionId, hashAction, hashId) VALUES ";
  $qString.="('".session_id()."', ";
  $qString.="'".$hashAction."', ";
  $qString.="'".$hashId."')";
  $mysqli->query($qString) or die("hash session not inserted? " .session_id(). " " . $qString);
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
  global $updateList;
  global $sessionUserId;
  global $loggedInUserObject;
  $item=returnItemWhere("id", $itemId);
  if($item['inviteEmail'] != ""){
    if(strtolower($item['inviteEmail']) == strtolower($loggedInUserObject["email"])){
      array_push($messagesStack, '"item accepted for '.$loggedInUserObject["email"].'"');
      // so update item
      updateItemKeyValue($itemId, "inviteEmail", "", "attemptAcceptItem");
      updateItemKeyValue($itemId, "consumerUserId", $loggedInUserObject["id"], "attemptAcceptItem");
      ////attach and include consultant
      updateUserKeyValue($sessionUserId, "consultantUserId", $item["consultantUserId"]);
      $loggedInUserObject['consultantUserId']=$item["consultantUserId"];
      $updateList = array_merge($updateList, returnUsersWhereId($item["consultantUserId"]));
      array_push($debugStack, '"accept from consultantUserId '.$item["consultantUserId"].' '.returnUsersWhereId($item["consultantUserId"])[0]["email"].'"');
      }
    else{
      array_push($debugStack, '"item '.$item['inviteEmail'].' email mismatches. '.$loggedInUserObject["email"].'"');
      // so error
      }
    }
  else{
    array_push($debugStack, '"item '.$item['inviteEmail'].' email empty. '.$loggedInUserObject["email"].'"');
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
  global $messagesStack;
  $hashSessions=readHashSessions();

  $qString="INSERT INTO sessions ";
  $qString.="(sessionId, hashAction, hashId, userId, email, wpLogin, isAdmin, sessionYYYYMMDD) VALUES ";
  $qString.="('".session_id()."', ";
  $qString.="'".$sessionHashAction."', ";
  $qString.="'".$sessionHashId."', ";
  $qString.="'".$loggedInUserObject["id"]."', ";
  $qString.="'".$loggedInUserObject["email"]."', ";
  $qString.="'".$loggedInUserObject["wpLogin"]."', ";
  $qString.="'".$loggedInUserObject["isAdmin"]."', ";
  $qString.="'".$yyyymmdd."')";
  $mysqli->query($qString) or die("session not inserted? " .session_id(). " " . $loggedInUserObject["id"]);
  array_push($debugStack, '"new session created"');
  $sessionUserId=$loggedInUserObject["id"];
  $sessionEmail=$loggedInUserObject["email"];
  $sessionWpLogin=$loggedInUserObject["wpLogin"];
  $sessionIsAdmin=$loggedInUserObject["isAdmin"];

  if($sessionHashAction=="careerSeekerToken"){
    updateUserKeyValue($loggedInUserObject["id"], "careerSeekerToken", $sessionHashId);
    array_push($debugStack, '"'.$loggedInUserObject["id"].' careerSeekerToken set to '.$sessionHashId.'"');
    array_push($messagesStack, '"Career Seeker App is synced."');
    $sessionHashAction="";
    $sessionHashId="";

    $ir=returnItemsWhere("sku", "m_1_csa_s");
    if(count($ir)==0){
      insertItem("m_1_csa_s", 11, "linked", $loggedInUserObject["id"], 0, $loggedInUserObject["id"], "");
      }
    }
  $qString="SELECT * FROM hashSessions WHERE sessionId='" . session_id(). "'";
  $sessionResult = $mysqli->query($qString) or die("Error reading hash session " .session_id());
  if($sessionResult !== false ) {   
    $qString="DELETE FROM hashSessions WHERE sessionId='" . session_id(). "'";
    $mysqli->query($qString) or die("hashSession not dropped? " . $_POST['memberUserId']);
    }
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
  if($sessionResult !== false ) { 
    while ($session = $sessionResult->fetch_assoc()) {
      $sessionHashId=$session['hashId'];
      $sessionHashAction=$session['hashAction'];
      array_push($hashSessions, $session);
      array_push($debugStack, '"read hash session. '.$sessionHashAction.' '.$sessionHashId.'"');
      }
    }
  return $hashSessions;
  }

function insertUser($yyyymmdd){
  //global $recover;
  global $messagesStack;
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

/*
  $handle = fopen("recover/index.txt", "r");
  if ($handle) {
    array_push($messagesStack, '"opened '.$wpUserMeta['wpUserEmail'].'"');
    while (($line = fgets($handle)) !== false) {
      $lcEmail=strtolower($wpUserMeta['wpUserEmail']);
      $lcLine=strtolower($line);
      $pos = strpos($lcLine, $lcEmail);
      if ($pos === false) {}
      else{
        if ($pos == 0) {
          $pieces= explode(" ", $line);
          $recover=$pieces[1];
          array_push($messagesStack, '"restore '.$wpUserMeta['wpUserEmail'].' with '.$recover.'"');
          }
        }
      }
    fclose($handle);
    } 
  else {
    //array_push($messagesStack, '"not opened"');
    } 
*/
  }
function readSession(){
  global $mysqli;
  global $sessionUserId;
  global $sessionHashAction;
  global $sessionHashId;
  global $sessionEmail;
  global $sessionWpLogin;
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
    $sessionWpLogin=$sessions[wpLogin];
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
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      array_push($teams, $record);
      }
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
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {

      $mayView=0;
      if($sessionIsAdmin==1){
        array_push($debugStack, '"Admin Products"');
        $mayView=1;
        if($record["adminMayView"]==0){
          $mayView=0;
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
    }
  return $products;
  }
function returnUsersWhereTeamCreator($consultantUserId){
  global $mysqli;
  global $messagesStack;
  //array_push($messagesStack, '"$consultantUserId='.$consultantUserId.'"');
  $members=returnTeamMembersWhereConsultant($consultantUserId);
  $ids=array();
  foreach($members as $theObj){
    array_push($ids, $theObj['memberUserId']);
    }
  $users=array();
  $qString="SELECT * FROM users WHERE id IN (".implode(",", $ids).")";
  //array_push($messagesStack, '"'.$qString.'"');
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      $record['source']='returnUsersTeamCreator';
      array_push($users, $record);
      }
    }
  return $users;
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
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      array_push($teamMembers, $record);
      }
    }
  return $teamMembers;
  }
function returnUsersWhereConsultantUserId($consultantUserId){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  global $messagesStack;
  $users=array();
  $qString="SELECT * FROM users WHERE consultantUserId = ". $consultantUserId;
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      $record['source']='returnUsersWhereConsultantUserId';
      array_push($users, $record);
      //array_push($messagesStack, $record['id']);
      }
    }
  return $users;
  }
function returnUsersWhereIsAdmin($val){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  global $debugStack;
  $users=array();
  $qString="SELECT * FROM users WHERE isAdmin = ". $val;
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      //array_push($debugStack, '"'.$record['id'].'"');
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
        $record['source']='returnUsersWhereIsAdmin';
      array_push($users, $record);
      }
    }
  return $users;
  }
function returnUsersWhereIds($ids){
  global $mysqli;
  global $errorStack;
  global $debugStack;
  $users=array();
  $qString="SELECT * FROM users WHERE id IN (". $ids .")";
  array_push($debugStack, '"returnUsersWhereIds '.$qString.'"');
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      $record['source']='returnUsersWhereIds';
      array_push($users, $record);
      }
    }
  return $users;
  }
function returnUsersWhereId($val){
  global $mysqli;
  global $errorStack;
  global $debugStack;
  $users=array();
  $qString="SELECT * FROM users WHERE id = ". $val;
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      $record['source']='returnUsersWhereId';
      array_push($users, $record);
      }
    }

  return $users;
  }
//      $updateList = array_merge($updateList, returnUsersWhereIsAdmin(1));

function returnUsersWhereIsConsultant($val){
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  global $debugStack;
  $inverted=abs($val-1);
  $users=array();
  $qString="SELECT * FROM users WHERE isConsultant = ". $val . " AND isAdmin = ". $inverted;
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      //array_push($debugStack, '"'.$record['id'].'"');
      $iqResult = returnUnusedInvitesOfConsultant($record['id']);
      $record['unusedInvites']=count($iqResult);
      $record['source']='returnUsersWhereIsConsultant';
      array_push($users, $record);
      }
    }
  return $users;
  }

function returnOpenUserReceipts(){
  global $loggedInUserObject;
  global $mysqli;
  $iqString="SELECT products.*, receipts.x_trans_id, receipts.x_email, receipts.x_catalog_link_id FROM receipts INNER JOIN products ON receipts.x_catalog_link_id = products.catalogLinkId WHERE receipts.itemCreated = 0 AND receipts.x_email = '".$loggedInUserObject['email']."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  return $resultArray;
  }


function returnItemWhere($key, $value){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE items.".$key." = '".$value."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  return $resultArray[0];
  }

function returnItemsWhere($key, $value){
  global $mysqli;
  global $debugStack;

  $iqString="SELECT items.*, products.name, products.deliverable, products.linkUrl, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE items.".$key." = '".strtolower ($value)."'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  array_push($debugStack, '"returnItemsWhere('.$key.', '.$value.') = '.count($resultArray).'"');
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
  //one mysterious record in SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail = '' AND consultantUserId = 0 AND creatorUserId = 136
  array_push($debugStack, '"'.$iqString.'"');
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      if($record['consumed']==0){
        array_push($resultArray, $record);
        }
      }
    }
  return $resultArray;
  }
function returnPendingGiftsOfUser($userId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail != '' AND consultantUserId = 0 AND creatorUserId = " . $userId;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
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
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail = '' AND consultantUserId = " . $consultantUserId . " AND products.disposition = 'invite'";
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  return $resultArray;
  }
function returnPendingInvitesOfConsultant($consultantUserId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId = 0 AND inviteEmail != '' AND consultantUserId = " . $consultantUserId;
  $iqResult = $mysqli->query($iqString);
  $resultArray=array();
  if($iqResult !== false ) { 
    while ($record = $iqResult->fetch_assoc()) {
      array_push($resultArray, $record);
      }
    }
  return $resultArray;
  }





function returnAcceptedInvitesOfConsultant($consultantUserId){
  global $mysqli;
  $iqString="SELECT items.*, products.name, products.productType, products.disposition FROM items INNER JOIN products ON items.productId = products.id WHERE consumerUserId != 0 AND inviteEmail = '' AND consultantUserId = " . $consultantUserId;
  $iqResult = $mysqli->query($iqString);
  return $iqResult;
  }

function returnUsersWhereWpLogin($wpLogin){//returns one or matches in array.
  global $mysqli;
  global $sessionIsAdmin;
  global $sessionEmail;
  global $errorStack;
  $users=array();
  if($wpLogin == ""){
    if($sessionIsAdmin==1){
      $qString="SELECT * FROM users";
      }
    else{// WTF
      $qString="SELECT * FROM users WHERE email='error'";
      array_push($errorStack, '"ERROR not admin requested users"');
      }
    }
  else{
    $qString="SELECT * FROM users WHERE wpLogin='" . $wpLogin . "'";
    }
  $result = $mysqli->query($qString);
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      if($record['consultantUserId']==0){
        array_unshift($users, $record);
        }
      else{
        $iqResult = returnUnusedInvitesOfConsultant($record['id']);
        $record['unusedInvites']=count($iqResult);
        $record['source']='returnUsersWhereWpLogin';
        array_push($users, $record);
        }
      }
    }
  return $users;
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
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      if($record['consultantUserId']==0){
        array_unshift($users, $record);
        }
      else{
        $iqResult = returnUnusedInvitesOfConsultant($record['id']);
        $record['unusedInvites']=count($iqResult);
        $record['source']='returnUsersWhereEmail';
        array_push($users, $record);
        }
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
  if($result !== false ) { 
    while ($record = $result->fetch_assoc()) {
      if($record['consultantUserId']==0){
        array_unshift($users, $record);
        }
      else{
        $iqResult = returnUnusedInvitesOfConsultant($record['id']);
        $record['unusedInvites']=count($iqResult);
        $record['source']='returnUsersWhereFilter';
        array_push($users, $record);
        }
      }
    }
  return $users;
  }

?>