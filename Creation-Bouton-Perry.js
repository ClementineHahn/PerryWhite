function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();
}

function createPR(){
  var body = DocumentApp.getActiveDocument().getBody();
  var firstChild = body.getChild(0)
  DocumentApp.getUi().alert("*Type du 1stchild* sa mère" + ": " + firstChild.getType() + " // *Contenu du 1st child* la pute: " + firstChild.asText().getText())
}
