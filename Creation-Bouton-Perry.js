function onOpen() {
    DocumentApp.getUi().createMenu('Bonjour Perry').addItem('Créer une PR', 'createPR')
.addToUi();

}

function createPR () {
 // Logger.log('coucou') 
 // Logger.log(1+2)
  DocumentApp.getUi().alert('Tu as créé un bouton qui fait une action simple ! Bravo !')
}
