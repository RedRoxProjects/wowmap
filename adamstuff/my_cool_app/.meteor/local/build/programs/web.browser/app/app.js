var require = meteorInstall({"client":{"main.html":["./template.main.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// client/main.html                                                                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.exports = require("./template.main.js");                                                                // 1
                                                                                                               // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"template.main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// client/template.main.js                                                                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
                                                                                                               // 1
Template.body.addContent((function() {                                                                         // 2
  var view = this;                                                                                             // 3
  return [ HTML.Raw('<div class="header">\n    <button class="mbutton">Add me to the map!</button>\n    <h1>Welcome to the World of Women in Tech</h1>\n  </div>\n\n<div>\n  <p>Find awesome women in STEM from all around the globe by exploring our World of WiT (Women in Technology) map.</p>\n</div>\n\n  '), Spacebars.include(view.lookupTemplate("map")), HTML.Raw('\n\n<div class="form">\n  <form class="newoman">\n      <label for="fname">My Name is</label>\n      <input type="text" id="nam" name="myname" placeholder="Your name..">\n      <label for="city"> my location is</label>\n      <input type="text" id="city" name="mycity" placeholder="Your City.."> \n      <input type="submit" value="Add me to the map!">\n   \n  </form>\n</div>\n\n<footer class="footer">\n  <h2>Women inspiring EVERYONE</h2>\n    <p class="sign">Created by <a href="http://github.com/Surfad">Adam</a>, <a href="http://github.com/pzach"> Peter</a> and <a href="http://github.com/dickensa">Amy</a>\n    </p>\n</footer>') ];
}));                                                                                                           // 5
Meteor.startup(Template.body.renderToDocument);                                                                // 6
                                                                                                               // 7
Template.__checkName("map");                                                                                   // 8
Template["map"] = new Template("Template.map", (function() {                                                   // 9
  var view = this;                                                                                             // 10
  return HTML.DIV({                                                                                            // 11
    class: "map-container"                                                                                     // 12
  }, "\n    ", Blaze.Unless(function() {                                                                       // 13
    return Spacebars.call(view.lookup("geolocationError"));                                                    // 14
  }, function() {                                                                                              // 15
    return [ "\n      ", Blaze._TemplateWith(function() {                                                      // 16
      return {                                                                                                 // 17
        name: Spacebars.call("map"),                                                                           // 18
        options: Spacebars.call(view.lookup("mapOptions"))                                                     // 19
      };                                                                                                       // 20
    }, function() {                                                                                            // 21
      return Spacebars.include(view.lookupTemplate("googleMap"));                                              // 22
    }), "\n    " ];                                                                                            // 23
  }, function() {                                                                                              // 24
    return [ "\n      Geolocation failed: ", Blaze.View("lookup:geolocationError", function() {                // 25
      return Spacebars.mustache(view.lookup("geolocationError"));                                              // 26
    }), "\n    " ];                                                                                            // 27
  }), "\n  ");                                                                                                 // 28
}));                                                                                                           // 29
                                                                                                               // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["meteor/templating","meteor/reactive-var","./main.html","../imports/api/women.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// client/main.js                                                                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
var Template = void 0;                                                                                         // 1
module.import('meteor/templating', {                                                                           // 1
	"Template": function (v) {                                                                                    // 1
		Template = v;                                                                                                // 1
	}                                                                                                             // 1
}, 0);                                                                                                         // 1
var ReactiveVar = void 0;                                                                                      // 1
module.import('meteor/reactive-var', {                                                                         // 1
	"ReactiveVar": function (v) {                                                                                 // 1
		ReactiveVar = v;                                                                                             // 1
	}                                                                                                             // 1
}, 1);                                                                                                         // 1
module.import('./main.html');                                                                                  // 1
var Women = void 0;                                                                                            // 1
module.import('../imports/api/women.js', {                                                                     // 1
	"Women": function (v) {                                                                                       // 1
		Women = v;                                                                                                   // 1
	}                                                                                                             // 1
}, 3);                                                                                                         // 1
Meteor.startup(function () {                                                                                   // 5
	GoogleMaps.load({                                                                                             // 6
		key: "AIzaSyDIB1UZP3aXcXs7XwYndOpJWI6Spe2K-Nk"                                                               // 6
	});                                                                                                           // 6
	var mappy;                                                                                                    // 7
}); // Template.hello.onCreated(function helloOnCreated() {                                                    // 9
// 	// counter starts at 0                                                                                     // 12
// 	this.counter = new ReactiveVar(0);                                                                         // 13
// });                                                                                                         // 14
// Template.hello.helpers({                                                                                    // 16
// 	counter() {                                                                                                // 17
// 		return Template.instance().counter.get();                                                                 // 18
// 	},                                                                                                         // 19
// });                                                                                                         // 20
// Template.hello.events({                                                                                     // 22
// 	'click button'(event, instance) {                                                                          // 23
// 		// increment the counter when button is clicked                                                           // 24
// 		instance.counter.set(instance.counter.get() + 1);                                                         // 25
// 	},                                                                                                         // 26
// });                                                                                                         // 27
                                                                                                               //
Template.map.helpers({                                                                                         // 29
	geolocationError: function () {                                                                               // 30
		var error = Geolocation.error();                                                                             // 31
		return error && error.message;                                                                               // 32
	},                                                                                                            // 33
	mapOptions: function () {                                                                                     // 34
		var latLng = Geolocation.latLng(); // Initialize the map once we have the latLng.                            // 35
                                                                                                               //
		if (GoogleMaps.loaded() && latLng) {                                                                         // 37
			return {                                                                                                    // 38
				center: new google.maps.LatLng(latLng.lat, latLng.lng),                                                    // 39
				zoom: 1                                                                                                    // 40
			};                                                                                                          // 38
		}                                                                                                            // 42
	}                                                                                                             // 43
});                                                                                                            // 29
Template.body.events({                                                                                         // 46
	'submit .newoman': function (event) {                                                                         // 48
		// Prevent default browser form submit                                                                       // 50
		event.preventDefault(); // Get value from form element                                                       // 52
                                                                                                               //
		var lname = event.target.myname.value;                                                                       // 58
		var city = event.target.mycity.value;                                                                        // 60
		var geocoder = new google.maps.Geocoder();                                                                   // 62
		var ll = geocoder.geocode({                                                                                  // 63
			'address': city                                                                                             // 63
		}, function (results, status) {                                                                              // 63
			if (status === 'OK') {                                                                                      // 64
				Women.insert({                                                                                             // 66
					name: lname,                                                                                              // 67
					lat: results[0].geometry.location.lat(),                                                                  // 68
					lon: results[0].geometry.location.lng()                                                                   // 69
				});                                                                                                        // 66
				markee = new google.maps.Marker({                                                                          // 71
					position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
					map: mappy,                                                                                               // 74
					animation: google.maps.Animation.DROP                                                                     // 75
				});                                                                                                        // 71
				infowindoo = new google.maps.InfoWindow({                                                                  // 77
					content: lname                                                                                            // 78
				});                                                                                                        // 77
				google.maps.event.addListener(markee, 'click', function () {                                               // 80
					infowindoo.open(mappy, this);                                                                             // 81
				});                                                                                                        // 83
			} else {                                                                                                    // 88
				alert('Geocode was not successful for the following reason: ' + status);                                   // 89
			}                                                                                                           // 90
		}); // Insert a task into the collection                                                                     // 91
                                                                                                               //
		Women.insert({                                                                                               // 97
			name: lname,                                                                                                // 98
			lat: ll.lat(),                                                                                              // 99
			lon: ll.lng()                                                                                               // 100
		});                                                                                                          // 97
	}                                                                                                             // 108
});                                                                                                            // 46
Template.map.onCreated(function () {                                                                           // 113
	GoogleMaps.ready('map', function (map) {                                                                      // 115
		var women = Women.find({}).collection._docs._map;                                                            // 116
                                                                                                               //
		for (var woman in meteorBabelHelpers.sanitizeForInObject(women)) {                                           // 118
			var myinfowindow = new google.maps.InfoWindow({                                                             // 119
				content: women[woman].name                                                                                 // 120
			});                                                                                                         // 119
			marker = new google.maps.Marker({                                                                           // 122
				position: new google.maps.LatLng(women[woman].lat, women[woman].lon),                                      // 123
				map: map.instance,                                                                                         // 124
				infowindow: myinfowindow                                                                                   // 125
			});                                                                                                         // 122
			google.maps.event.addListener(marker, 'click', function () {                                                // 128
				this.infowindow.open(map, this);                                                                           // 129
			});                                                                                                         // 131
			mappy = map.instance;                                                                                       // 132
			;                                                                                                           // 135
		}                                                                                                            // 135
	});                                                                                                           // 136
});                                                                                                            // 137
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"imports":{"api":{"women.js":["meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/api/women.js                                                                                        //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.export({                                                                                                // 1
  Women: function () {                                                                                         // 1
    return Women;                                                                                              // 1
  }                                                                                                            // 1
});                                                                                                            // 1
var Mongo = void 0;                                                                                            // 1
module.import('meteor/mongo', {                                                                                // 1
  "Mongo": function (v) {                                                                                      // 1
    Mongo = v;                                                                                                 // 1
  }                                                                                                            // 1
}, 0);                                                                                                         // 1
var Women = new Mongo.Collection('women');                                                                     // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/template.main.js");
require("./client/main.js");