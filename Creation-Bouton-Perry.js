function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();
}

function createPR(){
  var doc = DocumentApp.getActiveDocument()
  
  var markdown = DocumentToMarkdown(doc)
  
  DocumentApp.getUi().alert(markdown)
  
  // sendMarkdownToGithub(repo, markdown, filename)
}


function DocumentToMarkdown(gdoc){
  var body = gdoc.getBody();
  var Number = body.getNumChildren()
  
  var allMarkdown = '';
  
  for(var Numero = 0 ; Numero < Number ; Numero+=1){
    var parChild = body.getChild(Numero)
    allMarkdown += ParagraphToMarkdown(parChild)
  }
  
  return allMarkdown;
} 


/*
  Function that transforms a Paragraph object into a markdown string
*/
function ParagraphToMarkdown(aParagraph){
  var paragraphMarkdown = '';
  
  var paragraphHeading = aParagraph.getHeading()

  // Handle heading level
  if(paragraphHeading === DocumentApp.ParagraphHeading.TITLE){
    paragraphMarkdown = paragraphMarkdown + '\n' + '# '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.SUBTITLE){
    paragraphMarkdown = paragraphMarkdown + '\n' + '## '
  } 
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING1){
    paragraphMarkdown = paragraphMarkdown + '\n' + '### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING2){
    paragraphMarkdown = paragraphMarkdown + '\n' + '#### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING3){
    paragraphMarkdown = paragraphMarkdown + '\n' + '##### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING4){
    paragraphMarkdown = paragraphMarkdown + '\n' + '###### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING5){
    paragraphMarkdown = paragraphMarkdown + '\n' + '###### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING6){
    paragraphMarkdown = paragraphMarkdown + '\n' + '###### '
  }
  if(paragraphHeading === DocumentApp.ParagraphHeading.NORMAL){
    paragraphMarkdown = paragraphMarkdown + '\n';
  }
  
  // transform inline text as markdown
  var paragraphTextMarkdown = '';
  
  var grandChildrenNumber = aParagraph.getNumChildren();
  
  if(grandChildrenNumber >= 1){
    // assume it's a Text child
    var textObject = aParagraph.getChild(0)
    paragraphTextMarkdown = TextToMarkdown(textObject);  
  }
  
  paragraphMarkdown += paragraphTextMarkdown;
  
  return paragraphMarkdown;
}


/*
  Function that transforms a Text object from a Google Doc into a markdown string
*/
function TextToMarkdown(gDocText){
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

