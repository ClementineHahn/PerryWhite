function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();
}

function createPR(){
  var body = DocumentApp.getActiveDocument().getBody();
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
      
      var textString = textObject.getText();
      
      var currentURLLink = undefined;
      var currentLinkText = undefined;
      
      for(var i=0 ; i<textString.length ; i++){
        var characterLink = textObject.getLinkUrl(i);
        
        var currentCharacter = textString[i];
        
        if(!characterLink){ // no link
          if(currentURLLink){ // end of previous link
            var linkMarkdown = '['+currentLinkText+']('+currentURLLink+')'
            paragraphTextMarkdown += linkMarkdown;
            
            currentLinkText = undefined
            currentURLLink = undefined
          }
          
          paragraphTextMarkdown += currentCharacter;
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
              paragraphTextMarkdown += linkMarkdown;
              
              // tracker le nouveau lien
              currentLinkText = currentCharacter
              currentURLLink = characterLink
            }
          } 
        }
      }
      
      if(currentLinkText && currentURLLink){
        var linkMarkdown = '['+currentLinkText+']('+currentURLLink+')'
        paragraphTextMarkdown += linkMarkdown;
      }
      
    }
    
    allText += paragraphTextMarkdown;
    
    // DocumentApp.getUi().alert()
    console.log(child.getType() + " / " + paragraphHeading + " : \"\ " + child.asText().getText() + " \"\ " )
  } 
  
  DocumentApp.getUi().alert(allText)
}


