function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();
}

function createPR(){
  var body = DocumentApp.getActiveDocument().getBody();
  var Number = body.getNumChildren()

  for(var Numero = 0 ; Numero < Number ; Numero+=1){
    var child = body.getChild(Numero)
    var ParagraphHeading = child.getHeading()
    
    DocumentApp.getUi().alert(child.getType() + " / " + ParagraphHeading + " : \"\ " + child.asText().getText() + " \"\ " )
  }
}
