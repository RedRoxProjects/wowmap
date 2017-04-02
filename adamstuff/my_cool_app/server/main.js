import { Meteor } from 'meteor/meteor';
import '../imports/api/women.js';

Meteor.startup(() => {
	Meteor.publish('women', function() {
return Meteor.users.find();
});
  // code to run on server at startup
});
