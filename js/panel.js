google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(51.928570,7.669107),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new KidixPlaceDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  new storeLocator.Panel(panelDiv, {
    view: view,
    locationSearchLabel: "Wo befinden Sie sich?"
  });

  storeLocator.Panel.prototype.selectedStore_changed = function() {
    $('.highlighted', this.storeList_).removeClass('highlighted');

    var that = this;
    var store = this.get('selectedStore');
    if (!store) {
      return;
    }
    this.directionsTo_ = store;
    this.storeList_.find('#store-' + store.getId()).addClass('highlighted');

    if (this.settings_['directions']) {
      this.directionsPanel_.find('.directions-to')
        .val(store.getDetails().title);
    }

    var node = that.get('view').getInfoWindow().getContent();
  };

});
