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
    var ParagraphHeading = child.getHeading()
    
    allText = allText + '\n' + child.asText().getText()
    
    // DocumentApp.getUi().alert()
    //console.log(child.getType() + " / " + ParagraphHeading + " : \"\ " + child.asText().getText() + " \"\ " )
  } 
  
  console.log(allText)
}
