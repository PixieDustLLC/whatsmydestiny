var rui = {
  found:-1,
  menuFound:-1,
  paneFound:-1,
  contentFound:-1,
  touching:false,
  iconPath:"",
  paraFont:"Arial",
  headFont:"Arial Bold",
  ww:0,
  wh:0,
  thinPx:0,
  widePx:0,
  barPad:.75,
  iconPad:0,
  selectColor:"#888",
  barColor:"green",
  bgColor:"yellow",
  textColor:"black",
  iconColor:"white",
  circleColor:"red",
  g:100,
  cellsDown:100,
  ruiCreated:false,
  mcanv:"",
  mctx:"",
  preloaded:0,
  preloadArray:["arrowdown.png", "arrowup.png", "art.png", "back.png", "cart.png", "droparrowbox.png", "duplicate.png", "email.png", "embedcode.png", "folder.png", "home.png", "i.png", "imagefile.png", "magnifier.png", "menu.png", "mic.png", "moviefile.png", "next.png", "palette.png", "panes.png", "pause.png", "pdfdoc.png", "pencil.png", "play.png", "power.png", "profile.png", "questionmark.png", "refresh.png", "reticule.png", "rocket.png", "roundplus.png", "roundx.png", "share.png", "shortmenu.png", "speaker.png", "star.png", "trash.png", "venn.png", "w.png", "wand.png", "www.png"],

  createRui:function(containerRef, barColor, surroundColor, bgColor, textColor, circleColor, iconPath, barIcons, menuIcons, iconPad, selectColor, paraFont, headFont){
  rui.ruiCreated=true;
  rui.barColor=barColor;
  rui.surroundColor=surroundColor;
  rui.bgColor=bgColor;
  rui.textColor=textColor;
  rui.circleColor=circleColor;
  rui.iconPath=iconPath;
  rui.iconPad=iconPad;
  rui.selectColor=selectColor;
  rui.paraFont=paraFont;
  rui.headFont=headFont;
  var htmlString="";
    htmlString+='<canvas id="menuCanvas" style="position:absolute; Zbackground-color:rgba(255,127,127,.25);" width='+rui.ww+' height='+rui.g*3.5+'></canvas>';
    rui.preloaded=0;
    for (var p=0; p<rui.preloadArray.length; p++){      
      var preload=rui.preloadArray[p];
      htmlString+='<img src="'+rui.iconPath+barIcons+'/'+preload+'" id="bar_'+preload+'" style="float:left; width:10px; height:10px;" onload="(function(e){rui.loadedImg(e.id);})(this)" />';
      htmlString+='<img src="'+rui.iconPath+menuIcons+'/'+preload+'" id="menu_'+preload+'" style="float:left; width:10px; height:10px;" onload="(function(e){rui.loadedImg(e.id);})(this)" />';
      }
  containerRef.insertAdjacentHTML("beforeend", htmlString);
    rui.mcanv=document.getElementById('menuCanvas');
    rui.mctx=rui.mcanv.getContext('2d');
    rui.mcanv.addEventListener('mousedown', function(e){
      e.preventDefault();
      rui.menuEvent("touchstart", [{"pageX":e.pageX, "pageY":e.pageY}]);
    }, false);
    rui.mcanv.addEventListener('mousemove', function(e){
      e.preventDefault();
      if((rui.touching)&&(e.pageY>rui.g*3)){
        //console.log(e.pageY+'>'+rui.g*3);
        rui.menuEvent("touchmove", [{"pageX":e.pageX, "pageY":e.pageY}]);
      }
    }, false);
    rui.mcanv.addEventListener('mouseup', function(e){
      e.preventDefault();
      rui.menuEvent("mouseup", []);
    }, false);
    rui.mcanv.addEventListener('touchstart', function(e){
      e.preventDefault();
      rui.menuEvent("touchstart", e.touches);
    }, false);
    rui.mcanv.addEventListener('touchmove', function(e){
      e.preventDefault();
      rui.menuEvent("touchmove", e.touches);
    }, false);
    rui.mcanv.addEventListener('touchend', function(e){
      e.preventDefault();
      rui.menuEvent("touchend", e.touches);
    }, false);
  window.clearInterval(rui.geometryInterval);
  rui.geometryInterval=window.setInterval('rui.geometryTick()', 1000);

  },
  toggleMenu:function(menuName){
    var b=buttonNumByName[menuName+"Toggle"];
    if(barButtons[b].selected){barButtons[b].selected=false;}
    else{barButtons[b].selected=true;}
    menus[menuName].selected=barButtons[b].selected;
    //dbuga(menuName+" barButtons["+b+"].selected="+barButtons[b].selected);
    rui.drawUx();
    return "toggleMenu("+menuName+") return";
  },
  geometry:function(){
    if((window.innerWidth == rui.ww)&&(window.innerHeight < rui.wh)){
      //dbuga('rui.geometry false resize from keyboard ignore');
      return false;
      }
    if((window.innerWidth != rui.ww)||(window.innerHeight != rui.wh)){
      rui.ww=window.innerWidth;
      rui.wh=window.innerHeight;
      if(rui.ww<rui.wh){
        rui.thinPx=rui.ww;
        rui.widePx=rui.wh;
      }
      else{
        rui.thinPx=rui.wh;
        rui.widePx=rui.ww;
      }
      rui.g=rui.thinPx/36;
      rui.cellsDown=Math.floor(rui.wh/rui.g);

      if(rui.ruiCreated){
        rui.mcanv.width=rui.ww;
        rui.mcanv.height=rui.g*3.5;
        rui.drawUx();
      }
    updateClientLayout();
    }
  },
  capLabel:function(str){
    str=str.replace(/_/g, ' ');
    str=str.toUpperCase();
    return str;
  },

  drawUx:function(){
    rui.measureMenus();
    rui.drawMenus();
    rui.drawBarBackground();
    rui.drawBarButtons(); 
    //console.log('rui.drawUx() completed');
  },
  measureMenus:function(){
  var maxHeight=3.5;
  for(var m=0; m<menuKeys.length; m++){
    var panes=menus[menuKeys[m]].panes;
    if((menus[menuKeys[m]].selected)&&(panes.length>0)){
      var lastPane=panes[panes.length-1];
      var top=(lastPane.top);
      var height=lastPane.height;
      if(height==-1){height=rui.cellsDown-top-1;}
      var thisHeight=top+height+1;
      //dbuga(menuKeys[m] +" thisHeight="+thisHeight);
      if(thisHeight>maxHeight){maxHeight=thisHeight;}
    }
  }
  //dbuga("maxHeight="+maxHeight);
  rui.mcanv.height=Math.floor(maxHeight*rui.g);
  },

insertResultsMenuPane:function(results, menuName, paneNum){
  var template=menus[menuName].panes[paneNum].contents[0];
  var pane=menus[menuName].panes[paneNum];
  menus[menuName].panes[paneNum].contents=[];
  menus[menuName].panes[paneNum].contents.push(template);
  for (var r=0; r<results.length; r++){
    var newResult=JSON.parse(JSON.stringify(template));
    newResult.y=template.h*r;
    newResult.text=results[r];
    newResult.type="result";
    newResult.id=r;
    menus[menuName].panes[paneNum].contents.push(newResult);
    }
  rui.drawMenus();
  //console.log(template);
  },

drawMenus:function(){
  rui.mctx.fillStyle=rui.surroundColor;
 
  for(var m=0; m<menuKeys.length; m++){
    var panes=menus[menuKeys[m]].panes;
    //dbuga(panes.length);
    if((menus[menuKeys[m]].selected)&&(panes.length>0)){
      var lastPane=panes[panes.length-1];
      var top=((panes[0].top-1));
      var height=lastPane.height;
      if(height==-1){height=rui.cellsDown-top-1;}
      height=(rui.g*(height+5/3));
      top=top*rui.g;
      var left=rui.ww/2+(rui.g*(panes[0].left-2/3));
      var right=rui.ww/2+(rui.g*(lastPane.left+lastPane.width+2/3));
      var width=right-left;
      var cx=0;
      if(menus[menuKeys[m]].align=="left"){cx=0-(rui.ww-width)/2+rui.g/3;}
      if(menus[menuKeys[m]].align=="right"){cx=(rui.ww-width)/2-rui.g/3;}
      
      //dbuga("top:" +top+" left:"+left+" :right:"+right+" width:"+width+" height:"+height);
      if(rui.surroundColor != ""){
        rui.mctx.fillStyle=rui.surroundColor;
        rui.mctx.shadowOffsetX = 0;
        rui.mctx.shadowOffsetY = 0;
        rui.mctx.shadowColor = '#888';
        rui.mctx.shadowBlur = rui.g/3;
        rui.mctx.fillRect(cx+left, top, width, height);
        }
      else{
        rui.mctx.clearRect(cx+left, top, width, height);
        }
      for(var p=0; p<panes.length; p++){
        var height=panes[p].height;
        if(height==-1){height=rui.cellsDown-panes[p].top-1;}
        rui.mctx.fillStyle=rui.bgColor;
        rui.mctx.shadowColor = '#888';
        rui.mctx.shadowBlur = 0;
        var edge=2.75/7;
        rui.mctx.fillRect(rui.ww/2+cx+rui.g*(panes[p].left-edge), rui.g*(panes[p].top-edge), rui.g*(panes[p].width+edge*2), rui.g*(height+edge*2));

        //surround for example
        rui.mctx.strokeStyle="#aaa";
        var px=rui.ww/2+cx+rui.g*(panes[p].left);
        var py=rui.g*(panes[p].top);
        //rui.mctx.lineWidth=1;
        //rui.mctx.strokeRect(px, py, rui.g*(panes[p].width), rui.g*(height));
        var contents=panes[p].contents;
        var pad=rui.g/3;
        rui.mctx.shadowBlur = 0;


        for (var c=0; c<contents.length; c++){
          if(contents[c].type != "template"){// ignore template
            menus[menuKeys[m]].panes[p].contents[c].l=px+rui.g*contents[c].x;
            menus[menuKeys[m]].panes[p].contents[c].r=px+rui.g*contents[c].x+rui.g*contents[c].w;
            menus[menuKeys[m]].panes[p].contents[c].t=py+rui.g*contents[c].y;
            menus[menuKeys[m]].panes[p].contents[c].b=py+rui.g*contents[c].y+rui.g*contents[c].h;
            if(panes[p].selection==c){
              rui.mctx.fillStyle=rui.selectColor;
              rui.mctx.shadowColor = '#888';
              rui.mctx.shadowBlur = rui.g/2;
              rui.mctx.fillRect(px+rui.g*contents[c].x, py+rui.g*contents[c].y, rui.g*contents[c].w, rui.g*contents[c].h);
              }
            }
          if(contents[c].type=="color"){
            rui.mctx.shadowBlur = 0;
            rui.mctx.lineWidth=rui.g/3;

            var color=contents[c].color;
            if(color==""){
              rui.mctx.strokeStyle="black";
              rui.mctx.fillStyle="white";
              }
            else{
              rui.mctx.strokeStyle=color;
              rui.mctx.fillStyle=color;
              }

            rui.roundRect(rui.mctx, px+rui.g*contents[c].x+pad, py+rui.g*contents[c].y+pad, rui.g*contents[c].w-pad*2, rui.g*contents[c].h-pad*2, rui.g/4, true, true);
            }// end of type color

          if(contents[c].type=="icon"){
            var cPad=rui.g*rui.iconPad;
            rui.mctx.shadowBlur = 0;
            var image=document.getElementById("menu_"+contents[c].icon+".png");
            rui.mctx.fillStyle=rui.circleColor;
            rui.mctx.beginPath();
            rui.mctx.arc(px+rui.g*contents[c].x+rui.g*contents[c].h/2, py+rui.g*contents[c].y+rui.g*contents[c].h/2, rui.g*contents[c].h/2-cPad/4, 0,pi*2, true);
            rui.mctx.closePath();
            rui.mctx.fill();
            rui.mctx.drawImage(image, px+rui.g*contents[c].x+cPad, py+rui.g*contents[c].y+cPad, rui.g*contents[c].h-cPad*2, rui.g*contents[c].h-cPad*2);
            rui.mctx.fillStyle=rui.textColor;
            rui.mctx.textBaseline="middle";
            rui.mctx.textAlign="left";
            rui.mctx.font=rui.g*.8+"px "+rui.paraFont;
            rui.mctx.fillText(rui.capLabel(contents[c].label), px+rui.g*(contents[c].x+2.5), py+rui.g*(contents[c].y+contents[c].h/2));
            if((panes[p].barColor != "")&&(c<contents.length-1)){
              rui.mctx.lineWidth=g/10;
              rui.mctx.beginPath();
              rui.mctx.strokeStyle=panes[p].barColor;
              rui.mctx.moveTo(px+rui.g*contents[c].x+cPad, py+rui.g*(contents[c].y+contents[c].h+panes[p].barPad));
              rui.mctx.lineTo(px+rui.g*(contents[c].x+contents[c].w)-cPad,py+rui.g*(contents[c].y+contents[c].h+panes[p].barPad));
              rui.mctx.stroke();
              }
            }// end of type icon

          if(contents[c].type=="input"){
            var cPad=rui.g/2;
            rui.mctx.shadowColor = 'rgba(255,255,255,.5)';
            rui.mctx.shadowBlur = rui.g;
            rui.mctx.fillStyle=rui.textColor;
            rui.mctx.textBaseline="middle";
            rui.mctx.textAlign="right";
            rui.mctx.font=rui.g*1.2+"px "+rui.headFont;
            rui.mctx.fillText(contents[c].value, px+rui.g*(contents[c].x+contents[c].w), py+rui.g*(contents[c].y+contents[c].h/2));
            }// end of type heading

          if(contents[c].type=="result"){
            var cPad=rui.g/2;
            rui.mctx.shadowColor = 'rgba(255,255,255,.5)';
            rui.mctx.shadowBlur = rui.g;
            rui.mctx.fillStyle=rui.textColor;
            rui.mctx.textBaseline="middle";
            rui.mctx.textAlign="center";
            rui.mctx.font=rui.g*1.2+"px "+rui.headFont;
            rui.mctx.fillText(contents[c].text, px+rui.g*(contents[c].x+contents[c].w/2), py+rui.g*(contents[c].y+contents[c].h/2));
            }// end of type result

          if(contents[c].type=="heading"){
            var cPad=rui.g/2;
            rui.mctx.shadowColor = 'rgba(255,255,255,.5)';
            rui.mctx.shadowBlur = rui.g;
            rui.mctx.fillStyle=rui.textColor;
            rui.mctx.textBaseline="middle";
            rui.mctx.textAlign="center";
            rui.mctx.font=rui.g*1.2+"px "+rui.headFont;
            rui.mctx.fillText(contents[c].text, px+rui.g*(contents[c].x+contents[c].w/2), py+rui.g*(contents[c].y+contents[c].h/2));
            }// end of type heading

          if(contents[c].type=="paragraph"){
    rui.mctx.shadowColor = 'rgba(255,255,255,.5)';
    rui.mctx.shadowBlur = rui.g;
            var cPad=rui.g/2;
            ////wrap 
            rui.mctx.fillStyle=rui.textColor;
            rui.mctx.textBaseline="middle";
            rui.mctx.textAlign="left";
            rui.mctx.font=rui.g*1+"px "+rui.paraFont;
            wrapText(rui.mctx, contents[c].text, px+rui.g*(contents[c].x+.5), py+rui.g*(contents[c].y+contents[c].h/2), rui.g*(contents[c].w-1), rui.g*1.2, false);
            }// end of type paragraph
          }
        }
      }
    }
  },

  drawBarBackground:function(){
    rui.mctx.fillStyle=rui.barColor;
    rui.mctx.shadowColor = '#888';
    rui.mctx.shadowBlur = rui.g/2;
    rui.mctx.shadowOffsetX = 0;
    rui.mctx.shadowOffsetY = 0;
    rui.mctx.fillRect(rui.g*.2, rui.g*.1, rui.ww-rui.g*.4, rui.g*2.9);
    rui.mctx.shadowBlur = 0;
  },
  drawBarButtons:function(){
    rui.mctx.fillStyle="#00f";
  
    var atLeft=1;
    var atRight=1;
    for (var b=0; b<barButtons.length; b++){
      barButtons[b].t=0;
      barButtons[b].b=rui.g*3;
      if(barButtons[b].float=="left"){
        barButtons[b].l=rui.g*(atLeft);
        barButtons[b].r=rui.g*(atLeft+3);
        atLeft+=3;
      }
      if(barButtons[b].float=="right"){
        barButtons[b].r=rui.ww-rui.g*(atRight);
        barButtons[b].l=rui.ww-rui.g*(atRight+3);
        atRight+=3;
      }
      if(barButtons[b].float=="center"){
        var avail=rui.ww-atRight*rui.g-atLeft*rui.g;
        barButtons[b].l=rui.g*(atLeft)+avail/2;
        barButtons[b].r=rui.g*(atLeft+3)+avail/2;
      }
    var l=Math.floor(barButtons[b].l);
    var w=Math.floor(barButtons[b].r-barButtons[b].l)
    var t=Math.floor(barButtons[b].t);
    var h=Math.floor(barButtons[b].b-barButtons[b].t);
    var pad=rui.g*rui.barPad;
    var inset=.4;
    var label=barButtons[b].labelOff;
    if(barButtons[b].selected){label=barButtons[b].labelOn;}
    //console.log('label:'+label)
    if(label.indexOf('.png')>-1){
      var img=document.getElementById("bar_"+label);
      if(barButtons[b].selected){
        rui.mctx.fillStyle="rgba(0,0,0,.1)";
        rui.mctx.fillRect(l+pad*inset, t+pad*inset, w-pad*2*inset, h-pad*inset);
        }
      rui.mctx.drawImage(img, l+pad, t+pad, w-pad*2, h-pad*2);
    
      }
    }
  },
roundRect:function(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
  },

  geometryInterval:"",

  geometryTick:function(){
    rui.geometry();
  },


menuEvent:function(type, touches){
  if(touches.length>2){dbug('');}
  if(type=="touchstart"){dbug('');}
  if(((type=="touchstart")||(type=="touchmove"))&&(touches.length==1)){
    rui.touching=true;
    var x=touches[0].pageX;
    var y=touches[0].pageY;
    //dbuga('menuEvent' +type+" x:"+x+" y:"+y);
    
    var found=-1;
    for (var b=0; b<barButtons.length; b++){
      if((x>barButtons[b].l)&&(x<barButtons[b].r)&&(y>barButtons[b].t)&&(y<barButtons[b].b)){
        found=b;
        }
      }
    if(found>-1){
      //dbuga("found: "+found);
      var junk=eval(barButtons[found].func);
      //dbuga(barButtons[found].func);
      }
    rui.menuFound=-1;
    rui.paneFound=-1;
    rui.contentFound=-1;
    for (var m=0; m<menuKeys.length; m++){
      if(menus[menuKeys[m]].selected){
        var panes=menus[menuKeys[m]].panes;
        for (var p=0; p<panes.length; p++){
          var contents=panes[p].contents;
          for (var c=0; c<contents.length; c++){
          
            if((x>contents[c].l)&&(x<contents[c].r)&&(y>contents[c].t)&&(y<contents[c].b)){
              if((contents[c].type != "heading")&&(contents[c].type != "paragraph")){
                rui.menuFound=m;
                rui.paneFound=p;
                rui.contentFound=c;
                menus[menuKeys[rui.menuFound]].panes[rui.paneFound].selection=rui.contentFound;
                rui.drawUx();
                //dbuga("menuFound:"+rui.menuFound+" paneFound:"+rui.paneFound+" contentFound:"+rui.contentFound);
                }
              }
            }
          }
        }
      }
    rui.found=found;
    }// end of touchstart
  if((type=="touchend")||(type=="mouseup")){  
    rui.touching=false;
    //console.log('touchend');
    for (var m=0; m<menuKeys.length; m++){// hide exclusive menus
      if(menus[menuKeys[m]].stack==0){
        var buttonNum=buttonNumByName[menus[menuKeys[m]].buttonName];
        if(rui.found != buttonNum){// dont close if it's this menus button
          //dbuga('FORCE CLOSE buttonName='+menus[menuKeys[m]].buttonName + ' buttonNum='+buttonNum);
          menus[menuKeys[m]].selected=false;
          barButtons[buttonNum].selected=false;
          rui.drawUx();
          }
        }
      }
    if((rui.menuFound>-1)&&(rui.paneFound>-1)&&(rui.contentFound>-1)){
      var obj=menus[menuKeys[rui.menuFound]].panes[rui.paneFound].contents[rui.contentFound];
      if(obj.type=="result"){
        var jString=obj.func+'('+obj.id+')';
        var junk=eval(jString);
        console.log(obj);
        }
      }
    }// end of touchend
  },
  loadedImg:function(id){
    rui.preloaded++;
    document.getElementById(id).style.display="none";
    //console.log('loaded('+id+') '+rui.preloaded+' of '+rui.preloadArray.length);
    if(rui.preloadArray.length==rui.preloaded){
      //console.log(rui.preloaded+' so requestAnimationFrame');
      rui.drawUx();
      window.requestAnimationFrame(tick);
    }
  }
};
