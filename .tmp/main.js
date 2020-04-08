'use strict';

require("../styles/main.scss");

var $ = require('jquery');

// Application initialization
$(function () {
  $('.j-appVersion').html(':)');
  $.ajaxSetup({
    cache: true
  });
});