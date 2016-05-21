var formSaved=false;
var userId=0;
var resumeLinkInterval;
console.log('accessor.js loaded 3 and ran on '+window.location +' as '+wpUserLogin);
  var elementExists = !(!(document.getElementById("myItems")));
  console.log('elementExists='+elementExists);
var userFieldsString="";
userFieldsString +='&wpUserLogin='+wpUserLogin;// defined in theme footer.php
userFieldsString +='&catSlugsString='+catSlugsString; // defined in theme footer.php
userFieldsString +='&windowLocation='+window.location.origin+window.location.pathname; 
userFieldsString +='&windowToken='+window.location.origin+window.location.pathname; 

var serialForm='action=testAccess';
serialForm+= userFieldsString;

jQuery.post("/webapp/accessor.php", serialForm, function(data, textStatus) {
  console.log('accessor.php returned');
  var returnedErrors=data.errors;
  userId=data.userId;
  var myItems=data.myItems;
  var myItemsHtml="";




  for (var i=0; i<myItems.length; i++){
    console.log('myItems['+i+'].name='+myItems[i].name);
    console.log('myItems['+i+'].linkUrl='+myItems[i].linkUrl);
    myItemsHtml+='<div class="myItems"><a href="'+myItems[i].linkUrl+'">'+myItems[i].name+'</a></div>';
    }
  console.log("elementExists="+elementExists)
  if(elementExists){
    document.getElementById("myItems").innerHTML=myItemsHtml;
    }
  if(data.access=="denied"){
    alert('Sorry, '+catSlugsString+' requires access permission. Please log in or register.');
    window.location="http://www.corepassion.com/?page_id=56";
    }
  if(data.access=="granted"){
    console.log('granted, '+catSlugsString+' access permission. ');
    }
  if(typeof gform == "object"){
    console.log('found gform');
    if(window.location.search ==""){// run only if not already restored
       if(data.gf_token != ""){// bounce to token
         
         console.log('no search, quick test for resume link before bounce');
         var resumeLinks=document.getElementsByClassName('resume_form_link');
         console.log('resumeLinks.length='+resumeLinks.length);

         console.log('bounce to '+window.location.origin+window.location.pathname+"?gf_token="+data.gf_token);
         window.location.href=window.location.origin+window.location.pathname+"?gf_token="+data.gf_token;
         }
       }
    // has form, start watching for draft
    resumeLinkInterval=window.setInterval("resumeLinkTick()" ,500);
    }
  }, "json");

function resumeLinkTick(){
  console.log('resumeLinkTick()');
  if(formSaved==true){
    window.clearInterval(resumeLinkInterval);
    console.log('resumeLinkInterval cleared');
    }
  else{
    var resumeLinks=document.getElementsByClassName('resume_form_link');
    if(resumeLinks.length > 0){
      var resumeHref=resumeLinks[0].href;
      console.log('resumeHref='+resumeHref);
      var resumeParts=resumeHref.split("?");
      var originPath=resumeParts[0];
      var search=resumeParts[1];
      var searchParts=search.split("=");
      var token=searchParts[1];

      var userFieldsString="";
      userFieldsString +='&userId='+userId;
      userFieldsString +='&gf_token='+token;
      userFieldsString +='&windowLocation='+window.location.origin+window.location.pathname;

      var serialForm='action=store';
      serialForm+= userFieldsString;
      console.log(serialForm);
      jQuery.post("/webapp/savegftoken.php", serialForm, function(data, textStatus) {
        var returnedErrors=data.errors;
        //window.location.href=window.location.origin+window.location.pathname+"?gf_token="+data.gf_token;
        console.log(data);
        //window.location.href=window.location.origin+window.location.pathname+"?gf_token="+token;
        formSaved=true;
      }, "json");
      }
    }
  }