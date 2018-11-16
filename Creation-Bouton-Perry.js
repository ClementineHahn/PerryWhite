function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();
}


function createPR(){
  var doc = DocumentApp.getActiveDocument()
  
  var markdown = GDocToMarkdown(doc)
  
  DocumentApp.getUi().alert(markdown)
  
  // sendMarkdownToGithub(repo, markdown, filename)
}



function gDocTextToMarkdown(gDocText){
  var gDocTextMarkdown = '';
  
  var textString = gDocText.getText();
      
  var currentURLLink = undefined;
  var currentLinkText = undefined;
  
  for(var i=0 ; i<textString.length ; i++){
    var characterLink = gDocText.getLinkUrl(i);
    
    var currentCharacter = textString[i];
    
    if(!characterLink){ // no link
      if(currentURLLink){ // end of previous link
        var linkMarkdown = '['+currentLinkText+']('+currentURLLink+')'
        gDocTextMarkdown += linkMarkdown;
        
        currentLinkText = undefined
        currentURLLink = undefined
      }
      
      gDocTextMarkdown += currentCharacter;
    }
    else{ // link
      if(!currentURLLink){ // there was no link being tracked
        currentLinkText = currentCharacter
        currentURLLink = characterLink
      }
      else{ // previous link being tracked
        if(characterLink === currentURLLink){ // same link
          currentLinkText += currentCharacter
        }
        else{ // different link
          // créer le lien en markdown
          var linkMarkdown = '['+currentLinkText+']('+currentURLLink+')'
          gDocTextMarkdown += linkMarkdown;
          
          // tracker le nouveau lien
          currentLinkText = currentCharacter
          currentURLLink = characterLink
        }
      } 
    }
  }
  
  if(currentLinkText && currentURLLink){
    var linkMarkdown = '['+currentLinkText+']('+currentURLLink+')'
    gDocTextMarkdown += linkMarkdown;
  }

  return gDocTextMarkdown;
}


/*
  Function that transforms a Google Doc into a markdown string
*/
function GDocToMarkdown(gdoc){
  var body = gdoc.getBody();
  
  var Number = body.getNumChildren()
  
  var allText = '';

  for(var Numero = 0 ; Numero < Number ; Numero+=1){
    var child = body.getChild(Numero)
    var paragraphHeading = child.getHeading()

    // Handle heading level
    if(paragraphHeading === DocumentApp.ParagraphHeading.TITLE){
      allText = allText + '\n' + '# '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.SUBTITLE){
      allText = allText + '\n' + '## '
    } 
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING1){
      allText = allText + '\n' + '### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING2){
      allText = allText + '\n' + '#### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING3){
      allText = allText + '\n' + '##### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING4){
      allText = allText + '\n' + '###### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING5){
      allText = allText + '\n' + '###### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING6){
      allText = allText + '\n' + '###### '
    }
    if(paragraphHeading === DocumentApp.ParagraphHeading.NORMAL){
      allText = allText + '\n';
    }
    
    // transform inline text as markdown
    var paragraphTextMarkdown = '';
      
    var grandChildrenNumber = child.getNumChildren();
    
    if(grandChildrenNumber >= 1){
      var textObject = child.getChild(0)
      paragraphTextMarkdown = gDocTextToMarkdown(textObject);  
    }
    
    allText += paragraphTextMarkdown;
  } 
  
  return allText;
}
