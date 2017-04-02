

import { Template } from 'meteor/templating';

 

import { Women } from '../api/women.js';

 

import './body.html';

 

Template.body.helpers({

  tasks() {

    return Women.find({});

  },

});


