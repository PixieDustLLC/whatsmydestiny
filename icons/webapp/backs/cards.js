
var headerHeight=48;
var headerPad=2;
var headerButton=headerHeight-headerPad*2;
var panelInverse=1.625
var panelAspect=1/panelInverse;
var g=320/64; // 5
var pt=1;

var slotScale;
var slotY;
var slotX;
var slotZ;
var dockZ;
var dragZ;
var flowZ;
var cardHeight=1;
var cardTop=1;
var cardWidth=1;
var cardLeft=1;

function geometry(){
  console.log('geometry()');
  pageHeight=window.innerHeight;
  pageWidth=window.innerWidth;

  cardHeight=pageHeight*.6;
  cardWidth=cardHeight*11/17;
  cardTop=pageHeight*.25;
  cardLeft=(pageWidth-cardWidth)/2;

  slotScale=.5*.75;
  slotY=cardHeight/1.41;
  slotX=cardWidth/2.25;
  dockZ=0-cardWidth/20;
  slotZ=0-cardWidth/25;
  flowZ=0;
  dragZ=0+cardWidth/25;
  layoutHeight=pageHeight-headerHeight;
  if(pageHeight>pageWidth){deviceOrientation="portrait";}
  else{deviceOrientation="landscape";}

  layout="single";
  if((currentPage=="toolbox")){layout="toolbox";}
  if(currentPage=="toolbox"){positionTiles(atTile);}
  if(articleUp==true){layout="article";}
  recalc();
  restyle();
  if((currentPage=="appcorepassioncareer")&&(currentReflection==0)&&(codexCreated)){styleCodex('g');}
}










<div class="btn-container  align-center"><a class="organic-btn  dark-red-btn small-btn  align-center" href="#"><span class="btn-holder">NEXT</span></a></div>


  console.log('restyle completed set restyleCards timeout 3 sec');
  window.setTimeout('restyleCards()', 100);

function restyleCards(){
  flowDiv.style.display="none";
  console.log('restyleCards()');
  var glossaryPt=14;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.cardSize{position:absolute; width:'+cardWidth/1+'px; height:'+cardHeight/1+'px;  background-size:contain;}';
  style.innerHTML += '.flowCard{-webkit-transform-style: preserve-3d; -webkit-perspective: 1000; -webkit-backface-visibility: visible; left:'+cardLeft+'px; top:'+cardTop+'px; border-radius:'+cardWidth/11+'px;}';

  style.innerHTML += '.flowCardBack{z-index:'+rnd(3)+'; Z-webkit-backface-visibility: hidden; -webkit-transform:rotateY(180deg) translateZ(5px); translateY(-45px);}';

  style.innerHTML += '.flowCardFront{z-index:'+rnd(3)+'; -webkit-backface-visibility: hidden;  translateZ(1px);}';

  style.innerHTML += '.flowCardNum{position:absolute; width:'+cardWidth+'px; top:'+cardHeight*.865+'px; text-align:center; font:'+cardHeight/14+'px OpenSans;}';

  style.innerHTML += '.flowStatus{position:absolute; left:'+cardLeft+'px; top:'+pageHeight*.025+'px; width:'+cardWidth+'px; color:white; text-align:center; font:'+cardHeight/18+'px OpenSans;}';
  style.innerHTML += '.flowDone{background-color:#ba1c1b;  border-radius:'+cardWidth/40+'px; position:absolute; left:'+cardLeft+'px; top:'+pageHeight*.875+'px; width:'+cardWidth+'px; color:white; text-align:center; font:'+cardHeight/16+'px OpenSans;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(flowUp){
    flowDiv.style.display="block";
    destinateFlow();
    posSlots();
    flowDocking=true;
    dockingProg=0;
  }
  
}



function destinateFlow(){
  if(atFlow>=unselectedCardIds.length){
    atFlow=unselectedCardIds.length-1
  }
  for(var u=0; u<unselectedCardIds.length; u++){
    var c=unselectedCardIds[u]; 
    var ref=document.getElementById('card_'+c);
    var pos=returnPos("flow",u-atFlow, flowZ, flowArray[c].side*180);
    
    flowArray[c].startPos=flowArray[c].pos;
    flowArray[c].destPos=pos;
    flowArray[c].type="flow";
    flowArray[c].ord=u-atFlow;
  }
  for(var s=0; s<selectedCardIds.length; s++){
    var c=selectedCardIds[s]; 
    var pos=returnPos("slot",s-1, slotZ, 0);
    flowArray[c].destPos=pos;
    flowArray[c].type="slot";
    flowArray[c].ord=s-1;
  }
  var flowStatusDiv=document.getElementById('flowStatusDiv');
  if(selectedCardIds.length==0){flowStatusDiv.style.display="block";}
  else{flowStatusDiv.style.display="none";}
  //dbug(JSON.stringify(flowArray[0]));
  //dbuga(posToTransform(flowArray[0].destPos));
}
function selectCardId(id){
  var tempArray=[];
  for(var u=0; u<unselectedCardIds.length; u++){
    if(unselectedCardIds[u] != id){tempArray.push(unselectedCardIds[u]);}
  }
  unselectedCardIds=tempArray;
  selectedCardIds.push(id);
  flowArray[id].selected=true;
  destinateFlow();
}
function unselectCardId(id){
  var tempArray=[];
  for(var s=0; s<selectedCardIds.length; s++){
    if(selectedCardIds[s] != id){tempArray.push(selectedCardIds[s] );}
  }
  selectedCardIds=tempArray;
  unselectedCardIds.splice(atFlow,0,id);
  flowArray[id].selected=false;
  destinateFlow();
}
function returnPos(type,ord, z, r){
  //console.log('returnPos(' + type + ', ' + ord + ', ' + z + ', r)');
  var pos={"x":0, "y":0, "z":z, "s":0, "r":0};
  if(type=="slot"){
    pos={"x":slotX*ord, "y":0-slotY, "z":z, "s":slotScale, "r":r};
    //console.log('(' + ord + '-1)*' + slotX + '=' +pos.x);
  }
  if(type=="flow"){
    if(ord==0){
      pos={"x":0, "y":0, "z":z, "s":1, "r":r};
    }
    else{
      pos={"x":cardWidth*ord*1, "y":0, "z":z, "s":.9, "r":r};
    }
  }
  return pos;
}
function posToTransform(pos){
  return "translateX("+pos.x+"px) translateY("+pos.y+"px) translateZ("+pos.z+"px) scale("+pos.s+") rotateY("+pos.r+"deg)";
  }
function posBetweenProg(pos0,pos1,prog){
  return {"x":pos1.x*prog+pos0.x*(1-prog), "y":pos1.y*prog+pos0.y*(1-prog), "z":Math.floor(1000*(pos1.z*prog)+1000*(pos0.z*(1-prog)))/1000, "s":pos1.s*prog+pos0.s*(1-prog), "r":Math.floor(100*(pos1.r*prog+pos0.r*(1-prog)))/100};
}

function gotoFlow(){
  //selectedCardIds=user.profile.corePassions;
  //selectedCardIds=[4,6,8];//dev
  selectedCardIds=[];//dev
  unselectedCardIds=[];

  console.log('gotoFlow()');
  flowUp=true;
  atFlow=0;
  var colorByOrder=["#fe0000", "#ff4001", "#ff8001", "#ffbe00", "#ffff00", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1"];

  flowArray = [];
  if(user.profile.cpaCompleted){
    for (var corePassion in user.profile.cpaData){
      var flowRecord={
        "corePassionTitle":corePassion, 
        "sort":user.profile.cpaData[corePassion]+numByCorePassion[corePassion]/100, 
        "strength":user.profile.cpaData[corePassion], 
        "color":"#0f0", 
        "type":"", 
        "ord":0, 
        "pos":{}, 
        "side":0, 
        "selected":false
      };

      flowArray.push(flowRecord);
    }
  }
  else{// guess - no cpaData
    colorByOrder=["#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1", "#c1c1c1"];
    for (var c=1; c<=12; c++){
      var flowRecord={
        "corePassionTitle":codes[c], 
        "sort":c, 
        "strength":0, 
        "color":"#00f", 
        "type":"", 
        "ord":0, 
        "pos":{}, 
        "side":0, 
        "selected":false
      };

      flowArray.push(flowRecord);
    }
  }
  flowArray.sort(function(a, b) {return b.sort - a.sort});

  if((flowArray[5].strength== flowArray[4].strength)){colorByOrder[5]=colorByOrder[4];}
  
  for (var b=0; b<flowArray.length; b++){
    var cpNum=numByCorePassion[flowArray[b].corePassionTitle];
    var found=false;
    for (var s=0; s<user.profile.corePassions.length; s++){
      var selectedPassionNum=user.profile.corePassions[s];
      if(selectedPassionNum==cpNum){found=true;}
    }
    if(found){
      flowArray[b].selected=true;
      selectedCardIds.push(b);
    }
    else{
      unselectedCardIds.push(b);
    }
    flowArray[b].color=colorByOrder[b];
  }
  //if(selectedCardIds.length>0){flowStatusDiv.style.display="block";}
  //else{flowStatusDiv.style.display="none";}
  console.log("flowArray");
  console.log(flowArray);
  placeCards();
  destinateFlow();
  dockingProg=0;
  flowDocking=true;
  clearTimeout(flowTimeout);
  flowTimeout=window.setTimeout('flowTick(true)', 16);
}
var dbugStr="";
function flowTick(forceAll){
  //dbug(rnd(9)+' flowTick()');
  clearTimeout(flowTimeout);
  if(flowUp){
    //dbuga('cardDragging:'+cardDragging);
    if(flowDocking){
      dockingProg+=.08;
      //dbuga('flowDocking '+dockingProg);
      if(dockingProg>1){
        dockingProg=1;
      } 
    }
    if((flowDocking)||(cardDragging>-1)){
      //dbuga('passed');
      //var rules=[];
      //dbugStr="";
      for(var c=0; c<flowArray.length; c++){
        var ref=document.getElementById('card_'+c);
        var nowPos={};
        if(cardDragging>-1){
          nowPos=flowArray[c].pos;
        }
        if(flowDocking){
          nowPos=posBetweenProg(flowArray[c].startPos,flowArray[c].destPos,dockingProg);
        }
        flowArray[c].pos=nowPos;
        var inView=true;
        if(nowPos.x<0-(pageWidth/2 + cardWidth/2)){inView=false;}
        if(nowPos.x>(pageWidth/2 + cardWidth/2)){inView=false;}
        if(forceAll){inView=true;}
        if(inView){
          var trans=posToTransform(nowPos);
          //dbugStr+=trans+"\n";
          ref.style.webkitTransform=trans;
        }
        ////rules.push('.cardTrans_'+c+'{-webkit-transform:'+trans+';}');
      }
/*
      var head = document.head || document.getElementsByTagName('head')[0];
      var styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      if (styleTag.styleSheet) {styleTag.styleSheet.cssText = rules.join(' ');}
      else {styleTag.appendChild(document.createTextNode(rules.join(' ')));}
      head.appendChild(styleTag);
*/
    }
    if(dockingProg==1){
      flowDocking=false;
    }
    flowTimeout=window.setTimeout('flowTick(false)', 16);
  }
  else{
    //dbug('');
  }
}
function posSlots(){
  for(var d=0; d<3; d++){
    var ref=document.getElementById('dock_'+d);
    var pos=returnPos("slot",d-1, dockZ, 0);
    var trans=posToTransform(pos);
    console.log(trans);
    //ref.style.transform=trans;
    ref.style.webkitTransform=trans;
    } 
}
function placeCards(){
  flowDiv.style.display="block";
  flowDiv.style.perspective="1000px";
  flowDiv.style.zIndex="1";
  flowDiv.innerHTML=returnCards();
  var startPos=returnPos("flow",12, flowZ, 0);
  posSlots();     
  for(var u=0; u<unselectedCardIds.length; u++){
    var c=unselectedCardIds[u]; 
    var ref=document.getElementById('card_'+c);
    var pos=returnPos("flow",u-atFlow, flowZ, flowArray[c].side*180);
    flowArray[c].pos=startPos;
    flowArray[c].startPos=startPos;
    flowArray[c].destPos=pos;
    flowArray[c].type="flow";
    flowArray[c].ord=u-atFlow;
  }
  for(var s=0; s<selectedCardIds.length; s++){
    var c=selectedCardIds[s]; 
    var ref=document.getElementById('card_'+c);
    var pos=returnPos("slot",s-1, slotZ, 0);
    flowArray[c].pos=startPos;
    flowArray[c].startPos=startPos;
    flowArray[c].destPos=startPos;
    flowArray[c].type="slot";
    flowArray[c].ord=c;
  }
}  
var flowArray=[];
var flowUp=false;
var atFlow=1;
var selectedCardIds=[];
var unselectedCardIds=[];
var cardTouchStartMs=0;
var cardTouchStartX=0;
var cardTouchStartY=0;
var cardTouchLastX=0;
var cardTouchLastY=0;
var cardDragging=-1;
var flowDocking=false;
var dockingProg=0;
function nowMs(){
  var nowDate= new Date();
  return nowDate.getTime();
}
function cardTouchStart(e, c){
  e.preventDefault();
  
  cardTouchStartMs=nowMs();
  console.log('Start '+c);
  cardDragging=c;
  cardTouchStartX=e.touches[0].pageX;
  cardTouchStartY=e.touches[0].pageY;
  cardTouchMove(e, c);
  }
function cardTouchMove(e, c){
  e.preventDefault();
  var deltaY= e.touches[0].pageY-cardTouchStartY;
  var origPos=returnPos(flowArray[c].type, flowArray[c].ord, dragZ, flowArray[c].side*180);
  var deltaX=e.touches[0].pageX-cardTouchStartX;
  var pos;
  if(flowArray[c].type=="flow"){
    var yFrac=deltaY/slotY;
    if(yFrac>0){yFrac=0;}
    if(yFrac<-1){yFrac=-1;}
    var s=1+yFrac+(0-yFrac)*slotScale;
    pos={"x":origPos.x+deltaX, "y":yFrac*slotY, "z": dragZ, "s":s, "r":flowArray[c].pos.r};
  }
  else{// slot dragging
    var yFrac=deltaY/slotY;
    if(yFrac<0){yFrac=0;}
    if(yFrac>1){yFrac=1;}
    var s=yFrac+(1-yFrac)*slotScale;
    var y=(yFrac)*slotY-slotY;
    //dbug("deltaY : "+deltaY);
    //dbuga("yFrac : "+yFrac);
    //dbuga("y : "+y);
    //dbuga("s : "+s);

    pos={"x":origPos.x+deltaX, "y":y, "s":s, "z":dragZ, "r":flowArray[c].pos.r};
  }
  flowArray[c].pos=pos;
  // rotor track
  if(flowArray[c].type=="flow"){
    for(var u=0; u<unselectedCardIds.length; u++){
      var cardId= unselectedCardIds[u];
      if(cardId != c){
        var origPos=returnPos(flowArray[cardId].type, flowArray[cardId].ord, flowZ, flowArray[cardId].side*180);
        var pos={"x":origPos.x+deltaX, "y":origPos.y, "z":flowZ, "s":.9, "r":flowArray[cardId].pos.r};
        flowArray[cardId].pos=pos;
      }
    }
  }
  cardTouchLastX=e.touches[0].pageX;
  cardTouchLastY=e.touches[0].pageY;
}
var verticalFrac=6;
var horizontalFrac=5;
var flickMs=200;
function cardTouchEnd(e, c){
  cardDragging=-1;
  e.preventDefault();
  var deltaMs=nowMs()- cardTouchStartMs;
  console.log('End '+c +" "+ deltaMs);
  for (var a=0; a<flowArray.length; a++){//save starts
    flowArray[a].startPos=flowArray[a].pos;
  }
  
  // determine dests
  var deltaX= cardTouchLastX-cardTouchStartX;
  var deltaY= cardTouchLastY-cardTouchStartY;

  if((deltaMs<flickMs)&&(Math.abs(deltaX)<cardWidth/horizontalFrac)&&(Math.abs(deltaY)<cardHeight/verticalFrac)){//tap
    if(flowArray[c].type=="flow"){
      if(flowArray[c].ord==0){// 0 is flip Tap
        flowArray[c].side=Math.abs(flowArray[c].side-1);
        flowArray[c].destPos=returnPos("flow", 0, flowZ, flowArray[c].side*180);
      }
      else{//select flow Tap
        atFlow+=flowArray[c].ord;
        for(var u=0; u<unselectedCardIds.length; u++){
          var cardId=unselectedCardIds[u]; 
          var ref=document.getElementById('card_'+ cardId);
          var pos=returnPos("flow",u-atFlow, flowZ, flowArray[cardId].side*180);

          flowArray[cardId].destPos=pos;
          flowArray[cardId].type="flow";
          flowArray[cardId].ord=u-atFlow;        
        }
      }
    }// end flow tap
    else{//slot tap
      unselectCardId(c);
    }
  }//end  of tap
  else{//drop
    if(flowArray[c].type=="flow"){// drop flow
      if(Math.abs(deltaX)>Math.abs(deltaY)){//horizontal drag drop of flow
        if(deltaMs<flickMs){// flicked horizontal
          if(deltaX<0){deltaFlow=-1;}
          else{deltaFlow=1;}
        }
        else{deltaFlow=Math.round(deltaX/cardWidth);}
        atFlow-=deltaFlow;
        if(atFlow<0){atFlow=0;}
        if(atFlow>unselectedCardIds.length-1){atFlow=unselectedCardIds.length-1;}
        for(var u=0; u<unselectedCardIds.length; u++){//destinate
          var cardId=unselectedCardIds[u]; 
          var ref=document.getElementById('card_'+ cardId);
          var pos=returnPos("flow",u-atFlow, flowZ, flowArray[cardId].side*180);
 
          flowArray[cardId].destPos=pos;
          flowArray[cardId].type="flow";
          flowArray[cardId].ord=u-atFlow;        
        } 
      }//end of  horizontal flow drag
      else{//vert drag flow = select
        if((selectedCardIds.length<3)&&(Math.abs(deltaY)>cardHeight/verticalFrac)){
          selectCardId(c);
        }
      }//end of vert drag flow
    }// end of drag flow
    else{ //drag slot
      if(Math.abs(deltaX)>Math.abs(deltaY)){//horizontal slot drag
      }
      else{// vertical slot Drag
        if(Math.abs(deltaY)>cardHeight/6){
          unselectCardId(c);
        }
    
      }
    }
  }//end of drag
  
  for(var s=0; s<selectedCardIds.length; s++){
    var c=selectedCardIds[s]; 
    var pos=returnPos("slot",s-1, slotZ, 0);
    flowArray[c].destPos=pos;
    flowArray[c].type="slot";
    flowArray[c].ord=s-1;
  }
  flowDocking=true;
  dockingProg=0;
}

function returnCards(){
  var cards="";

  for(var d=0; d<3; d++){
    var dock='<div id="dock_'+d+'" class="flowCard cardSize" style="-webkit-transform:rotateY(0deg); background-color:rgba(100,100,100,.75);"></div>';
    cards+=dock;
    }
  cards+='<div id="flowStatusDiv" class="flowStatus">Select three codes.<br />Drag up to select,<br />left and right to scroll.<br />Tap to center or flip.</div>';

  for(var c=0; c<flowArray.length; c++){
    var touchEvents='ontouchstart="cardTouchStart(event, '+c+');" ontouchmove="cardTouchMove(event, '+c+');" ontouchend="cardTouchEnd(event, '+c+');"';
    var deg=0;
    if(flowArray[c].selected){deg=180;}
    var card='<div id="card_'+c+'" class="flowCard cardSize" style="-webkit-transform:rotateY('+deg+'deg) tanslateX(-2000px); background-color:'+flowArray[c].color+';">';
    card+=   '  <div class="flowCardFront cardSize" style="background-image:url(smallcards/front_'+flowArray[c].corePassionTitle.toLowerCase()+'.png);"  '+touchEvents+'>';
    if(flowArray[c].strength>0){
      card+=   '    <div class="flowCardNum" style="">'+flowArray[c].strength+'</div>';
    }
    card+=   '  </div>';
    card+=   '  <div class="flowCardBack cardSize" style="background-image:url(smallcards/back_'+flowArray[c].corePassionTitle.toLowerCase()+'.png);"  '+touchEvents+'>';
    card+=   '</div>';
    card+='</div>';
    cards+=card; 
  }
  cards+='<div id="flowDoneDiv" class="flowDone" ontouchend="flowDone()">DONE</div>';
  return cards;
}
var flowTimeout;

function flowDone(){
  console.log('flowDone()');
  clearInterval(flowTimeout);
  //dbug('');
  flowUp=false;
  flowDiv.style.display="none";
  var prevPassions=user.profile.corePassions;
  user.profile.corePassions=[];
  
  for(var s=0; s<selectedCardIds.length; s++){
    var c=selectedCardIds[s];
    user.profile.corePassions.push(numByCorePassion[flowArray[c].corePassionTitle]);
  }
  
  if(arraysMatch(prevPassions, user.profile.corePassions)==false){
    // selection has changed
    user.profile.statementIds[4]=[];//codes
    user.profile.statementIds[5]=[];//talents
    //user.profile.statementIds[6]=[];//values is not invalidated by change
  }

  var newArray=user.profile.corePassions;
  user.profile.talents=newArray;
  saveLocal();  
  gotoReflection(currentReflection);
}

function arraysMatch(a0,a1){
  var unmatched=false;
  if(a0.length != a1.length){
    unmatched=true;
  }
  else{
    var s0=a0.sort();
    var s1=a1.sort();
    for(var i=0; i<s0.length; i++){
      if(s0[i] != s1[i]){
        unmatched=true;
      }
    }
  }
  return !(unmatched);
}
  <div id="flowDiv" style="width:100%; height:100%; display:none; background-color:rgba(0,0,0,.85); position:absolute;" ontouchstart="event.preventDefault()" ontouchmove="event.preventDefault()" ontouchend="event.preventDefault()"></div>