<?php
/**
 * Template Name: webapp 
 *
 * @package EvoLve
 * @subpackage Template
 */
 get_header(); 


?>
<!-- themes organic purpose webapp.php
Dec 4 monkey with the shade divs
-->
<!-- place in theme directory to enable template 'webapp' -->

<!--BEGIN #primary .hfeed-->
<!--END #primary .hfeed-->

<!-- begin pixiedust code -->
<style type="text/css">
html{
  height: 100%;
}
body {
  min-height: 100%;
}
#wrapper, .singular, .container, #appDiv{
overflow: hidden; position: absolute; 
margin:0;
left: 0; right: 0;
top: 0; bottom: 0;
overflow-x: auto;
overflow-y: auto;
}
.singular{top:55px;}
.header, .footer, #wpadminbar, #primary{display:none;}
</style>
<link rel="stylesheet" type="text/css" href="webapp/reset.css?<?php
echo rand(); ?>"> 
<link rel="stylesheet" type="text/css" href="webapp/cpa.css?<?php
echo rand(); ?>"> 
<script src="webapp/questions.js"></script>
<script src="webapp/cpareportsource.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/jspdf.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/libs/Deflate/adler32cs.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/libs/FileSaver.js/FileSaver.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/libs/Blob.js/BlobBuilder.js"></script>

	<script type="text/javascript" src="webapp/jsPDF/jspdf.plugin.addimage.js"></script>

	<script type="text/javascript" src="webapp/jsPDF/jspdf.plugin.standard_fonts_metrics.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/jspdf.plugin.split_text_to_size.js"></script>
	<script type="text/javascript" src="webapp/jsPDF/jspdf.plugin.from_html.js"></script>

<script type="text/javascript">
            <?php global $current_user;
      get_currentuserinfo();
      echo 'var wpUserObject={"userLogin":"' . $current_user->user_login . '",';
      echo ' "userEmail":"' . $current_user->user_email . '",';
      echo ' "userFirstName":"' . $current_user->user_firstname . '",';
      echo ' "userLevel":"' . $current_user->user_level . '",';
      echo ' "userLastName":"' . $current_user->user_lastname . '",';
      echo ' "userDisplayName":"' . $current_user->display_name . '",';
      echo ' "userId":"' . $current_user->ID . '",';
      echo ' "sessionId":"' . session_id() . '"};';
?>
var appPath='webapp/';
</script>
<div id="appDiv" style="background-color:#eee; position:absolute; display:none;">
  <div id="preloadDiv" style="position:absolute; background-color:rgba(255,155,55,.5);"></div>

  <div id="contextDiv" class="workflow grid abs inset appSquare"></div>
  <div id="actionDiv" class="workflow grid abs inset appSquare"></div>

  <div id="cpaWrapper"  style="display:none;">
    <div id="appHeader">
      <div id="appWordmark">
        <div id="headerText">Core Passion Assessment</div>
      </div>
      <div id="appDirections">
        <div id="directionsDiv"><div class="playButtonDirections"  onclick="javascript:event.preventDefault(); event.target.style.opacity=.5; loadAndPlayAudioTitle('directions')"></div>Read the statement below. Indicate HOW OFTEN YOU FIND this quality through out your life, at any time, in any place, by selecting one of the options below. Click the NEXT button to read the next statement. There are 240 statements. If you need clarification on a statement, read the Dictionary definition at the bottom of the page. 
        </div>
      </div>
    </div>
    <div id="appContent" >
      <div id="appStatement">
        <h2>STATEMENT</h2>
        <div id="statementDiv">statementDiv</div>
      </div>
      <div id="appRatings" >
      </div>
      <div id="appCaption">
        <div id="captionDiv">captionDiv</div>
      </div>
      <div id="appDictionary">
        <h2>DICTIONARY</h2>
        <div id="dictionaryDiv">dictionaryDiv</div>
      </div>
    </div>
    <div id="appFooter">
      <div id="appProgress">
        <h2>PROGRESS</h2>
        <div id="progressDiv">progressDiv</div>
      </div>
      <div id="appNav" class="buttonBar">
        <!--<div class="leftButton prevIcon" id="prevDiv" onmousedown="prev()"></div>-->
        <div class="leftButton" id="muteButton" onmousedown="toggleAutoRead()">Mute</div>
        <div class="leftButton" id="speakButton" onmousedown="toggleAutoRead()">Speak</div>
        
        <div class="gapButton"></div>
        <div class="middleButton" id="graphButton" onclick="pdfActiveCpa()">Report</div>
        <div class="middleButton" id="completeButton" onclick="randomComplete()">Complete</div>
        <div class="middleButton" id="exitButton" onclick="showWorkflow()">Exit</div>
        <div class="gapButton"></div>
        <div class="rightButton nextIcon" id="nextDiv" onmousedown="next()"></div>
      </div>
    </div>
  </div><!-- end of cpaWrapper -->
  <canvas id="drawCanvas" onclick="hideGraph()" width=420 height=420 style="display:none; background-color:#aaa; margin:5px; float:right;"></canvas>
<!--
  <div id="spinner" style="display:none;"><img src="webapp/nav/please_wait.png"/></div>
  <div id="downloadpdf" style="display:none;"><a id="pdfData" href="" target="pdf"><img src="webapp/nav/downloadpdf.png"/></a></div>
-->
</div><!-- end of appDiv -->
  <div id="debugDiv" style="position:absolute; top:200px; left:0; background-color:rgba(255,255,255,.5); display:block;"></div>

<script  type='text/javascript' src='webapp/webapp.js?<?php echo rand(); ?>'></script>
<!-- end pixiedust code -->


<?php get_footer(); ?>