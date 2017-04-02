var require = meteorInstall({"imports":{"api":{"women.js":["meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/women.js                                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({                                                      // 1
  Women: function () {                                               // 1
    return Women;                                                    // 1
  }                                                                  // 1
});                                                                  // 1
var Mongo = void 0;                                                  // 1
module.import('meteor/mongo', {                                      // 1
  "Mongo": function (v) {                                            // 1
    Mongo = v;                                                       // 1
  }                                                                  // 1
}, 0);                                                               // 1
var Women = new Mongo.Collection('women');                           // 4
///////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["meteor/meteor","../imports/api/women.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.import('meteor/meteor', {                                     // 1
  "Meteor": function (v) {                                           // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
module.import('../imports/api/women.js');                            // 1
Meteor.startup(function () {                                         // 4
  Meteor.publish('women', function () {                              // 5
    return Meteor.users.find();                                      // 6
  }); // code to run on server at startup                            // 7
});                                                                  // 9
///////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
