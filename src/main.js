var mapwizeMap = null;
var apiKey = '944d933343f9d9fd9ef4049c573ef9cc';
var modeId = '5da6bec9aefa100010c7df67';
var wieaVenueId = '5c880286eb855e00163b5fb2';
var mapwizePlaceId = '5d08d8a4efe1d20012809ee5';
var receptionPlaceId = '569f8d7cb4d7200b003c32a1';
var selectedSidebar = false;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var cloakroomId = '5c891ac8aa5c17001694b3bf';
var lastResult;
var html5QrcodeScanner
window.onload = function () {
  
  
   html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 750 }, /* verbose= */ true);
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  MapwizeUI.apiKey(apiKey);
  MapwizeUI.Api.getDirection({
    from: { placeId: receptionPlaceId },
    to: { placeId: mapwizePlaceId }
  }).then(function (direction) {
    MapwizeUI.map({ 
      // container: 'mapwize', 
      apiKey: apiKey,
      // direction: direction,
       //centerOnPlaceId: cloakroomId,
      centerOnVenueId: wieaVenueId,
      // restrictContentToOrganizationId: '',
      // restrictContentToVenueId: euratechnologieVenueId,
      restrictContentToVenueIds: [wieaVenueId],
      mainColor: '#fca903',
      // hideMenu: true,
      // onDirectionQueryWillBeSent: function (query) { return query; },
       onDirectionWillBeDisplayed: function (direction, options) { return { direction: direction, options: options }; },
       onSearchQueryWillBeSent: function (searchString, searchOptions) { return { searchString: searchString, searchOptions: searchOptions }; },
       onSearchResultWillBeDisplayed: function (results) { return results; },
       onSelectedChange: onSelectedChange,  

      onInformationButtonClick: function (e) {
        console.log('onInformationButtonClick', e);
        alert('onInformationButtonClick ' + e.name);
      },
      onMenuButtonClick: function (e) {
        if(!selectedSidebar){
          document.getElementById("mySidenav").style.width = "250px";
          console.log(document.getElementById("mySidenav"));
          selectedSidebar = true;
        } else {
          document.getElementById("mySidenav").style.width = "0";
          selectedSidebar = false;
        }
   
      }
    }).then(function (instance) {
      console.log('MAP LOADED');
      mapwizeMap = instance;
      // mapwizeMap.addMarkerOnPlace(mapwizeSourceKey, myCustomMarker).then(function (marker) {
      //   // Marker as been added on map
      //   console.log(marker);
      // }).catch(function (err) {
      //   return console.error('addMarker failed', err);
      // });
    });
  });
};

function centerOnPlaceId(id) {
  mapwizeMap.centerOnPlace(id);
  MapwizeUI.Api.getPlace(id).then(place => {
    place.objectClass = 'place';
    mapwizeMap.setFrom(place);
  });
  setDirectionMode()
}

function setDirectionMode() {
  mapwizeMap.setDirectionMode().catch(() => null)
}
function getModes() {
  console.log(mapwizeMap.getModes());
}
function getMode() {
  console.log(mapwizeMap.getMode());
}
function setMode() {
  mapwizeMap.setMode(modeId);
}
function getSelected() {
  console.log(mapwizeMap.getSelected());
}
function setSelected(placeId) {
  mapwizeMap.setSelected(placeId);
}
function getAllLocales() {
  console.log(mapwizeMap.getLocales());
}
function setFrLocale() {
  mapwizeMap.setLocale('fr');
}
function setEnLocale() {
  mapwizeMap.setLocale('en');
}
function getUnits() {
  console.log(mapwizeMap.getUnits());
}
function setMunit() {
  mapwizeMap.setUnit('m');
}
function setFunit() {
  mapwizeMap.setUnit('ft');
}

function setFrom() {
  MapwizeUI.Api.getPlace(mapwizePlaceId).then(place => {
    place.objectClass = 'place';
    mapwizeMap.setFrom(place);
  });
}
function setTo() {
  MapwizeUI.Api.getPlace(receptionPlaceId).then(place => {
    place.objectClass = 'place';
    mapwizeMap.setTo(place);
  });
}
function onSelectedChange(e) {
  console.log(e);
  if (e) {
    console.log('dupa');
  	const currentFloor = mapwizeMap.getFloor();

      	mapwizeMap.setSelected(e._id);
        // mapwizeMap.setFloor(e.goTo);

      //mapwizeMap.setDirectionMode();
      console.log(e)
      //mapwizeMap.setFrom(mapwizeSourcePlaceObject);
      // mapwizeMap.setTo(e);
    }
  }

function setUserLocation(latitude,longitude ) {
  mapwizeMap.setUserLocation({
    latitude: latitude,
    longitude: longitude,
    floor: 0 // 0 as default
  });
}

function remove() {
  mapwizeMap.remove();
}
function onScanSuccess(qrMessage) {
		
    
    var obj = JSON.parse(qrMessage);

    modal.style.display = "none";
    html5QrcodeScanner.clear().then(()=> {
      console.log(obj.latitude);
      centerOnPlaceId(obj.id)
      setUserLocation(obj.latitude, obj.longitude);
      html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 750 }, /* verbose= */ true);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }
    );

  
}

function onScanFailure(error) {
	//console.warn(`QR error = ${error}`);
}
function showModal() {
	// handle scan failure, usually better to ignore and keep scanning
  modal.style.display = "block";
  document.getElementById("mySidenav").style.width = "0";
          selectedSidebar = false;
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

}
span.onclick = function() {
  modal.style.display = "none";

}
