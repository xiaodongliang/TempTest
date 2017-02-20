 
var _viewer; 
var viewerApp; 

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
      var viewables = viewerApp.bubble.search({
        'type': 'geometry'
      });
      if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
      }
      // Choose any of the avialble viewables
      viewerApp.selectItem(viewables[0].data);
      viewer = viewerApp.getViewer();

      viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, 
          function(){
            viewer.loadExtension('Autodesk.ADN.Viewing.Extension.AxisHelper');
        });
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
