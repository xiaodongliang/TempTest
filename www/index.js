 
var _viewer; 
var viewerApp; 
var viewables;
var indexViewable;

function loadView(urn)
{
	var token = $('#inputToken').val(); 
 
    var options = {
        env: 'AutodeskProduction',
        accessToken: token
    };

    Autodesk.Viewing.Initializer(options, function onInitialized(){
  
		  viewerApp = new Autodesk.Viewing.ViewingApplication(
		    'viewerDiv');
		  
		  viewerApp.registerViewer(
		    viewerApp.k3D, 
		    Autodesk.Viewing.Private.GuiViewer3D);
		  
		  viewerApp.loadDocument(urn,onDocumentLoadSuccess);
	}); 
         
}

 function onDocumentLoadSuccess(doc) {

      var viewer = viewerApp.getCurrentViewer();
      viewables = viewerApp.bubble.search({
        'type': 'geometry'
      });
      if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
      }
      
      // Choose any of the avialble viewables
      indexViewable = 1; // gets incremented in loadNextModel()
      loadNextModel();
 }

 function loadNextModel() {
    // Next viewable index. Loop back to 0 when overflown.
    indexViewable = (indexViewable + 1) % viewables.length;
    viewerApp.selectItem(viewables[indexViewable].data);
    viewer = viewerApp.getViewer();
}

function onItemSelected(evt){
	 
}

$(document).ready(function () {

    var urn = $('#inputUrn').val(); 

    loadView(urn); 
});


function onError(error) {
    console.log('Error: ' + error);
};
