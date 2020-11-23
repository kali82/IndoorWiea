var mapwizeMap = null;
var apiKey = '944d933343f9d9fd9ef4049c573ef9cc';
var modeId = '5da6bec9aefa100010c7df67';
var wieaVenueId = '5c880286eb855e00163b5fb2';
// var demoVenueId = '56c2ea3402275a0b00fb00ac';
var mapwizePlaceId = '5d08d8a4efe1d20012809ee5';
var receptionPlaceId = '569f8d7cb4d7200b003c32a1';

window.onload = function () {
  MapwizeUI.apiKey(apiKey);
  MapwizeUI.Api.getDirection({
    from: { placeId: receptionPlaceId },
    to: { placeId: mapwizePlaceId }
  }).then(function (direction) {
    MapwizeUI.map({ 
      // Also works
      // container: 'mapwize', 
      apiKey: apiKey,
      // direction: direction,
      // centerOnPlaceId: mapwizePlaceId,
      centerOnVenueId: wieaVenueId,
      // restrictContentToOrganizationId: '',
      // restrictContentToVenueId: euratechnologieVenueId,
      restrictContentToVenueIds: [wieaVenueId],
      mainColor: '#fca903',
      // hideMenu: true,
      // onDirectionQueryWillBeSent: function (query) { return query; },
      // onDirectionWillBeDisplayed: function (direction, options) { return { direction: direction, options: options }; },
      // onSearchQueryWillBeSent: function (searchString, searchOptions) { return { searchString: searchString, searchOptions: searchOptions }; },
      // onSearchResultWillBeDisplayed: function (results) { return results; },
      onInformationButtonClick: function (e) {
        console.log('onInformationButtonClick', e);
        alert('onInformationButtonClick ' + e.name);
      },
      onMenuButtonClick: function (e) {
        console.log('onMenuButtonClick');
        alert('onMenuButtonClick');
      }
    }).then(function (instance) {
      console.log('MAP LOADED');
      mapwizeMap = instance;
    });
  });
};

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
function setSelected() {
  mapwizeMap.setSelected(mapwizePlaceId);
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

function setUserLocation(floor) {
  mapwizeMap.setUserLocation({
    latitude: 50.63262,
    longitude: 3.02045,
    floor: floor
  });
}

function remove() {
  mapwizeMap.remove();
}

