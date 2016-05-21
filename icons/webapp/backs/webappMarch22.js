// api test code
function appOnFocus(careerSeekerToken){
  var serialForm='action=careerSeekerToken';
  serialForm+='&appToken='+careerSeekerToken;
  jQuery.post(appPath+"apptoken.php", serialForm, function(data, textStatus) {
     //console.log(data);
     if(data.userId>0){
       //console.log('Found '+data.userId);
       if(data.isAssessed != 0){
         var summary=data.state.summary;
         for (var s=0; s<5; s++){// maybe test for additional ties with 5?
           //console.log(summary[s].pNum +" "+summary[s].caption +" "+summary[s].score +" "+summary[s].color);
           }
         }
       }
     else{
       //console.log('Not Found ');
       }
     }, "json");
  }

// end test area
function myPluginLoadEvent(func) {
  var oldOnLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;

    } 
  else{
    window.onload = function () {
      oldOnLoad();
      func();
      }
    };
  }
var popupOkay=true;
var popupBlockerChecker = {
        check: function(popup_window){
            var _scope = this;
            if (popup_window) {
                if(/chrome/.test(navigator.userAgent.toLowerCase())){
                    setTimeout(function () {
                        _scope._is_popup_blocked(_scope, popup_window);
                     },200);
                }else{
                    popup_window.onload = function () {
                        _scope._is_popup_blocked(_scope, popup_window);
                    };
                }
            }else{
                _scope._displayError();
            }
        },
        _is_popup_blocked: function(scope, popup_window){
            if ((popup_window.innerHeight > 0)==false){scope._displayError(); }
            else{closePopup();}
        },
        _displayError: function(){
            alert("Popup Blocker may prevent PDF generation. This can be corrected here: "+popupMessage[platform][browser]+", then reload. You can also change your PDF Method to 'server' in Profile.");
        }
    };
function closePopup(){
  popup.close();
  }
myPluginLoadEvent(function(){
  init();
  });
function dbuga(msg){
  document.getElementById('debugDiv').innerHTML+="<br />"+msg;
  }

var userFieldsString="";
var geometryInterval;
var usersById={};


var imageDensity=1;
var jpgQuality=1;

var isIos=false;
var isOpera=false;
var isFirefox=false;
var isSafari=false;
var isChrome=false;
var isIe=false;
var isMac=false;
var isPc=false;
var isAndroid=false;
var browser="unknown";
var platform="unknown";

//na= not supported server=ajax open=doc.open(), save=doc.save()

var pdfMethod={
"unknown":{"chrome":"server", "opera":"server", "firefox":"server", "safari":"server", "ie":"server", "unknown":"server"},
"ios":{"chrome":"server", "opera":"server", "firefox":"server", "safari":"server", "ie":"na", "unknown":"server"},
"mac":{"chrome":"save", "opera":"server", "firefox":"server", "safari":"div", "ie":"na", "unknown":"server"},
"pc":{ "chrome":"server", "opera":"server", "firefox":"server", "safari":"na","ie":"save", "unknown":"server"},
"android":{"chrome":"save", "opera":"server", "firefox":"server", "safari":"na", "ie":"na", "unknown":"server"}
};
var popupMessage={
"unknown":{"chrome":"???", "opera":"???", "firefox":"???", "safari":"???", "ie":"???", "unknown":"???"},
"ios":{"chrome":"&#8942;Menu:Settings:Advanced:Content Settings:Block Pop-ups", "opera":"???", "firefox":"???", "safari":"Settings:Safari:GENERAL:Block Pop-ups", "ie":"na", "unknown":"???"},
"mac":{"chrome":"Menu:Chrome:Preferences:Settings:Show advanced settings...:Privacy:Content Settings:Pop-ups", "opera":"???", "firefox":"Browser Settings", "safari":"Menu:Safari:Preferences:Security:Block pop-up windows", "ie":"na", "unknown":"???"},
"pc":{ "chrome":"Menu:Settings:Show advanced settings...:Privacy:Content Settings:Pop-ups", "opera":"Browser Settings", "firefox":"Menu:Options:Content:Pop-ups", "safari":"na","ie":"Browser Settings", "unknown":"???"},
"android":{"chrome":"&#8942;Menu:Settings:Site settings:Pop-ups", "opera":"???", "firefox":"???", "safari":"na", "ie":"na", "unknown":"Browser Settings"}
}
function init(){
  dbuga('');
  isIos = /iPad|iPhone|iPod/.test(navigator.platform);
  isMac = /MacIntel|MacPPC/.test(navigator.platform);
  isAndroid = /Android|Linux/.test(navigator.platform);
  isPc = (navigator.platform.indexOf("Win")==0);
  isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
  isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
  isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isChrome = !!window.chrome && !isOpera;              // Chrome 1+
  isIe = /*@cc_on!@*/false || !!document.documentMode; // At least IE6 


  if(isIos){
    if(navigator.userAgent.indexOf('CriOS')>-1){
      isChrome=true;
      isSafari=false;
      }
    else{//chrome may not say crios and act like safari
      if(navigator.userAgent.indexOf('Mobile')>-1){  
        isChrome=false;
        isSafari=true;
        }
      else{
        isChrome=true;
        isSafari=false;
        }
      }
    }

  if(isPc){platform="pc";}
  if(isMac){platform="mac";}
  if(isIos){platform="ios";}
  if(isAndroid){platform="android";}

  if(isOpera){browser="opera";}
  if(isFirefox){browser="firefox";}
  if(isSafari){browser="safari";}
  if(isChrome){browser="chrome";}
  if(isIe){browser="ie";}


  if(isIos){
    window.addEventListener("focus", function(event) {
      document.getElementById('spinner').style.display="none";
      document.getElementById('downloadpdf').style.display="none";
      }, false);
    }
  
  document.getElementById('header').style.display="none";
  document.body.style.backgroundImage="url('/webapp/nav/cpa_wait.jpg')";
  document.body.style.backgroundPosition="50% 50%";
  document.body.style.backgroundRepeat="no-repeat";
  if(Number(wpUserObject.userId)==0){
    //console.log('userId==0');

    sessionLog();
    //console.log('wpUserObject.userId =0 BLOCK');
    consloe.log('log in show appDiv');
    document.getElementById('appDiv').style.opacity="1";
    app("header", '<h1>Please <a href="http://www.corepassion.com/?page_id=56">Log In</a> or <a href="http://www.corepassion.com/?page_id=58">Register</a></h1>');
    }
  else{
    initCpa();
    loadTab();
    ajaxLogin();
    }
  }

function divScrolled(theDiv){
  var a=document.getElementById(theDiv+'Div');
  var scrollRange=a.scrollHeight-a.offsetHeight;
  //console.log("scrollRange="+scrollRange);

  var headHeight=g*4;
  var canv=document.getElementById(theDiv+'Scroll');
  var ctx=canv.getContext('2d');
  var canvHeight=appSquarePx-headHeight-g/2;
  canv.height=canvHeight;
  var proportion=a.offsetHeight/a.scrollHeight;
  //console.log("prop="+proportion);
  var barHeight=canvHeight*proportion;
  var barRange=canvHeight-barHeight;
  var progress=0;
  if(scrollRange>0){
    progress=a.scrollTop/scrollRange;
    }
  var barTop=barRange*progress;

  ctx.strokeStyle="#999";
  ctx.lineCap="none";
  ctx.lineWidth=g/2;
  ctx.beginPath();
  ctx.moveTo(g*3/4, barTop+g/2);
  ctx.lineTo(g*3/4, barTop+barHeight-g/2);
  ctx.stroke();
  //console.log('offsetHeight='+a.offsetHeight+' scrollHeight='+a.scrollHeight+' scrollTop:'+a.scrollTop);
  //console.log('progress='+Math.floor(progress*100)/100+' barHeight='+barHeight+' barTop:'+barTop);
  
  }
// runs after everything else in ajaxLogin 
var prePages=[];
var postPages=[];
function doPopupTest(){
      popup = window.open("http://www.corepassion.com/webapp/popup.html", '_blank');
      popupBlockerChecker.check(popup);
  }
function getPrePages(){
  doPopupTest();
  //console.log('getPrePages()');

  jQuery.getJSON("http://www.corepassion.com/?json=1&cat=9",function(data) {// 12=prepend
    //console.log("returned success prePages");
    //console.log(data.posts.length+" posts in 12");
    for (var p=0; p<data.posts.length; p++){
      var content=data.posts[p].content;
      //console.log("pre "+p+"="+data.posts[p].title);
      prePages.push(content);
      }
    getPostPages();
    });
  }

function getPostPages(){
  //console.log('getPostPages()');

  jQuery.getJSON("http://www.corepassion.com/?json=1&cat=2",function(data) {// 13=append
    //console.log("returned success");
    //console.log(data.posts.length+" posts in 13");
    for (var p=0; p<data.posts.length; p++){
      var content=data.posts[p].content;
      //console.log("post "+p+"="+data.posts[p].title)
      postPages.unshift(content);
      }
    preloadPdfImages();
    });
  }
function preloadImages(){
  //console.log("preloadImages()");
  var loadLeftnavButtons=[{"label":"corepassion_icon_red.png"},{"label":"home_icon_red.png"},{"label":"shop_icon_red.png"},{"label":"profile_icon_red.png"},{"label":"tools_icon_red.png"},{"label":"help_icon_red.png"}];


  for(var b=0; b<loadLeftnavButtons.length; b++){
    var label=loadLeftnavButtons[b].label;
    if(label.indexOf('.png')>-1){
      preloadImage('webapp/nav/'+label);
      }
    }

  for (var t=0; t<tileTypes.length; t++){
    preloadImage('webapp/newtiles/'+tileTypes[t]+'.png');
    }
  }
function preloadPdfImages(){
  for (var p=0; p<postPages.length; p++){
    var quoteParts=postPages[p].split('"');
    for (var q=0; q<quoteParts.length; q++){
      if((quoteParts[q].indexOf(".jpg")>-1)||(quoteParts[q].indexOf(".png")>-1)){
        preloadPdfImage(quoteParts[q]);
        }
      }
    }
  for (var n=1; n<=7; n++){
    preloadPdfImage('webapp/icons/ir-'+n+'-88p.png');
    preloadPdfImage('webapp/icons/ig-'+n+'-88p.png');
    preloadPdfImage('webapp/icons/igd-'+n+'-88p.png');
    }
  preloadPdfImage('webapp/cpaglobe.jpg');
  if(user.id==69){
    preloadPdfImage('webapp/nav/failboat.png');
    }
  }

var preloaded=0;
var preloading=0;
var preloadFails=0;
var preloads={};
var preloadKeys=[];

var pdfPreloaded=0;
var pdfPreloading=0;
var pdfPreloadFails=0;
var pdfPreloads={};
var pdfPreloadKeys=[];

var pdfImagesPreloaded=false;
var deferredReport="";
var deferredId="";
function resumeDeferred(){
  //alert('deferredReport='+deferredReport+' deferredId='+deferredId);
  if(deferredReport=="pdfReportDetailUserId"){pdfReportDetailUserId(deferredId);}
  if(deferredReport=="pdfReportUserId"){pdfReportUserId(deferredId);}
  if(deferredReport=="pdfReportItemId"){pdfReportItemId(deferredId);}
  if(deferredReport=="loadTeamProfile"){loadTeamProfile(deferredId);}

  }

function showPdfPreloads(){
  var outStr="";
  if(pdfPreloadFails>0){    
    outStr+='<h3>'+pdfPreloadFails+' images failed to load. <br><a href="javascript:donePdfLoading()"><strong>Click Here to Proceed Anyways.</strong></a></h3>'; 
    }
  
  for (var k=0; k<preloadKeys.length; k++){
    var color="blue";
    var status=preloads[preloadKeys[k]];
    if(status=="WAITING"){color="green";}
    if(status=="FAILED"){color="red";}
    if(status!="OK"){
      outStr+='<span style="color:'+color+';">'+preloadKeys[k]+' - '+status+'</span><br />'; 
      }
    }
  if(outStr==""){outStr="PDF images preloaded OK."}
  rep("actionDiv",'<div id="splashglobe" class="splashglobe"></div>');
  rep("splashglobe", '<h3>Messages:</h3><p>'+outStr+'</p>');
  rep("actionHeading", "Home");
  }
function showPreloads(){
  var outStr="";
  if(preloadFails>0){    
    outStr+='<h3>'+preloadFails+' images failed to load. <br><a href="javascript:doneLoading()"><strong>Click Here to Proceed Anyways.</strong></a></h3>'; 
    }
  
  for (var k=0; k<preloadKeys.length; k++){
    var color="blue";
    var status=preloads[preloadKeys[k]];
    if(status=="WAITING"){color="green";}
    if(status=="FAILED"){color="red";}
    if(status=="OK"){color="black";}
    outStr+='<span style="color:'+color+';">'+preloadKeys[k]+' - '+status+'</span><br />'; 
    }
  document.getElementById('debugDiv').innerHTML=outStr;
  document.getElementById('debugDiv').style.display="block";
  document.getElementById('debugDiv').style.top="10px";
  //document.getElementById('debugDiv').style.height="80%";
  //document.getElementById('debugDiv').style.overflow="auto";
  document.getElementById('debugDiv').style.left="10px";
  document.getElementById('debugDiv').style.fontSize="12px";
  document.getElementById('debugDiv').style.lineHeight="14px";
  document.getElementById('debugDiv').style.background="#fff";
  }
function preloadPdfImage(url){
  pdfPreloading++;
  
  var parts=url.split("/");
  var id=parts.pop();
  pdfPreloadKeys.push[id];
  //console.log("preloadImage  "+ id + " " + url);
  var img = new Image();
  img.id = id;
  pdfPreloads[id]="WAITING";
  pdfPreloadKeys.push(id);
  ////showPdfPreloads();

  var imgId=id;
  img.onload= (function(imgId){
    return function(){
      //console.log(imgId, 'loaded');
      pdfPreloaded++;
      pdfPreloads[imgId]="OK";
      if(pdfPreloaded==pdfPreloading){
        donePdfLoading();
        }
      }
    })(imgId);

  img.onerror= (function(imgId){
    return function(){
      pdfPreloads[imgId]="FAILED";
      pdfPreloadFails++;
      showPdfPreloads();
      }
    })(imgId);

  img.src = url;
  document.body.appendChild(img);
  //img.style.position="absolute";
  img.style.display="none";
  }
function donePdfLoading(){
  showPdfPreloads();
  pdfImagesPreloaded=true;
  resumeDeferred();
  }
function preloadImage(url){
  preloading++;
  
  var parts=url.split("/");
  var id=parts.pop();
  preloadKeys.push[id];
  //console.log("preloadImage  "+ id + " " + url);
  var img = new Image();
  img.id = id;
  preloads[id]="WAITING";
  preloadKeys.push(id);
  showPreloads();

  var imgId=id;
  img.onload= (function(imgId){
    return function(){
      //console.log(imgId, 'loaded');
      preloaded++;
      preloads[imgId]="OK";
      if(preloaded==preloading){
        doneLoading();
        }
      }
    })(imgId);

  img.onerror= (function(imgId){
    return function(){
      preloads[imgId]="FAILED";
      preloadFails++;
      showPreloads();
      }
    })(imgId);

  img.src = url;
  document.body.appendChild(img);
  //img.style.position="absolute";
  img.style.display="none";
  }
function doneLoading(){
      dbuga(" loaded "+preloaded+" of "+preloading+" so checkGeometry");
      checkGeometry();
      //console.log("appDiv reveal in images loaded ");
    
      document.getElementById('appDiv').style.display="block";
      window.setTimeout('revealAppDiv()', 1000);
      geometryInterval=window.setInterval("checkGeometry()", 1000);
      document.getElementById('debugDiv').style.display="none";

  }
function revealAppDiv(){
  //dbuga('revealAppDiv()');
  document.getElementById('appDiv').style.opacity="1";
  }
var hashAction="";
var hashId="";
var userIsDev=false;
var safetyTimeout;

function populateDivs(){
 
  app("appDiv", returnShades());
  app("appDiv", '<div id="contextHeadingHolder" class="headingHolder"><h1 id="contextHeading" class="contextHeading fixedHeading"></h1></div>');
  app("appDiv", '<div id="actionHeadingHolder" class="headingHolder"><h1 id="actionHeading" class="actionHeading fixedHeading">h1 #actionHeading</h1></div>');
  app("appDiv", '<canvas id="actionScroll"></canvas>');
  app("appDiv", '<canvas id="contextScroll"></canvas>');
  app("appDiv", '<canvas id="leftnavContext" onmousedown="leftNav(event)"></canvas>');
  app("appDiv", '<canvas id="previewCanvas" style="display:none; position:absolute;" onclick="hidePreview();"></canvas>');
  app("appDiv", '<div id="spinner" style="display:none;"><img src="webapp/nav/please_wait.png"/></div>');
  app("appDiv", '<div id="downloadpdf" style="display:none;"><a id="pdfData" href=""><img id="downloadpdfimg" src="webapp/nav/downloadpdf.png"/></a></div>');
  app("appDiv", '<div id="uploadingpdf" style="display:none;"><img src="webapp/nav/uploadingpdf.png"/></a><div id="uploadingpercent">0%</div></div>');
  document.getElementById('actionDiv').onscroll=function(){divScrolled("action")};
  document.getElementById('contextDiv').onscroll=function(){divScrolled("context")};
  //dbuga('populateDivs() completed');
  }

function ajaxLogin(){
  //document.getElementById('appDiv').style.display="none";
  //dbuga('ajaxLogin() set transparent appDiv');
  document.getElementById('appDiv').style.opacity="0";
  //console.log('ajaxLogin() none');

  if((wpUserObject.userFirstName=="")||(wpUserObject.userLastName=="")){
    rep("appDiv", '<h2>First and last name are required. Please <a href="http://www.corepassion.com/wp-admin/profile.php">update your profile</a>.</h2>');
    return false;
    }
  var hash=window.location.hash;
  hashAction="";
  hashId="";

  if(hash.indexOf('#')>-1){
    hash=hash.replace('#', "");
    var parts=hash.split("&");
    for (var p=0; p<parts.length; p++){
      if(parts[p].indexOf("action=")==0){
        var ha=parts[p].split("=");
        hashAction=ha[1];
        }
      if(parts[p].indexOf("id=")==0){
        var hi=parts[p].split("=");
        hashId=hi[1];
        }
      }
    }

  userFieldsString="";
  userFieldsString +='&wpUserLogin='+wpUserObject.userLogin;
  userFieldsString +='&wpUserId='+wpUserObject.userId;
  userFieldsString +='&wpUserLevel='+wpUserObject.userLevel;
  userFieldsString +='&wpUserEmail='+wpUserObject.userEmail;
  userFieldsString +='&wpUserFirstName='+wpUserObject.userFirstName;
  userFieldsString +='&wpUserLastName='+wpUserObject.userLastName;
  userFieldsString +='&wpUserDisplayName='+wpUserObject.userDisplayName;
  userFieldsString +='&hashAction='+hashAction+'&hashId='+hashId;
  userFieldsString +='&nowYYYYMMDD='+nowYYYYMMDD();
  userFieldsString +='&expireYYYYMMDD='+expireYYYYMMDD();

  var serialForm='action=login';
  serialForm+= userFieldsString;
  safetyTimeout=window.setTimeout("safetyAlert('Please Reload. (ajaxLogin no return)')", 15000);
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    window.clearTimeout(safetyTimeout);
    //dbuga('safetyTimeout cleared '+returnedErrors.length);
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      //debugObject(data, textStatus+" ajaxsql.php?"+serialForm);
      }
    else{
      //dbuga('no errors ');
      populateDivs();
      products=[];
      for(var d=0; d<data.productsList.length; d++){
        var product=data.productsList[d];
        products.push(product);
        pidBySku[data.productsList[d].sku]=data.productsList[d].id;
        }
      items=data.user.items;
      //dbuga('items '+items.length);
      teams=data.teamsList;
      members=data.membersList;
      //dbuga('members '+members.length);
      allOpenReceipts=data.allOpenReceipts;
      user=data.user;
      if((user.id==69)||(user.id==1394)){userIsDev=true;}
      if(user.id==69){
        //alert("pdfMethod["+platform+"]["+browser+"]="+pdfMethod[platform][browser]+" "+navigator.platform+" "+navigator.userAgent);
        }
      ////popup = window.open("http://www.corepassion.com/webapp/popup.html", '_blank');
      ////popupBlockerChecker.check(popup);
      leftnavButtons=[{"label":"corepassion_icon_red.png"},{"label":"home_icon_red.png"},{"label":"shop_icon_red.png"},{"label":"profile_icon_red.png"},{"label":"help_icon_red.png"}];
      if((user.isConsultant=="1")||(user.isAdmin=="1")){
        leftnavButtons=[{"label":"corepassion_icon_red.png"},{"label":"home_icon_red.png"},{"label":"shop_icon_red.png"},{"label":"profile_icon_red.png"},{"label":"tools_icon_red.png"},{"label":"help_icon_red.png"}];
        }

      activeNavButton=1;
      updateUsersById(data.updateList);
      pendingInvites=data.pendingInvitesList;
      pendingGifts=data.pendingGiftsList;
      app("preloadDiv", preloadFontHtml());
      document.getElementById('preloadDiv').style.left="-500px";
      //showProducts();
      //dbuga('show workflow');

      showWorkflow();
      showHome();//move to after geometry update?
  
      if((isIos)||(user.id==69)){
        imageDensity=1;
        jpgQuality=.2;
        //dbuga('imageDensity='+imageDensity);
        }
      
      ////getPrePages();
      preloadImages();

      if(hashAction=="infoUserId"){
        manageUsers();
        infoUserId(hashId);
        }
      if(hashAction=="product"){
        modalProduct(hashId);
        }
      if(user.sessionHashAction=="product"){
        modalProduct(user.sessionHashId);
        }
      proceedToItemId=Number(user.proceedToItemId);
      //dbuga("proceedToItemId="+proceedToItemId+" typeof=")
      //console.log(typeof proceedToItemId);
      if(proceedToItemId>0){
        showCpa(proceedToItemId);
        }
      }
}, "json");
  }
var popup;
//[{"ib_stamp":"2010-10-27","name":"Lori Palm","assessment_number":"56-2","answers":{"1":6,"2":6,
function safetyAlert(message){
  alert(message);
  }
function modalProduct(id){
  var sku="";
  var linkId="";
  var marketingUrl="";
  var isValid;
  var invalidMessage="";
  var productName="";
  for(var p=0; p<products.length; p++){
    if(products[p].id==id){
      sku=products[p].sku;
      linkId=products[p].catalogLinkId;
      productName=products[p].name;
      marketingUrl=products[p].marketingUrl;
      isValid=productIsValid(products[p]);
      }
    }
  if(isValid==false){
    invalidMessage='<br />Sorry you cannot purchase '+productName+' at this time. You may already have it or lack a prerequisite.';
    }
  if(sku==""){
    invalidMessage='<br />Something went wrong, no SKU for id:'+id;
    isValid=false;
    }
  //dbuga("linkId="+linkId);
  var htmlStr="";
  htmlStr+='<div class="whiteMessage">Logged in as '+user.wpDisplayName+invalidMessage+'</div>';
  if(isValid){
    htmlStr+='<div class="modalImageForm">'+returnImageForm(linkId, sku)+'</div>';
    }
  htmlStr+='<div class="modalCloseButton" onclick="closeModal()">Close</div>';
  htmlStr+='<div class="modalMoreButton" onclick="window.open(\''+marketingUrl+'\');">Learn More</div>';

  var div;
  if(document.getElementById('modalDiv')){
    div=document.getElementById('modalDiv');
    }
  else{
    div = document.createElement("div");
    div.id = "modalDiv";
    document.getElementById('appDiv').appendChild(div);
    }
    div.style.display="block";
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.background = "rgba(0,0,0,.85)";
    div.style.color = "white";
  div.innerHTML = htmlStr;
  }
function closeModal(){
  document.getElementById('modalDiv').style.display="none";
  }

function preloadFontHtml(){
  var fonts=["alegreyaSc", "WinthorpeSc", "OpenSans", "OpenSansSemiBold", "OpenSansBold"];
  var htmlStr="";
  for (var f=0; f<fonts.length; f++){
    htmlStr+='<span style="display:block; font-family: '+fonts[f]+';">'+fonts[f]+'®</span> ';
    }
  return htmlStr;
  }
function updateUsersById(updateList){
  for (var u=0; u<updateList.length; u++){
    var updated=updateList[u];
    usersById[updated.id]=updated;
    }
  }
function sessionLog(){
  var hash=window.location.hash;
  var hashAction="";
  var hashId="";

  if(hash.indexOf('#')>-1){
    hash=hash.replace('#', "");
    var parts=hash.split("&");
    for (var p=0; p<parts.length; p++){
      if(parts[p].indexOf("action=")==0){
        var kv=parts[p].split("=");
        hashAction=kv[1];
        }
      if(parts[p].indexOf("id=")==0){
        var kv=parts[p].split("=");
        hashId=kv[1];
        }
      }
    }
  if((hashId=="")||(hashAction=="")){
    //console.log('((hashId=="")||(hashAction==""))');
    document.getElementById('appDiv').style.display="block";
    //dbuga('reveal appDiv to login');
    document.getElementById('appDiv').style.opacity="1";

    rep("appDiv", '<h2>Please <a href="http://www.corepassion.com/?page_id=56">Log In</a> or <a href="http://www.corepassion.com/?page_id=58">Register</a></h2>');
    return false;
    }

  var serialForm='action=hashSession';
  serialForm +='&hashAction='+hashAction+'&hashId='+hashId;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    document.getElementById('appDiv').style.display="block";
    //dbuga('login show appDiv fail 4');
    document.getElementById('appDiv').style.opacity="1";
    rep("appDiv", '<h2>Please <a href="http://www.corepassion.com/?page_id=56">Log In</a> or <a href="http://www.corepassion.com/?page_id=58">Register</a></h2>');
    }, "json");
  }
function manageGifts(){
  var actionString="<h4>Pending Gifts</h4>";
  actionString+=tableFromArrayOfItems(pendingGifts, {"inviteEmail":11, "name":5});
  rep("actionDiv", actionString);    
  }

function manageInvites(){
  rep('actionHeading', 'Manage Invites');

  var nav='';
  nav+='<div class="messages">';
  if(pendingInvites.length==0){
    nav+='<h3>No Invites Pending</h3>';
    }
  else{
    nav+='<h3>'+pendingInvites.length+' Pending Invites';
    nav+='<input class="manageButton" type="button" onclick="buttonDown(this.id); managePendingInvites()" id="navManagePendingInvites" value="MANAGE" /></h3>';
    }
  nav+='</div>';
  
  if(user.unusedInvites>0){
    nav+='<div class="messages bottomMostMargin">';
    nav+='  <h4>Invites: '+user.unusedInvites+' unused</h4>';
    nav+='  <input id="inviteEmail" class="email"  placeholder="enter email" /> <input type="button" class="emailButton" onclick="buttonDown(this.id); inviteButton();" id="navEmailInvite" value="SEND INVITE" />';
    //console.log('returnNav user.inviteText='+user.inviteText);
    user.inviteText = user.inviteText.replace(/\\n/gi,"\n");
    user.inviteText = user.inviteText.replace(/\\/gi,"");
    nav+='  <textarea id="inviteMessage" name="im" />'+user.inviteText+'</textarea>';

    nav+='  <input type="checkbox" id="inviteBlind" name="ib" CHECKED />';
    nav+='  <label for="inviteBlind"><span></span>Can see results?</label> &nbsp; ';
    nav+='<p style="clear:both;">You can edit your default invite message in <a href="javascript:manageProfile()">PROFILE</a></p>';
    nav+='</div>';
    }
  rep("actionDiv", nav);    
  }
function managePendingInvites(){  
  var nav= tableFromArrayOfItems(pendingInvites, {"inviteEmail":13});
  rep("contextDiv", nav);    
  }
function returnNav(){
  var nav="";
  nav+='<h1>My Core Passion®</h1>';
  nav+='<div class="navBar">';
  nav+='<input type="button" id="navHome" class="navButton" onclick="buttonDown(this.id); showProducts();" value="Home" /> ';
  if(user.isConsultant==1){
    nav+='<input type="button" class="navButton" id="navUsers" onclick="buttonDown(this.id); manageUsers();" value="Users" /> ';
    }
  if(user.isConsultant==1){
    nav+='<input type="button" class="navButton" id="navTeams" onclick="buttonDown(this.id); manageTeams();" value="Teams" /> '; 
    }
  nav+='<input type="button" class="navButton" id="navProfile" onclick="buttonDown(this.id); manageProfile();" value="Profile" /> ';
  nav+="</div>";
  //console.log(user.messages);
  if(user.messages.length>0){
    var actionString='<h2>Messages</h2>';
    actionString+='<div class="messages">';
    actionString+=user.messages.join("<br />");
    actionString = actionString.replace(/"/g, "");
    //app("actionDiv", actionString);
    nav+=actionString+"</div>";
    }
  if(user.consultantUserId != "0"){
    var consultantUser=usersById[user.consultantUserId];
    var actionString='<h2>Consultant</h2>';
    actionString+='<div class="messages bottomMargin">';
    actionString+='<p>';
    actionString+=consultantUser.firstName+' '+consultantUser.lastName+'<br />';
    actionString+=consultantUser.company+'<br />';
    actionString+='<a href="mailto:'+consultantUser.email+'"> '+consultantUser.email+'</a><br />';
    actionString+=consultantUser.phone+'<br />';
    actionString+='<a href="'+consultantUser.website+'" target="_blank"> '+consultantUser.website+'</a><br />';
    actionString+='</p>';
    nav+=actionString+"</p></div>";
    }

  if((user.unusedGifts>0)||(pendingGifts.length>0)){
    nav+='<h2>Gifts : '+user.unusedGifts+' unused';
    nav+='</h2>';

    nav+='<div class="messages">';
    if(pendingGifts.length>0){
      nav+=' <input class="manageButton" id="navManageGifts" type="button" onclick="buttonDown(this.id); manageGifts()" value="'+pendingGifts.length+' pending" /><span style="clear:both;" ></span>';
      }
    if(user.unusedGifts>0){
      nav+='<input id="giftEmail" class="email" style="clear:both;" placeholder="enter email" /> <input id="navEmailGift" class="emailButton" type="button" onclick="buttonDown(this.id); giftButton(document.getElementById(\'giftEmail\').value)" value="email gift" />';
      }
    nav+='</div>';
    }
  if(user.isConsultant==1){
    nav+='<h2>Invites: '+user.unusedInvites+' unused</h2>';

    if(pendingInvites.length>0){
      nav+='<div class="messages">';
      nav+=' <input class="manageButton" type="button" onclick="buttonDown(this.id); manageInvites()" id="navManageInvites" value="'+pendingInvites.length+' pending" /><br />';
      nav+='</div>';
      }
    if(user.unusedInvites>0){
      nav+='<div class="messages bottomMostMargin">';
      nav+='<input id="inviteEmail" class="email"  placeholder="enter email" /> <input type="button" class="emailButton" onclick="buttonDown(this.id); inviteButton();" id="navEmailInvite" value="email invite" />';
      //console.log('returnNav user.inviteText='+user.inviteText);
      user.inviteText = user.inviteText.replace(/\\n/gi,"\n");
      user.inviteText = user.inviteText.replace(/\\/gi,"");
      nav+='<textarea id="inviteMessage" name="im" />'+user.inviteText+'</textarea>';

      nav+='<input type="checkbox" id="inviteBlind" name="ib" CHECKED />';
      nav+='<label for="inviteBlind"><span></span>Can see results?</label> &nbsp; ';
      nav+='</div>';
      }

    }

  return nav;
  }





var demoKeyVal={
"ethnicity_id":{
  "1":"White", "2":"Black or African American", "4":"Asian", "5":"Hispanic or Latino", "3":"American Indian or Alaskan Native", "6":"Native Hawaiian or Pacific Islander"},
"gender_id":{
  "1":"Female", "2":"Male"},
"age_id":{
  "1":"0 - 14", "2":"15 - 18", "3":"19 -  21", "4":"22 - 29", "5":"30 - 39", "6":"40 - 49", "7":"50 - 59", "8":"60 - 69", "9":"70 - 79", "10":"80 - 89", "11":"90 - 99", "12":"100+"},
"career_id":{
  "1":"Management", "2":"Business, Financial Operations", "3":"Computer, Mathematical", "4":"Architecture, Engineering", "5":"Life, Physical, Social Services", "6":"Community, Social Services", "7":"Legal", "8":"Education, Training, Library", "9":"Arts, Design, Entertainment, Sports, Media", "10":"Healthcare Practitioners, Technical", "11":"Healthcare Support", "12":"Protective Service", "13":"Food Preparation and Serving Related", "14":"Building and Grounds Cleaning, Maintenance", "15":"Personal Care, Service", "16":"Sales and Related", "17":"Office and Administrative Support", "18":"Farming, Forestry, Fishing", "19":"Construction, Extraction", "20":"Installation, Repair, Maintenance", "21":"Production", "22":"Transportation, Material Moving", "23":"Business Owner", "24":"Student"}
};



function showExternalUrl(linkUrl){
  //console.log('showExternalUrl '+linkUrl);
  window.location=linkUrl;
  }
function showCpa(itemId){
  if(profileIsComplete()==true){
    activeItemId=itemId; 
    proceedToItemId=0;
    hideWorkflow();
    var serialForm='action=resumeItem';
    serialForm+= userFieldsString;
    serialForm+='&itemId='+itemId;

    jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
      var returnedErrors=data.errors;
      if(returnedErrors.length>0){
        var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
        alert(errorString); 
        }
      else{
        document.getElementById('cpaWrapper').style.display="block";
        updateQuestions(data.stateObj);
        updateNav();
        //showGraph();
        showQuestion();
        }
      }, "json");
    }
  else{
    proceedToItemId=itemId;
    manageProfile();
    }
  }
function profileIsComplete(){
  var result=true;
  if((user.ethnicity_id==0)||(user.gender_id==0)||(user.age_id==0)||(user.career_id==0)){result=false;}
  return result;
  }

var proceedToItemId=0;
function manageProfile(){
  var contextString='&nbsp;';
  if(user.consultantUserId != "0"){
    var consultantUser=usersById[user.consultantUserId];
    contextString+='<div class="contextMessages bottomMargin">';
    contextString+='<h3>Your Facilitator:</h3>';
    contextString+='<p>';
    contextString+=consultantUser.firstName+' '+consultantUser.lastName+'<br />';
    contextString+=consultantUser.company+'<br />';
    contextString+='<a href="mailto:'+consultantUser.email+'"> '+consultantUser.email+'</a><br />';
    contextString+=consultantUser.phone+'<br />';
    contextString+='<a href="'+consultantUser.website+'" target="_blank"> '+consultantUser.website+'</a><br />';
    contextString+='</p>';
    contextString+="</p></div>";
    }

  rep("contextDiv", contextString);
  rep("actionHeading", 'Profile: '+user.firstName+" "+user.lastName);

  var htmlString='';
  htmlString+='<div class="messages bottomMargin">';
  htmlString+='<h3>Company';
  htmlString+='<input id="profileCompany" class="email"  placeholder="enter company" value="'+user.company+'" /></h3>';
  htmlString+='<h3>Phone';
  htmlString+='<input id="profilePhone" class="email"  placeholder="your phone #"  value="'+user.phone+'" /></h3>';
 
  if(user.isConsultant==1){
    htmlString+='<h3>Website';
    htmlString+='<input id="profileWebsite" class="email"  placeholder="your website"  value="'+user.website+'" /></h3>';
    }

  htmlString+='<h3>Ethnicity';
  //htmlString+='<input id="ethnicity_id" class="email"  placeholder="ethnicity" value="'+user.ethnicity_id+'" /></h3>';
  var pulldownString='';
  pulldownString+='<select id="ethnicity_id" class="demoSelect">';
  var selected="";
  if(user.ethnicity_id==0){selected="SELECTED";}
  pulldownString+='<option value="0" disabled '+selected+'>Ethnicity *</option>';
  var ethnicityKeys=Object.keys(demoKeyVal.ethnicity_id);
  for (var k=0; k<ethnicityKeys.length; k++){
    //console.log("ids["+c+"]="+ ids[c]);
    var selected="";
    if(user.ethnicity_id==ethnicityKeys[k]){selected="SELECTED";}
    pulldownString+='<option value="'+ethnicityKeys[k]+'" '+selected+'>'+demoKeyVal.ethnicity_id[ethnicityKeys[k]] +'</option>';
    }
  pulldownString+='</select>';
  pulldownString+='</h3>';
  htmlString+=pulldownString;

  htmlString+='<h3>Gender';
  //htmlString+='<input id="gender_id" class="email"  placeholder="gender"  value="'+user.gender_id+'" /></h3>';
  var pulldownString='';
  pulldownString+='<select id="gender_id" class="demoSelect">';
  var selected="";
  if(user.gender_id==0){selected="SELECTED";}
  pulldownString+='<option value="0" disabled '+selected+'>Gender *</option>';
  var genderKeys=Object.keys(demoKeyVal.gender_id);
  for (var k=0; k<genderKeys.length; k++){
    //console.log("ids["+c+"]="+ ids[c]);
    var selected="";
    if(user.gender_id==genderKeys[k]){selected="SELECTED";}
    pulldownString+='<option value="'+genderKeys[k]+'" '+selected+'>'+demoKeyVal.gender_id[genderKeys[k]] +'</option>';
    }
  pulldownString+='</select>';
  pulldownString+='</h3>';
  htmlString+=pulldownString;

  htmlString+='<h3>Age';
  var pulldownString='';
  pulldownString+='<select id="age_id" class="demoSelect">';
  var selected="";
  if(user.age_id==0){selected="SELECTED";}
  pulldownString+='<option value="0" disabled '+selected+'>Age *</option>';
  var ageKeys=Object.keys(demoKeyVal.age_id);
  for (var k=0; k<ageKeys.length; k++){
    //console.log("ids["+c+"]="+ ids[c]);
    var selected="";
    if(user.age_id==ageKeys[k]){selected="SELECTED";}
    pulldownString+='<option value="'+ageKeys[k]+'" '+selected+'>'+demoKeyVal.age_id[ageKeys[k]] +'</option>';
    }
  pulldownString+='</select>';
  pulldownString+='</h3>';
  htmlString+=pulldownString;

  htmlString+='<h3>Career';
  //htmlString+='<input id="career_id" class="email"  placeholder="career"  value="'+ user.career_id+'" /></h3>';
  var pulldownString='';
  pulldownString+='<select id="career_id" class="demoSelect">';
  var selected="";
  if(user.career_id==0){selected="SELECTED";}
  pulldownString+='<option value="0" disabled '+selected+'>Career *</option>';
  var careerKeys=Object.keys(demoKeyVal.career_id);
  for (var k=0; k<careerKeys.length; k++){
    //console.log("ids["+c+"]="+ ids[c]);
    var selected="";
    if(user.career_id==careerKeys[k]){selected="SELECTED";}
    pulldownString+='<option value="'+careerKeys[k]+'" '+selected+'>'+demoKeyVal.career_id[careerKeys[k]] +'</option>';
    }
  pulldownString+='</select>';
  pulldownString+='</h3>';
  htmlString+=pulldownString;


  var pdfMethods=["default", "server", "save", "open", "div"];
  htmlString+='<h3>PDF Method';
  var pulldownString='';
  pulldownString+='<select id="pdfMethod" class="demoSelect">';
  for (var m=0; m<pdfMethods.length; m++){
    var selected="";
    if(user.pdfMethod==pdfMethods[m]){selected="SELECTED";}
    pulldownString+='<option value="'+pdfMethods[m]+'" '+selected+'>'+pdfMethods[m] +'</option>';
    }
  pulldownString+='</select>';
  pulldownString+='</h3>';
  htmlString+=pulldownString;

  if(user.isConsultant==1){
    htmlString+='<h3>Invitation Email Message</h3>';
    user.inviteText = user.inviteText.replace(/\\n/gi,"\n");
    user.inviteText = user.inviteText.replace(/\\/gi,"");
    htmlString+='<textarea id="profileInviteText" name="pim" />'+user.inviteText+'</textarea>';
    }

  
  if(user.isConsultant==1){
    htmlString+='<span style="clear:both;"></span><input type="button" class="navButton" onclick="buttonDown(this.id); cancelProfileChanges();" id="navProfileCancel" value="cancel" /><input type="button" class="navButton" onclick="buttonDown(this.id); updateConsultantProfile()" id="navProfileUpdate" value="update" />';
    }
  else{
    htmlString+='<span style="clear:both;"></span><input type="button" class="navButton" onclick="buttonDown(this.id); cancelProfileChanges();" id="navProfileCancel" value="cancel" /><input type="button" class="navButton" onclick="buttonDown(this.id); updateUserProfile()" id="navProfileUpdate" value="update" />';
    }

  htmlString+='<h4>user.id: '+user.id+'</h4>';
  htmlString+='<h4>wpLogin: '+user.wpLogin+'</h4>';
  htmlString+='<h4>email: '+user.email+'</h4>';
  htmlString+='<h4>Platform: '+platform+'</h4>';
  htmlString+='<h4>Browser: '+browser+'</h4>';
  htmlString+='<h4>Default PDF Method: '+pdfMethod[platform][browser]+'</h4>';
  htmlString+='<h4><a href="http://www.corepassion.com/wp-admin/profile.php">Edit CorePassion.com Profile &raquo;</a></h4>';

  htmlString+='</div>';
  rep("actionDiv", htmlString);
  }
function cancelProfileChanges(){
  rep("actionDiv",'<div id="splashglobe" class="splashglobe"><h3>Profile update cancelled.</h3></div>');
  proceedToItemId=0;
  }
function updateUserProfile(){
  var serialForm='action=updateUserProfile';

  serialForm+='&company='+document.getElementById('profileCompany').value;
  serialForm+='&phone='+document.getElementById('profilePhone').value;
  serialForm+='&ethnicity_id='+document.getElementById("ethnicity_id").value;
  serialForm+='&gender_id='+document.getElementById("gender_id").value;
  serialForm+='&age_id='+document.getElementById("age_id").value;
  serialForm+='&career_id='+document.getElementById("career_id").value;
  serialForm+='&pdfMethod='+document.getElementById("pdfMethod").value;

  serialForm+= userFieldsString;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      profileUpdateComplete();
      }
    }, "json");
  }
function updateConsultantProfile(){

  var serialForm='action=updateConsultantProfile';

  serialForm+='&ethnicity_id='+document.getElementById("ethnicity_id").value;
  serialForm+='&gender_id='+document.getElementById("gender_id").value;
  serialForm+='&age_id='+document.getElementById("age_id").value;
  serialForm+='&career_id='+document.getElementById("career_id").value;
  serialForm+='&pdfMethod='+document.getElementById("pdfMethod").value;

  serialForm+='&company='+document.getElementById('profileCompany').value;
  serialForm+='&website='+document.getElementById('profileWebsite').value;
  serialForm+='&phone='+document.getElementById('profilePhone').value;
  serialForm+='&inviteText='+document.getElementById('profileInviteText').value;

  serialForm+= userFieldsString;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      profileUpdateComplete();
      }
    }, "json");

  }
function profileUpdateComplete(){
  if(proceedToItemId>0){
    if(profileIsComplete()==true){
      showCpa(proceedToItemId);
      }
    else{
      alert("Please compete required fields*");
      }
    }
  else{
    rep("actionDiv",'<div id="splashglobe" class="splashglobe"><h3>Profile updated.</h3></div>');
    }
  }

function giftButton(giftEmail){
  //rep("contextDiv", "giftButton("+giftEmail+")");
  giftEmail=giftEmail.toLowerCase();
  var valid=validateEmail(giftEmail);
  if(valid==false){
    alert('enter valid email');
    return false;
    }
  var serialForm='action=sendGift';
  serialForm+='&giftEmail='+giftEmail;
  serialForm+= userFieldsString;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
      rep("contextDiv", 'returned '+ textStatus);
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      pendingGifts=data.pendingGiftsList;
      rep("contextDiv", returnNav());
      manageGifts();
      }
    }, "json");
  }
function ungiftButton(ungiftEmail){
  //rep("contextDiv", "ungiftButton("+ungiftEmail+")");

  var serialForm='action=unsendGift';
  serialForm+='&ungiftEmail='+ungiftEmail;
  serialForm+= userFieldsString;
  //app("contextDiv", 'serialForm='+serialForm);

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      pendingGifts=data.pendingGiftsList;
      user=data.user;
      updateUsersById(data.updateList);
      rep("contextDiv", returnNav());
      manageGifts();
      }
    }, "json");
  }

function inviteButton(){
  //console.log('inviteButton()');
  var inviteEmail=document.getElementById('inviteEmail').value;
  document.getElementById('inviteEmail').value="";

  inviteEmail=inviteEmail.toLowerCase();
  var inviteChecked=document.getElementById('inviteBlind').value;
  var inviteMessage=document.getElementById('inviteMessage').value;
  var inviteBlind=0;
  if(inviteChecked=="off"){inviteBlind=1;}
  var inviteEmails=[];
  if(inviteEmail.indexOf(",")>-1){
    inviteEmail = inviteEmail.replace(/ /g,"");
    inviteEmails=inviteEmail.split(",");
    }
  if(inviteEmail.indexOf(" ")>-1){
    inviteEmails=inviteEmail.split(" ");
    }
  if(inviteEmails.length==0){
    inviteEmails.push(inviteEmail);
    }
  var invalids=[];
  for (var e=0; e<inviteEmails.length; e++){
    var email=inviteEmails[e].toLowerCase();
    var valid=validateEmail(inviteEmail);
    if(valid==false){allValid=false;}  
    }
  if(invalids.length>0){
    alert(invalids.length+' invalid emails: '+invalds.join(", "));
    return false;
    }
  if(inviteEmails.length>user.unusedInvites){
    alert(inviteEmails.length +' is more emails than you have invites ('+ user.unusedInvites +')');
    return false;
    }

  var serialForm='action=sendInvite';
  serialForm+='&consultantEmail='+user.email;
  serialForm+='&inviteEmails='+inviteEmails.join(",");
  serialForm+='&inviteBlind='+inviteBlind;
  serialForm+='&inviteMessage='+inviteMessage;
  serialForm+= userFieldsString;
  
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      pendingInvites=data.pendingInvitesList;
      showTools();
      manageInvites();
      var message="";
      for(var m=0; m<user.messages.length; m++){
        var mess=user.messages[m];
        if(mess.indexOf("Mail")>-1){
          message+=mess+"<br />";
          }
        } 
      prep("actionDiv", '<div class="messages">'+message+'</div>');
      document.getElementById('actionDiv').scrollTop=0;
      document.getElementById('contextDiv').scrollTop=0;

      }
    }, "json");
  }

function uninviteButton(uninviteEmail){
  var serialForm='action=unsendInvite';
  serialForm+='&uninviteEmail='+uninviteEmail;
  serialForm+= userFieldsString;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      pendingInvites=data.pendingInvitesList;
      user=data.user;
      updateUsersById(data.updateList);
      manageInvites();
      managePendingInvites();
      }
    }, "json");
  }

// begin user search 
function manageUsers(){
  var str="";
  rep('actionHeading', 'Search Users');
  var showObject={};
  var ids=idsOfAll();
  str+='<div class="messages">';
  str+='<h3 style="clear:both;">';
  if(user.isAdmin==1){
    var usersSearchButtonStr='<div id="usersSearchButton" onclick="usersSearchButtonPressed()"></div>';
    str+=usersSearchButtonStr;
    }
  str+='<input id="usersFilterInput" class="email"  placeholder="filter" onkeyup="usersFilterInputChanged()" />';
  str+='</h3>';
  str+='</div><br />';
  str+='<div id="usersTables" ></div>';
  rep("actionDiv", str);
  refreshUsersTables();
  }  

function usersSearchButtonPressed(){
  var searchString=document.getElementById('usersFilterInput').value;
  if(searchString==""){
    return false;
    }
  var serialForm='action=searchUsers';
  serialForm+= userFieldsString;
  serialForm+= '&searchString='+searchString;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
      refreshUsersTables();
      }
    }, "json");
  }
function usersFilterInputChanged(e){
  //console.log(document.getElementById('usersFilterInput').value);
  refreshUsersTables();
  }
function refreshUsersTables(){
  var ids=idsOfAll();
  var users=returnUsersByIds(ids);
  var filter=document.getElementById('usersFilterInput').value;
  
  if(filter != ""){
    var matchUsers=[];
    for (var u=0; u<users.length; u++){
      var lcDisplay=users[u].wpDisplayName.toLowerCase();
      var lcLogin=users[u].wpLogin.toLowerCase();
      var lcFirstLast=users[u].firstName.toLowerCase()+" "+users[u].lastName.toLowerCase();
      filter=filter.toLowerCase();
      var matched=false;
      if(lcDisplay.indexOf(filter)>-1){
        matched=true;
        }
      if(lcLogin.indexOf(filter)>-1){
        matched=true;
        }
      if(lcFirstLast.indexOf(filter)>-1){
        matched=true;
        }
      if(matched){
        matchUsers.push(users[u]);
        }

      }
    users=matchUsers;
    }
  if(user.isAdmin==1){
    showObject={"wpDisplayName":4, "consultantUserId":6, "isConsultant":3};
    rep("usersTables", returnTablesFromArrayOfUsers(users, showObject));
    }
  else{
    showObject={"wpDisplayName":6};
    rep("usersTables", returnTablesFromArrayOfUsers(users, showObject));
    }
  //console.log('refreshUsersTables()');
  }
// end user search?


// begin pickUser

var pickUserId=-1;
function returnPickUser(){
  var str="";
  var showObject={};
  var ids=idsOfAll();
  str+='<h3 style="clear:both;">';
  if(user.isAdmin==1){
    var pickUserButtonStr='<div id="pickUserButton" onclick="pickUserButtonPressed()"></div>';
    str+=pickUserButtonStr;
    }
  str+='<input id="pickUserFilterInput" class="email"  placeholder="filter" onkeyup="pickUserFilterInputChanged()" />';
  str+='</h3>';
  str+='<div id="pickUserTables" ></div>';
  return str;
  }  
//refreshPickUserTables();
function pickUserButtonPressed(){
  var searchString=document.getElementById('pickUserFilterInput').value;
  console.log('pickUserButtonPressed() '+searchString);
  if(searchString==""){
    return false;
    }
  var serialForm='action=searchUsers';
  serialForm+= userFieldsString;
  serialForm+= '&searchString='+searchString;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
      refreshPickUserTables();
      }
    }, "json");
  }
function pickUserFilterInputChanged(e){
  console.log(document.getElementById('pickUserFilterInput').value);
  refreshPickUserTables();
  }
function refreshPickUserTables(){
  var ids=idsOfAll();
  var users=returnUsersByIds(ids);
  var filter=document.getElementById('pickUserFilterInput').value;
  
  if(filter != ""){
    var matchUsers=[];
    for (var u=0; u<users.length; u++){
      var lcDisplay=users[u].wpDisplayName.toLowerCase();
      var lcLogin=users[u].wpLogin.toLowerCase();
      var lcFirstLast=users[u].firstName.toLowerCase()+" "+users[u].lastName.toLowerCase();
      filter=filter.toLowerCase();
      var matched=false;
      if(lcDisplay.indexOf(filter)>-1){
        matched=true;
        }
      if(lcLogin.indexOf(filter)>-1){
        matched=true;
        }
      if(lcFirstLast.indexOf(filter)>-1){
        matched=true;
        }
      if(matched){
        matchUsers.push(users[u]);
        }

      }
    users=matchUsers;
    }
  if(user.isAdmin==1){
    showObject={"id":1, "wpDisplayName":6};
    rep("pickUserTables", returnRadioFromArrayOfUsers(users, showObject));
    }
  else{
    showObject={"id":1, "wpDisplayName":6};
    rep("pickUserTables", returnRadioFromArrayOfUsers(users, showObject));
    }
  updatePickStatus();
  console.log('refreshPickUserTables() ran');
  }

function returnRadioFromArrayOfUsers(theArray, showObject){
  var showArray=Object.keys(showObject);
  var tableString='<table class="usersTable">';
  theArray.sort(function(a, b){return a.lastName.localeCompare(b.lastName);});// sept 21    
  if(theArray.length>0){
    tableString+='<tr>';
    var keys=Object.keys(theArray[0]);
    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        tableString+='<td class="td'+showObject[keys[k]]+'">'+relabel(keys[k])+'</td>';
        }
      }
    tableString+='</tr>';
    }

  for (var u=0; u<theArray.length; u++){
    tableString+='<tr>';
    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        var outputString=theArray[u][keys[k]];
        if(keys[k]=="wpDisplayName"){
          outputString=theArray[u].firstName+" "+theArray[u].lastName;
          }
        if(keys[k]=="id"){
          outputString='<input type="radio" name="pickUserRadio" onclick="updatePickStatus()" class="bucketRadio" value="'+theArray[u].id+' '+ theArray[u].firstName+" "+theArray[u].lastName +'" />';
          }
        tableString+='<td>'+outputString+'</td>';
        }
      }
    tableString+='</tr>';
    }
  tableString+="</table>";
  return tableString;
  }

// end pickUser


var pidBySku={};
var user={};
var products=[];
var items=[];
var teams=[];
var members=[];
var allOpenReceipts=[];
function tabQuestions(){
  questions.sort(function(a, b){
    return a.question_id-b.question_id
  });
  var outStr="";
  for (var q=0; q<questions.length; q++){
    outStr+=questions[q].question_id+"\t"+questions[q].question_statement+"\r";
    }
  for (var q=0; q<questions.length; q++){
    outStr+=questions[q].question_id+"\t"+questions[q].dictionary+"\r";
    }
  return outStr;
  }
    var unopenedItems=[];
    var incompleteItems=[];
    var completedItems=[];
    var mobileItems=[];
    var externalItems=[];
function showProducts(){
  rep('actionDiv', '');
  var showBuyNow=true;
  if(items.length>0){
    app('actionDiv', '<h1>My Items</h1>');
    unopenedItems=[];
    incompleteItems=[];
    completedItems=[];
    mobileItems=[];
    externalItems=[];
    items.sort(function(a, b){
      return b.updatedYYYYMMDD-a.updatedYYYYMMDD
      });  

    for (var i=0; i<items.length; i++){
      var item=items[i];
      if(item.completed==1){
        completedItems.push(item);
        }
      else{
        if(item.consumed==1){
          incompleteItems.push(item);
          }
        else{
          if(item.productType=="Mobile"){
            mobileItems.push(item);
            }
          else{
            if(item.linkUrl != ""){
              externalItems.push(item);
              }
            else{
              unopenedItems.push(item);
              }
            }
          }
        }
      }
    if(mobileItems.length>0){
      app('actionDiv', '<h4>Linked Apps</h4>');
      app('actionDiv', tableFromArrayOfItems(mobileItems, {"name":16}));
      }
    if(externalItems.length>0){
      app('actionDiv', '<h4>Purchased Content</h4>');
      app('actionDiv', tableFromArrayOfItems(externalItems, {"name":16}));
      }
    if(unopenedItems.length>0){
      showBuyNow=false;
      app('actionDiv', '<h4>Unopened Items</h4>');
      app('actionDiv', tableFromArrayOfItems(unopenedItems, {"name":10, "stateObj":6}));
      }
    if(incompleteItems.length>0){
      showBuyNow=false;
      app('actionDiv', '<h4>Incomplete Items</h4>');
      app('actionDiv', tableFromArrayOfItems(incompleteItems, {"name":10, "stateObj":6}));
      }
    if(completedItems.length>0){
      completedItems.sort(function(a, b){return b.updatedYYYYMMDD-a.updatedYYYYMMDD}); 
      app('actionDiv', '<h4>Completed Items</h4>');
      app('actionDiv', tableFromArrayOfItems(completedItems, {"name":10, "updatedYYYYMMDD":6}));
      }
    }
  //app('actionDiv', '<h2>Available for Purchase</h2>');
  products.sort(function(a, b){
    return b["sort"]-a["sort"]
    });  
  
  app("actionDiv", tableFromArrayOfProducts(products,{"productType":5, "name":5},showBuyNow));
  document.getElementById('actionDiv').scrollTop=0;
  }
function returnShades(){
  var shades="";
  //shades+='<div id="shadeActionTopDiv" class="shade topshadeAction" style="display:none;"></div>';
  shades+='<div id="shadeActionBottomDiv"  class="shade bottomshadeAction" style="display:none;"></div>';
  //shades+='<div id="shadeContextTopDiv" class="shade topshadeContext" style="display:none;"></div>';
  shades+='<div id="shadeContextBottomDiv"  class="shade bottomshadeContext" style="display:none;"></div>';
  return shades;
  }


function manageTeams(){
  rep("actionHeading", "Manage Teams")
  rep("actionDiv", returnTeamsTable(teams,members));
  }

function createTeam(){
  var newName=window.prompt("Enter Team Name (My Company: My Team)");
  if(newName===null){return false;}
  if(newName.length<3){return false;}

  var serialForm='action=createTeam';
  serialForm+= userFieldsString;
  serialForm+='&newName='+newName;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      teams=data.teamsList;
      rep("actionDiv", returnTeamsTable(teams,members));
      }
    }, "json");
  }
function deleteTeam(teamId){
  var serialForm='action=deleteTeam';
  serialForm+= userFieldsString;
    serialForm+='&teamId='+teamId;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      teams=data.teamsList;
      members=data.membersList;
      rep("actionDiv", returnTeamsTable(teams,members));
      }
    }, "json");
  }
var selectedTeamId=-1;
function returnTeamsTable(teamsArray, membersArray){
  teamsArray.reverse();
  var str="";
  str+='<div class="messages">';

  str+=' <input class="manageButton" style="clear:both;" type="button" onclick="buttonDown(this.id); createTeam()" id="navTeamsNew" value="NEW TEAM" />';
  
  // iterate over teams
  for (var t=0; t<teamsArray.length; t++){
    var memberCount=0;
    for (var m=0; m<membersArray.length; m++){
      if(membersArray[m].teamId==teamsArray[t].id){
        memberCount++;
        //console.log("m="+m+ " teamsArray["+t+"].id="+teamsArray[t].id);
        }
      }
    
    str+='<h3 style="clear:both;">'+teamsArray[t].teamName+'</h3>';
    str+=' <input class="deleteButton" type="button" id="navTeamsDelete" onclick="buttonDown(this.id); deleteTeam(\''+ teamsArray[t].id+'\')" value="X" />';
    str+=' <input class="manageButton" type="button" id="navTeamsProfile" onclick="buttonDown(this.id); loadTeamProfile(\''+ teamsArray[t].id+'\')" value="Profile" />';
    str+=' <input class="manageButton" type="button" id="navTeamsManage" onclick="buttonDown(this.id); manageMembers(\''+ teamsArray[t].id+'\')" value="'+memberCount+' Members" />';
    str+='';
    }

  str+=' <input class="navButton" style="clear:both;" type="button" id="manageTeamsDone" onclick="buttonDown(this.id); showTools()" value="DONE" />';

  str+='</div>';
  return str;
  }

function idsOfAdmins(){
  var allIds=Object.keys(usersById);
  var matchIds=[];
  for (var i=0; i<allIds.length; i++){
    if(usersById[allIds[i]].isAdmin==1){
      matchIds.push(allIds[i]);
      }
    }
  return matchIds;
  }
function idsOfConsultantsOld(){
  var allIds=Object.keys(usersById);
  var matchIds=[];
  for (var i=0; i<allIds.length; i++){
    if(usersById[allIds[i]].isConsultant==1){
      matchIds.push(allIds[i]);
      }
    }
  return matchIds;
  }

function idsOfConsultants(){
  var ids=Object.keys(usersById);
  var idsAndLastNames=[];
  for (var c=0; c<ids.length; c++){
    if(usersById[ids[c]].isConsultant==1){
      idsAndLastNames.push({"cid":ids[c], "lastName":usersById[ids[c]].lastName+" "+usersById[ids[c]].firstName});
      }  
    }  
  idsAndLastNames.sort(function(a, b){
    var textA = a.lastName.toUpperCase();
    var textB = b.lastName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });  
  ids=[];
  for (var c=0; c<idsAndLastNames.length; c++){
    ids.push(idsAndLastNames[c].cid);
    //console.log(idsAndLastNames[c].lastName.toUpperCase()+" idsAndLastNames="+ idsAndLastNames[c].cid);
    }
  return ids;
  }
function idsOfRegular(){
  var allIds=Object.keys(usersById);
  var matchIds=[];
  for (var i=0; i<allIds.length; i++){
    if((usersById[allIds[i]].isAdmin==0)&&(usersById[allIds[i]].isConsultant==0)){
      matchIds.push(allIds[i]);
      }
    }
  return matchIds;
  }
function idsOfAll(){
  var ids=Object.keys(usersById);
  var idsAndLastNames=[];
  for (var c=0; c<ids.length; c++){
    idsAndLastNames.push({"cid":ids[c], "lastName":usersById[ids[c]].lastName+" "+usersById[ids[c]].firstName});
    }  
  idsAndLastNames.sort(function(a, b){
    var textA = a.lastName.toUpperCase();
    var textB = b.lastName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });  
  ids=[];
  for (var c=0; c<idsAndLastNames.length; c++){
    ids.push(idsAndLastNames[c].cid);
    //console.log(idsAndLastNames[c].lastName.toUpperCase()+" idsAndLastNames="+ consultantsIdLastName[c].cid);
    }

  return ids;
  }

function manageMembers(teamId){
  selectedTeamId=teamId;
  for (var t=0; t<teams.length; t++){
    if(teams[t].id==teamId){
      rep("actionDiv", returnMembersTable(teams[t], members));
      }
    }
  }

var filteredUserIds=[];
var addingMembers=false;

function manageTeamAddButtonPressed(){
  var str='';
  //console.log('manageTeamAddButtonPressed() addingMembers='+addingMembers);
  var team={};
  for (var t=0; t<teams.length; t++){
    if(teams[t].id==selectedTeamId){
      team=teams[t];
      }
    }
  str+='<div class="contextMessages">';
  str+='<h3>Add to: '+team.teamName+'</h3>';
  str+='<h3 style="clear:both;">';
  if(user.isAdmin==1){
    var addMembersSearchButtonStr='<div id="addMembersSearchButton" onclick="addMembersSearchButtonPressed()"></div>';
    str+=addMembersSearchButtonStr;
    }
  str+='<input id="addMembersFilterInput" class="email"  placeholder="filter" onkeyup="addMembersFilterInputChanged()" />';
  str+='</h3>';
  addingMembers=true;
  str+='<div id="memberSelect" style=""></div>';
  str+=' <input class="navButton" style="clear:both;" type="button" id="navAddingDone" onclick="buttonDown(this.id); doneAddingMembers()" value="DONE" />';
  str+='</div>';
  rep("contextDiv", str);   
  updateMemberSelect();
  }
function addMembersFilterInputChanged(e){
  //console.log(document.getElementById('addMembersFilterInput').value);
  updateMemberSelect();
  }
function addMembersSearchButtonPressed(){
  var searchString=document.getElementById('addMembersFilterInput').value;
  if(searchString==""){
    return false;
    }
  var serialForm='action=searchUsers';
  serialForm+= userFieldsString;
  serialForm+= '&searchString='+searchString;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
      updateMemberSelect();
      }
    }, "json");
  }

function updateMemberSelect(){
  var team={};
  for (var t=0; t<teams.length; t++){
    if(teams[t].id==selectedTeamId){
      team=teams[t];
      }
    }
  var users=returnUsersByIds(idsOfAll());
  var filter=document.getElementById('addMembersFilterInput').value;
  
  if(filter != ""){
    var matchUsers=[];
    for (var u=0; u<users.length; u++){
      var lcDisplay=users[u].wpDisplayName.toLowerCase();
      var lcLogin=users[u].wpLogin.toLowerCase();
      var lcFirstLast=users[u].firstName.toLowerCase()+" "+users[u].lastName.toLowerCase();
      filter=filter.toLowerCase();
      var matched=false;
      if(lcDisplay.indexOf(filter)>-1){
        matched=true;
        }
      if(lcLogin.indexOf(filter)>-1){
        matched=true;
        }
      if(lcFirstLast.indexOf(filter)>-1){
        matched=true;
        }
      if(matched){
        matchUsers.push(users[u]);
        }

      }
    users=matchUsers;
    } 
  users.sort(function(a, b){
    var aName=a.lastName+" "+a.firstName;
    var bName=b.lastName+" "+b.firstName;
    return aName.localeCompare(bName);
    }
  );    
  document.getElementById('memberSelect').innerHTML=returnNonMembersTable(team, members, users);   
  }
function returnUsersByIds(ids){
  var users=[];
  for (var i=0; i<ids.length; i++){
    users.push(usersById[ids[i]]);
    }
  return users;
  }
function doneAddingMembers(){
  addingMembers=false;
  showTools();
  manageTeams();
  }
function returnNonMembersTable(team, sortedMembers, usersArray){
  var str="";
  
  for (var u=0; u<usersArray.length; u++){
    var includeUser=true;
    for (var m=0; m<sortedMembers.length; m++){
      if((sortedMembers[m].teamId==team.id)&&(sortedMembers[m].memberUserId==usersArray[u].id)){
        includeUser=false;
        }
      }
    if(includeUser){
      str+='<input input type="button" class="addMemberButton" onclick="addTeamMember('+team.id+', '+usersArray[u].id+');" value="'+usersArray[u].lastName+', '+usersArray[u].firstName+'"> ';
      str+='<br />';
      }
    }
  return str;
  }

var assessmentsToReveal=[];
var usersToReveal=[];
function unhideOneUserAssessment(userId, assessmentId){
  //console.log("unhideOneUserAssessment");

  var serialForm='action=unhideItemIds';
  serialForm+= userFieldsString;
  serialForm+= '&itemIds='+assessmentId;
  serialForm+= '&userIds='+userId;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
      document.getElementById('assessmentHidden').innerHTML="";
      }
    }, "json");
  }

function unhideAssessments(){
  //console.log("unhideAssessments");
  //console.log(assessmentsToReveal);
  //console.log(usersToReveal);

  var serialForm='action=unhideItemIds';
  serialForm+= userFieldsString;
  serialForm+= '&itemIds='+assessmentsToReveal.join(",");
  serialForm+= '&userIds='+usersToReveal.join(",");
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      //document.getElementById('unhideButton').style.opacity=".5";

      updateUsersById(data.updateList);

      manageMembers(selectedTeamId);
      }
    }, "json");
  }

function returnMembersTable(team, membersArray){
  var sortedMembers=[];
  var unsortedMembers=[];

  for (var m=0; m<membersArray.length; m++){
    if(membersArray[m].teamId==team.id){
      if(membersArray[m].sortNum==0){unsortedMembers.push(membersArray[m]);}
      else{sortedMembers.push(membersArray[m]);}
      }
    }
  sortedMembers.sort(function(a, b){return a.sortNum-b.sortNum});
  if(unsortedMembers.length>0){
    for(var u=0; u<unsortedMembers.length; u++){
      sortedMembers.push(unsortedMembers[u]);
      }
    for(var s=0; s<sortedMembers.length; s++){
      sortedMembers[s].sortNum=s+1;
      }
    updateSort(sortedMembers);
    }
  var membersStr="";
  assessmentsToReveal=[];
  usersToReveal=[];
  for (var m=0; m<sortedMembers.length; m++){
    if(sortedMembers[m].teamId==team.id){
      var memberUser=usersById[sortedMembers[m].memberUserId];
      membersStr+='<div style="clear:both;"></div>';
      membersStr+='<input input type="button" class="iconButton" onclick="removeTeamMember('+team.id+', '+memberUser.id+');" value="X">';
      membersStr+='<input input type="button" class="iconButton" onclick="demoteTeamMember('+team.id+', '+memberUser.id+', '+sortedMembers[m].sortNum+');" value="\\/">';
      membersStr+='<input input type="button" class="iconButton" onclick="promoteTeamMember('+team.id+', '+memberUser.id+', '+sortedMembers[m].sortNum+');" value="/\\">';
      var asterix="";
      if(memberUser.assessmentIsBlind==1){
        asterix=" *";
        assessmentsToReveal.push(memberUser.assessmentItemId);
        usersToReveal.push(memberUser.id);
        }
     
      membersStr+='<input input type="button" class="memberName" onclick="infoUserId('+memberUser.id+');" value="'+memberUser.lastName+', '+memberUser.firstName+asterix+'">';
      }
    }
   var str="";

  str+='<div class="messages">';
  var s="s";
  if(sortedMembers.length==1){s="";}
  str+='<h3>';
  str+=team.teamName+': '+sortedMembers.length+' member'+s+' ';

  str+='<input class="manageButton" style="clear:both; margin-right:'+g*3+'px;" type="button" id="navTeamAdd" onclick="buttonDown(this.id); manageTeamAddButtonPressed()" value="ADD" />';
  if(assessmentsToReveal.length>0){
    str+='<input class="manageButton" type="button" id="unhideButton" id="navTeamUnhide" onclick="buttonDown(this.id); unhideAssessments()" style="opacity:1;" value="* REVEAL" />';
    }
  str+='</h3>';
  str+=membersStr;
  
  str+='<h3>';
  str+='<input type="button" style="clear:both;" class="navButton" value="DONE" id="navMembersDone" onclick="buttonDown(this.id); manageTeams();">';
  str+='</h3>';
  str+='</div>';
  
  return str;
  }
function arrayElementById(theArray, id){
  for(var e=0; e<theArray.length; e++){
    if(theArray[e].id==id){return theArray[e];}
    }
  }


function addTeamMember(teamId, userId){
  var serialForm='action=addTeamMember';
  serialForm+= userFieldsString;
  serialForm+= '&teamId='+teamId;
  serialForm+= '&memberUserId='+userId;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      members=data.membersList;
      manageMembers(selectedTeamId);
      //console.log('added team member. addingMembers='+ addingMembers);
      if(addingMembers){updateMemberSelect();}
      }
    }, "json");
  }

function removeTeamMember(teamId, userId){
  var serialForm='action=removeTeamMember';
  serialForm+= userFieldsString;
  serialForm+= '&teamId='+teamId;
  serialForm+= '&memberUserId='+userId;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      members=data.membersList;
      manageMembers(selectedTeamId);
      if(addingMembers){updateMemberSelect();}
      }
    }, "json");
  }




function promoteTeamMember(teamId, userId, sortNum){
  if(sortNum==1){return false;}
  var swapUserId=0;
  var swapSortNum=0;
  for (var m=0; m<members.length; m++){
    //console.log('members[m].teamId='+members[m].teamId+ ' members[m].sortNum='+members[m].sortNum);
    if((members[m].teamId==teamId)&&(members[m].sortNum==sortNum-1)){
      swapUserId=members[m].memberUserId;
      swapSortNum=members[m].sortNum;
      }
    }
  swapMembers(teamId, userId, sortNum, swapUserId, swapSortNum);  
  }
function demoteTeamMember(teamId, userId, sortNum){
  var swapUserId=0;
  var swapSortNum=0;
  for (var m=0; m<members.length; m++){
    //console.log('members[m].teamId='+members[m].teamId+ ' members[m].sortNum='+members[m].sortNum);
    if((members[m].teamId==teamId)&&(members[m].sortNum==sortNum+1)){
      swapUserId=members[m].memberUserId;
      swapSortNum=members[m].sortNum;
      }
    }
  if(swapSortNum==0){
    //alert('swap target not found');
    return false;
    }
  swapMembers(teamId, userId, sortNum, swapUserId, swapSortNum);  
  }

function swapMembers(teamId, userId, sortNum, swapUserId, swapSortNum){
  var serialForm='action=swapMembers';
  serialForm+= userFieldsString;
  serialForm+= '&teamId='+teamId;
  serialForm+= '&memberUserId='+userId;
  serialForm+= '&memberSortNum='+sortNum;
  serialForm+= '&swapUserId='+swapUserId;
  serialForm+= '&swapSortNum='+swapSortNum;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      members=data.membersList;
      manageMembers(selectedTeamId);
      }
    }, "json");
  }

function updateSort(sortedArray){
  var str=JSON.stringify(sortedArray);
  //console.log(str);
  var serialForm='action=resortMembers';
  serialForm+= userFieldsString;
  serialForm+= '&sortedArray='+str;
  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      members=data.membersList;
      manageMembers(selectedTeamId);
      }
    }, "json");
  }

function showUserDetails(userId){// obsolete
  alert('Should not run showUserDetails');
  }

function detailsDoneButtonPressed(){
  rep("contextDiv", returnConsultantTiles());
  }
function infoUserId(userId){
  // report links, invites
  var memberUser=usersById[userId];
  var str='';
  str+='<div class="contextMessages">';
  str+='<h3>'+memberUser.wpDisplayName+'</h3>';
  str+='<input type="button" style="clear:both;" class="navButton" value="DONE" id="navDetailsDone" onclick="buttonDown(this.id); detailsDoneButtonPressed()" />'

  var showObject={
    "company":"Company:",
    "phone":"Phone:",
    "email":"Email:"
    };// what consultants see

  if(user.isAdmin==1){
    showObject={
      "wpLogin":"Login:",
      "phone":"Phone:",
      "email":"Email:",
      "id":"id"
      };//what admins see
    if(memberUser.isConsultant==1){
      showObject.company="Company:";
      showObject.website="Website:";
      }
    }
  str+=tableOfDetails(usersById[userId], showObject);


  if(memberUser.isAssessed==1){
    if(user.isAdmin==1){
      str+='<h3 class="reportName" style="clear:both;">Gifts/Challenges';
      str+='<input input type="button" class="reportButton" id="navDetailGiftView" onclick="buttonDown(this.id); viewDetailUserId('+memberUser.id+');" value="view">';
      str+='<input input type="button" class="reportButton" id="navDetailsGiftPdf" onclick="buttonDown(this.id); pdfDetailUserId('+memberUser.id+');" value="PDF"></h3>';
      }
    str+='<h3 class="reportName">Full Report';
    str+='<input input type="button" class="reportButton" id="navDetailCpaView" onclick="buttonDown(this.id); viewReportUserId('+memberUser.id+');" value="view" style="clear:both;">';
    str+='<input input type="button" class="reportButton" id="navDetailCpaPdf" onclick="buttonDown(this.id); pdfReportUserId('+memberUser.id+');" value="PDF"></h3>';
    }
  if(memberUser.assessmentIsBlind==1){
    str+='<h3 class="reportName" id="assessmentHidden">Assessment Hidden. <input input type="button"  class="navButton" id="navDetailReveal" onclick="buttonDown(this.id); unhideOneUserAssessment('+memberUser.id+', '+memberUser.assessmentItemId+');" value="REVEAL"></h3>';
    }
  if(user.isAdmin==1){
    if(memberUser.isConsultant==1){
      str+='<h3 class="reportName">Unused Invites: '+memberUser.unusedInvites+'</h3>';
      //str+='<input input type="button" class="emailButton" id="navDetailDeleteUnused" onclick="buttonDown(this.id); deleteUnusedItems('+memberUser.id+', \''+memberUser.wpDisplayName+'\');" value="DELETE" style="Zclear:both;">';
      //str+='<input id="deleteNumber" type="text" value="'+memberUser.unusedInvites+'" class="email">';

      }  
    }
  str+='</div>';
  rep("contextDiv", str);
  }
var downButtonId="";
var buttonRed="rgb(186, 28, 27)"; 
var buttonDark="rgb(93, 14, 14)"; 
var buttonTimeout;
function buttonDown(id){
  document.getElementById('spinner').style.display="none";
  document.getElementById('downloadpdf').style.display="none";
  document.getElementById('uploadingpdf').style.display="none";

  window.clearTimeout(buttonTimeout);
  //console.log('buttonDown('+id+')');
  if(downButtonId != ""){
    if(document.getElementById(downButtonId)){
      document.getElementById(downButtonId).style.backgroundColor=buttonRed;
      }
    }
  downButtonId=id;
  if(downButtonId != ""){
    if(document.getElementById(downButtonId)){
      document.getElementById(downButtonId).style.backgroundColor=buttonDark;
      }
    buttonTimeout=window.setTimeout("buttonDown('')", 1000);
    }
  }
function deleteUnusedItems(targetUserId, targetName){
  var deleteNumber=document.getElementById('deleteNumber').value;
  if(confirm('Really delete '+deleteNumber+' invites?')==false){return false;}
  var serialForm='action=deleteUnusedItems';
  serialForm+= userFieldsString;
  serialForm+='&targetUserId='+targetUserId;
  serialForm+='&targetName='+targetName;
  serialForm+='&deleteNumber='+deleteNumber;
  //app("contextDiv", 'serialForm='+serialForm);

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      usersFilterInputChanged();
      detailsDoneButtonPressed();
      }
    }, "json");
  }
function truncate(str,len){
  if(str.length>len){str=str.substring(0,len);}
  return str;
  }
function assignConsultant(el){
  //app("contextDiv", "selectId:"+ el.id +" #:"+el.selectedIndex+" ="+el.options[el.selectedIndex].value);
  var temp=el.id;
  var parts=temp.split('_');
  var userId=Number(parts[1]);
  var consultantUserId=+el.options[el.selectedIndex].value;
  //rep("contextDiv", "assign "+userId+" to consultant "+consultantUserId);
  var serialForm='action=assignConsultant';
  serialForm+= userFieldsString;

  serialForm+='&userId='+userId;
  serialForm+='&consultantUserId='+consultantUserId;
  //app("contextDiv", 'serialForm='+serialForm);

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
   
      }
    }, "json");
  }

function toggleConsultant(el){
  //app("contextDiv", "checkbox id:"+ el.id +" checked:"+el.checked);
  var temp=el.id;
  var parts=temp.split('_');
  var userId=Number(parts[1]);
  //rep("contextDiv", "toggle "+userId+" to "+el.checked);
  var newVal=0;
  if(el.checked){newVal=1;}
  var serialForm='action=toggleConsultant';
  serialForm+= userFieldsString;
  serialForm+='&userId='+userId;
  serialForm+='&isConsultant='+newVal;
  //app("contextDiv", 'serialForm='+serialForm);

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      updateUsersById(data.updateList);
      pendingInvites=data.pendingInvitesList;
      manageUsers();
      }
    }, "json");
  }

function productSelected(sku, siblingValue){// only used for admins grant buttons
  var parts=sku.split("_");
  var productType="";
  if(parts[0]=="g"){productType="grant";}
  if(parts[0]=="p"){productType="purchase";}// never happens
  var units=Number(parts[1]);
  var deliverable=parts[2];
  var disposition="";
  if(parts[3]=="s"){disposition="self";}//never happens
  if(parts[3]=="g"){disposition="gift";}
  if(parts[3]=="i"){disposition ="invite";}

  var targetUserId=0;
  var giftEmail="";
  if(disposition=="gift"){
    targetUserId =siblingValue;
    if(targetUserId==0){return false;}
    }
  if(disposition=="invite"){
    targetUserId =siblingValue;
    if(targetUserId ==0){return false;}
    }
  var selection={"sku":sku, "productId":pidBySku[sku], "productType":productType, "units":units, "deliverable":deliverable, "disposition":disposition, "targetUserId":targetUserId};
  if(selection.productType=="purchase"){
    //add to cart // never happens
    }
  if(selection.productType=="grant"){
    grantSelection(selection);
    }
  }
var activeItemId=-1;
function prioritizeItemId(itemId){
  var serialForm='action=prioritizeItemId';
  serialForm+= userFieldsString;
  serialForm+='&itemId='+itemId;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      user=data.user;
      updateUsersById(data.updateList);
      items=user.items;
      showHome();
      }
    }, "json");
  }

function grantSelection(selection){
  console.log("grantSelection "+JSON.stringify(selection));
  var serialForm='action=grant';
  serialForm+= userFieldsString;
  serialForm+='&sku='+selection.sku;
  serialForm+='&productId='+selection.productId;

  serialForm+='&units='+selection.units;
  serialForm+='&deliverable='+selection.deliverable;
  serialForm+='&disposition='+selection.disposition;
  serialForm+='&targetUserId='+selection.targetUserId;
  serialForm+='&targetName='+usersById[selection.targetUserId].firstName+" "+usersById[selection.targetUserId].lastName;

  //app("contextDiv", 'serialForm='+serialForm);

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{

      pendingInvites=data.pendingInvitesList;
      pendingGifts=data.pendingGiftsList;
      user=data.user;
      updateUsersById(data.updateList);
      
      if(user.messages.length>0){
        rep("pickStatus", user.messages.pop());
        }
      else{
        rep("pickStatus", "Granted Success");
        }
      }
    }, "json");
  }

var pendingInvites=[];
var pendingGifts=[];
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
function showItem(itemId){
  for (var i=0; i<items.length; i++){
    if(items[i].id==itemId){
      if(items[i].deliverable=="cpa"){showCpa(itemId);}
      if(items[i].linkUrl != ""){showExternalUrl(items[i].linkUrl);}
      }
    }
  }
function tableFromArrayOfItems(theArray, showObject){
  var showArray=Object.keys(showObject);
  var tableString='<table class="itemsTable">';
  if(theArray.length>0){
    tableString+='<tr>';
    var keys=Object.keys(theArray[0]);
    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        tableString+='<td class="td'+showObject[keys[k]]+'" style="background-color:#eee;">'+relabel(keys[k])+'</td>';
        }
      }
    tableString+='</tr>';
    }
  // table contents
  var inReview=0;
  for (var u=0; u<theArray.length; u++){// this should be i not u
    if((theArray[u]['completed']==1)&&(theArray[u]['isBlind']==1)){inReview++;}
    }

  for (var u=0; u<theArray.length; u++){// this should be i not u
    tableString+='<tr>';
    for(var k=0; k<keys.length; k++){
      var outputString=theArray[u][keys[k]];
      if(inArray(keys[k], showArray)){
        if(keys[k]=="name"){
          if(theArray[u]['completed']==0){
            if(theArray[u]['consumed']==0){
              if(theArray[u]['consumerUserId']==0){// pending, no link
                }
              else{
                if(theArray[u]['productType']=="Mobile"){// fyi, no link
                  }
                else{// Maybe don't link?
                  if(theArray[u].linkUrl != ""){//external link
                    if((theArray[u].contentRequiresAssessed=="1")&&(user.isAssessed=="0")){
                      outputString=outputString+'<br />Requires Completed Assessment to view.';
                      }
                    else{
                      outputString='<a href="javascript:showItem(\''+theArray[u]['id']+'\')">View '+outputString+'</a>';
                      }
                    }
                  else{// cpa
                    outputString='<a href="javascript:showItem(\''+theArray[u]['id']+'\')">Begin '+outputString+'</a>';
                    }
                  }
                }
              }
            else{
              outputString='<a href="javascript:showItem(\''+theArray[u]['id']+'\')">Resume '+outputString+'</a>';
              }
            }
          else{// completed. Is selected, blind, 
            if(theArray[u]['isBlind']==1){
              outputString=''+outputString+" Completed, in review";
              }
            else{
              if(theArray[u]['id']==user.assessmentItemId){
                outputString='<a href="javascript:pdfReportItemId(\''+theArray[u]['id']+'\')">'+outputString+' DOWNLOAD REPORT</a>';
                }
              else{
                if(inReview==0){
                  outputString='<a href="javascript:prioritizeItemId(\''+theArray[u]['id']+'\')">'+outputString+' (archived) ACTIVATE</a>';
                  }
                else{
                  outputString=''+outputString+' (archived)';
                  }
                }
              }
            }
          }
        if(keys[k]=="updatedYYYYMMDD"){
          outputString=yyyymmddToDate(outputString);
          }
/*
//won't happen yet
        if(keys[k]=="isBlind"){
          if(theArray[u]['isAdmin']==0){// replace val with checkbox if not admin
            var checked="";
            if(theArray[u][keys[k]]==1){checked="CHECKED";}
            //var checkboxString='<input type="checkbox" id="check_'+theArray[u].id+'" onchange="toggleBlind(this)" '+checked+'>';
            var checkboxString='<input type="checkbox" id="check_'+theArray[u].id+'"  '+checked+' onchange="toggleBlind(this)" />';
            checkboxString +='<label for="check_'+theArray[u].id+'"><span></span></label>';
            outputString =checkboxString;
            }
          }
*/



        if(keys[k]=="inviteEmail"){
          var buttonsString=" ";
          if(theArray[u].disposition=="Gift"){
            buttonsString+='<input type="button" class="ungiftButton" id="navUngift" onclick="buttonDown(this.id); ungiftButton(\''+theArray[u][keys[k]]+'\')" value="X" />';
            }
          if(theArray[u].disposition=="Invite"){
            buttonsString+='<input type="button" class="uninviteButton" id="navUninvite" onclick="buttonDown(this.id); uninviteButton(\''+theArray[u][keys[k]]+'\')" value="X" />';
            }
          outputString=buttonsString+outputString;
          }
        if(keys[k]=="stateObj"){
          var progress=0;
          //var stateObj=JSON.parse("'"+outputString+"'");
          var stateObj=JSON.parse(outputString);
          if(stateObj.hasOwnProperty('progress')){progress=stateObj.progress;}
          outputString=progress+"%";
          }
        tableString+='<td>'+outputString+'</td>';
        }
      }
    tableString+='</tr>';
    }
  tableString+="</table>";
  tableString+='<div class="contextMessages">';
  tableString+=' <input class="navButton" style="clear:both;" type="button" id="managePendingDone" onclick="buttonDown(this.id); detailsDoneButtonPressed()" value="DONE" />';
  tableString+="</div>";
  
  return tableString;
  }
function returnTablesFromArrayOfUsers(theArray, showObject){
  var tables="";
  var usersByType={"Administrators":[], "Consultants":[], "Unassigned":[], "Unassessed":[], "Assessed":[]};
  var types=Object.keys(usersByType);
  for(var u=0; u<theArray.length; u++){
    var thisUser=theArray[u];
    if(thisUser.isAdmin==1){
      usersByType["Administrators"].push(thisUser);
      }
    else{
      if(thisUser.isConsultant==1){
        if(user.isAdmin==1){//hide consultants from other consultants
          usersByType["Consultants"].push(thisUser);
          }
        else{// but show self
          if(user.id==thisUser.id){
            usersByType["Consultants"].push(thisUser);
            }
          }
        }
      else{
        if(thisUser.consultantUserId==0){
          usersByType["Unassigned"].push(thisUser);
          }
        else{
          if(thisUser.isAssessed==0){
            usersByType["Unassessed"].push(thisUser);
            }
          else{
            usersByType["Assessed"].push(thisUser);
            }
          }
        }
      }    
    }
  testObj=JSON.parse(JSON.stringify(usersByType));

  for(t=0; t<types.length; t++){
    if(usersByType[types[t]].length>0){
      tables+='<h5>'+usersByType[types[t]].length+" "+types[t]+'</h5>';
      tables+=returnTableFromArrayOfUsers(usersByType[types[t]], showObject);
      }
    }
  return tables;
  }
var testObj={};  
function tableOfDetails(theObject, showObject){
  var showObjectKeys=Object.keys(showObject);
  var tableString="";
  //tableString='<table class="detailsTable">';
  var keys=Object.keys(theObject);
  for(var k=0; k<keys.length; k++){
    if(inArray(keys[k], showObjectKeys)){
/*
      tableString+='<tr>';
      tableString+='<td class="td8">'+showObject[keys[k]]+'</td>';
      tableString+='<td class="td8" style="overflow:hidden;">'+theObject[keys[k]]+'</td>';
      tableString+='</tr>';
*/
      var val=theObject[keys[k]];
      if(keys[k]=="email"){
        val='<a href="mailto:'+val+'">'+val+'</a>';
        }
      tableString+='<h3>'+showObject[keys[k]]+'</h3>';
      tableString+='<p>'+val+'</p>';
      }
    }
  //tableString+="</table>";
  return tableString;
  }
var labels={
  "isConsultant":"Is C.", 
  "stateObj":"Progress", 
  "updatedYYYYMMDD":"Date", 
  "consultantUserId":"Consultant", 
  "wpDisplayName":"Name"
  };
function relabel(orig){
  if(inArray(orig, Object.keys(labels))){
    return labels[orig];
    }
  else{
    return orig;
    }
  }

function returnTableFromArrayOfUsers(theArray, showObject){
  var showArray=Object.keys(showObject);
  var tableString='<table class="usersTable">';
  theArray.sort(function(a, b){return a.lastName.localeCompare(b.lastName);});// sept 21    
  if(theArray.length>0){
    tableString+='<tr>';
    var keys=Object.keys(theArray[0]);
    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        tableString+='<td class="td'+showObject[keys[k]]+'">'+relabel(keys[k])+'</td>';
        }
      }
    tableString+='</tr>';
    }

  for (var u=0; u<theArray.length; u++){
    tableString+='<tr>';
    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        var outputString=theArray[u][keys[k]];
        if(keys[k]=="wpDisplayName"){
          outputString=theArray[u].firstName+" "+theArray[u].lastName
          outputString='<a href="javascript:infoUserId('+theArray[u].id+');">'+outputString+'</a>';
          if(theArray[u]['isConsultant']==1){outputString+="<br />"+theArray[u].unusedInvites+" invites";}
          }

        if(keys[k]=="isConsultant"){
          if(theArray[u]['isAdmin']==0){// replace val with checkbox if not admin
            var checked="";
            if(theArray[u][keys[k]]==1){checked="CHECKED";}
            var checkboxString='<input type="checkbox" id="iccheck_'+theArray[u].id+'" '+checked+' onchange="toggleConsultant(this)" />';
            checkboxString +='<label for="iccheck_'+theArray[u].id+'"><span></span></label>';
            outputString =checkboxString;
            }
          else{
            outputString ="admin";
            }
          }

        if(keys[k]=="consultantUserId"){
          var consultantUserId =theArray[u][keys[k]];
          //console.log("consultantUserId="+ consultantUserId);
          var pulldownString='<div class="userSelect"><select id="select_'+theArray[u].id+'" onchange="assignConsultant(this)" class="userSelect">';
          var selected="";
          pulldownString+='<option value="0" '+selected+'></option>';
          var ids=idsOfConsultants();
          //console.log(' ');
/*
          // new code to sort consultant selct by lastName
          var consultantsIdLastName=[];
          for (var c=0; c<ids.length; c++){
            consultantsIdLastName.push({"cid":ids[c], "lastName":usersById[ids[c]].lastName, "wpDisplayName":usersById[ids[c]].wpDisplayName});
            }  
          consultantsIdLastName.sort(function(a, b){
            var textA = a.lastName.toUpperCase();
            var textB = b.lastName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });  
          ids=[];
          for (var c=0; c<consultantsIdLastName.length; c++){
            ids.push(consultantsIdLastName[c].cid);
            //console.log(consultantsIdLastName[c].lastName.toUpperCase()+" consultantsIdLastName="+ consultantsIdLastName[c].cid);
            }
*/          
// end new code

          for (var c=0; c<ids.length; c++){
            //console.log("ids["+c+"]="+ ids[c]);
            var selected="";
            if(ids[c]==consultantUserId){selected="SELECTED";}
            //pulldownString+='<option value="'+ids[c]+'" '+selected+'>'+usersById[ids[c]].wpDisplayName +' '+usersById[ids[c]].lastName +'</option>';
            pulldownString+='<option value="'+ids[c]+'" '+selected+'>'+usersById[ids[c]].wpDisplayName+'</option>';
            }
          pulldownString+='</select></div>';
          outputString =pulldownString;
          }

        tableString+='<td>'+outputString+'</td>';
        }
      }
    tableString+='</tr>';
    }
  tableString+="</table>";
  return tableString;
  }
function inArray(needle, haystack) {
  for(var i = 0; i < haystack.length; i++) {
    if(haystack[i] == needle) return true;
    }
  return false;
  }


function hasDeliverableInItems(deliverable){
  var dStr="   -- hasDeliverableInItems("+deliverable+") ";
  var hasItem=false;
  for (var i=0; i<items.length; i++){
    if(items[i].deliverable==deliverable){
      hasItem=true;
      }
    }
  dStr+=" returns "+hasItem;
  //console.log(dStr);
  return hasItem;
  }
function hasDeliverableInItemsSkus(deliverable){
  var dStr="   -- hasDeliverableInItemSkus("+deliverable+") ";
  var hasItem=false;
  for (var i=0; i<items.length; i++){
    var sku=items[i].sku;
    dStr+=sku+":"+sku.indexOf(deliverable)+" ";
    if(sku.indexOf(deliverable)>-1){
      hasItem=true;
      }
    }
  dStr+=" returns "+hasItem;
  //console.log(dStr);
  return hasItem;
  }

function productIsValid(product){
  //console.log(rnd(1000));
  var isValid=true;

  //console.log("  test prereqs:"+product.prereqs);
  var passedPrereqs=true;
  var prereqs=product.prereqs;
  var prereqArray=prereqs.split("_");
  for(var p=0; p<prereqArray.length; p++){
     var prereq=prereqArray[p];
     if(prereq != ""){
       if(hasDeliverableInItems(prereq)==false){ 
         //console.log("  ! hasDeliverableInItems("+prereq+")==false() so passedPrereqs=false");
         passedPrereqs=false;
         }
       }
     }
  if(passedPrereqs==false){isValid=false;}


  //console.log("  test excluders:"+product.excluders);
  //console.log(product);
  var passedExcluders=true;
  var excluders=product.excluders;
  var excluderArray=excluders.split("_");
  for(var p=0; p<excluderArray.length; p++){
     var excluder=excluderArray[p];
     if(excluder != ""){
       if(hasDeliverableInItems(excluder)==true){
         //console.log("  ! hasDeliverableInItems("+excluder+")==false() so passedExcluders=false");
         passedExcluders=false;
         }
       }
     }
  if(passedExcluders==false){isValid=false;}
  
  // product dev flag makes invalid for non dev users
  if((product.dev=="1")&&(userIsDev==false)){isValid=false;}
  //if((product.dev=="1")&&(userIsDev==true)){isValid=true;}//forces devs to see even if not valid for another reason
  //console.log("productIsValid(sku:"+product.sku+", deliverable:"+product.deliverable+")");
  //console.log("productIsValid returns "+isValid);
  return isValid;
  }

function tableFromArrayOfProducts(theArray, showObject, showBuyNow){
  var hideHead=false;
  var showArray=Object.keys(showObject);

  var tableString='<table class="productsTable">';
  var keys=[];
  if(theArray.length>0){
    tableString+='<tr>';
    keys=Object.keys(theArray[0]);

    for(var k=0; k<keys.length; k++){
      if(inArray(keys[k], showArray)){
        tableString+='<td class="td'+showObject[keys[k]]+'"></td>';
        }
      }
    tableString+='</tr>';
    }
  for (var p=0; p<theArray.length; p++){
    var rowString='<tr>';
    for(var k=0; k<keys.length; k++){
      var outputString=theArray[p][keys[k]];
      if(inArray(keys[k], showArray)){
        if(keys[k]=="productType"){
          var clickStr='';
          var siblingStr='';
          if((theArray[p]["productType"]=="Grant")&&(theArray[p]["disposition"]=="Gift")){
            var siblingId=theArray[p]["sku"]+'_userId';

            siblingStr+='<div class="userSelect"><select id="'+siblingId+'" placeholder="Select User">';
            siblingStr +='<option value="0" disabled SELECTED>Select User</option>';
            var ids=idsOfAll();
            for (var u=0; u<ids.length; u++){
              siblingStr +='<option value="'+ids[u]+'">'+usersById[ids[u]].wpDisplayName +'</option>';
              }
            siblingStr +='</select></div>';

            clickStr=' onclick="buttonDown(this.id); productSelected(this.id, document.getElementById(\'';
            clickStr+=siblingId+'\').options[document.getElementById(\'';
            clickStr+=siblingId+'\').selectedIndex].value)"';
            }
          if((theArray[p]["productType"]=="Grant")&&(theArray[p]["disposition"]=="Invite")){
            var siblingId=theArray[p]["sku"]+'_consultantUserId';

            siblingStr+='<div class="userSelect"><select id="'+siblingId+'">';
            siblingStr +='<option value="0" disabled SELECTED>Select User</option>';
            var ids=idsOfConsultants();
            for (var u=0; u<ids.length; u++){
              siblingStr +='<option value="'+ids[u]+'">'+usersById[ids[u]].wpDisplayName +'</option>';
              }
            siblingStr +='</select></div>';

            clickStr=' onclick="buttonDown(this.id); productSelected(this.id, document.getElementById(\'';
            clickStr+=siblingId+'\').options[document.getElementById(\'';
            clickStr+=siblingId+'\').selectedIndex].value)"';
            }
          var buttonText=theArray[p]["productType"]+" "+theArray[p]["disposition"];
          if(theArray[p]["units"]>1){
            buttonText+=' x '+theArray[p]["units"];
            }
          var str='<input type="button" class="grantButton" id="'+theArray[p]["sku"]+'"';
          str+=' value="'+buttonText+'" ';
          str+=clickStr;
          str+=' /> ';
          str+=siblingStr;

          if(theArray[p]["productType"]=="Purchase"){
            str=returnPurchaseForm(theArray[p].catalogLinkId, buttonText);
            }
          outputString=str;
          }
        if(keys[k]=="usPrice"){
          outputString="$"+outputString+".00";
          }
        rowString+='<td >'+outputString+'</td>';
        }
      }
    rowString+='</tr>';
    // replace row if disposition==""
    if(theArray[p]["disposition"]==""){
      if(productIsValid(theArray[p])){
        if(showBuyNow){
          var sku=theArray[p].sku;
          rowString='<tr><td colspan=2>'+returnImageForm(theArray[p].catalogLinkId, theArray[p].sku)+'</td></tr>';
          }
        }
      else{
        rowString="";// user has assessment in progress or unopened
        hideHead=true;
        }
      }
    tableString+=rowString;
    }
  tableString+="</table>";
  if(hideHead==false){
    tableString='<h2>Available for Purchase</h2>'+tableString;
    }  
  return tableString;
  }
function returnPurchaseForm(linkId, buttonText){
  var formStr='<form name="PrePage" method = "post" action = "https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"> <input type = "hidden" name = "LinkId" value ="'+linkId+'" /> <input type = "submit" class="authorizeButton" value ="'+buttonText+'" /> </form>';
  return formStr;
  }
function returnImageForm(linkId, sku){
  var formStr='<form name="PrePage" method = "post" action = "https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"> <input type = "hidden" name = "LinkId" value ="'+linkId+'" /> <input type="image" src="/webapp/buynows/'+sku+'.png" alt="submit" class="authorizeImageButton" /> </form>';
  return formStr;
  }
function debugObject(obj, label){
  app("contextDiv", "<b>"+label+"</b>");
  var objStr=JSON.stringify(obj);
  var temp=objStr.split(",");
  objStr=temp.join(",<br />");
  var temp=objStr.split("}");
  objStr=temp.join("}<br />");
  var temp=objStr.split("]");
  objStr=temp.join("]<br />");
  app("contextDiv", objStr);
  }
function randomComplete(){
  for (var p=0; p<questions.length-2; p++){
    questions[p].answered=true;
    questions[p].score=rnd(7)+1;
    }  
  storeState();
  atNum=questions.length-2;
  showQuestion();
  }
var prevView="workflow";
function hideGraph(){
  document.getElementById('drawCanvas').style.display="none";
  }
function updateQuestions(updateObj){
  if(updateObj.hasOwnProperty('atNum')){
    atNum=Number(updateObj['atNum']);
    }
  if(updateObj.hasOwnProperty('scoreArray')){
    var updateArray=updateObj.scoreArray;
    for (var p=0; p<updateArray.length; p++){
      questions[p].score=updateArray[p];
      if(updateArray[p]==0){questions[p].answered=false;}
      else{
        questions[p].answered=true;
        atNum=p+1;
        }
      }
    }
  }
function hideWorkflow(){
  document.getElementById('cpaWrapper').style.display="block";
  document.getElementById('contextHeadingHolder').style.display="none";
  document.getElementById('actionHeadingHolder').style.display="none";
    document.getElementById('contextDiv').style.display="none";
    document.getElementById('actionDiv').style.display="none";
    //document.getElementById('shadeActionTopDiv').style.display="none";
    document.getElementById('shadeActionBottomDiv').style.display="none";
    //document.getElementById('shadeContextTopDiv').style.display="none";
    document.getElementById('shadeContextBottomDiv').style.display="none";
    document.getElementById('actionScroll').style.display="none";
    document.getElementById('contextScroll').style.display="none";
    document.getElementById('leftnavContext').style.display="none";
  }
function showWorkflow(){
  document.getElementById('cpaWrapper').style.display="none";

  document.getElementById('contextHeadingHolder').style.display="block";
  document.getElementById('actionHeadingHolder').style.display="block";
  //showProducts();
  document.getElementById('contextDiv').style.display="block";
  document.getElementById('actionDiv').style.display="block";
  //document.getElementById('shadeActionTopDiv').style.display="block";
  document.getElementById('shadeActionBottomDiv').style.display="block";
  //document.getElementById('shadeContextTopDiv').style.display="block";
  document.getElementById('shadeContextBottomDiv').style.display="block";
    document.getElementById('actionScroll').style.display="block";
    document.getElementById('contextScroll').style.display="block";
    document.getElementById('leftnavContext').style.display="block";
  }

function checkGeometry(){
  //console.log('checkGeometry() block');
  document.getElementById('header').style.display="none";
  var footers=document.getElementsByClassName('footer');
  footers[0].style.display="none";
  var appDiv=document.getElementById('appDiv');
  
  if((appDiv.offsetWidth != appDivWidth)||(appDiv.offsetHeight != appDivHeight)){
    //console.log("was appDiv:"+appDiv.offsetHeight);
    document.getElementById('appDiv').style.marginTop=document.getElementById('header').offsetHeight+"px";
    //console.log("changed appDiv:"+appDiv.offsetHeight);
    appDivWidth= appDiv.offsetWidth;
    appDivHeight= appDiv.offsetHeight;
    appDivAspect=appDivWidth/appDivHeight;
    appTopPad=0;
    appLeftPad=0;
    var actionTop=0;
    var actionLeft=0;
    if(appDivAspect>1){//wide
      if(appDivAspect>2){//pad side
        //console.log('wide pad side');
        appSquarePx=appDivHeight;
        appLeftPad=Math.floor((appDivWidth-appSquarePx*2)/2);
        }
      else{//wide, pad top
        //console.log('wide pad top');
        appSquarePx=Math.floor(appDivWidth/2);
        appTopPad=Math.floor((appDivHeight-appSquarePx)/2);
        }
      actionLeft=appLeftPad+appSquarePx;
      actionTop=appTopPad;
      cpaWidth=appSquarePx*2;
      cpaHeight=appSquarePx;
      }
    else{//tall
      if(appDivAspect<.5){//pad top
        //console.log('tall pad top');
        appSquarePx=appDivWidth;
        appTopPad=Math.floor((appDivHeight-appSquarePx*2)/2);
        }
      else{//tall, pad side
        //console.log('tall pad side');
        appSquarePx=Math.floor(appDivHeight/2);
        appLeftPad=Math.floor((appDivWidth-appSquarePx)/2);
        }
      actionLeft=appLeftPad;
      actionTop=appTopPad+appSquarePx;
      cpaWidth=appSquarePx;
      cpaHeight=appSquarePx*2;
      }

    var gridFrac=appSquarePx/320;
    //gridPx=Math.floor(20*gridFrac);
    //fontPx=Math.floor(13*gridFrac);
    gridPx=20*gridFrac;
    fontPx=13*gridFrac;

    g=gridPx/4;
  var  ninePt=9*g/5.1;
  var  tenPt=10*g/5.1;
  var  elevenPt=11*g/5.1;
  var  twelvePt=12*g/5.1;
  var  fourteenPt=14*g/5.1;
  var  sixteenPt=16*g/5.1;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML ='';

    style.innerHTML += '#usersSearchButton{padding:0px; background-image:url(/webapp/icons/ir-search-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; display:inline-block; width:'+g*8+'px; height:'+g*8+'px;}';
    style.innerHTML += '#pickUserButton{padding:0px; background-image:url(/webapp/icons/ir-search-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; display:inline-block; width:'+g*8+'px; height:'+g*8+'px;}';
    style.innerHTML += '#addMembersSearchButton{padding:0px; background-image:url(webapp/icons/ir-search-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; display:inline-block; width:'+g*8+'px; height:'+g*8+'px;}';

    style.innerHTML += '.appSquare h1, h2, h3, h4, h5{font-family:openSansSemiBold;}';


    style.innerHTML += '.appSquare h2{color:#000; width:'+g*62+'px; text-align:center; line-height:'+g*4+'px; font-size:'+fontPx*1.25+'px; height:'+g*4+'px; float:right; margin-top:'+g*.5+'px; margin-right:'+g*0+'px; background-color:#d98c13;  margin-bottom:0;}';
    style.innerHTML += '.appSquare h4{color:#000; width:'+g*53+'px; padding:'+g*2+'px '+g*2+'px '+0+'px '+g*2+'px; text-align:right; line-height:'+g*4+'px; font-size:'+fontPx*1+'px; height:'+g*5+'px; float:right; margin-top:'+0+'px; margin-right:'+g*3+'px; background-color:white;  margin-bottom:0;}';
    style.innerHTML += '.appSquare h5{color:#000; width:'+g*50.5+'px; padding:'+g*2+'px '+g*1+'px '+0+'px '+g*2+'px; text-align:right; line-height:'+g*4+'px; font-size:'+fontPx*1+'px; height:'+g*5+'px; float:right; margin:'+0+'px '+g*3+'px '+g*0+'px 0; background-color:white;  margin-bottom:0;}';
    style.innerHTML += '.navBar{width:'+g*60+'px; margin-right:'+g*2+'px; float:right;}';
    style.innerHTML += 'input.navButton{width:'+g*13+'px; float:right; background-color:#a5100c; color:white; font:'+twelvePt+'px openSansSemiBold; text-align:center;}';
    style.innerHTML += '.contextMessages{padding:'+g*2+'px; width:'+g*49+'px; margin-top:'+g/2+'px; float:right; background-color:white; color:black; font:'+twelvePt+'px openSansSemiBold;}';
    style.innerHTML += '.messages{padding:'+g*2+'px; width:'+g*58.5+'px; margin-top:'+g/2+'px; float:right; background-color:white; color:black; font:'+twelvePt+'px openSansSemiBold;}';
    style.innerHTML += '.bottomMargin{margin-bottom:'+g*1+'px;}';
    style.innerHTML += '.bottomMostMargin{margin-bottom:'+g*3+'px;}';

    style.innerHTML += '.itemsTable{float:right; padding:'+g*1+'px; width:'+g*52.5+'px; margin: 0 '+g*.5+'px '+g*0+'px; background-color:white; background-color:white; color:black; font:'+elevenPt+'px openSansSemiBold;}';

    style.innerHTML += '.usersTable{table-layout:fixed; padding:'+g*2+'px; width:'+g*58+'px; margin-left:'+g*3+'px; background-color:white; color:black; font:'+twelvePt+'px openSansSemiBold;}';
    style.innerHTML += '.productsTable{padding: '+g*2+'px; width:'+g*58+'px; margin-left:'+g*3+'px; margin-top:0; background-color:white; color:black; font:'+twelvePt+'px openSansSemiBold;}';
    style.innerHTML += '.detailsTable{padding:'+g*2+'px; width:'+g*54+'px; margin-left:'+g*3+'px; background-color:white; color:black; font:'+twelvePt+'px openSansSemiBold;}';
    style.innerHTML += '#spinner{top:'+(appDivHeight-gridPx*6)/2+'px; left:'+(appDivWidth-gridPx*10)/2+'px; width:'+gridPx*10+'px;  height:'+gridPx*6+'px; position:absolute;}';
    style.innerHTML += '#downloadpdf{top:'+(appDivHeight-gridPx*6)/2+'px; left:'+(appDivWidth-gridPx*10)/2+'px; width:'+gridPx*10+'px;  height:'+gridPx*6+'px; position:absolute;}';
    style.innerHTML += '#uploadingpdf{top:'+(appDivHeight-gridPx*6)/2+'px; left:'+(appDivWidth-gridPx*10)/2+'px; width:'+gridPx*10+'px;  height:'+gridPx*6+'px; position:absolute;}';
    style.innerHTML += '#uploadingpercent{font-family: OpenSansSemiBold; top: 43%; position: absolute;width: 100%; text-align: center; font-size: '+g*3+'px;}';
  //red a5100c
    style.innerHTML += '.appSquare .userSelect select {width:'+(gridPx*6-10)+'px!important; height:'+(gridPx*1.5)+'px!important; margin-left:'+0+'px; margin-top:'+g*0+'px; font-size: '+fontPx*.9+'px; line-height: 1; border: 0; border-radius: 0; -webkit-appearance: none; background: transparent; float:left;}';
    style.innerHTML += '.appSquare .userSelect{width:'+(gridPx*6)+'px!important; height:'+(gridPx*1.5)+'px!important; margin:'+gridPx/4+'px; overflow: hidden; background: url(webapp/down_arrow_select.jpg) no-repeat right #ddd; border: 1px solid #ccc;}';

    style.innerHTML += '.appSquare .demoSelect select {appearance: none; -webkit-appearance: none; width:'+(gridPx*8-10)+'px!important; height:'+(gridPx*1.5)+'px!important; margin-left:'+gridPx/4+'px; margin-top:0; font-size: '+fontPx*.9+'px; line-height: 1; border: 0; border-radius: 0; -webkit-appearance: none; background: transparent; float:left;}';
    style.innerHTML += '.appSquare .demoSelect{appearance: none; -webkit-appearance: none; width:'+(gridPx*8)+'px!important; height:'+(gridPx*1.5)+'px!important; margin:'+gridPx/4+'px; overflow: hidden; background: url(webapp/down_arrow_select.jpg) no-repeat right rgb(238, 238, 238); border: 1px solid #ccc; float:left;}';

    style.innerHTML += '.authorizeButton{width:'+gridPx*8+'px; height:'+gridPx*1.5+'px; margin:'+gridPx/4+'px;  background-color:rgb(186, 28, 27); color:white;}';
    style.innerHTML += '.authorizeImageButton{width:'+g*52+'px; height:'+g*52*44/60+'px!important; margin:'+g*3+'px;}';
    style.innerHTML += '.grantButton{width:'+gridPx*8+'px;  background-color:rgb(186, 28, 27); color:white;}';


    style.innerHTML += '.appSquare a{color: rgb(186, 28, 27);}';
    
    style.innerHTML += '::-webkit-scrollbar{width:'+g*0+'px; height:0px;}';

    //style.innerHTML += '.appSquare table{border:0!important; margin:0; padding: 0 0 0 0;}';
    style.innerHTML += '.appSquare td{border:0; margin:0; padding: 0 0 0 '+gridPx/2+'px; line-height:'+gridPx+'px; font-size:'+fontPx+'px; background: linear-gradient(rgba(100,100,100,.0), rgba(200,200,200,.0), rgba(200,200,200,.5));}';
    style.innerHTML += '.appSquare tr{border:0; margin:0; padding: 0 0 0 0;}';
    style.innerHTML += '.appSquare h3{clear:both; color:#444; margin:0 '+g*0+'px 0 0; padding: 0 0 0 '+gridPx/2+'px; line-height:'+gridPx*2+'px; font-size:'+fontPx*1.25+'px; Zbackground-color:rgba(125,125,255,.5); }';
    style.innerHTML += '.appSquare p{color:#222; margin:0; padding: 0 0 0 '+gridPx/2+'px; line-height:'+gridPx*1+'px; font-size:'+fontPx*1.0+'px; }';
    style.innerHTML += '.appSquare input{padding:0 0 0 0; margin:'+gridPx*.25+'px; border:0; height: '+gridPx*1.5+'px; font-size:'+fontPx+'px;}';
    style.innerHTML += '.appSquare .ungiftButton{font-size:'+fontPx+'px!important; background-color:rgba(255,0,255,.5); }';
    style.innerHTML += 'form{margin:0; padding:0;}';
    style.innerHTML += '.appSquare #memberSelect{background-color:rgb(0,0,0,.2); width:100%; float:left;}'
    //style.innerHTML += '.appSquare #userSelect{background-color:rgb(0,0,0,.2); width:100%; float:left;}'
    style.innerHTML += '.email{width:'+gridPx*8+'px;  float:left; background-color:#eee;}';
    style.innerHTML += 'textarea{width:'+g*56+'px; height:'+g*20+'px; clear:both; float:left; margin-left:'+g+'px; font-size:'+fontPx*1.0+'px; }';
    style.innerHTML += '.emailButton{width:'+gridPx*4.5+'px;  float:right; background-color:rgb(186, 28, 27); color:white;}';
    style.innerHTML += '.manageButton{width:'+gridPx*4.5+'px;  float:right; background-color:rgb(186, 28, 27); color:white;}';
    style.innerHTML += '.iconButton{width:'+gridPx*1.5+'px;  float:left;}';
    style.innerHTML += '.reportButton{width:'+gridPx*1.5+'px;  float:right;  background-color:rgb(186, 28, 27); color:white;}';
    style.innerHTML += '.userButton{width:'+gridPx*9.5+'px;  float:right;}';
    style.innerHTML += '.memberName{width:'+gridPx*7+'px; height:'+gridPx*2+'px; float:right; overflow: hidden;}';
    style.innerHTML += '.reportName{width:'+g*48+'px; height:'+gridPx*2+'px; float:left;}';
    style.innerHTML += '.addMemberButton{width:'+gridPx*9.5+'px;}';


    style.innerHTML += 'input[type="checkbox"] {display:none;}';
    style.innerHTML += 'input[type="checkbox"] + label span {width:'+gridPx*1.5+'px; height:'+gridPx*1.5+'px; margin:'+gridPx/4+'px; display:inline-block;vertical-align:middle; background:url(webapp/check_radio_sheet.png) left top no-repeat; cursor:pointer; background-size:'+gridPx*6+'px '+gridPx*1.5+'px;}';
    style.innerHTML += 'input[type="checkbox"]:checked + label span { margin:'+gridPx/4+'px; background:url(/webapp/check_radio_sheet.png) -'+gridPx*1.5+'px top no-repeat; background-size:'+gridPx*6+'px '+gridPx*1.5+'px;}';
    style.innerHTML += 'label{margin:0;font-size:'+fontPx+'px!important; }';

    //style.innerHTML += '.appSquare .membershipCheck{width:'+gridPx*1.5+'px!important; height:'+gridPx*1.5+'px!important; margin:'+gridPx/4+'px; }';
 
    style.innerHTML += '.appSquare .ungiftButton{width:'+gridPx*1.5+'px; font-size:'+fontPx+'px; float:left; margin:'+gridPx/4+'px; background-color:rgb(186, 28, 27);}';
    style.innerHTML += '.appSquare .uninviteButton{width:'+gridPx*1.5+'px; font-size:'+fontPx+'px; float:left; margin:'+gridPx/4+'px; background-color:rgb(186, 28, 27); color:white}';
    style.innerHTML += '.appSquare .deleteButton{width:'+gridPx*1.5+'px; font-size:'+fontPx+'px; float:left; margin:'+gridPx/4+'px; background-color:rgb(186, 28, 27); color:white}';

    style.innerHTML += '.linkButton{width:'+gridPx*2+'px; float:right;}';
    style.innerHTML += '.abs{position:absolute;}';
    style.innerHTML += '.inset{Zbox-shadow:inset 0px 0px 0px 1px #888;}';
    style.innerHTML += '.appSquare{width:'+g*63+'px; height:'+g*59.5+'px; background-color:#000; background-image:url(/webapp/nav/splash-logo.png); background-size:cover; border-right:black '+g*1+'px solid;}';

    var headHeight=g*4;
    style.innerHTML += '#actionScroll, #contextScroll{position:absolute; background-color:rgba(0,0,0,1); }';
    style.innerHTML += '#actionScroll{left:'+Math.floor(actionLeft+g*62.5)+'px; top:'+(actionTop+headHeight+g/2)+'px;}';
    style.innerHTML += '#contextScroll{left:'+Math.floor(appLeftPad+g*62.5)+'px; top:'+(appTopPad+headHeight+g/2)+'px;}';

    style.innerHTML += '.shade{width:'+g*64+'px; height:'+g*2+'px; position:absolute;}';
    style.innerHTML += '.topshadeAction{left:'+actionLeft+'px; top:'+actionTop+'px; background: linear-gradient(to bottom, rgba(0,0,0,.75),rgba(0,0,0,0));}';
    style.innerHTML += '.bottomshadeAction{left:'+actionLeft+'px; top:'+(actionTop+appSquarePx-g*2)+'px; background: linear-gradient(to top, rgba(0,0,0,.75),rgba(0,0,0,0));}';
    style.innerHTML += '.topshadeContext{left:'+appLeftPad+'px; top:'+appTopPad+'px; background: linear-gradient(to bottom, rgba(0,0,0,.75),rgba(0,0,0,0));}';
    style.innerHTML += '.bottomshadeContext{left:'+appLeftPad+'px; top:'+(appTopPad+appSquarePx-g*2)+'px; background: linear-gradient(to top, rgba(0,0,0,.75),rgba(0,0,0,0));}';
    style.innerHTML += '#leftnavContext{position:absolute;}';

    var cStyle="top:"+(appTopPad+g*4.5)+"px; left:"+appLeftPad+"px;"
    //console.log('cStyle='+cStyle);
    style.innerHTML += 'body{overflow:hidden;  }';
    style.innerHTML += '#contextDiv{'+cStyle+' overflow:scroll; background-color:#000;}';
    style.innerHTML += '#actionDiv{left:'+actionLeft+'px; top:'+(actionTop+g*4.5)+'px;  overflow:scroll;}';
    style.innerHTML += '.workflow{line-height:'+gridPx+'px; font-size:'+fontPx+'px;}';
    style.innerHTML += '.grid{background-Size:'+appSquarePx+'px; Zbackground-image:url(webapp/grid640t.png);}';
    style.innerHTML += '.splashglobe{float:right; width:'+g*62.5+'px; margin-top:'+g/2+'px; height:'+g*58.5+'px; background-color:white; background-image:url(/webapp/nav/splash-globe.png); background-size:cover;}';
   
    for(var w=1; w<=20; w++){
      style.innerHTML += '.td'+w+'{width:'+(w-.5)*gridPx+'px; min-height:'+gridPx+'px; overflow:hidden;}';
      }
    
    style.innerHTML += '.tile{background-size:contain; background-position:50% 50%; background-repeat:no-repeat; width:'+g*26+'px; height:'+g*26+'px; margin:'+g/2+'px '+g/2+'px 0 0; position:relative;  float:right; font-family:openSansSemiBold;}';
    style.innerHTML += '.tileTitle, .tileImage, .tileStatus, .tileButton{width:'+g*26+'px; text-align:center; position:absolute;}';
    style.innerHTML += '.tileTitle, .tileImage, .tileStatus, .tileButton{padding:0; margin:0; Zbackground-color:rgba(0,0,0,.5);}';
    style.innerHTML += '.tileTitle{top:'+g*0+'px; height:'+g*2.5+'px; font-size:'+g*1.5+'px; line-height:'+g*3+'px;}';
    style.innerHTML += '.tileImage{top:'+g*2.5+'px; background-size:contain; background-position:50% 50%; background-repeat:no-repeat; height:'+g*13+'px;}';
    style.innerHTML += '.tileStatus{top:'+g*16.5+'px; height:'+g*4+'px; position:absolute; font-size:'+g*2+'px; }';
    style.innerHTML += '.tileButton{top:'+g*21+'px; height:'+g*5+'px; font-size:'+g*2+'px; line-height:'+g*4.5+'px; color:white; }';

    style.innerHTML += '.bottomGap{width:'+g*60+'px; height:'+g*2+'px; float:right; overflow:hidden;}';
   
    style.innerHTML += '#usersTables{background-color:#fff; margin:0px; width:'+g*62.5+'px; float:right;}';

    style.innerHTML += '#contextHeadingHolder{user-select:none; background-color:#000; margin:0px;  position:absolute; left:'+(appLeftPad)+'px; top:'+(appTopPad)+'px; width:'+appSquarePx+'px; height:'+g*4.5+'px;}';
    style.innerHTML += '#actionHeadingHolder{user-select:none; background-color:#000; margin:0px;  position:absolute; left:'+(actionLeft)+'px; top:'+(actionTop)+'px; width:'+appSquarePx+'px; height:'+g*4.5+'px;}';
    style.innerHTML += '.fixedHeading{margin:'+g/2+'px;}';
    style.innerHTML += '.inlineHeading{user-select:none; background-color:#d98c13; margin:'+g/2+'px -'+g/2+'px 0 0;  float:right; left:'+(appLeftPad+g*10)+'px; top:'+(appTopPad+g/2)+'px; }';
    style.innerHTML += '.contextHeading{float:right; color:#000; width:'+g*53.5+'px; text-align:center; line-height:'+g*4+'px; font-size:'+fontPx*1+'px; height:'+g*4+'px; padding:0;}';
    style.innerHTML += '.contextHeading{user-select:none; background-color:#d98c13;}';
    style.innerHTML += '.actionHeading{float:right; color:#000; width:'+g*63+'px; text-align:center; line-height:'+g*4+'px; font-size:'+fontPx*1+'px; height:'+g*4+'px; padding:0;}';
    style.innerHTML += '.actionHeading{user-select:none; background-color:#d98c13;}';

    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementById('actionScroll').width=Math.floor(g*1.5)+1;
    document.getElementById('actionScroll').height=appSquarePx-Math.floor(headHeight+g/2)+1;
    document.getElementById('contextScroll').width=Math.floor(g*1.5)+1;
    document.getElementById('contextScroll').height=appSquarePx-Math.floor(headHeight+g/2);

    divScrolled('action');
    divScrolled('context');
    cpaGeometry();
    drawLeftnav();
    }
  //console.log('checkGeometry completed');
  }
var colorClock=0;
var tileColors=["#ff0000", "#ff3d00", "#ff7e00", "#ffbe00", "#feff00"];
var tileTypes=["buy520", "tile520"];


function returnItemTiles(){
  var cpaTiles="";
  var eduTiles="";
  for (var i=0; i<items.length; i++){
    var item=items[i];
    //console.log(item);
    var isCpa=false;
    var isAfter=false;
    var inReview=false;
    var statusString="Linked Content";
    if(item.deliverable == "cpa"){
      isCpa=true;
      if(item.completed==1){
        statusString="Completed";
        if(item['isBlind']==1){
          statusString="In Review"; 
          }
        if(item.id != user.assessmentItemId){
          statusString="Archived"; 
          isAfter=true;
          }
        }
      else{//incomplete
        var progress=0;
        var stateObj=JSON.parse(items[i].stateObj);
        if(stateObj.hasOwnProperty('progress')){
          progress=stateObj.progress;
          //console.log(i+" "+progress);
          }
        statusString=progress+"% Done";
        if(item.consumed==0){
          statusString="Ready to Begin";
          }
        }
      }
    var dateString="";
    if(item.updatedYYYYMMDD != "0"){dateString=' &mdash; '+yyyymmddToDate(item.updatedYYYYMMDD);}
    statusString+=dateString;    
    var confObj={};
    var skuParts=item.sku.split("_");
    var itemStr=skuParts[2];
    confObj.imageUrl="/webapp/newtiles/"+itemStr+".png";
    confObj.bgImage='/webapp/newtiles/tile520.png';
    confObj.titleString=item.description;
    confObj.statusString=statusString;
    confObj.statusColor='black';
    confObj.linkString="MORE";
    confObj.linkGlom='item_'+item.id;
    //if(item.productType != "Mobile"){
    if(isCpa){
      if(isAfter){
        cpaTiles+=returnTile(confObj);
        }
      else{
        cpaTiles=returnTile(confObj)+cpaTiles;
        }
      }
    else{
      eduTiles+=returnTile(confObj);
      }
    }
  return cpaTiles+eduTiles;
  }
function returnFreeTiles(){
  var tiles="";
  for (var p=0; p<products.length; p++){
    var prod=products[p];
    if(prod.productType=="Free"){
      //console.log(prod);
      var confObj={};
      var skuParts=prod.sku.split("_");
      var itemStr=skuParts[2];
      confObj.imageUrl="/webapp/newtiles/"+itemStr+".png";
      confObj.bgImage='/webapp/newtiles/tile520.png';
      confObj.titleString=prod.description;
      confObj.statusString='FREE!';
      confObj.statusColor='black';
      confObj.linkString="OPEN";
      confObj.linkGlom='free_'+prod.id;
      tiles+=returnTile(confObj);
      }
    }
  return tiles;
  }
function returnProductTiles(){
  var tiles="";
  var bucketArray=[];
  var buckets={};
  var bucketDescs={};
  for (var p=0; p<products.length; p++){
    var prod=products[p];
    if((prod.productType == "Purchase")||(prod.productType == "Grant")){
      if(prod.productBucket != ""){
        var bucket=prod.productBucket;
        if(inArray(bucket, bucketArray)==false){
          bucketArray.push(bucket);
          buckets[bucket]=new Array();
          bucketDescs[bucket]=prod.description;// use first item for bucket desc
          }
        buckets[bucket].push(prod.id);
        }
      else{// just make non bucket tiles
        if(productIsValid(prod)){
          var confObj={};
          var skuParts=prod.sku.split("_");
          var itemStr=skuParts[2];
          //console.log('single purchase '+itemStr);
          confObj.imageUrl="/webapp/newtiles/"+itemStr+".png";
          confObj.bgImage='/webapp/newtiles/buy520.png';
          confObj.titleString=prod.description;
          confObj.statusString='$'+prod.usPrice+'<small>USD</small>';
          confObj.statusColor='white';
          confObj.linkString="";
          confObj.linkGlom='product_'+prod.id;
          tiles+=returnTile(confObj);
          }
        }
      }
    }
  // now make bucket tiles
  for(var b=0; b<bucketArray.length; b++){
    var bucket=bucketArray[b];
    bucketString=bucket.replace("_"," ");
    var bucketProducts=buckets[bucket].join("-");
    
    var confObj={};
    confObj.imageUrl="/webapp/newtiles/"+bucket+".png";
    confObj.bgImage='/webapp/newtiles/tile520.png';
    confObj.titleString=bucketDescs[bucket];
    confObj.statusString=bucketString;
    confObj.statusColor='black';
    confObj.linkString="SELECT";
    confObj.linkGlom='bucket_'+bucketProducts;
    tiles+=returnTile(confObj);
    }
  //console.log('buckets');
  //console.log(buckets);
  return tiles;
  }
/*
      console.log(prod);
      var confObj={};
      var skuParts=prod.sku.split("_");
      var itemStr=skuParts[2];
      confObj.imageUrl="/webapp/newtiles/"+itemStr+".png";
      confObj.bgImage='/webapp/newtiles/tile520.png';
      confObj.titleString=prod.description;
      confObj.statusString='FREE!';
      confObj.statusColor='black';
      confObj.linkString="OPEN";
      confObj.linkGlom='free_'+prod.id;
      tiles+=returnTile(confObj);
      }
    }
*/
    
function showHome(){
  rep("contextHeading", "My Core Passion®");
  rep("contextDiv", returnItemTiles());
  app("contextDiv", returnFreeTiles());
  app("contextDiv", '<div class="bottomGap">&nbsp;</div>');

  rep("actionDiv",'<div id="splashglobe" class="splashglobe"></div>');
  if(user.messages.length>0){
    var actionString='<h3>Messages:</h3><p>';
    actionString+=user.messages.join("<br />")+'</p>';
    rep("splashglobe", actionString);
    }
  user.messages=[];
  rep("actionHeading", "Home");
  }

function showTools(){
  rep("contextDiv", returnConsultantTiles());
  app("contextDiv", '<div class="bottomGap">&nbsp;</div>');
  rep("actionDiv",'<div class="splashglobe"></div>');
  rep("actionHeading", "Consultant Tools");
  }
function showShop(){
  rep("contextDiv", returnProductTiles());
  app("contextDiv", '<div class="bottomGap">&nbsp;</div>');

  rep("actionDiv",'<div class="splashglobe"></div>');
  rep("actionHeading", "Shop");
  }
function selectBucketProduct(){
  console.log('selectBucketProduct() isGrant '+ document.bucketForm.isGrant.value);
  var radios=document.getElementsByName('bucketRadio');
  if(document.bucketForm.isGrant.value=="false"){
    for(var i=0; i<radios.length; i++){
      if(radios[i].checked==true){
        modalProduct(radios[i].value);
        }
      }
    }
  else{
    var radioValue=document.bucketForm.pickUserRadio.value;
    if(radioValue==""){
      alert('Select user to receive item');
      }
    else{
      var parts=radioValue.split(" ");
      var id=parts.shift();
      var targetUserId=Number(id);
      
      for(var i=0; i<radios.length; i++){
        if(radios[i].checked==true){
          grantProductToUser(radios[i].value, targetUserId);
          }
        }
      }
    }
  }
function updatePickStatus(){
  var radioValue=document.bucketForm.pickUserRadio.value;
  var status="";
  if(radioValue==""){
    status="No User Selected";
    }
  else{
    var parts=radioValue.split(" ");
    var id=parts.shift();
    var targetUserId=Number(id);
    var name=parts.join(" ");
    document.getElementById('pickStatus').innerHTML=name+" ("+id+")";
    }
  }
function grantProductToUser(productId, userId){
  var prod=productWhereId(productId);
  //console.log('grantProductToUser prod, '+userId);
  //console.log(prod);
  var sku=prod.sku;
  var parts=sku.split("_");
  var productType="Grant";
  var units=Number(parts[1]);
  var deliverable=parts[2];
  var disposition="";
  if(parts[3]=="s"){disposition="self";}
  if(parts[3]=="g"){disposition="gift";}//no gifts active 
  if(parts[3]=="i"){disposition ="invite";}

  var targetUserId=0;
  var selection={"sku":sku, "productId":pidBySku[sku], "productType":productType, "units":units, "deliverable":deliverable, "disposition":disposition, "targetUserId":userId};
  grantSelection(selection);
  }
function itemWhereId(id){
  for(var i=0; i<items.length; i++){
    if(items[i].id==id){return items[i];}
    }    
  }
function productWhereId(id){
  for(var p=0; p<products.length; p++){
    if(products[p].id==id){return products[p];}
    }    
  }


function tileClick(linkGlom){
  //console.log('tileClick('+linkGlom+')');
  var parts=linkGlom.split("_");
  if(linkGlom.indexOf('free_')==0){
    var id=Number(parts[1]);
    //console.log('typeOf id='+typeof id);
    for(var p=0; p<products.length; p++){
      //console.log('typeOf product.id='+typeof id);
      if(products[p].id==id){
        window.open(products[p].linkUrl, '_blank');
        }
      }
    }
  if(linkGlom.indexOf('item_')==0){
    var id=Number(parts[1]);
    itemMore(id);
    }
  if(linkGlom=="tool_openReceipts"){
    reportOpenReceipts();
    }
  if(linkGlom.indexOf('product_')==0){
    var id=Number(parts[1]);
    //console.log('product id='+id);
    modalProduct(id);
    }
  if(linkGlom.indexOf('bucket_')==0){
    var ids=parts[1];
    //console.log(ids);
    var idArray=ids.split("-");
    var formString='<div class="messages"><form name="bucketForm">';
    var grants=0;
    for (var i=0; i<idArray.length; i++){
      for (var p=0; p<products.length; p++){
        var prod=products[p];
        if(prod.id == idArray[i]){
          var selected="";
          if(i==0){selected="CHECKED";}
          formString+='<div class="bucketRadioHolder">';
          formString+='  <input type="radio" name="bucketRadio" class="bucketRadio" value="'+prod.id+'" '+selected+' >';
          formString+='    <div style="width:'+g*7+'px; display:inline-block;"><strong>$'+prod.usPrice+'</strong></div> ';
          formString+='    <div style="width:'+g*41+'px;  display:inline-block;">';
          if(prod.units>1){
            formString+=+prod.units+' <em>x</em> ';
            }
          formString+=prod.name;
          formString+='    </div>';//name
          formString+='    <div class="infoButton" onclick="window.open(\''+prod.marketingUrl+'\', \'_blank\')">&nbsp;</div>';
          formString+='  </input>';
          formString+='</div>';//bucketRadioHolder
          if(prod.productType=="Grant"){grants++;}
          }
        }
      }
    formString+='<h3 style="clear:both; height:'+g*8+'px;">';
    formString+='<input type="button" class="manageButton" onclick="selectBucketProduct()" value="SELECT" />';
    formString+='</h3>';
    formString+='<p>';
    formString+='<span id="pickStatus"></span>';

    formString+='</p>';
    if(grants>0){
      formString+='<input type="hidden" name="isGrant" value="true">';
      //formString+='<div class="pickUser">';
      formString+=returnPickUser();
      //formString+='</div>';
      }
    else{
      formString+='<input type="hidden" name="isGrant" value="false">';
      }
    
    formString+='</form>';
    formString+='</div>';//messages
    rep('actionDiv', formString);
    if(grants>0){refreshPickUserTables();}
    }

  if(linkGlom.indexOf('tool_')==0){
    if(parts[1]=="teams"){
      manageTeams();
      }
    if(parts[1]=="users"){
      manageUsers();
      }
    if(parts[1]=="invites"){
      manageInvites();
      }
    if(parts[1]=="resources"){
      window.open("http://www.corepassion.com/core-passion-authorized-facilitator-resource-page", "_blank");
      }
    }
  }

function reportOpenReceipts(){
  var report='';
  for (var r=0; r<allOpenReceipts.length; r++){
    var receipt=allOpenReceipts[r];
    //console.log(receipt);
    report+='<div class="messages"><p>';
    report+=yyyymmddToDate(receipt.dateYYYYMMDD)+" ";
    report+=receipt.sku+" $";
    report+=receipt.x_amount+"<br />";

    report+=receipt.x_first_name+" ";
    report+=receipt.x_last_name+" ";
    report+='<a href="mailto:'+receipt.x_email+'">'+receipt.x_email+"</a> ";
    report+='</p></div>';
    }
  
  rep("actionDiv", report);
  }
function itemMore(id){
  var item=itemWhereId(id);
  // test 
  //item.linkUrl='corepassion.com/about-the-assessment';
  //console.log(item);

  var statusString="Purchased";
  var dateString="";
  var showContentLink=false;
  var infoString="";
  var showCpaLink=false;
  var cpaLinkText="not set";
  var showPrioritizeLink=false;
  var showReportLink=false;

  var skuParts=item.sku.split("_");
  var imageUrl="/webapp/newtiles/"+skuParts[2]+".png";

  
  if(item.updatedYYYYMMDD != "0"){dateString=' &mdash; '+yyyymmddToDate(item.updatedYYYYMMDD);}
  if(item.linkUrl != ""){
    showContentLink=true;
    status="Content Unlocked";
    }
  
  if(item.marketingUrl != ""){
    infoString='<div class="itemMoreInfo" onclick="window.open(\''+item.marketingUrl+'\', \'_blank\')">&nbsp;</div>';
    }






  if(item.deliverable == "cpa"){
    if(item.completed==1){
      statusString="Completed";
      if(item['isBlind']==1){
        statusString="In Review"; 
        }
      else{
        showReportLink=true;
        }
      if(item.id != user.assessmentItemId){
        statusString="Archived"; 
        showPrioritizeLink=true;
        showReportLink=false;
        }
      }
    else{//incomplete
      showCpaLink=true;
      var progress=0;
      var stateObj=JSON.parse(item.stateObj);
      if(stateObj.hasOwnProperty('progress')){
        progress=stateObj.progress;
        }
      statusString=progress+"% Done";
      cpaLinkText="RESUME";
      if(item.consumed==0){
        statusString="Ready to Begin";
        cpaLinkText="BEGIN";
        }
      }
    }
  var aString='<div class="messages">';
  //aString+='<h3>'+item.name+' '+infoString+'</h3>';
  aString+='<div class="itemMoreProductImage" style="background-image:url('+imageUrl+');">&nbsp;</div>';aString+='<p>';
  aString+=''+statusString+' '+dateString+'';
  if(showCpaLink){
    aString+='<input class="itemMoreButtons" style="float:right;" type="button" onclick="showCpa(\''+id+'\')" value="'+cpaLinkText+'" />';
    }
  if(showPrioritizeLink){
    aString+='<input class="itemMoreButtons" style="float:right;" type="button" onclick="prioritizeItemId(\''+id+'\')" value="ACTIVATE" />';
    }
  if(showReportLink){
    aString+='<input class="itemMoreButtons" style="float:right;" type="button" onclick="pdfReportItemId(\''+id+'\')" value="REPORT" />';
    }
  aString+='</p>';
  aString+='<hr />';
  if(showContentLink){
    aString+='<p><input class="itemMoreButtons" style="float:right;" type="button" onclick="window.open(\''+item.linkUrl+'\', \'_blank\')" value="RESOURCES" /><div class="itemMoreLabel">Videos and more</div></p>';
    aString+='<hr />';
    }


  
  aString+='</div><div class="bottomGap">&nbsp;</div>';
  rep('actionHeading', 'Item Details');
  rep('actionDiv', aString);
  }

function returnTile(confObj){
  confObj.color=tileColors[colorClock%tileColors.length];
  colorClock++;

  var statusString=confObj.statusString;
  statusString=statusString.replace('countClients', user.clientCount);
  statusString=statusString.replace('countTeams', teams.length);
  statusString=statusString.replace('countInvites', user.unusedInvites);
  statusString=statusString.replace('countOpenReceipts', allOpenReceipts.length);

  var tileString='';
  tileString+='<div class="tile" style="background-color:'+confObj.color+'; background-image:url('+confObj.bgImage+');">';

  tileString+='  <div class="tileTitle">'+confObj.titleString+'</div>';

  tileString+='  <div class="tileImage" style="background-image:url('+confObj.imageUrl+');">';
  tileString+='  </div>';

  tileString+='  <div class="tileStatus" style="color:'+confObj.statusColor+';">'+statusString;
  tileString+='  </div>';

  tileString+='  <div class="tileButton" onmousedown="tileClick(\''+confObj.linkGlom+'\')">'+confObj.linkString;
  tileString+='  </div>';
   
  tileString+='</div>';
  return tileString;
  }

function returnAdminTiles(){
  var tiles="";
  for (var t=0; t<adminTools.length; t++){
    var tool=consultantTools[t];
    tiles+=returnTile(tool);
    }
  return tiles;
  }
function returnConsultantTiles(){
  var tiles="";
  for (var t=0; t<consultantTools.length; t++){
    var tool=consultantTools[t];
    tiles+=returnTile(tool);
    }
  if(user.isAdmin==1){
    for (var t=0; t<adminTools.length; t++){
      var tool=adminTools[t];
      tiles+=returnTile(tool);
      }
    }
  return tiles;
  }
// upenReceipts means pending purchases
var adminTools=[
{"bgImage":'/webapp/newtiles/tile520.png', 
 "titleString":"Consultant Tools",
 "imageUrl":'/webapp/newtiles/tool_reports.png', 
 "statusString":"countOpenReceipts Pending Purchases",
 "statusColor":"black",
 "linkGlom":"tool_openReceipts",
 "linkString":"REPORT"
 }];

var consultantTools=[
{"bgImage":'/webapp/newtiles/tile520.png', 
 "titleString":"Consultant Tools",
 "imageUrl":'/webapp/newtiles/tool_users.png', 
 "statusString":"You have countClients Clients",
 "statusColor":"black",
 "linkGlom":"tool_users",
 "linkString":"SEARCH USERS"
 },
{"bgImage":'/webapp/newtiles/tile520.png', 
 "titleString":"Consultant Tools",
 "imageUrl":'/webapp/newtiles/tool_teams.png', 
 "statusString":"You have countTeams Teams",
 "statusColor":"black",
 "linkGlom":"tool_teams",
 "linkString":"MANAGE TEAMS"
 },
{"bgImage":'/webapp/newtiles/tile520.png', 
 "titleString":"Consultant Tools",
 "imageUrl":'/webapp/newtiles/tool_invites.png', 
 "statusString":"You have countInvites unused",
 "statusColor":"black",
 "linkGlom":"tool_invites",
 "linkString":"MANAGE INVITES"
 },
{"bgImage":'/webapp/newtiles/tile520.png', 
 "titleString":"Consultant Tools",
 "imageUrl":'/webapp/newtiles/tool_resources.png', 
 "statusString":"Resources Page",
 "statusColor":"black",
 "linkGlom":"tool_resources",
 "linkString":"OPEN"
 }
];
var leftnavButtons=[{"label":"corepassion_icon_red.png"}];
var activeNavButton=0;
function leftNav(e){
  //console.log(e);
  var x=e.offsetX;
  var y=e.offsetY;
  for(var b=0; b<leftnavButtons.length; b++){
    if((x>leftnavButtons[b].l)&&(x<leftnavButtons[b].r)&&(y>leftnavButtons[b].t)&&(y<leftnavButtons[b].b)){
      activeNavButton=b;
      }
    }
  
  drawLeftnav();
  if(leftnavButtons[activeNavButton].label=="corepassion_icon_red.png"){
    window.location.href="http://www.corepassion.com";
    }
  if(leftnavButtons[activeNavButton].label=="home_icon_red.png"){
    showHome();
    }
  if(leftnavButtons[activeNavButton].label=="shop_icon_red.png"){
    showShop();
    }
  if(leftnavButtons[activeNavButton].label=="profile_icon_red.png"){
    manageProfile();
    }
  if(leftnavButtons[activeNavButton].label=="tools_icon_red.png"){
    showTools();
    }
  if(leftnavButtons[activeNavButton].label=="help_icon_red.png"){
    window.open("http://www.corepassion.com/faq", "_blank");
    }
  }
function roundRect(ctx, x, y, w, h, rad, lineWidth, strokeStyle, fillStyle, label, labelColor, font, iconAlpha){
  var inset=rad+lineWidth/2;
  if(lineWidth>0){
    ctx.beginPath();
    ctx.arc(x+inset,y+inset, rad, pi*1, pi*1.5, false);
    ctx.arc(x+w-inset,y+inset, rad, pi*1.5, pi*2, false);
    ctx.arc(x+w-inset, y+h-inset, rad, 0, pi*.5, false);
    ctx.arc(x+inset,y+h-inset, rad, pi*.5, pi*1, false);
    ctx.closePath();
    ctx.strokeStyle=strokeStyle;
    ctx.fillStyle=fillStyle;
    ctx.fill();
    ctx.lineWidth=lineWidth;
    ctx.stroke(); 
    }
  if(label.indexOf(".png")>-1){
    ctx.globalAlpha=iconAlpha;
    var img=document.getElementById(label);
    ctx.drawImage(img, x+inset, y+inset, w-inset*2, h-inset*2);
    ctx.globalAlpha=1;
    }
  else{
    ctx.fillStyle=labelColor;
    ctx.textBaseline= "middle";  
    ctx.textAlign= "center";  
    ctx.font=font;  
    var parts=label.split("-");
    //1:step:1/2, start:1/2
    //2:step:1/3 start:1/3
    //3:step:1/4 start:1/4
    var step=h/(parts.length+1);
    for (var p=0; p<parts.length; p++){
      ctx.fillText(parts[p],x+w/2,y+step+step*p);
      }
    }
  }
function drawLeftnav(){
  var pad=g/2;
  var size=g*9;
  var canv=document.getElementById('leftnavContext');
  canv.width=Math.ceil(size);
  canv.height=Math.ceil(size*leftnavButtons.length+pad*(leftnavButtons.length-1));
  canv.style.left=(pad+appLeftPad)+"px";
  canv.style.top=(pad+appTopPad)+"px";
  //canv.style.backgroundColor="rgba(255,0,0,.3)";

  var ctx=canv.getContext('2d');
  for(var b=0; b<leftnavButtons.length; b++){
    var x=0;
    var y=b*(size+pad);
    var w=size;
    var h=size;
    var r=0;
    var lw=0;
    leftnavButtons[b].t=y;
    leftnavButtons[b].r=x+w;
    leftnavButtons[b].b=y+h;
    leftnavButtons[b].l=x;
    //console.log(b);
    var image=document.getElementById(leftnavButtons[b].label);
    if(b==activeNavButton){
      ctx.fillStyle="#d98c13";
      ctx.fillRect(x,y,w,h);
      ctx.drawImage(image, x,y,w,h);
      //roundRect(ctx, x,y,w,h, r, lw, "rgba(255,255,255,1)", "rgba(255,255,255,.25)", leftnavButtons[b].label, "rgba(255,255,255,1)", g*2+"px openSansBold", 1);
      }
   else{
      ctx.fillStyle="white";
      ctx.fillRect(x,y,w,h);
      ctx.drawImage(image, x,y,w,h);

      //roundRect(ctx, x,y,w,h, r, lw, "rgba(255,255,255,.5)", "rgba(0,0,0,.75)", leftnavButtons[b].label, "rgba(255,255,255,.5)", g*2+"px openSansBold", .5);
      }
    }
  }

// workflow dimension vars
var appDivWidth=0;
var appDivHeight=0;
var appDivAspect=0;
var cpaWidth=0;
var cpaHeight=0;

var appTopPad=0;
var appLeftPad=0;
var appSquarePx=0;
var gridPx;


// cpa dimensions
var g=1;
//var leftPad=0;
//var topPad=0;

function cpaGeometry(){
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML='';
  g= appSquarePx/64;

  var  ninePt=9*g/5.1;
  var  tenPt=10*g/5.1;
  var  elevenPt=11*g/5.1;
  var  twelvePt=12*g/5.1;
  var  fourteenPt=14*g/5.1;
  var  fifteenPt=15*g/5.1;
  var  sixteenPt=16*g/5.1;
  style.innerHTML += '#cpaWrapper{width:'+cpaWidth+'px; height:'+cpaHeight+'px; margin:'+appTopPad+'px '+appLeftPad+'px '+appTopPad+'px '+ appLeftPad +'px; background-color:black;}';
  style.innerHTML += '#cpaWrapper{font-size:'+twelvePt+'px; line-height:'+g*5+'px; }';
  style.innerHTML += '#cpaWrapper h2{font:'+twelvePt+'px openSansBold; height:'+g*4+'px; margin:0;}';

  style.innerHTML += '.infoButton{padding:0px; background-image:url(/webapp/icons/ir-question-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; display:inline-block; width:'+g*4+'px; height:'+g*4+'px;}';

  style.innerHTML += '.bucketRadioHolder{width:'+g*58+'px; Zheight:'+g*6+'px; margin:2px; float:right; clear:both;}';
  style.innerHTML += '.bucketRadio{vertical-align:middle; width:'+g*2+'px; height:'+g*2+'px; -webkit-appearance:radio;}';

  style.innerHTML += '#headerText{font:'+g*4+'px openSansSemiBold; text-align:center; margin:'+g/2+'px; width:'+g*58+'px; height:'+g*10+'px;}';

style.innerHTML += '#appHeader{width:'+g*58+'px; height:'+g*38+'px; margin-left:'+g*3+'px; float:left;}';
style.innerHTML += '#appWordmark{width:'+g*58+'px; height:'+g*6+'px;  float:right; margin-top:'+g+'px; }';
style.innerHTML += '#appDirections{width:'+g*54+'px; padding:'+g*2+'px; height:'+g*27+'px; font:'+twelvePt+'px openSans; line-height:'+fifteenPt+'px; background-color:#fff; float:right; margin-top:'+0+'px; }';
style.innerHTML += '#appContent{width:'+g*58+'px; height:'+g*64+'px;  margin-left:'+g*3+'px; margin-right:'+g*3+'px; float:right;}';
style.innerHTML += '#appRatings{width:'+g*58+'px; height:'+g*15+'px;  background-color:white; float:right; margin-top:'+g+'px;}';
style.innerHTML += '.appRatingButton{background-color:white; margin:'+g/7+'px;}';
style.innerHTML += '#appCaption{width:'+g*58+'px; font:'+twelvePt+'px openSansSemiBold; height:'+g*5+'px;  background-color:white; float:right;}';
  style.innerHTML += '#captionDiv{background-color:#fff; float:left; width:'+g*54+'px; height:'+g*3.5+'px; margin-left:'+g*2+'px; margin-right:'+g*2+'px; text-align:center; line-height:'+g*2.5+'px;}';
style.innerHTML += '#appStatement{width:'+g*58+'px; height:'+g*20+'px;  background-color:white; float:right; margin-top:'+g+'px;}';
style.innerHTML += '#statementDiv{padding:'+g*2+'px;}';
style.innerHTML += '#appDictionary{width:'+g*58+'px; height:'+g*20+'px; background-color:white; float:right; margin-top:'+g+'px;}';
style.innerHTML += '#dictionaryDiv{padding:'+g*2+'px;}';
style.innerHTML += '#appFooter{width:'+g*58+'px; height:'+g*22+'px; margin-right:'+g*3+'px;  float:right; margin-top:'+0+'px;}';
style.innerHTML += '#appProgress{width:'+g*58+'px; height:'+g*14+'px;  background-color:white; float:right; margin-top:'+g+'px;}';
style.innerHTML += '#progressDiv{padding:'+g*2+'px;}';
style.innerHTML += '#appNav{width:'+g*58+'px; height:'+g*10+'px;  float:right; margin-top:'+g+'px;}';




  //ratings
  var size=(g*58)/8;
  var marg=size/14;
  style.innerHTML += '.rateButton{float:left; width:'+size+'px; height:'+size+'px; margin:'+marg+'px '+marg+'px 0 '+marg+'px ; background-size:cover; background-position:50% 50%; background-repeat:no-repeat;}';
  style.innerHTML += 'body{font:'+twelvePt+'px openSans; color:black;}';


// recently imported

  style.innerHTML += '.buttonBar{height:'+g*9+'px; width:'+g*58+'px; }';
  style.innerHTML += '.fullButton{height:'+g*9+'px; width:'+g*58+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.halfButton{height:'+g*9+'px; width:'+g*27+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.leftButton{height:'+g*9+'px; width:'+g*14+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.middleButton{height:'+g*9+'px; width:'+g*22+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.rightButton{height:'+g*9+'px; width:'+g*14+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.wideButton{height:'+g*9+'px; width:'+g*40+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.smallButton{height:'+g*9+'px; width:'+g*9+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px;}';
  style.innerHTML += '.nonLeftButton{height:'+g*9+'px; width:'+g*14+'px;}';
  style.innerHTML += '.nonMiddleButton{height:'+g*9+'px; width:'+g*22+'px;}';
  style.innerHTML += '.nonHalfButton{height:'+g*9+'px; width:'+g*27+'px;}';
  style.innerHTML += '.nonRightButton{height:'+g*9+'px; width:'+g*14+'px;}';
  style.innerHTML += '.nonWideButton{height:'+g*9+'px; width:'+g*40+'px;}';
  style.innerHTML += '.nonSmallButton{height:'+g*9+'px; width:'+g*9+'px;}';
  style.innerHTML += '.gapButton{height:'+g*9+'px; width:'+g*4+'px;}';

  //icons

  style.innerHTML += '.playButton{background-image:url(webapp/icons/ir-play-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; width:'+g*8+'px;  height:'+g*8+'px; float:right; }';
  style.innerHTML += '.playButtonDirections{background-image:url(webapp/icons/ir-play-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; width:'+g*8+'px;  height:'+g*8+'px; float:right; }';
  style.innerHTML += '.playButtonInline{background-image:url(webapp/icons/ir-play-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; width:'+g*8+'px;  height:'+g*8+'px; display:inline-block; }';
  style.innerHTML += '.recoverIcon{background-image:url(webapp/icons/question-lr-90p.png); background-size:contain;}';
  style.innerHTML += '.recoverFullIcon{background-image:url(webapp/icons/blk-question-88p.png); background-size:contain;}';
  style.innerHTML += '.menuIcon{background-image:url(webapp/icons/ir-menu-88p.png); background-size:contain;}';
  style.innerHTML += '.homeIcon{background-image:url(webapp/icons/ir-logo-88p.png); background-size:contain;}';
  style.innerHTML += '.questionIcon{background-image:url(webapp/icons/ir-question-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';

  style.innerHTML += '.prevIcon{background-image:url(webapp/icons/i-prev-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.nextIcon{background-image:url(webapp/icons/i-next-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';

  style.innerHTML += '.editRedIcon{background-image:url(webapp/icons/ir-edit-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.editIcon{background-image:url(webapp/icons/i-edit-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.addIcon{background-image:url(webapp/icons/i-add-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';

  style.innerHTML += '.bulbIcon{background-image:url(webapp/icons/ir-bulb-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.closeIcon{background-image:url(webapp/icons/ir-close-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.closeBlackIcon{background-image:url(webapp/icons/ib-close-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  //style.innerHTML += '.closeBlackIconTop{background-image:url(webapp/icons/ib-close-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%; position:absolute; width:44px; height:44px; left:'+(pageWidth-g*3*articleScale-22)+'px; top:'+(g*3*articleScale-22)+'px;}';

  style.innerHTML += '.closeBlackIconModal{background-image:url(webapp/icons/ib-close-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%; position:absolute; width:44px; height:44px; left:'+(g*61-22)+'px; top:'+(g*3-22)+'px;}';
  style.innerHTML += '.codexIcon{background-image:url(webapp/icons/i-codex-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.codexButtonIcon{background-image:url(webapp/icons/i-codexbutton-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.signIcon{background-image:url(webapp/icons/i-leaderboard-88p.png);background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';
  style.innerHTML += '.signIconBlack{background-image:url(webapp/icons/blk-leaderboard-88p.png); background-size:contain; background-repeat:no-repeat; background-position: 50% 50%;}';

  style.innerHTML += '.reflectionButton{background-color:rgba(0,0,255,0); background-size:40%; background-repeat:no-repeat; background-position: 50% 50%; position:absolute; -webkit-appearance: none; width:'+g*10+'px; height:'+g*10+'px;}';

  // items more
  style.innerHTML += '.itemMoreLabel{width:'+g*22+'px; float:left; font:'+twelvePt+'px openSansSemiBold; text-align:center; margin-top:'+g*2+'px; height:'+g*6+'px;}';
  style.innerHTML += '.itemMoreProductImage{margin-right:'+g*2+'px; margin-top:'+g*0+'px; width:'+g*26.5+'px; height:'+g*13+'px; display:block; float:left;   background-size:contain;}';
  style.innerHTML += '';
  style.innerHTML += 'input.itemMoreButtons{width:'+g*20+'px; float:left; background-color:#a5100c; color:white; font:'+twelvePt+'px openSansSemiBold; text-align:center;}';

  style.innerHTML += '.itemMoreInfo{float:right; width:'+g*6+'px; height:'+g*6+'px; padding:0px; background-image:url(/webapp/icons/ir-question-88p.png); background-size:contain; background-position:50% 50%; background-repeat:no-repeat; display:inline-block;}';

  // modal
  var centerX=appDivWidth/2;
  var centerY=appDivHeight/2;

  style.innerHTML += '.whiteMessage{width:'+g*58+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px; text-align:center; position:absolute; color:white; left:'+(centerX-g*29)+'px; top:'+(centerY-g*30)+'px;}';
  style.innerHTML += '.modalCloseButton{background-color:#a5100c; text-align:center; color:white; height:'+g*9+'px; width:'+g*27+'px; font:'+twelvePt+'px openSansSemiBold;  line-height:'+g*9+'px; position:absolute; left:'+(centerX-g*29)+'px; top:'+(centerY+g*20)+'px;}';
  //console.log('');
  style.innerHTML += '.modalMoreButton{background-color:#a5100c; text-align:center; height:'+g*9+'px; width:'+g*27+'px; font:'+twelvePt+'px openSansSemiBold; line-height:'+g*9+'px; position:absolute; left:'+(centerX+g*2)+'px; top:'+(centerY+g*20)+'px;}';
  style.innerHTML += '.modalImageForm{position:absolute; left:'+(centerX-g*29)+'px; top:'+(centerY-g*24)+'px;}';


  document.getElementsByTagName('head')[0].appendChild(style);
  document.body.scrollTop=0;
  console.log('geom ended');
  }

function rnd(range){
  return Math.floor(Math.random()*range);
  }
var atNum=0;
//{"question_id":line[0], "question_statement":line[1], "statement_audio":line[2], "dictionary":line[3], "dictionary_audio":line[4], "question_number":line[5], "question_weight":line[6], "corepassion_id":line[7], "ib_stamp":line[8]};
var passions=["Recognition", "Partnership", "Creativity", "Form", "Change", "Service", "Research",  "Power", "Enlightenment", "Inspiration", "Mastership", "Compassion"]; 
function initCpa(){
  for (var p=0; p<questions.length; p++){
    questions[p].answered=false;
    questions[p].score=0;
    questions[p].pNum=Number(questions[p].corepassion_id)-1;
    }
  //updateNav();
  //showQuestion();
  }


var audioMp3UrlsByTitle={};
var audioMp3Titles=[];
function loadTab(){
  jQuery.get(appPath+'audio_mp3.tab', function(d){
    data = d;
    dataLines = data.split(/\r?\n/);
    for(var dl=0;dl<dataLines.length; dl++){
      var parts=dataLines[dl].split(/\t/);
      //app("contextDiv", parts[0]+"="+parts[1]);
      audioMp3Titles.push(parts[0]);
      audioMp3UrlsByTitle[parts[0]]=parts[1];
      }
    });
  }
function loadAndPlayAudioTitle(title){
  if(lastAudioTitle==title){
    if((lastAudio.ended==false)&&(lastAudio.paused==false)){
      lastAudio.pause();
      return false;
      }
    }
  var audio = new Audio('webapp/mp3/'+title+'.mp3');
  lastAudio=audio;
  lastAudioTitle=title;
  audio.play();
  if(title=="directions"){
    clearTimeout(directionsTimeout);
    directionsTimeout=window.setTimeout('directionsTick()', 1000);
    }
  }
var captionArray=["", "Never", "Hardly Ever", "Sometimes &amp; Sometimes Not", "Sometimes", "Often", "Almost Always", "Always"];
function isItemIdBlind(itemId){
  var blind=false;
  for (var i=0; i<items.length; i++){
    if(items[i].id==itemId){
      if(items[i].isBlind==1){
        blind=true;
        }
      }
    }
  return blind;
  }
var autoRead=false;
var lastReadNum=-1;
var directionsTimeout;
var lastAudio;
var lastAudioTitle;

function directionsTick(){
  if(lastAudioTitle=="directions"){
    if(lastAudio.ended){
      if(atNum==0){
        loadAndPlayAudioTitle('statement-'+questions[0].question_id);
        }
      }
    else{
      clearTimeout(directionsTimeout);
      directionsTimeout=window.setTimeout('directionsTick()', 1000);
      }
    }
  }
function showQuestion(){
  //http://modernmuse.audioacrobat.com/download/
  document.getElementById('captionDiv').innerHTML=captionArray[questions[atNum].score];
  var htmlString="<h2>RATING</h2>";
  for (var s=1; s<=7; s++){
    var color="g";
    if(questions[atNum].score==s){color="gd";}
    if(questions[atNum].score==0){color="r";}
    htmlString+='<div class="rateButton" ';
    htmlString+='style="background-image:url(webapp/icons/i'+color+'-'+s+'-88p.png);" ';
    htmlString+=' onmousedown="rate('+s+');">';
    htmlString+='</div>';
    }
  document.getElementById('appRatings').innerHTML=htmlString;
  var answered=0;
  for (var p=0; p<questions.length; p++){
    if(questions[p].answered){answered++;}
    }

  document.getElementById('progressDiv').innerHTML='Question <b>'+(atNum+1)+'</b> of <b>'+questions.length+"</b>";
  document.getElementById('statementDiv').innerHTML='<b>'+questions[atNum].question_statement+'</b><div class="playButton"  onclick="javascript:event.preventDefault(); event.target.style.opacity=.5; loadAndPlayAudioTitle(\'statement-'+questions[atNum].question_id+'\')"></div>';
  document.getElementById('dictionaryDiv').innerHTML='<i>'+questions[atNum].dictionary+'</i><div class="playButton"  onclick="javascript:event.preventDefault(); event.target.style.opacity=.5; loadAndPlayAudioTitle(\'dictionary-'+questions[atNum].question_id+'\')"></div>';
  if(questions[atNum].score==0){
    document.getElementById('nextDiv').style.display="none";
    }
  else{
    document.getElementById('nextDiv').style.display="block";
    }
  if(autoRead){
    document.getElementById('muteButton').style.display="block";
    document.getElementById('speakButton').style.display="none";
    }
  else{
    document.getElementById('muteButton').style.display="none";
    document.getElementById('speakButton').style.display="block";
    }
  if(answered==questions.length){
    document.getElementById('nextDiv').style.display="none";
    document.getElementById('exitButton').style.display="none";
    if(isItemIdBlind(activeItemId)==false){
      document.getElementById('graphButton').style.display="block";
      document.getElementById('completeButton').style.display="none";
      }
    else{
      document.getElementById('graphButton').style.display="none";
      document.getElementById('completeButton').style.display="block";
      }
    }
  else{
    document.getElementById('graphButton').style.display="none";
    document.getElementById('completeButton').style.display="none";
    document.getElementById('exitButton').style.display="block";
    }
  if(autoRead){
    if(lastReadNum != atNum){
      if(atNum==0){
        loadAndPlayAudioTitle('directions');
        lastReadNum = atNum;
        }
      else{
        loadAndPlayAudioTitle('statement-'+questions[atNum].question_id);
        lastReadNum = atNum;
        }
      }
    }
  }

function toggleAutoRead(){
  autoRead= !(autoRead);
  if(autoRead){
    document.getElementById('muteButton').style.display="block";
    document.getElementById('speakButton').style.display="none";
      loadAndPlayAudioTitle('statement-'+questions[atNum].question_id);
      lastReadNum = atNum;

    }
  else{
    document.getElementById('muteButton').style.display="none";
    document.getElementById('speakButton').style.display="block";
    lastAudio.pause();
    }
  }
var pi=Math.PI;
function prev(){
  if(atNum>0){
    atNum--;
    updateNav();
    showQuestion();
    }
  }
function next(){
  if(atNum<questions.length-1){
    atNum++;
    updateNav();
    showQuestion();
    }
  }



function rate(rating){
  if((questions[atNum].answered)&&(questions[atNum].score==rating)){//toggle to unanswered
    questions[atNum].answered=false;
    questions[atNum].score=0;
    }
  else{// select rating
    questions[atNum].answered=true;
    questions[atNum].score=rating;
    }
  storeState();
  updateNav();
  showQuestion();
  }
function updateNav(){
  }
  
function summaryOfItem(itemId){
  var summary=[];
  for (var i=0; i<items.length; i++){
    if(items[i].id==itemId){
      var stateObj=JSON.parse(items[i].stateObj);
      var summary=stateObj.summary;
      }
    }
  return summary;
  }
function summaryOfUser(userId){
  var summary=[];
  var stateObj=JSON.parse(usersById[userId].stateObj);
  if(stateObj.hasOwnProperty("summary")){
    summary=stateObj.summary;
    }
  return summary;
  }
function nowYYYYMMDD(){
  return (new Date()).toISOString().slice(0,10).replace(/-/g,"");
  }
function expireYYYYMMDD(){
  var d = new Date();
  d.setDate(d.getDate() - 2);
  return (d).toISOString().slice(0,10).replace(/-/g,"");
  }
function yyyymmddToDate(yyyymmdd){
  var year= yyyymmdd.substr(0,4);
  var month=Number(yyyymmdd.substr(4,2));
  var day=Number(yyyymmdd.substr(6,2));
  if(Number(yyyymmdd)==0){
    return "";
    }
  else{
    return month+"/" +day+"/"+year;
    }
  }
function nowDate(){
  var yyyymmdd=nowYYYYMMDD();
  var date=yyyymmddToDate(yyyymmdd);
  return date;
  }

function storeState(){
  var scoreArray=[];
  var answered=0;
  for (var p=0; p<questions.length; p++){
    if(questions[p].answered){answered++;}
    scoreArray.push(questions[p].score);
    }
  var progress=100*answered/questions.length;//0.0-100.0
  var summary='{}';
  var yyyymmdd=nowYYYYMMDD();
  var updatedDate=nowDate();
  var consumed=0;
  if(progress>0){
    consumed=1;
    }
  var isAssessed=0;
  var completed=0;
  if(progress==100){
    isAssessed=1;
    completed=1;
    //make summary from score
    var summaryObj= returnActiveSortArray();
    //updateUserCorePassionProfile(summaryObj);
    summary=JSON.stringify(summaryObj);
    }
  progress=Math.floor(progress);
  storeString='{"scoreArray":['+scoreArray.join(',')+'], "atNum":'+atNum+', "progress":'+progress+', "consultantUserId":"'+user.consultantUserId+'", "updatedYYYYMMDD":"'+yyyymmdd+'", "updatedDate":"'+ updatedDate +'", "summary":'+summary+'}';
  var serialForm='action=storeState';
  serialForm+= userFieldsString;
  serialForm+='&isAssessed='+isAssessed;

  serialForm+='&ethnicity_id='+user.ethnicity_id;
  serialForm+='&gender_id='+user.gender_id;
  serialForm+='&age_id='+user.age_id;
  serialForm+='&career_id='+user.career_id;

  serialForm+='&consumed='+consumed;
  serialForm+='&completed='+completed;
  serialForm+='&itemId='+activeItemId;
  serialForm+='&yyyymmdd='+yyyymmdd;
  serialForm+='&stateObj='+storeString;

  jQuery.post(appPath+"ajaxsql.php", serialForm, function(data, textStatus) {
    var returnedErrors=data.errors;
    if(returnedErrors.length>0){
      var errorString=returnedErrors.join(" - ")+" Quit browser and login again";
      alert(errorString); 
      }
    else{
      //console.log('stored');
      user=data.user;
      updateUsersById(data.updateList);
      items=user.items;
      }
    }, "json");
  }


function returnActiveSortArray(){
  var scoreByPnum=[];
  var countByPnum=[];
  var challengeByPnum=[];
  var giftByPnum=[];
  for (var p=0; p<passions.length; p++){
    scoreByPnum.push(0);
    countByPnum.push(0);
    challengeByPnum.push(0);
    giftByPnum.push(0);
    }
  var maxCount=0;
  for (q=0; q<questions.length; q++){
    var question=questions[q];
    scoreByPnum[question.pNum]+=question.score;
    countByPnum[question.pNum]++;
    if(questions[q].question_weight==-1){
      challengeByPnum[question.pNum]+=question.score;
      }
    else{
      giftByPnum[question.pNum]+=question.score;
      }
    }
  var colorArray=["#ff0000", "#ff3d00", "#ff7e00", "#ffbe00", "#feff00", "#767676", "#767676", "#767676", "#767676", "#767676", "#767676", "#767676"];
  var sortArray=[];
  for (var p=0; p<passions.length; p++){
    var passionObj={"pNum":p, "score":scoreByPnum[p], "challenge":challengeByPnum[p], "gift":giftByPnum[p], "count":countByPnum[p], "color":"#000", "caption":passions[p]};
    sortArray.push(passionObj);
    }
  sortArray.sort(function(a, b){
    return b.score-a.score
  });  
  for (var p=0; p<sortArray.length; p++){
    sortArray[p].color=colorArray[p];
    }
  for (var p=1; p<sortArray.length; p++){// copy color to tied scores
    if(sortArray[p].score==sortArray[p-1].score){
      sortArray[p].color=sortArray[p-1].color;
      }
    }
  return sortArray;
  }

function loadTeamProfile(teamId){
  if(pdfImagesPreloaded){
    document.getElementById('spinner').style.display="block";
    window.setTimeout("resumeLoadTeamProfile("+teamId+")", 100);
    }
  else{
    deferredReport="loadTeamProfile";
    deferredId=teamId;

    rep("actionDiv",'<div id="splashglobe" class="splashglobe"></div>');
    var actionString='<h3>Messages:</h3><p>';
    actionString+='Preloading images for PDF generation...'+'</p>';
    rep("splashglobe", actionString);
    rep("actionHeading", "Home");
    window.setTimeout('getPrePages()', 100);
    }
  }

function resumeLoadTeamProfile(teamId){// run from a button onclick
  //do we have good data?
  var teamProfile={"name":"not set", "members":[]};
  for (var t=0; t<teams.length; t++){
    //teams[t].teamName;
    if(teams[t].id==teamId){
      teamProfile.name=teams[t].teamName;
      // iterate over users
      var ids=idsOfAll();
      for (var u=0; u<ids.length; u++){
        for (var m=0; m<members.length; m++){
          if(members[m].teamId==teams[t].id){
            if(ids[u]==members[m].memberUserId){
              var includeUser=usersById[ids[u]];
              includeUser.sortNum=members[m].sortNum;
              teamProfile.members.push(includeUser);
              }
            }
          }
        }
      }
    }
  teamProfile.members.sort(function(a, b){return a.sortNum-b.sortNum});
  showTeamProfile(teamProfile);
  console.log(teamProfile);
  tempTeamProfile=teamProfile;
  }
var tempTeamProfile={};
var hackMembers=[
  {"id":0, 
    "firstName":"Angela", 
    "lastName":"Boykin", 
    "sortNum":3, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":85}, 
{"p":"Partnership", "s":79}, 
{"p":"Creativity", "s":66}, 
{"p":"Form", "s":82}, 
{"p":"Change", "s":58}, 
{"p":"Service", "s":73}, 
{"p":"Research", "s":73}, 
{"p":"Power", "s":72}, 
{"p":"Enlightenment", "s":69}, 
{"p":"Inspiration", "s":74}, 
{"p":"Mastership", "s":86}, 
{"p":"Compassion", "s":63}
    ]
  },
  {"id":0, 
    "firstName":"Johnathon", 
    "lastName":"Hastin", 
    "sortNum":4, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":95}, 
{"p":"Partnership", "s":73}, 
{"p":"Creativity", "s":82}, 
{"p":"Form", "s":81}, 
{"p":"Change", "s":82}, 
{"p":"Service", "s":76}, 
{"p":"Research", "s":77}, 
{"p":"Power", "s":79}, 
{"p":"Enlightenment", "s":71}, 
{"p":"Inspiration", "s":70}, 
{"p":"Mastership", "s":82}, 
{"p":"Compassion", "s":67}
    ]
  },
  {"id":0, 
    "firstName":"Kevin", 
    "lastName":"Mulcahy", 
    "sortNum":5, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":93}, 
{"p":"Partnership", "s":83}, 
{"p":"Creativity", "s":87}, 
{"p":"Form", "s":84}, 
{"p":"Change", "s":86}, 
{"p":"Service", "s":78}, 
{"p":"Research", "s":83}, 
{"p":"Power", "s":78}, 
{"p":"Enlightenment", "s":75}, 
{"p":"Inspiration", "s":71}, 
{"p":"Mastership", "s":86}, 
{"p":"Compassion", "s":79}
    ]
  },
  {"id":0, 
    "firstName":"Laura", 
    "lastName":"Hoff", 
    "sortNum":6, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":94}, 
{"p":"Partnership", "s":89}, 
{"p":"Creativity", "s":70}, 
{"p":"Form", "s":89}, 
{"p":"Change", "s":83}, 
{"p":"Service", "s":83}, 
{"p":"Research", "s":97}, 
{"p":"Power", "s":83}, 
{"p":"Enlightenment", "s":73}, 
{"p":"Inspiration", "s":84}, 
{"p":"Mastership", "s":93}, 
{"p":"Compassion", "s":76}
    ]
  },
  {"id":0, 
    "firstName":"Michael", 
    "lastName":"Benning", 
    "sortNum":7, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":75}, 
{"p":"Partnership", "s":73}, 
{"p":"Creativity", "s":70}, 
{"p":"Form", "s":82}, 
{"p":"Change", "s":63}, 
{"p":"Service", "s":61}, 
{"p":"Research", "s":83}, 
{"p":"Power", "s":61}, 
{"p":"Enlightenment", "s":62}, 
{"p":"Inspiration", "s":57}, 
{"p":"Mastership", "s":71}, 
{"p":"Compassion", "s":62}
    ]
  },
  {"id":0, 
    "firstName":"Olivia", 
    "lastName":"Lindberg", 
    "sortNum":8, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":92}, 
{"p":"Partnership", "s":86}, 
{"p":"Creativity", "s":67}, 
{"p":"Form", "s":82}, 
{"p":"Change", "s":78}, 
{"p":"Service", "s":81}, 
{"p":"Research", "s":75}, 
{"p":"Power", "s":85}, 
{"p":"Enlightenment", "s":77}, 
{"p":"Inspiration", "s":68}, 
{"p":"Mastership", "s":94}, 
{"p":"Compassion", "s":67}
    ]
  },
  {"id":0, 
    "firstName":"Wendy", 
    "lastName":"Benning", 
    "sortNum":9, 
    "isAssessed":1, 
    "stateObj":'',
    "passions":[
{"p":"Recognition", "s":91}, 
{"p":"Partnership", "s":73}, 
{"p":"Creativity", "s":58}, 
{"p":"Form", "s":80}, 
{"p":"Change", "s":73}, 
{"p":"Service", "s":78}, 
{"p":"Research", "s":85}, 
{"p":"Power", "s":78}, 
{"p":"Enlightenment", "s":72}, 
{"p":"Inspiration", "s":74}, 
{"p":"Mastership", "s":87}, 
{"p":"Compassion", "s":70}
    ]
  }
];


var pNumByPassion={"Recognition":0, "Partnership":1, "Creativity":2, "Form":3, "Change":4, "Service":5, "Research":6, "Power":7, "Enlightenment":8, "Inspiration":9, "Mastership":10, "Compassion":11};


function hackTempTeamProfile(){
  var colorArray=["#ff0000", "#ff3d00", "#ff7e00", "#ffbe00", "#feff00", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];
  for (var h=0; h<hackMembers.length; h++){
    var passions=hackMembers[h].passions;
    passions.sort(function(a, b) {
      return parseFloat(b.s) - parseFloat(a.s);
      });
    var summary=[];
    for (var p=0; p<passions.length; p++){
      console.log(passions[p].s+" "+passions[p].p+" "+pNumByPassion[passions[p].p]);
      var pObj={"pNum":pNumByPassion[passions[p].p],"score":passions[p].s,"color":colorArray[p],"caption":passions[p].p}
      summary.push(pObj);
      }
    var stateObj={"summary":summary};
    hackMembers[h].stateObj=JSON.stringify(stateObj);
    tempTeamProfile.members.push(hackMembers[h]);
    }
  showTeamProfile(tempTeamProfile);
  }


//  

function showTeamProfile(teamProfile){
  console.log('showTeamProfile '+JSON.stringify(teamProfile));
  var canv=document.getElementById('drawCanvas');
  var pdfGrid=7;
  var pdfAcross=36;
  var pdfDown=pdfAcross*.775;
  var pdfPad=1.25;

  var canvAspect=(pdfAcross-pdfPad)/(pdfDown-pdfPad);
  var graphAspect=2;
  canv.width=300*10;
  canv.height=canv.width/canvAspect;
  graphHeight=canv.width/graphAspect;
  //canv.style.width=300*10+"px";
  //canv.style.height=300/canvAspect+"px";
  var lw=6;
  var tiltPx=270;
  var firstColPx=300*1.5;
  var firstRowPx=300*1.5;
  var rowsPx=(graphHeight-firstRowPx)/12;
  var colsPx=(canv.width-firstColPx-tiltPx-lw)/teamProfile.members.length;
  canv.style.display="none";
  canv.style.position="absolute";
  canv.style.top=appTopPad+"px";
  canv.style.left=appLeftPad+"px";
  var ctx=canv.getContext('2d');
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,canv.width, canv.height);

  ctx.save();
  ctx.translate(0, 300*2);
  ctx.font= graphHeight*.033+'px "openSans"';
  ctx.textBaseline="middle";
  ctx.lineWidth=lw;
  ctx.textAlign="left";
  //users names text

  
  for(u=0; u<teamProfile.members.length; u++){
    ctx.fillStyle="#000";
    ctx.textAlign="left";
    ctx.save();
    var x=firstColPx+(u+.5)*colsPx;
    var y=firstRowPx-rowsPx/3;
    ctx.translate(x, y);
    //ctx.beginPath();
    //ctx.arc(0,0,30,0,Math.PI*2,true);
    //ctx.stroke();
    ctx.rotate(-Math.PI/3);
    var firstLast=teamProfile.members[u].firstName+" "+teamProfile.members[u].lastName;
    ctx.fillText(firstLast, 0, 0);
    ctx.restore();
 

    //ctx.fillText(teamProfile.members[u].wpDisplayName, firstColPx+u*colsPx+tiltPx/2, firstRowPx/2); 
    if(teamProfile.members[u].isAssessed==1){
      console.log('teamProfile.members['+u+'].id='+teamProfile.members[u].id);
      //var summaryArray=summaryOfUser(teamProfile.members[u].id);
      var stateObj=JSON.parse(teamProfile.members[u].stateObj);
      if(stateObj.hasOwnProperty("summary")){
        var summaryArray=stateObj.summary;
        }
      for(p=0; p<summaryArray.length; p++){
        if(summaryArray[p].color != "#fff"){
          ctx.fillStyle=summaryArray[p].color;
          ctx.fillRect(firstColPx+u*colsPx,  firstRowPx+summaryArray[p].pNum*rowsPx, colsPx,  rowsPx);
          ctx.fillStyle="#000";
          ctx.textAlign="center";
          ctx.fillText((p+1), firstColPx+(u+.5)*colsPx,  firstRowPx+(summaryArray[p].pNum+.5)*rowsPx); 
          }
        }
      }
    }

  ctx.stroke();


  //border canvas
  ctx.strokeStyle="#333";
  
  //surround
  ctx.beginPath();
  ctx.moveTo(lw/2, graphHeight-lw/2); //bl 
  ctx.lineTo(canv.width-lw/2-tiltPx, graphHeight-lw/2); //br
  ctx.lineTo(canv.width-lw/2-tiltPx,firstRowPx); //mr
  ctx.lineTo(canv.width-lw/2,lw/2); //tr
  ctx.lineTo(tiltPx+lw/2,lw/2);  //tl
  ctx.lineTo(lw/2,firstRowPx); //ml
  ctx.lineTo(lw/2, graphHeight-lw/2); //ll
  // across lines
    for(p=0; p<12; p++){
    ctx.moveTo(lw/2,firstRowPx+p*rowsPx); 
    ctx.lineTo(canv.width-lw/2-tiltPx,firstRowPx+p*rowsPx);
    }
  ctx.stroke();
  ctx.fillStyle="#000";
  ctx.textAlign="left";
  // passions text
  for(p=0; p<12; p++){
    ctx.fillText(passions[p], rowsPx/2, firstRowPx+(p+.5)*rowsPx); 
    }
  ctx.stroke();

  
  // draw user divider lines
  ctx.beginPath();
  for(u=0; u<teamProfile.members.length; u++){
    ctx.moveTo(firstColPx+u*colsPx, graphHeight-lw/2); //bm 
    ctx.lineTo(firstColPx+u*colsPx,firstRowPx); //cm
    ctx.lineTo(firstColPx+u*colsPx+tiltPx,lw/2); //tm
    } 
  ctx.stroke();

  // the canvas

  ctx.restore();


  // globe

  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  var img=document.getElementById('cpaglobe.jpg');
  canvas.width = img.width;
  canvas.height = img.height;
  var imgAspect=canvas.width/canvas.height;
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  // Grab the image as a jpeg encoded in base64, but only the data
  //var data = canvas.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  //data = atob(data)
  ctx.drawImage(canvas,0,50,500, 500/imgAspect);
  document.body.removeChild(canvas);

  // canvas text from metadata
  var date=new Date();
  var profileDate=nowDate(); 
  var temp=profileDate.split("/");
  var profileYear=temp[2];

  ctx.fillStyle="black";
  ctx.font= graphHeight*.04+'px "openSansSemiBold"';
  ctx.textAlign="left";
  ctx.fillText('Core Passion® Team Profile', 600, 250);
  
  ctx.font= graphHeight*.033+'px "openSans"';
  ctx.fillText(teamProfile.name, 600, 350);


  //ctx.fillText(yyyymmddToDate(profileDate), 600, 425);
  ctx.fillText(profileDate, 600, 425);



  ctx.font= graphHeight*.028+'px "openSans"';
  ctx.fillText('©'+profileYear+' Core Passion Inc.', 0, canv.height-25);
  //console.log("G");
  //console.log(user.consultantUserId);
  //console.log(typeof user.consultantUserId);
  //console.log("UNIT");
  if(user.consultantUserId != "0"){
    ctx.textAlign="right";
    ctx.font= graphHeight*.028+'px "openSans"';
    ctx.fillText('Prepared by:', canv.width-0, 250);
    ctx.fillText(user.firstName+' '+user.lastName+', '+ user.company , canv.width-0, 300);
    ctx.fillText(user.website, canv.width-0, 350);
    ctx.fillText(user.email, canv.width-0, 400);
    ctx.fillText(user.phone, canv.width-0, 450);
    }
  ctx.font= graphHeight*.028+'px "openSans"'; 
  ctx.fillText('corepassion.com', canv.width-25, canv.height-25);
    
  var data = canv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  var imgData = atob(data);
  var doc = new jsPDF('l', 'mm', [198,254]);
  doc.addImage(imgData, 'JPEG', pdfPad*pdfGrid, pdfPad*pdfGrid, (pdfAcross-pdfPad*2)*pdfGrid, (pdfDown-pdfPad*2)*pdfGrid);


  canv.style.width=appSquarePx+"px";
  canv.style.height=appSquarePx/canvAspect+"px";
  var cleaned=teamProfile.name;
  cleaned=cleaned.replace(/([^a-z0-9]+)/gi, '-');
  document.getElementById('spinner').style.display="none";
  
  pdfToMethod(doc, cleaned+'_'+'profile');
  }
function pdfActiveCpa(){
  showWorkflow();
  document.getElementById('cpaWrapper').style.display="none";
  pdfReportItemId(activeItemId);
  }
function canvasGraph(sortArray, squarePx){
  var canv=document.getElementById('drawCanvas');
  canv.width=squarePx;
  canv.height=squarePx;
  canv.style.width=appSquarePx+"px";
  canv.style.height=appSquarePx+"px";
  canv.style.display="none";
  canv.style.position="absolute";
  canv.style.top=appTopPad+"px";
  canv.style.left=appLeftPad+"px";
  var ctx=canv.getContext('2d');
  var leftCol=7;
  var rightCol=19;
  var colsAcross=leftCol+rightCol;
  var grid=canv.height/colsAcross;
  ctx.font=grid*.66+"px Arial";
  ctx.textBaseline="middle";


  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,canv.width, canv.height);


  for (var p=0; p<sortArray.length; p++){
    var y=grid*(2*p+1.6);
    if(p%2==0){
      ctx.fillStyle="#f8f8f8";
      ctx.fillRect(0,y,grid*colsAcross,grid*.8);
      }
    ctx.fillStyle=sortArray[p].color;
    var w=grid*rightCol*sortArray[p].score/sortArray[p].count/7;
    ctx.fillRect(grid*leftCol,y,w,grid*.8);
    }

  ctx.fillStyle="black";
  for (var p=0; p<sortArray.length; p++){
    var y=grid*(2*p+2);
    ctx.textAlign="left";
    var caption=sortArray[p].caption;
    ctx.fillText(caption,grid/2,y);
    ctx.textAlign="right";
    var caption=sortArray[p].score;
    ctx.fillText(caption,grid*(leftCol-.2),y);
    }

  ctx.textAlign="left";
  for (var x=0; x<140; x+=20){
    ctx.fillText("|"+x,grid*leftCol+x*grid*rightCol/140,grid/2);
    ctx.fillText("|"+x,grid*leftCol+x*grid*rightCol/140,(colsAcross-.5)*grid);
    }    

  //border canvas
  ctx.strokeStyle="#666";
  ctx.lineWidth=6;
  ctx.strokeRect(0,0,canv.width, canv.height);

  }



function reportStateObj(stateObj, ofUser){
  //console.log("ofUser")
  //console.log(ofUser);

  var destCanv=document.getElementById('previewCanvas');

  //destCanv.height=300*7;
  //destCanv.width=300*5.5;
  destCanv.height=300*7*imageDensity;
  destCanv.width=300*5.5*imageDensity;

  var destAspect=destCanv.width/destCanv.height;
  //alert('HELLO reportStateObj  '+destAspect);
  var destCtx = destCanv.getContext('2d');

  // lime bg
  destCtx.fillStyle="#fff";
  destCtx.fillRect(0,0,destCanv.width, destCanv.height);

  // bar graph on drawCanvas
  var summary=stateObj.summary;
  summary[0].color="#ff0000";
  console.log('reportStateObj summary ');
  console.log(summary);
  var consultantUserId=stateObj.consultantUserId;
  //canvasGraph(summary,300*5.5);
  canvasGraph(summary,300*5.5*imageDensity);
  var sourceCanv=document.getElementById('drawCanvas');
 
  destCtx.drawImage(sourceCanv, 0, 0); //300*2.9);

  // canvas text from metadata
  var date=new Date();
  var profileDate=nowDate();
  var temp=profileDate.split("/");
  var profileYear=temp[2];
  var consultantUserId=ofUser.consultantUserId;
  console.log("consultantUserId="+consultantUserId)

  if(consultantUserId != "0"){
    var consultant=usersById[consultantUserId];
    console.log("consultant");
    console.log(consultant);

    //console.log(stateObj.consultantUserId+" : "+consultant);
    destCtx.textAlign="left";
    destCtx.fillStyle="black";
    destCtx.font= destCanv.width*.020+'px "openSans"';
    destCtx.fillText('Presented by:', 0, destCanv.height-325);
    destCtx.fillText(consultant.wpDisplayName, 0, destCanv.height-275);
    destCtx.fillText(consultant.company, 0, destCanv.height-225);
    destCtx.fillText(consultant.website, 0, destCanv.height-175);
    destCtx.fillText(consultant.email, 0, destCanv.height-125);
    destCtx.fillText(consultant.phone, 0, destCanv.height-75);
    }
    destCtx.textAlign="right";
    destCtx.fillStyle="black";
    destCtx.font= destCanv.width*.015+'px "openSans"';
    destCtx.fillText('These results are invalid unless', destCanv.width, destCanv.height-350);
    destCtx.fillText('delivered with a standard Core', destCanv.width, destCanv.height-300);
    destCtx.fillText('Passion© Assessment Report', destCanv.width, destCanv.height-250);
    destCtx.fillText('copyrighted by Core Passion©', destCanv.width, destCanv.height-200);

  }



function pdfReportItemId(itemId){
  if(pdfImagesPreloaded){
    document.getElementById('spinner').style.display="block";
    window.setTimeout("resumePdfReportItemId("+itemId+")", 100);
    }
  else{
    deferredReport="pdfReportItemId";
    deferredId=itemId;

    rep("actionDiv",'<div id="splashglobe" class="splashglobe"></div>');
    var actionString='<h3>Messages:</h3><p>';
    actionString+='Preloading images for PDF generation...'+'</p>';
    rep("splashglobe", actionString);
    rep("actionHeading", "Home");
    window.setTimeout('getPrePages()', 100);
    }
  }
  
function resumePdfReportItemId(itemId){
  console.log('resumePdfReportItemId');
  pdfPage=-1;
  var pdfGrid=6.37;
  var pdfAcross=30;
  var pdfDown=42;
  var dateCompleted ="";
  var stateObj={};
  for (var i=0; i<items.length; i++){
    var item=items[i];
    if(item.id==itemId){
      stateObj=JSON.parse(item.stateObj)
      //console.log(item);
      reportStateObj(stateObj, user);
      var yyyymmdd=item.updatedYYYYMMDD
      dateCompleted=yyyymmddToDate(yyyymmdd);
      }
    }
  var doc = new jsPDF("p", "mm", [pdfGrid*pdfAcross, pdfGrid*pdfDown]);
  if(formatting){
    doc.setFillColor(230,230,230);
    doc.rect(pdfGrid*1, pdfGrid*1, pdfGrid*(pdfAcross-2), pdfGrid*(pdfDown-2), 'F'); // filled grey square
    doc.setFillColor(255,255,255);
    doc.rect(pdfGrid*2, pdfGrid*2, pdfGrid*(pdfAcross-4), pdfGrid*(pdfDown-4), 'F'); // filled white square
    }



  // stick in a cover page html too...
  var paraFontSize=.5*pdfGrid*pointsInMm;
  var paraLineHeight=pdfGrid*.75;

  imageToDoc(doc, "cpaglobe.jpg", pdfGrid*7, pdfGrid*5.5, pdfGrid*18, pdfGrid*18*534/521);
  var atY=pdfGrid*(9+18*534/521);
  doc.setFontSize(pdfGrid*2.5);
  atY+=centeredPara(doc, "for", pdfGrid*7, atY, pdfGrid*18, pdfGrid*1.5, "normal");
  doc.setFontSize(pdfGrid*3.5);
  atY+=centeredPara(doc, user.firstName+" "+user.lastName, pdfGrid*7, atY, pdfGrid*18, pdfGrid*2.5, "normal");
  atY+=pdfGrid*0;
  doc.setFontSize(pdfGrid*2.5);
  atY+=centeredPara(doc, dateCompleted, pdfGrid*7, atY, pdfGrid*18, pdfGrid, "normal");
  atY=pdfGrid*34.75;
  //doc, text, x, y, width, lineHeight, fontType
  if(user.consultantUserId != "0"){
    doc.setFontSize(pdfGrid*1.5);
    var consultant=usersById[user.consultantUserId];
    atY+=centeredPara(doc, "Prepared By", pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.firstName+" "+consultant.lastName, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.company, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.phone, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.website, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    }
  doc.setFontSize(paraFontSize);

  var footLineHeight=pdfGrid*.5;
  var footFontSize=.4*pdfGrid*pointsInMm;
  textLine(doc, "© 2003-2015 Core Passion", pdfGrid*3, pdfGrid*(pdfDown-1.9), pdfGrid*5.5, footLineHeight*2, 14*footLineHeight+"px  OpenSansSemiBold", "center");
  textLine(doc, "www.corepassion.com", pdfGrid*(pdfAcross-7.5), pdfGrid*(pdfDown-1.9), pdfGrid*6, footLineHeight*2, 14*footLineHeight+"px OpenSansSemiBold", "center");

  //normalPara(doc, "© 2003-2015 Core Passion", pdfGrid*3.25, pdfGrid*39.2, pdfGrid*6, paraLineHeight, "normal");
  //normalPara(doc, "www.corepassion.com", pdfGrid*23, pdfGrid*39.2, pdfGrid*6, paraLineHeight, "normal");

  for(var p=0; p<prePages.length; p++){
    pdfPage++;
    doc.addPage();
    var postObj=parsePost(prePages[p]);
    addPostToDoc(doc, postObj);
    }

  pdfPage++;
  doc.addPage();
  var destCanv=document.getElementById('previewCanvas');
  var destAspect=(300*5.5)/(300*7);
  if(isIe){
    var data = destCanv.toDataURL();
    console.log(data);
    }
  else{
    var data = destCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
    }

  // Convert the data to binary form
  var imgData = atob(data);
  var h1LineHeight=2.25*pdfGrid;
  var h2LineHeight=1.5*pdfGrid;
  var h3LineHeight=.75*pdfGrid;
  console.log('addImage imgData='+imgData.length);
  doc.addImage(imgData, 'JPEG', 4.2*pdfGrid, 10*pdfGrid, 28*pdfGrid*destAspect, 28*pdfGrid);
  textLine(doc, "Core Passion® Profile", pdfGrid*2, pdfGrid*4.5, pdfGrid*(pdfAcross-4), h1LineHeight, (16*h1LineHeight)+"px alegreyaSc", "center");
  textLine(doc, user.firstName+" "+user.lastName, pdfGrid*2, pdfGrid*8, pdfGrid*(pdfAcross-4), h2LineHeight*2, (16*h2LineHeight)+"px OpenSansSemiBold", "center");
  textLine(doc, dateCompleted, pdfGrid*2, pdfGrid*9, pdfGrid*(pdfAcross-4), h3LineHeight*2, (16*h3LineHeight)+"px OpenSansSemiBold", "center");

  pageFooter(doc, false);
  for(var p=0; p<postPages.length; p++){


    pdfPage++;
    var postObj=parsePost(postPages[p]);
    if((pdfPage==17)||(pdfPage==18)){
      doc.addPage([25.4*30/4, 25.4*42/4], 'landscape');
      landscapePostToDoc(doc, postObj);
      }
    else{
      doc.addPage([25.4*30/4, 25.4*42/4], 'portrait');
      addPostToDoc(doc, postObj);
      //addPostToDoc(doc, postObj);
      }

    if((user.id==69)&&(p>myPageLimit)){
      p=postPages.length;
      }

    }
  pdfToMethod(doc, user.lastName+"-"+user.firstName+'_report');
  document.getElementById('spinner').style.display="none";
  }
var formatting=false;
var pointsInMm= 2.834645669;

function imageToDoc(doc, id, gx, gy, gw, gh){
  //console.log('imageToDoc(doc, '+id+', '+gx+', '+gy+', '+gw+', '+gh+')');
  var ref=document.getElementById(id);
  //console.log('ref.width='+ref.width+' ref.height='+ref.height);
  var scaledWidth=Math.floor(imageDensity*ref.width);
  var scaledHeight=Math.floor(imageDensity*ref.height);

  var tempCanv=document.createElement('canvas');
  tempCanv.width=scaledWidth;
  tempCanv.height=scaledHeight;
  
  var tempCtx=tempCanv.getContext('2d');
  tempCtx.fillStyle="white";
  tempCtx.fillRect(0,0,scaledWidth,scaledHeight);


  tempCtx.drawImage(ref,0,0,scaledWidth, scaledHeight);
  var data = tempCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);

  // Convert the data to binary form
  var imgData = atob(data);
  doc.addImage(imgData, 'JPEG',gx,gy,gw,gh);
  } 
var pdfPage=0;
function landscapePostToDoc(doc, postObj){
  var pdfGrid=6.37;
  var pdfAcross=42;
  var pdfDown=30;
  var blockquoteLineHeight=pdfGrid*.9;
  var colLineHeight=pdfGrid*.65;
  var paraLineHeight=pdfGrid*.525;
  var paraFontSize=.475*pdfGrid*pointsInMm;
  var h1LineHeight=2.25*pdfGrid;
  var h2LineHeight=.7*pdfGrid;
  var h3LineHeight=.75*pdfGrid;
  var h6LineHeight=1.25*pdfGrid;

  doc.setFontSize(pdfGrid*1.5);

  
  // dev grids
  if(formatting){
    doc.setLineWidth(pdfGrid/32);
    for(var x=1; x<=pdfAcross; x+=2){
      doc.setFillColor(200,200,200);
      doc.rect(pdfGrid*x, 0, pdfGrid, pdfGrid, 'F'); // filled white square
      doc.setDrawColor(0);
      doc.text(pdfGrid*x-pdfGrid/2, pdfGrid*1, "x"+x); 
      doc.setDrawColor(200,200,200);
      doc.line(pdfGrid*x, 0, pdfGrid*x, pdfGrid*pdfDown);
      doc.line(pdfGrid*(x+1), 0, pdfGrid*(x+1), pdfGrid*pdfDown);
      }
    for(var y=1; y<=pdfDown; y+=2){
      doc.setFillColor(200,200,200);
      doc.rect(pdfGrid*0, pdfGrid*y, pdfGrid, pdfGrid, 'F'); // filled white square
      doc.setDrawColor(0);
      doc.text(pdfGrid*.25, pdfGrid*y+pdfGrid/3, "y"+y); 
      doc.setDrawColor(200,200,200);
      doc.line(0, pdfGrid*y, pdfGrid*pdfAcross, pdfGrid*y);
      doc.line(0, pdfGrid*(y+1), pdfGrid*pdfAcross, pdfGrid*(y+1));
      }
    }

  var atY=pdfGrid*0;
  for(var h=0; h<postObj.heading.length; h++){
    var item=postObj.heading[h];
    if(item.type=="h1"){
      atY+= h1LineHeight;
      headingBottomY=atY;
      textLine(doc, item.content, pdfGrid*2,atY, pdfGrid*(pdfAcross-4), h1LineHeight/1.75, (18*h1LineHeight/2)+"px alegreyaSc", "center");
      }
    }


  var widths=[1.5,7,5.5,10,8.5,8];
  var heights=[3,1,3.5,3.5,3.5,3.5,3.5,3.5];
  var x=widths[0];
  var y=heights[0];
  var cols=[];
  var rows=[];

  var w=0;
  var h=0;
  for (var c=1; c<widths.length; c++){
    var col=x;
    cols.push(col);
    w+=widths[c];
    x+=widths[c];
    }
  for (var r=1; r<heights.length; r++){
    var row=y;
    rows.push(row);
    h+=heights[r];
    y+=heights[r];
    }
  for(var c=0; c<cols.length; c++){
    doc.setDrawColor(0);
    doc.line(cols[c]*pdfGrid, heights[0]*pdfGrid, cols[c]*pdfGrid, (heights[0]+h)*pdfGrid);
    //console.log(cols[c]*pdfGrid+", "+heights[0]*pdfGrid+", "+cols[c]*pdfGrid+", "+(heights[0]+h)*pdfGrid);
    }
  doc.line((widths[0]+w)*pdfGrid, heights[0]*pdfGrid, (widths[0]+w)*pdfGrid, (heights[0]+h)*pdfGrid);
  for(var r=0; r<rows.length; r++){
    doc.setDrawColor(0);
    doc.line(widths[0]*pdfGrid, rows[r]*pdfGrid, (widths[0]+w)*pdfGrid, rows[r]*pdfGrid);
    }
  doc.line(widths[0]*pdfGrid, (heights[0]+h)*pdfGrid, (widths[0]+w)*pdfGrid, (heights[0]+h)*pdfGrid);

  for(var h=0; h<postObj.heading.length; h++){
    if(item.type=="table"){
      var content=item.content;
      var contents=[];
      var rowParts=content.split("<tr>");
      junk=rowParts.shift();
      for (var r=0; r<rowParts.length; r++){//clean close tr
        var row=rowParts[r];
        var temp=row.split("</tr>");
        rowParts[r]=temp[0];
        }      
      for (var r=0; r<rowParts.length; r++){
        //console.log(rowParts[r]);
        var defArray=[];
        var defParts=rowParts[r].split("<td>");
        junk=defParts.shift();
        defs=defParts.length;
        for (var d=0; d<defParts.length; d++){
          var temp=defParts[d].split("</td>"); 
          var def=temp[0];
          defArray.push(def);          
          }
        contents.push(defArray);
        }
      //console.log(contents);
      for (var r=0; r<contents.length; r++){
        var cells=contents[r];
        var lineHeight=pdfGrid*.66;
        for (var c=0; c<cells.length; c++){
          cellPara(doc, cells[c], pdfGrid*(cols[c]+.5), pdfGrid*rows[r]+lineHeight, pdfGrid*(widths[c+1]-1), lineHeight);
          }
        }
      }
    }// end of table parse

  pageFooter(doc, true);
  }
function addPostToDoc(doc, postObj){
  var pdfGrid=6.37;
  var pdfAcross=30;
  var pdfDown=42;
  var blockquoteLineHeight=pdfGrid*.9;
  var colLineHeight=pdfGrid*.62;
  var paraLineHeight=pdfGrid*.55;
  var paraFontSize=.5*pdfGrid*pointsInMm;
  var h1LineHeight=2.25*pdfGrid;
  var h2LineHeight=.7*pdfGrid;
  var h3LineHeight=.75*pdfGrid;
  var h6LineHeight=1.25*pdfGrid;

  // dev grids
  if(formatting){
    doc.setLineWidth(pdfGrid/32);
    for(var x=1; x<=pdfAcross; x+=2){
      doc.setFillColor(200,200,200);
      doc.rect(pdfGrid*x, 0, pdfGrid, pdfGrid, 'F'); // filled white square
      doc.setDrawColor(0);
      doc.text(pdfGrid*x-pdfGrid/2, pdfGrid*1, "x"+x); 
      doc.setDrawColor(125,125,125);
      doc.line(pdfGrid*x, 0, pdfGrid*x, pdfGrid*pdfDown);
      doc.line(pdfGrid*(x+1), 0, pdfGrid*(x+1), pdfGrid*pdfDown);
      }
    for(var y=1; y<=pdfDown; y+=2){
      doc.setFillColor(200,200,200);
      doc.rect(pdfGrid*0, pdfGrid*y, pdfGrid, pdfGrid, 'F'); // filled white square
      doc.setDrawColor(0);
      doc.text(pdfGrid*.25, pdfGrid*y+pdfGrid/3, "y"+y); 
      doc.setDrawColor(125,125,125);
      doc.line(0, pdfGrid*y, pdfGrid*pdfAcross, pdfGrid*y);
      doc.line(0, pdfGrid*(y+1), pdfGrid*pdfAcross, pdfGrid*(y+1));
      }
    }

  var atY=pdfGrid*2;
  var sidebarY=pdfGrid*2;
  var headingBottomY=atY;
  var col=0;
  for(var h=0; h<postObj.heading.length; h++){
    var item=postObj.heading[h];
    if(item.type=="h1"){
      atY+= h1LineHeight;
      headingBottomY=atY;
      textLine(doc, item.content, pdfGrid*2,atY, pdfGrid*(pdfAcross-4), h1LineHeight, (18*h1LineHeight)+"px alegreyaSc", "center");
      }
    if(item.type=="h2"){
      atY+= h2LineHeight;
      textLine(doc, item.content, pdfGrid*2,atY, pdfGrid*(pdfAcross-4), h2LineHeight, "italic "+(18*h2LineHeight)+"px "+paraFace, "center");
      atY+=pdfGrid;
      headingBottomY=atY;
      }
    if(item.type=="h3"){
      atY+= h3LineHeight;
      headingBottomY=atY;
      textLine(doc, item.content, pdfGrid*2, atY, pdfGrid*(pdfAcross-4), h3LineHeight, (18*h3LineHeight)+"px alegreyaSc", "left");
      }
    if(item.type=="h6"){
      atY+= h6LineHeight;
      textLine(doc, item.content, pdfGrid*2,atY, pdfGrid*(pdfAcross-4), h1LineHeight, (14.5*h6LineHeight)+"px alegreyaSc", "center");
      headingBottomY=atY;
      }

    if(item.type=="p"){
      if((item.content.indexOf(".jpg")>-1)||(item.content.indexOf(".png")>-1)){
        var srcParts=item.content.split('src="');
        var quoteParts=srcParts[1].split('"');
        var slashParts=quoteParts[0].split("/");
        var imageId=slashParts.pop();

        imageToDoc(doc, imageId, pdfGrid*3, atY, pdfGrid*25, pdfGrid*25*6000/4134);// inv of codex aspect
        //imageToDoc(doc, MatrixPrint600dpi.jpg, 19.11, 12.74, 159.25, 222.95)
        }
      else{//non image p

        if(item.content=="columnbreak"){
          atY=headingBottomY;
          col++;
          }
        else{
          var content=item.content;
          if((content.indexOf("1.")==0)||(content.indexOf("2.")==0)||(content.indexOf("3.")==0)){// ordered list
            var parts=content.split(".");
            var num=parts.shift();
            var bLine=parts.shift();
            var remains=parts.join(".");
            atY+= colLineHeight;
            normalPara(doc, num, pdfGrid*(2+col*13), atY, pdfGrid*2, colLineHeight, "bold");
            var px=normalPara(doc, bLine, pdfGrid*(2+col*13+2), atY, pdfGrid*10, colLineHeight, "bold");
            atY+=px;
            px=normalPara(doc, remains, pdfGrid*(2+col*13+2), atY, pdfGrid*10, colLineHeight, "normal");
            atY+=px;
            }
          else{// normal paragraph
            doc.setFontSize(paraFontSize);
            atY+= colLineHeight;
            var px=normalPara(doc, item.content, pdfGrid*(2+col*13), atY, pdfGrid*12, colLineHeight, "normal");
            atY+=px;
            }
          }
        }
      }
    if(item.type=="h5"){
      doc.setFontSize(paraFontSize);
      atY+= colLineHeight;
      var px=centeredPara(doc, item.content, pdfGrid*(2+col*13), atY, pdfGrid*12, colLineHeight, "italic");
      atY+=(px-colLineHeight);
      }
    if(item.type=="h4"){
      doc.setFontSize(paraFontSize);
      doc.setFontType("bold");
      atY+= colLineHeight*.5;
      var px=normalPara(doc, item.content, pdfGrid*(2+col*13), atY, pdfGrid*12, colLineHeight, "bold");
      atY+=px;
      atY-= colLineHeight*.5;
      }
    if(item.type=="table"){
      atY+=pdfGrid*2;
      var content=item.content;
      var rows=[];
      var rowParts=content.split("<tr>");
      junk=rowParts.shift();
      for (var r=0; r<rowParts.length; r++){//clean close tr
        var row=rowParts[r];
        var temp=row.split("</tr>");
        rowParts[r]=temp[0];
        }      
      for (var r=0; r<rowParts.length; r++){
        //console.log(rowParts[r]);
        var defArray=[];
        var defParts=rowParts[r].split("<td>");
        junk=defParts.shift();
        defs=defParts.length;
        for (var d=0; d<defParts.length; d++){
          var temp=defParts[d].split("</td>"); 
          var def=temp[0];
          defArray.push(def);          
          }
        rows.push(defArray);
        }
      //console.log(rows);
      var rowHeight=pdfGrid*1.5;
      for (var r=0; r<rows.length; r++){
        atY+=rowHeight;
        dottedLine(doc, rows[r][0], rows[r][1], pdfGrid*4, atY, pdfGrid*(pdfAcross-7), rowHeight, (.7*18*h3LineHeight)+"px OpenSansSemiBold");
        
        }
      }
    }// end of table parse
  pageFooter(doc, false);

  // sidebar line 
  atY-=pdfGrid;
  sidebarY=atY;

  if(postObj.blockquote.length>0){
    doc.setLineWidth(pdfGrid/8);
    doc.line(pdfGrid*12, pdfGrid*7, pdfGrid*12, pdfGrid*37);
    }
  for(var b=0; b<postObj.blockquote.length; b++){
    var item=postObj.blockquote[b];
    if(item.type=="h3"){
      atY+= h3LineHeight;
      textLine(doc, item.content, pdfGrid*2, atY, pdfGrid*9, h3LineHeight, (18*h3LineHeight)+"px alegreyaSc", "left");
      }
    if(item.type=="p"){
      if((item.content.indexOf(".jpg")>-1)||(item.content.indexOf(".png")>-1)){
        var srcParts=item.content.split('src="');
        var quoteParts=srcParts[1].split('"');
        var slashParts=quoteParts[0].split("/");
        var imageId=slashParts.pop();

        imageToDoc(doc, imageId, pdfGrid*2, atY, pdfGrid*9, pdfGrid*9);
        atY+=pdfGrid*9;
        }
      else{
        atY+= paraLineHeight;
        doc.setFontSize(paraFontSize);
        var px=normalPara(doc, item.content, pdfGrid*2, atY, pdfGrid*9, blockquoteLineHeight, "italic");
        atY+=px;
        }
      }
    }
  atY=sidebarY+pdfGrid*2;
  for(var b=0; b<postObj.body.length; b++){
    var item=postObj.body[b];
    if(item.type=="h3"){
      atY+= h3LineHeight;
      textLine(doc, item.content, pdfGrid*13, atY, pdfGrid*15, h3LineHeight, (18*h3LineHeight)+"px alegreyaSc", "left");      }
    if(item.type=="p"){
      atY+= paraLineHeight;
      doc.setFontSize(paraFontSize);
      var px=normalPara(doc, item.content, pdfGrid*13, atY, pdfGrid*15.5, paraLineHeight, "normal");
      atY+=px;
      }
    }
  }
function pageFooter(doc, landscape){
  var pdfGrid=6.37;
  var pdfAcross=30;
  var pdfDown=42;
  if(landscape){
    pdfAcross=42;
    pdfDown=30;
    }
  var paraLineHeight=pdfGrid*.5;
  var paraFontSize=.4*pdfGrid*pointsInMm;

  doc.setFontSize(paraFontSize);
  textLine(doc, "© 2003-2015 Core Passion", pdfGrid*3, pdfGrid*(pdfDown-1.9), pdfGrid*5.5, paraLineHeight*2, 14*paraLineHeight+"px  OpenSansSemiBold", "center");
  //normalPara(doc, "© 2003-2015 Core Passion", pdfGrid*3.25, pdfGrid*(pdfDown-2.2), pdfGrid*6, paraLineHeight, "normal");

  //normalPara(doc, "www.corepassion.com", pdfGrid*3.75, pdfGrid*(pdfDown-2.2), pdfGrid*6, paraLineHeight, "normal");
  if(pdfPage>0){
    textLine(doc, "page "+pdfPage, pdfGrid*(pdfAcross/2-2), pdfGrid*(pdfDown-1.9), pdfGrid*4, paraLineHeight*2, 14*paraLineHeight+"px OpenSansSemiBold", "center");
    //normalPara(doc, "page "+pdfPage, pdfGrid*(pdfAcross/2-1), pdfGrid*(pdfDown-2.2), (pdfAcross-4), paraLineHeight, "normal");
    }
  //imageToDoc(doc, "cpaglobe.jpg", pdfGrid*(pdfAcross-7), pdfGrid*(pdfDown-6), pdfGrid*4, pdfGrid*4*534/521);
  
  textLine(doc, "Core Passion® Assessment", pdfGrid*(pdfAcross-7.5), pdfGrid*(pdfDown-1.9), pdfGrid*6, paraLineHeight*2, 14*paraLineHeight+"px OpenSansSemiBold", "center");
  //normalPara(doc, "Core Passion® Assessment", pdfGrid*(pdfAcross-7), pdfGrid*(pdfDown-2.2), pdfGrid*6, paraLineHeight, "normal");
  }

function parsePost(postString){
  var postObj={"heading":[], "blockquote":[], "body":[]};
  var parts=postString.split('<blockquote>');
  if(parts.length==1){
    postObj.heading=parsePart(parts[0]);
    }
  else{
    var remains=parts[1];
    var remainsParts=remains.split('</blockquote>');
    var headingString=parts[0];
    var blockquoteString=remainsParts[0];
    var bodyString=remainsParts[1];
    postObj.heading=parsePart(headingString);
    postObj.blockquote=parsePart(blockquoteString);
    postObj.body=parsePart(bodyString);
    }
  return postObj; 
  }
var measurePara = function(doc, text, width, lineHeight, isItal){
  var usedPx=0;
  doc.setFont(paraFace);
  if(isItal){doc.setFontType("italic");}
  else{doc.setFontType("normal");}
  var lines = doc.splitTextToSize(text, width);
  for (var l=0; l<lines.length; l++){
    usedPx+=lineHeight;
    }
  return usedPx;
  }
var cellPara = function(doc, text, x, y, width, lineHeight){
  var usedPx=0;
  doc.setFont(paraFace);
  var hyphs=text.split(' -');
  var l=0;
  for (var h=1; h<hyphs.length; h++){
    hyphs[h]="-"+hyphs[h]; 
    }
  for (var h=0; h<hyphs.length; h++){
    hyph=hyphs[h]; 
    var tempLines = doc.splitTextToSize(hyph, width);
    for(var t=0; t<tempLines.length; t++){
      var line=tempLines[t];
      if(line.indexOf("[b]")>-1){
        line=line.replace("[b]", "");
        line=line.replace("[/b]", "");
        doc.setFontType("bold");
        }
      else{
        doc.setFontType("normal");
        }
      doc.text(x, y+l*lineHeight, line);
      l++;
      usedPx+=lineHeight;
      }
    }
  return usedPx;
  }
var normalPara = function(doc, text, x, y, width, lineHeight, fontType){
  var usedPx=0;
  doc.setFont(paraFace);
  doc.setFontType(fontType);
  var lines = doc.splitTextToSize(text, width);
  for (var l=0; l<lines.length; l++){

    doc.text(x, y+l*lineHeight, lines[l]);
    usedPx+=lineHeight;
    }
  return usedPx;
  }
var centeredPara = function(doc, text, x, y, width, lineHeight, fontType){
  var usedPx=0;
  doc.setFont(paraFace);
  doc.setFontType(fontType);
  var lines = doc.splitTextToSize(text, width);
  for (var l=0; l<lines.length; l++){

    var textWidth = doc.getStringUnitWidth(lines[l]) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (width - textWidth) / 2;
    doc.text(x+textOffset, y+l*lineHeight, lines[l]);
    usedPx+=lineHeight;
    }
  return usedPx;
}
function textLine(doc, text, x, y, width, height, font, align) {
  var tempCanv=document.createElement('canvas');
  tempCanv.width=width*18;
  tempCanv.height=height*18;
  var tempCtx=tempCanv.getContext('2d');
  tempCtx.lineWidth=6;
  tempCtx.fillStyle="white";
  tempCtx.fillRect(0,0,width*18,height*18);
  if(formatting){
    tempCtx.strokeStyle="rgb(180,180,180)";
    tempCtx.strokeRect(0,0,width*18,height*18);
    }
  tempCtx.fillStyle="black";
  tempCtx.textAlign=align;
  tempCtx.textBaseline="bottom";

  
  tempCtx.fillStyle="black";
  tempCtx.font = font;
  var xPx=18*width/2; //centered
  if(align=="left"){xPx=0;}
  tempCtx.fillText(text, xPx, height*18);

  var data = tempCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  var imgData = atob(data);
  doc.addImage(imgData, 'JPEG',x,y-height,width,height);
  }

//dottedLine(doc, rows[r][0], rows[r][1], pdfGrid*2, atY, pdfGrid*(pdfAcross-4), rowHeight, (18*h3LineHeight)+"px alegreyaSc");
var dottedLine = function(doc, text0, text1, x, y, width, height, font) {
  var tempCanv=document.createElement('canvas');
  tempCanv.width=width*18;
  tempCanv.height=height*18;
  pxWidth=width*18;
  pxHeight=height*18;
  var tempCtx=tempCanv.getContext('2d');
  tempCtx.lineWidth=6;
  tempCtx.fillStyle="white";
  tempCtx.fillRect(0,0,width*18,height*18);
/*
  tempCtx.strokeStyle="rgb(180,180,180)";
  tempCtx.strokeRect(0,0,width*18,height*18);
*/
  tempCtx.fillStyle="black";
  tempCtx.textBaseline="bottom";

  
  tempCtx.fillStyle="black";
  tempCtx.font = font;
  tempCtx.textAlign="left";
  tempCtx.fillText(text0, 0, pxHeight);
  tempCtx.textAlign="right";
  tempCtx.fillText(text1, pxWidth, pxHeight);
  var beginPx=tempCtx.measureText(text0).width;
  var endPx=pxWidth-tempCtx.measureText(text1).width;
  tempCtx.fillStyle="#666";
  for (var dx=width*18; dx>0; dx-=pxHeight/3){
    if((dx>beginPx)&&(dx<endPx)){
      tempCtx.beginPath();
      tempCtx.arc(dx,pxHeight*.85,pxHeight*.03,0, Math.PI*2, true);
      tempCtx.fill();
      }
    }
  var data = tempCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  var imgData = atob(data);
  doc.addImage(imgData, 'JPEG',x,y-height,width,height);

}

function parsePart(partString){ 
  //console.log("found "+partString.indexOf("<br />"));
  partString=partString.replace(/<br \/>/g, "</p><p>");
  partString=partString.replace(/<b>/g, "[b]");
  partString=partString.replace(/<\/b>/g, "[\/b]");
  partString=partString.replace(/&#038;/g, "&");
  partString=partString.replace(/&amp;/g, "&");



  //{"type":"h1", "content":"Partnership"}
  var tags=[];
  var l=0;
  while(partString.indexOf("<") > -1){
    l++;
    var openParts=partString.split("<");
    var junk=openParts.shift();        //  ['h1>kjhasdgf', '/h1>...']
    var glom=openParts.join("<");      //  'h1>kjhasdgf</h1>...'
    var tagParts=glom.split(">");
    var tagType=tagParts.shift();      //  kjhasdgf</h1|...
    glom=tagParts.join(">");           //  kjhasdgf</h1>...
    if((tagType == "h1")||(tagType == "h2")||(tagType == "h3")||(tagType == "h4")||(tagType == "h5")||(tagType == "h6")||(tagType == "p")||(tagType == "table")){

      var contentParts=glom.split("</"+tagType+">");
      var content=contentParts.shift(); 
      partString=contentParts.join("</"+tagType+">");
      
      var thisTag={"type":tagType, "content":content};
      tags.push(thisTag);
      }
    else{
      partString=glom;
      //console.log("reject "+tagType);
      }
    if(l>100){
      //console.log('overflow');
      return false;
      }
    }
  return tags;
  }

function pdfReportUserId(userId){
  if(pdfImagesPreloaded){
    document.getElementById('spinner').style.display="block";
    window.setTimeout("resumePdfReportUserId("+userId+")", 100);
    }
  else{
    deferredReport="pdfReportUserId";
    deferredId=userId;
    getPrePages();
    }
  }
var paraFace="helvetica";


function resumePdfReportUserId(userId){
  console.log('resumePdfReportUserId');
  var destCanv=document.getElementById('previewCanvas');
  //var destAspect=destCanv.width/destCanv.height;
  var destAspect=(300*5.5)/(300*9.5);
  
  var userObj=usersById[userId];
  var stateObj=JSON.parse(userObj.stateObj)
  reportStateObj(stateObj, userObj);


  pdfPage=-1;
  var pdfGrid=6.37;
  var pdfAcross=30;
  var pdfDown=42;
  var yyyymmdd=stateObj.updatedYYYYMMDD
  dateCompleted=yyyymmddToDate(yyyymmdd);
  
  var doc = new jsPDF("p", "mm", [pdfGrid*pdfAcross, pdfGrid*pdfDown]);

  if(formatting){
    doc.setFillColor(230,230,230);
    doc.rect(pdfGrid*1, pdfGrid*1, pdfGrid*(pdfAcross-2), pdfGrid*(pdfDown-2), 'F'); // filled grey square
    doc.setFillColor(255,255,255);
    doc.rect(pdfGrid*2, pdfGrid*2, pdfGrid*(pdfAcross-4), pdfGrid*(pdfDown-4), 'F'); // filled white square
    }



  // stick in a cover page html too...
  var paraFontSize=.5*pdfGrid*pointsInMm;
  var paraLineHeight=pdfGrid*.75;

  imageToDoc(doc, "cpaglobe.jpg", pdfGrid*7, pdfGrid*5.5, pdfGrid*18, pdfGrid*18*534/521);
  var atY=pdfGrid*(9+18*534/521);
  doc.setFontSize(pdfGrid*2.5);
  atY+=centeredPara(doc, "for", pdfGrid*7, atY, pdfGrid*18, pdfGrid*1.5, "normal");
  doc.setFontSize(pdfGrid*3.5);
  atY+=centeredPara(doc, userObj.firstName+" "+userObj.lastName, pdfGrid*7, atY, pdfGrid*18, pdfGrid*2.5, "normal");
  atY+=pdfGrid*0;
  doc.setFontSize(pdfGrid*2.5);
  atY+=centeredPara(doc, dateCompleted, pdfGrid*7, atY, pdfGrid*18, pdfGrid, "normal");
  atY=pdfGrid*34.75;
  //doc, text, x, y, width, lineHeight, fontType
  if(userObj.consultantUserId != "0"){
    doc.setFontSize(pdfGrid*1.5);
    var consultant=usersById[userObj.consultantUserId];
    atY+=centeredPara(doc, "Prepared By", pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.firstName+" "+consultant.lastName, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.company, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.phone, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    atY+=centeredPara(doc, consultant.website, pdfGrid*7, atY, pdfGrid*18,  paraLineHeight, "normal");
    }
  doc.setFontSize(paraFontSize);

  var footLineHeight=pdfGrid*.5;
  var footFontSize=.4*pdfGrid*pointsInMm;
  textLine(doc, "© 2003-2015 Core Passion", pdfGrid*3, pdfGrid*(pdfDown-1.9), pdfGrid*5.5, footLineHeight*2, 14*footLineHeight+"px  OpenSansSemiBold", "center");
  textLine(doc, "www.corepassion.com", pdfGrid*(pdfAcross-7.5), pdfGrid*(pdfDown-1.9), pdfGrid*6, footLineHeight*2, 14*footLineHeight+"px OpenSansSemiBold", "center");

  //normalPara(doc, "© 2003-2015 Core Passion", pdfGrid*3.25, pdfGrid*39.2, pdfGrid*6, paraLineHeight, "normal");
  //normalPara(doc, "www.corepassion.com", pdfGrid*23, pdfGrid*39.2, pdfGrid*6, paraLineHeight, "normal");


  for(var p=0; p<prePages.length; p++){
    pdfPage++;
    doc.addPage();
    var postObj=parsePost(prePages[p]);
    addPostToDoc(doc, postObj);
    }


  pdfPage++;
  doc.addPage();
  var destCanv=document.getElementById('previewCanvas');
  var destAspect=(300*5.5)/(300*7);
  var data = destCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  var imgData = atob(data);
  var h1LineHeight=2.25*pdfGrid;
  var h2LineHeight=1.5*pdfGrid;
  var h3LineHeight=.75*pdfGrid;

  doc.addImage(imgData, 'JPEG', 4.2*pdfGrid, 10*pdfGrid, 28*pdfGrid*destAspect, 28*pdfGrid);
  textLine(doc, "Core Passion® Profile", pdfGrid*2, pdfGrid*4.5, pdfGrid*(pdfAcross-4), h1LineHeight, (16*h1LineHeight)+"px alegreyaSc", "center");
  textLine(doc, userObj.firstName+" "+userObj.lastName, pdfGrid*2, pdfGrid*8, pdfGrid*(pdfAcross-4), h2LineHeight*2, (16*h2LineHeight)+"px OpenSansSemiBold", "center");
  textLine(doc, dateCompleted, pdfGrid*2, pdfGrid*9, pdfGrid*(pdfAcross-4), h3LineHeight*2, (16*h3LineHeight)+"px OpenSansSemiBold", "center");

  pageFooter(doc, false);
  for(var p=0; p<postPages.length; p++){
    
    pdfPage++;
    var postObj=parsePost(postPages[p]);
    if((pdfPage==17)||(pdfPage==18)){
      doc.addPage([25.4*30/4, 25.4*42/4], 'landscape');
      landscapePostToDoc(doc, postObj);
      }
    else{
      doc.addPage([25.4*30/4, 25.4*42/4], 'portrait');
      addPostToDoc(doc, postObj);
      //addPostToDoc(doc, postObj);
      }
    }


  pdfToMethod(doc, user.wpLogin+'_report');
  document.getElementById('spinner').style.display="none";
  }

function viewReportUserId(userId){
  var memberUser=usersById[userId];
  var stateObj=JSON.parse(memberUser.stateObj)
  reportStateObj(stateObj, memberUser);

  //refs, dimensions
  var destCanv=document.getElementById('previewCanvas');
  var destAspect=destCanv.width/destCanv.height;
  var t=0;
  var l=0;
  var h=0;
  var w=0;
  if(destAspect>appDivAspect){//wide, pad top
    w=appDivWidth;
    h=w/destAspect;
    t=(appDivHeight-h)/2;
    }
  else{
    h=appDivHeight;
    w=h*destAspect;
    l=(appDivWidth-w)/2;
    }
    
  destCanv.style.display="block";
  destCanv.style.position="absolute";
  destCanv.style.width=w+"px";
  destCanv.style.height=h+"px";
  destCanv.style.top=t+"px";
  destCanv.style.left=l+"px";
  destCanv.style.margin="0";
  destCanv.style.padding="0";
  }

function detailUserId(userId){
  var userObj=usersById[userId];
  var stateObj=JSON.parse(userObj.stateObj);
  var summary=stateObj.summary;
  
  // actual graph to draw canvas
  canvasGraph(summary,300*5.5);

  //refs, dimensions
  var sourceCanv=document.getElementById('drawCanvas');
  var destCanv=document.getElementById('previewCanvas');
  destCanv.height=300*9.5;
  destCanv.width=300*5.5;
  var destAspect=destCanv.width/destCanv.height;
  var destCtx = destCanv.getContext('2d');
  var grid=destCanv.height/18;

  // lime bg
  destCtx.fillStyle="rgba(255,255,255,1)";
  destCtx.fillRect(0,0,destCanv.width, destCanv.height);
 
  // copy graph
  destCtx.drawImage(sourceCanv, 0, destCanv.height-5.75*300);

  // user labels
  destCtx.fillStyle="red";
  destCtx.font= grid*.45+'px "openSansSemiBold"';
  destCtx.textAlign="center";
  destCtx.fillText('Core Passion® Profile', grid*2.5, grid*1.5);
  destCtx.font= grid*.33+'px "openSansSemiBold"';
  destCtx.fillText(userObj.firstName+" "+userObj.lastName, grid*2.5, grid*2.25);
  //console.log(stateObj.updatedDate);
  var dateStr=yyyymmddToDate(stateObj.updatedDate);
  if(stateObj.updatedDate.indexOf("/")>-1){
    dateStr=stateObj.updatedDate;
    }
  destCtx.fillText(dateStr, grid*2.5, grid*3.0);
  var theLabels=["Codes", "score", "gift", "challenge", "difference", "%diff"];
  var theFields=["caption", "score", "gift", "challenge", "diff", "percent"];
  var firstCol=6.2;
  var cols=[
  .7,
  .6,
  1.1,
  1.1,
  .7,
  1
  ];
  // detail labels
  destCtx.textAlign="right";
  destCtx.fillStyle="black";
  destCtx.font= grid*.2+'px "openSansSemiBold"';
  var atCol=firstCol;
  for (var c=0; c<cols.length; c++){
    destCtx.fillText(theLabels[c], grid*atCol,grid*.75);
    atCol+=cols[c];
    //destCtx.fillText(cols[c], grid*atCol,grid*.25);
    }

  for (var p=0; p<summary.length; p++){
    atCol=firstCol;
    var y=grid*(1.25+.5*p);
    summary[p].diff=Math.abs(summary[p].gift-summary[p].challenge);
    summary[p].percent=Math.floor(1000*summary[p].diff/summary[p].score)/10;
    
    for (var c=0; c<cols.length; c++){
      destCtx.fillText(summary[p][theFields[c]], grid*atCol,y);
      atCol+=cols[c];
      }
    }
  }
function viewDetailUserId(userId){
  detailUserId(userId);
  //refs, dimensions
  var destCanv=document.getElementById('previewCanvas');
  var destAspect=destCanv.width/destCanv.height;
  var t=0;
  var l=0;
  var h=0;
  var w=0;
  if(destAspect>appDivAspect){//wide, pad top
    w=appDivWidth;
    h=w/destAspect;
    t=(appDivHeight-h)/2;
    }
  else{
    h=appDivHeight;
    w=h*destAspect;
    l=(appDivWidth-w)/2;
    }
    
  destCanv.style.display="block";
  destCanv.style.position="absolute";
  destCanv.style.width=w+"px";
  destCanv.style.height=h+"px";
  destCanv.style.top=t+"px";
  destCanv.style.left=l+"px";
  destCanv.style.margin="0";
  destCanv.style.padding="0";
  }

function pdfReportDetailUserId(userId){
  if(pdfImagesPreloaded){
    document.getElementById('spinner').style.display="block";
    window.setTimeout("resumePdfDetailUserId("+userId+")", 100);
    }
  else{
    deferredReport="pdfReportDetailUserId";
    deferredId=userId;
    getPrePages();
    }
  }
function resumePdfDetailUserId(userId){
  console.log('pdfDetailUserId('+userId+')');

  detailUserId(userId);
  var doc = new jsPDF();
  var userObj=usersById[userId];
  var pdfGrid=8;
  var pdfAcross=26;
  var pdfDown=37;
  var destCanv=document.getElementById('previewCanvas');
  var destAspect=destCanv.width/destCanv.height;

  var data = destCanv.toDataURL('image/jpeg', jpgQuality).slice('data:image/jpeg;base64,'.length);
  // Convert the data to binary form
  var imgData = atob(data);

  doc.addImage(imgData, 'JPEG', 3*pdfGrid, 0, pdfDown*pdfGrid*destAspect, pdfDown*pdfGrid);
  pdfToMethod(doc, user.wpLogin+'_detail');
  }
var chunks=[];
var totalChunks=1;
var reportName="";
var reportFile="";
var myPageLimit=25;
var usePdfMethod="save";
function pdfToMethod(doc, reportName){
  var defaultMethod=pdfMethod[platform][browser];
  usePdfMethod=defaultMethod;
  if(user.pdfMethod != "default"){usePdfMethod=user.pdfMethod;}
  if(usePdfMethod=="server"){pdfToServer(doc, reportName);}
  if(usePdfMethod=="save"){pdfToSave(doc, reportName);}
  if(usePdfMethod=="open"){pdfToOpen(doc, reportName);}
  if(usePdfMethod=="div"){pdfToDiv(doc, reportName);}
  var tapImage="downloadpdf.png";
  if(usePdfMethod=="save"){tapImage="savepdf.png";}
  if(usePdfMethod=="open"){tapImage="openpdf.png";}

  document.getElementById("downloadpdfimg").src="webapp/nav/"+tapImage;
  }

function pdfToDiv(doc, reportName){
  var pdfData = doc.output('datauristring');
  document.getElementById('downloadpdf').style.display="block";
  var element = document.getElementById('pdfData');
  element.href = "/webapp/iospdf.html#" + pdfData;
  element.target = "reportName";
  }
function pdfToSave(doc, reportName){
  
  doc.save(reportName+'.pdf');
  }
function pdfToOpen(doc, reportName){
  doc.output('dataurlnewwindow');
  }
var chunkBytes=300000;
function pdfToServer(doc, calling){
  reportName=calling;
  reportFile="reports/" +reportName+"_"+btoa(reportName)+ ".pdf"
  console.log('pdfToServer '+calling+ '');
  var pdf=doc.output();
  chunks=[];
  while (pdf) {
    if (pdf.length < chunkBytes) {
      chunks.push(pdf);
      break;
      }
    else {
      chunks.push(pdf.substr(0, chunkBytes));
      pdf = pdf.substr(chunkBytes);
      }
    }
  console.log("chunks.length="+chunks.length);
  document.getElementById('uploadingpercent').innerHTML="0%";  
  document.getElementById('uploadingpdf').style.display="block";
  totalChunks=chunks.length;
  saveChunk();
  }
function saveChunk(){
  var chunkNum=totalChunks-chunks.length;
  console.log("saveChunk chunks.length="+chunks.length+" chunkNum="+chunkNum);
  var chunk=chunks.shift();
  var aChunk=btoa(chunk);
  console.log("aChunk.length="+aChunk.length);
  var data = new FormData();
  data.append("chunkNum", chunkNum);
  data.append("reportName", reportName);
  data.append("pdfData", aChunk);
    
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open( 'post', '/webapp/uploadpdf.php', true );
  xhr.send(data);
  }
function ajaxSuccess(){
  console.log('ajaxSuccess()');
  if(chunks.length>0){
    var prog=(totalChunks-chunks.length)/totalChunks;
    document.getElementById('uploadingpercent').innerHTML=Math.floor(prog*100)+"%";
    window.setTimeout("saveChunk()", 200);
    }
  else{
    console.log('pdfToServer completed '+reportFile);
    document.getElementById('downloadpdf').style.display="block";
    document.getElementById('uploadingpdf').style.display="none";
    var element = document.getElementById('pdfData');
    element.href = "javascript:openPdfFile(); ";
    element.target = "";
    }
  }
function openPdfFile(){
  console.log('openPdfFile()');
  document.getElementById('downloadpdf').style.display="none";
  console.log('openPdfFile() hid');
  if(isPc){
    window.setTimeout("resumeOpenPdfFile()",100);
    }
  else{
    resumeOpenPdfFile();
    }
  }
function resumeOpenPdfFile(){
  console.log('resumeOpenPdfFile() ');
  console.log("webapp/"+reportFile);
  window.open("webapp/"+reportFile);
  console.log('resumeOpenPdfFile() done');
  }
function hidePreview(){
  document.getElementById('previewCanvas').style.display="none";
  }
function debugQuestions(){
  for (p=0; p<questions.length; p++){
    //app("contextDiv", p+" "+questions[p].question_id+" <b> - <i>" +questions[p].dictionary+ "</i></b> "+questions[p].question_statement);
    }
  }

function compare(a,b) {
  if (a.sortKey < b.sortKey)
     return -1;
  if (a.sortKey > b.sortKey)
    return 1;
  return 0;
}

function prep(target, str) {
  var extantInner=document.getElementById(target).innerHTML
  document.getElementById(target).innerHTML = str+extantInner;
  if(target=="actionDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('action')", 100);
    }
  if(target=="contextDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('context')", 100);
    }
  }
function rep(target, str) {
  //if(str==''){
  //  document.getElementById(target).style.display = "none";
  //  }
  //else{document.getElementById(target).style.display = "block";}
  document.getElementById(target).innerHTML = str;
  if(target=="actionDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('action')", 100);
    }
  if(target=="contextDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('context')", 100);
    }
  }
function app(target, str) {
  //document.getElementById(target).style.display = "block";
  document.getElementById(target).innerHTML += ""+str;
  if(target=="actionDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('action')", 100);
    }
  if(target=="contextDiv"){
    document.getElementById(target).scrollTop = 1;
    window.setTimeout("divScrolled('context')", 100);
    }
  }
function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
    }
  return false;
  }
