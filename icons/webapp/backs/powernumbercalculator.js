
var wloc=""+window.location.href;
console.log('powernumbercalculator.js loaded and ran on '+wloc +' as '+wpUserLogin);

if(typeof powernumbercalculator != 'undefined'){
  console.log('powernumbercalculator ='+powernumbercalculator );
  initPowerNumberCalculator()
  }

function initPowerNumberCalculator(){
  console.log('initPowerNumberCalculator()');
  geometry();
  var holder=document.getElementById('calculatorHolder');
  holder.innerHTML=returnCalculatorForm();
  }
function returnCalculatorForm(){
  var htmlString='<div class="container thirdHeight" style="clear:both; display:block;" >';
  //htmlString+='<h2>';
  //htmlString+='Power Number Calculator';
  //htmlString+='</h2>';

  htmlString+='<p class="label">Select the month, day and year below from your birthdate.</p>';
  var months=["","January","February","March","April","May","June","July","August","September","October","November","December"];

  htmlString+='<select id="birthMonth" style="clear:both; margin:8px;">';
  //htmlString+='<option></option>';
  for (var m=1; m<=12; m++){
    htmlString+='<option value="'+m+'">'+months[m]+'</option>';
  }
  htmlString+='</select>';

  htmlString+='<select id="birthDay" style="clear:both; margin:8px;">';
  //htmlString+='<option></option>';
  for (var d=1; d<=31; d++){
    htmlString+='<option value="'+d+'">'+d+'</option>';
  }
  htmlString+='</select>';

  htmlString+='<select id="birthYear" style="clear:both; margin:8px;">';
  //htmlString+='<option></option>';
  for (var y=1900; y<=2015; y++){
    htmlString+='<option value="'+y+'">'+y+'</option>';
  }
  htmlString+='</select>';
  htmlString+='</form>';
  htmlString+='</p>';
  htmlString+='</div>';

  htmlString+='<div style="width:440px;" >';
  htmlString+='<input type="button" style="margin:8px;" class="fullButton" onmousedown="parseCalculatorForm(); " value="= CALCULATE" />';
  htmlString+='<div id="results" style="display:block; float:right; width:300px; padding:8px;"></div>';
  htmlString+='</div><br><br>';

  return htmlString;
}

function parseCalculatorForm(){
  
  //dbuga("parseCalculatorForm()");
  var birthMonth=document.getElementById("birthMonth").value;
  var birthDay=document.getElementById("birthDay").value;
  var birthYear=document.getElementById("birthYear").value;

  // powerNumber
  var birthSum= resolve(birthMonth)+resolve(birthDay)+ resolve(birthYear);
  //alert(birthSum);
  
  var powerNumber=resolve(birthSum); 
  document.getElementById('results').innerHTML="Your Power Number is <b>" +powerNumber+"</b>";
  
}
function resolve(seedNum){
  seedString=""+seedNum;
  seedString=seedString.replace(/ /g, "");

  var seedArray=seedString.split('');
  if(seedArray.length==0){
    //alert('error, could not resolve('+seedString+')');
  }
  var master="";
  while(seedArray.length>1){
    var sum=0;
    for(n=0; n<seedArray.length; n++){
      sum+=Number(seedArray[n]);
    }
    seedString=""+sum;
    seedArray=seedString.split('');  
    if(master != ""){
      seedString=master;
      seedArray=[];
    }
  }

  return Number(seedString);
}

/*
function nowMs(){
  var nowDate= new Date();
  return nowDate.getTime();
}

// gestures - start
function cardMouseDown(e, c){
  e.preventDefault();
  cardGestureStart(e, c);
  }
function cardTouchStart(e, c){
  e.preventDefault();
  e.pageX=e.touches[0].pageX;
  e.pageY=e.touches[0].pageY;
  cardGestureStart(e, c);  
  }

function cardGestureStart(e, c){
  cardGestureStartMs=nowMs();
  console.log('Start '+c);
  cardDragging=c;
  cardGestureStartX=e.pageX;
  cardGestureStartY=e.pageY;
  gestureLog=[{"type":"start", "x":e.pageX, "y":e.pageY}];
  cardGestureMove(e, c);
  }
function cardMouseMove(e, c){
  e.preventDefault();
  cardGestureMove(e, c);
  }

function cardTouchMove(e, c){

  e.preventDefault();
  e.pageX=e.touches[0].pageX;
  e.pageY=e.touches[0].pageY;
  cardGestureMove(e, c);
  }

function cardGestureMove(e, c){
  gestureLog.push({"type":"move", "x":e.pageX, "y":e.pageY});
  var deltaY= e.pageY-cardGestureStartY;
  deltaY=0;
  var origPos=returnPos(flowArray[c].type, flowArray[c].ord, dragZ, flowArray[c].side*180);
  var deltaX=e.pageX-cardGestureStartX;
  var pos;
  }

var verticalFrac=6;
var horizontalFrac=5;
var flickMs=200;
function cardMouseUp(e, c){
  e.preventDefault();
  cardGestureEnd(e, c);
  }
function cardTouchEnd(e, c){
  e.preventDefault();
  cardGestureEnd(e, c);
  }
function cardGestureEnd(e, c){
  cardDragging=-1;
  var deltaMs=nowMs()- cardGestureStartMs;
  console.log('End '+c +" "+ deltaMs);
  for (var a=0; a<flowArray.length; a++){//save starts
    flowArray[a].startPos=flowArray[a].pos;
    }
  }
*/