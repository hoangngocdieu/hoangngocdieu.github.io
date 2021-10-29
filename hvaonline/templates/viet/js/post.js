// bbCode control by
// subBlue design
// www.subBlue.com

// Startup variables
var imageTag = false;
var theSelection = false;
var pollOptionCount = -1;
var answerOptionCount = -1;

// Check for Browser & Platform for PC & IE specific bits
// More details from: http://www.mozilla.org/docs/web-developer/sniffer/browser_type${extension}
var clientPC = navigator.userAgent.toLowerCase(); // Get client info
var clientVer = parseInt(navigator.appVersion); // Get browser version

var is_ie = ((clientPC.indexOf("msie") != -1) && (clientPC.indexOf("opera") == -1));
var is_nav  = ((clientPC.indexOf('mozilla')!=-1) && (clientPC.indexOf('spoofer')==-1)
                && (clientPC.indexOf('compatible') == -1) && (clientPC.indexOf('opera')==-1)
                && (clientPC.indexOf('webtv')==-1) && (clientPC.indexOf('hotjava')==-1));

var is_win   = ((clientPC.indexOf("win")!=-1) || (clientPC.indexOf("16bit") != -1));
var is_mac    = (clientPC.indexOf("mac")!=-1);


// Define the bbCode tags
bbcode = new Array();
bbtags = new Array('[b]','[/b]','[i]','[/i]','[u]','[/u]','[quote]','[/quote]','[code]','[/code]','[list]','[/list]','[list2]','[/list2]','[img]','[/img]','[url]','[/url]');
imageTag = false;

var openBBtags = new Array();

function tmOpenTag(eltag) {
   if (bbtags[eltag+1] != '') {
      openBBtags[openBBtags.length] = eltag;
      //Add '*' in the button's text:
      eval('document.post.addbbcode'+eltag+'.value += "*"');
   }
}

function tmQuitTag(eltag) {
   for (i = 0; i < openBBtags.length; i++) {
      if (openBBtags[i] == eltag) {
         openBBtags.splice(i, 1);
         //Remove '*' from the button's text:
         buttext = eval('document.post.addbbcode' + eltag + '.value');
         eval('document.post.addbbcode' + eltag + '.value ="' + buttext.substr(0,(buttext.length - 1)) + '"');
      }
   }
}

function tmIsTagOpen(eltag) {
   var tag = 0;
   for (i = 0; i < openBBtags.length; i++) {
      if (openBBtags[i] == eltag) { tag++; }
   }
   if (tag > 0) { return true;   } else { return false; }
}

function tmCloseTags() {
   var count = openBBtags.length;
   for (n = 0; n < count; n++) { bbstyle(openBBtags[openBBtags.length - 1]); }
}

// Shows the help messages in the helpline window
function helpline(help) {
	document.post.helpbox.value = eval(help + "_help");
}


// Replacement for arrayname.length property
function getarraysize(thearray) {
	for (i = 0; i < thearray.length; i++) {
		if ((thearray[i] == "undefined") || (thearray[i] == "") || (thearray[i] == null))
			return i;
		}
	return thearray.length;
}

// Replacement for arrayname.push(value) not implemented in IE until version 5.5
// Appends element to the array
function arraypush(thearray,value) {
	thearray[ getarraysize(thearray) ] = value;
}

// Replacement for arrayname.pop() not implemented in IE until version 5.5
// Removes and returns the last element of an array
function arraypop(thearray) {
	thearraysize = getarraysize(thearray);
	retval = thearray[thearraysize - 1];
	delete thearray[thearraysize - 1];
	return retval;
}

function emoticon(text) {
   text = ' ' + text;
   bbfontstyle(text,'');
   return;
}

function bbfontstyle(bbopen,bbclose) {
var txtarea = document.post.message;

//IE
if (document.selection)
  { txtarea.focus();
    sel = document.selection.createRange();
    sel.text = bbopen+sel.text+bbclose;
  }
//Mozilla-Netscape
else if (txtarea.selectionStart || txtarea.selectionStart == '0') {
   var startPos = txtarea.selectionStart;
   var endPos = txtarea.selectionEnd;
   var cursorPos = endPos;
   var scrollTop = txtarea.scrollTop;

   if (startPos != endPos) {
      txtarea.value = txtarea.value.substring(0, startPos)
                 + bbopen
                 + txtarea.value.substring(startPos, endPos)
                 + bbclose
                 + txtarea.value.substring(endPos, txtarea.value.length);
      cursorPos += bbopen.length + bbclose.length;
   }
   else {

         txtarea.value = txtarea.value.substring(0, startPos)
                  + bbopen+' '+bbclose
                  + txtarea.value.substring(endPos, txtarea.value.length);
      cursorPos = startPos + bbopen.length+bbclose.length+1;
   }
   txtarea.focus();
   // txtarea.selectionStart = cursorPos;
   txtarea.selectionStart = startPos;
   txtarea.selectionEnd = cursorPos;
   txtarea.scrollTop = scrollTop;
}
 else {   txtarea.value += bbopen+' '+bbclose;
   txtarea.focus();
    }
	
// restore default index, by CTVL
  	switch(bbclose)
   {
   case '[/color]':    
     document.post.addbbcode18.selectedIndex = 0; // mau chu: mac dinh
     break;
   case '[/size]':
     document.post.addbbcode20.selectedIndex = 2; // co chu: binh thuong
     break;
   default:;
   }
   var xy = getScrollXY(document.post.message);
   
}
 
 
 function bbstyle(eltag) {
   var txtarea = document.post.message;

   if (eltag == -1) { tmCloseTags(); return; }

   //IE
   if (document.selection) {
      
	  txtarea.focus();
       sel = document.selection.createRange(); // Get text selection
	   
      if (sel.text.length > 0) { sel.text = bbtags[eltag] + sel.text + bbtags[eltag+1]; }
      else {
            if (!tmIsTagOpen(eltag) || bbtags[eltag+1] == '') {
            sel.text = bbtags[eltag];
            tmOpenTag(eltag);
          }
          else {
               sel.text = bbtags[eltag+1];
               tmQuitTag(eltag);
               }
      }
      txtarea.focus(); 
   }
   //Mozilla-Netscape
   else if (txtarea.selectionStart || txtarea.selectionStart == '0') {
      var startPos = txtarea.selectionStart;
      var endPos = txtarea.selectionEnd;
      var cursorPos = endPos;
      var scrollTop = txtarea.scrollTop;

      if (startPos != endPos) {
         txtarea.value = txtarea.value.substring(0, startPos)
                       + bbtags[eltag]
                       + txtarea.value.substring(startPos, endPos)
                       + bbtags[eltag+1]
                       + txtarea.value.substring(endPos, txtarea.value.length);
         cursorPos += bbtags[eltag].length + bbtags[eltag+1].length;
      }
      else {
         if (!tmIsTagOpen(eltag) || bbtags[eltag+1] == '') {
            txtarea.value = txtarea.value.substring(0, startPos)
                          + bbtags[eltag]
                          + txtarea.value.substring(endPos, txtarea.value.length);
            tmOpenTag(eltag);
            cursorPos = startPos + bbtags[eltag].length;
         }
         else {
            txtarea.value = txtarea.value.substring(0, startPos)
                          + bbtags[eltag+1]
                          + txtarea.value.substring(endPos, txtarea.value.length);
            tmQuitTag(eltag);
            cursorPos = startPos + bbtags[eltag+1].length;
         }
      }
      txtarea.focus();
      txtarea.selectionStart = cursorPos;
      txtarea.selectionEnd = cursorPos;
      txtarea.scrollTop = scrollTop;
   }
   else {
      if (!tmIsTagOpen(eltag) || bbtags[eltag+1] == '') {
         txtarea.value += bbtags[eltag];
         tmOpenTag(eltag);
      }
      else {
         txtarea.value += bbtags[eltag+1];
         tmQuitTag(eltag);
      }
      txtarea.focus();
   }
}
 
 
 function getScrollXY(obj) { // CTVL
   var scrOfX = 0, scrOfY = 0;
   if( typeof( obj.pageYOffset ) == 'number' ) {
     //Netscape compliant
     scrOfY = obj.pageYOffset;
     scrOfX = obj.pageXOffset;
   } else if( obj && ( obj.scrollLeft || obj.scrollTop ) ) {
     //DOM compliant
     scrOfY = obj.scrollTop;
     scrOfX = obj.scrollLeft;
   } else if( obj.documentElement && ( obj.documentElement.scrollLeft || obj.documentElement.scrollTop ) ) {
     //IE6 standards compliant mode
     scrOfY = obj.documentElement.scrollTop;
     scrOfX = obj.documentElement.scrollLeft;
   }
   return [ scrOfX, scrOfY ];
 }
 function setScrollXY(obj, xy) { // CTVL
   obj.scrollTop = xy[1];
   obj.scrollLeft = xy[0];
 }



// Insert at Claret position. Code from
// http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130
function storeCaret(textEl) {
	if (textEl.createTextRange) textEl.caretPos = document.selection.createRange().duplicate();
}

function previewMessage()
{
	var f = document.post;

	if (supportAjax()) {
		var p = { 
			text:f.message.value, 
			subject:f.subject.value, 
			htmlEnabled:!f.disable_html.checked, 
			bbCodeEnabled:!f.disable_bbcode.checked, 
			smiliesEnabled:!f.disable_smilies.checked 
		};

		AjaxUtils.previewPost(p, previewCallback);
	}
	else {
		f.preview.value = "1";
		f.submit();
	}
}

function previewCallback(post)
{
	document.getElementById("previewSubject").innerHTML = post.subject;
	document.getElementById("previewMessage").innerHTML = post.text;

	document.getElementById("previewTable").style.display = '';
	document.location = "#preview";
}


function deletePollOption(button)
{
	initPollOptionCount();
	
	var node = button.parentNode;
	while (node != null) {
		if (node.id == "pollOption") {
			node.parentNode.removeChild(node);
			break;
		}

		node = node.parentNode;
	}
}

function addPollOption()
{
	initPollOptionCount();
	incrementPollOptionCount();

	var addOption = document.getElementById("pollOptionWithAdd");
	var deleteOption = document.getElementById("pollOptionWithDelete");
	var newOption = deleteOption.cloneNode(true);
	
	if (is_nav) {
		newOption.style.display = "table-row";
	} 
	else {
		newOption.style.display = "block";
	}
	
	newOption.id = "pollOption";
	
	var newTextField = newOption.getElementsByTagName("input")[0];
	var addTextField = newOption.getElementsByTagName("input")[1];
	
	//copy the active text data to the inserted option
	newTextField.id = "pollOption" + pollOptionCount;
	newTextField.name = "poll_option_" + pollOptionCount;
	newTextField.value = "";
	
	//clear out the last text field and increment the id
	addTextField.id = "pollOption" + pollOptionCount;
	addTextField.name = "poll_option_" + pollOptionCount;
	
	addOption.parentNode.insertBefore(newOption, addOption);
	addTextField.focus();
}

function incrementPollOptionCount()
{
	pollOptionCount++;
	document.getElementById("pollOptionCount").value = pollOptionCount;
}

function initPollOptionCount()
{
	if (pollOptionCount == -1) {
		var countField = document.getElementById("pollOptionCount");
		
		if (countField != null) {
			pollOptionCount = parseInt(countField.value);
		} 
		else {
			pollOptionCount = 1;
		}
	}
}


function deleteAnswerOption(button)
{
	initAnswerOptionCount();
	
	var node = button.parentNode;
	while (node != null) {
		if (node.id == "answerOption") {
			node.parentNode.removeChild(node);
			break;
		}

		node = node.parentNode;
	}
}

function addAnswerOption()
{
	initAnswerOptionCount();
	incrementAnswerOptionCount();

	var addAnswerOption = document.getElementById("answerOptionWithAdd");
	var deleteAnswerOption = document.getElementById("answerOptionWithDelete");
	var newAnswerOption = deleteAnswerOption.cloneNode(true);
	
	if (is_nav) {
		newAnswerOption.style.display = "table-row";
	} 
	else {
		newAnswerOption.style.display = "block";
	}
	
	newAnswerOption.id = "answerOption";
	
	var newAnswerTextField = newAnswerOption.getElementsByTagName("input")[0];
	var addAnswerTextField = newAnswerOption.getElementsByTagName("input")[1];
	
	//copy the active text data to the inserted option
	newAnswerTextField.id = "answerOption" + answerOptionCount;
	newAnswerTextField.name = "answer_option_" + answerOptionCount;
	newAnswerTextField.value = "";
	
	//clear out the last text field and increment the id
	addAnswerTextField.id = "answerOption" + answerOptionCount;
	addAnswerTextField.name = "answer_option_" + answerOptionCount;
	
	addAnswerOption.parentNode.insertBefore(newAnswerOption, addAnswerOption);
	addAnswerTextField.focus();
}

function incrementAnswerOptionCount()
{
	answerOptionCount++;
	document.getElementById("answerOptionCount").value = answerOptionCount;
}

function initAnswerOptionCount()
{
	if (answerOptionCount == -1) {
		var cField = document.getElementById("answerOptionCount");
		
		if (cField != null) {
			answerOptionCount = parseInt(cField.value);
		} 
		else {
			answerOptionCount = 1;
		}
	}
}

function actionName() {	
	if (document.pressed == 'addCategory')
	{
		document.category.action ="addCategory";
	}
	else if (document.pressed == 'editCategory')
	{
		document.category.action ="editCategory";
	}
	else if (document.pressed == 'removeCategory')
	{
		document.category.action ="removeCategory";
	}
  return true;
}
