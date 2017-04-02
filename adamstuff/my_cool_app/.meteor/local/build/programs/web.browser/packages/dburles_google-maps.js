//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package['templating-runtime'].Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var GoogleMaps;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dburles_google-maps/template.google-maps.js                                        //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
                                                                                               // 1
Template.__checkName("googleMap");                                                             // 2
Template["googleMap"] = new Template("Template.googleMap", (function() {                       // 3
  var view = this;                                                                             // 4
  return HTML.Raw('<div class="map-canvas" style="width: 100%; height: 100%"></div>');         // 5
}));                                                                                           // 6
                                                                                               // 7
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dburles_google-maps/google-maps.js                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var supportedTypes = ['Map', 'StreetViewPanorama'];                                            // 1
                                                                                               // 2
GoogleMaps = {                                                                                 // 3
  load: _.once(function(options) {                                                             // 4
    options = _.extend({ v: '3.exp' }, options);                                               // 5
    var params = _.map(options, function(value, key) { return key + '=' + value; }).join('&');
    var script = document.createElement('script');                                             // 7
    script.type = 'text/javascript';                                                           // 8
    script.src = 'https://maps.googleapis.com/maps/api/js?' + params +                         // 9
      '&callback=GoogleMaps.initialize';                                                       // 10
                                                                                               // 11
    document.body.appendChild(script);                                                         // 12
  }),                                                                                          // 13
  utilityLibraries: [],                                                                        // 14
  loadUtilityLibrary: function(path) {                                                         // 15
    this.utilityLibraries.push(path);                                                          // 16
  },                                                                                           // 17
  _loaded: new ReactiveVar(false),                                                             // 18
  loaded: function() {                                                                         // 19
    return this._loaded.get();                                                                 // 20
  },                                                                                           // 21
  maps: {},                                                                                    // 22
  _callbacks: {},                                                                              // 23
  initialize: function() {                                                                     // 24
    this._loaded.set(true);                                                                    // 25
    _.each(this.utilityLibraries, function(path) {                                             // 26
      var script = document.createElement('script');                                           // 27
      script.type = 'text/javascript';                                                         // 28
      script.src = path;                                                                       // 29
                                                                                               // 30
      document.body.appendChild(script);                                                       // 31
    });                                                                                        // 32
  },                                                                                           // 33
  _ready: function(name, map) {                                                                // 34
    _.each(this._callbacks[name], function(cb) {                                               // 35
      if (_.isFunction(cb)) {                                                                  // 36
        cb(map);                                                                               // 37
      }                                                                                        // 38
    });                                                                                        // 39
  },                                                                                           // 40
  ready: function(name, cb) {                                                                  // 41
    if (! this._callbacks[name]) {                                                             // 42
      this._callbacks[name] = [];                                                              // 43
    }                                                                                          // 44
    // make sure we run the callback only once                                                 // 45
    // as the tilesloaded event will also run after initial load                               // 46
    this._callbacks[name].push(_.once(cb));                                                    // 47
  },                                                                                           // 48
  // options: function(options) {                                                              // 49
  //   var self = this;                                                                        // 50
  //   return function() {                                                                     // 51
  //     if (self.loaded())                                                                    // 52
  //       return options();                                                                   // 53
  //   };                                                                                      // 54
  // },                                                                                        // 55
  get: function(name) {                                                                        // 56
    return this.maps[name];                                                                    // 57
  },                                                                                           // 58
  _create: function(name, options) {                                                           // 59
    var self = this;                                                                           // 60
    self.maps[name] = {                                                                        // 61
      instance: options.instance,                                                              // 62
      options: options.options                                                                 // 63
    };                                                                                         // 64
                                                                                               // 65
    if (options.type === 'StreetViewPanorama') {                                               // 66
      options.instance.setVisible(true);                                                       // 67
      self._ready(name, self.maps[name]);                                                      // 68
    } else {                                                                                   // 69
      google.maps.event.addListener(options.instance, 'tilesloaded', function() {              // 70
        self._ready(name, self.maps[name]);                                                    // 71
      });                                                                                      // 72
    }                                                                                          // 73
  },                                                                                           // 74
  create: function(options) {                                                                  // 75
    // default to Map                                                                          // 76
    var type = options.type ? options.type : 'Map';                                            // 77
    if (! _.include(supportedTypes, type)) {                                                   // 78
      throw new Meteor.Error("GoogleMaps - Invalid type argument: " + type);                   // 79
    }                                                                                          // 80
                                                                                               // 81
    this._create(options.name, {                                                               // 82
      type: type,                                                                              // 83
      instance: new google.maps[type](options.element, options.options),                       // 84
      options: options.options                                                                 // 85
    });                                                                                        // 86
  }                                                                                            // 87
};                                                                                             // 88
                                                                                               // 89
Template.googleMap.onRendered(function() {                                                     // 90
  var self = this;                                                                             // 91
  self.autorun(function(c) {                                                                   // 92
    // if the api has loaded                                                                   // 93
    if (GoogleMaps.loaded()) {                                                                 // 94
      var data = Template.currentData();                                                       // 95
                                                                                               // 96
      if (! data.options) {                                                                    // 97
        return;                                                                                // 98
      }                                                                                        // 99
      if (! data.name) {                                                                       // 100
        throw new Meteor.Error("GoogleMaps - Missing argument: name");                         // 101
      }                                                                                        // 102
                                                                                               // 103
      self._name = data.name;                                                                  // 104
                                                                                               // 105
      var canvas = self.$('.map-canvas').get(0);                                               // 106
                                                                                               // 107
      GoogleMaps.create({                                                                      // 108
        name: data.name,                                                                       // 109
        type: data.type,                                                                       // 110
        element: canvas,                                                                       // 111
        options: data.options                                                                  // 112
      });                                                                                      // 113
                                                                                               // 114
      c.stop();                                                                                // 115
    }                                                                                          // 116
  });                                                                                          // 117
});                                                                                            // 118
                                                                                               // 119
Template.googleMap.onDestroyed(function() {                                                    // 120
  if (GoogleMaps[this._name]) {                                                                // 121
    google.maps.event.clearInstanceListeners(GoogleMaps.maps[this._name].instance);            // 122
    delete GoogleMaps.maps[this._name];                                                        // 123
  }                                                                                            // 124
});                                                                                            // 125
                                                                                               // 126
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['dburles:google-maps'] = {}, {
  GoogleMaps: GoogleMaps
});

})();
