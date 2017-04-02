import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import {Women} from '../imports/api/women.js';
Meteor.startup(function() {  
	GoogleMaps.load();


});

// Template.hello.onCreated(function helloOnCreated() {
// 	// counter starts at 0
// 	this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
// 	counter() {
// 		return Template.instance().counter.get();
// 	},
// });

// Template.hello.events({
// 	'click button'(event, instance) {
// 		// increment the counter when button is clicked
// 		instance.counter.set(instance.counter.get() + 1);
// 	},
// });

Template.map.helpers({  
	geolocationError: function() {
		var error = Geolocation.error();
		return error && error.message;
	},
	mapOptions: function() {
		var latLng = Geolocation.latLng();
		// Initialize the map once we have the latLng.
		if (GoogleMaps.loaded() && latLng) {
			return {
				center: new google.maps.LatLng(latLng.lat, latLng.lng),
				zoom:1 
			};
		}
	}
});

Template.map.onCreated(function() {  
	GoogleMaps.ready('map', function(map) {
	var women=Women.find({}).collection._docs._map;
		
				for (var woman in women){
					var myinfowindow = new google.maps.InfoWindow({
    content: women[woman].name
});
				marker = new google.maps.Marker({
				position: new google.maps.LatLng(women[woman].lat,women[woman].lon),
				map: map.instance,
					infowindow:myinfowindow
			});	

google.maps.event.addListener(marker, 'click', function() {
        this.infowindow.open(map, this);

});


					;}
	});
});
