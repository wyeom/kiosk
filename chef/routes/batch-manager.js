const schedule = require('node-schedule');
var sessionManager = require('./session-manager').manager();


function config(options) {
  const j = schedule.scheduleJob('0/3 * * * * *', function(){
    // console.log("batch run")
    // console.log(socketManager.listSocketIds())
 });
}

const Module = {
  config,
}

module.exports.config = Module.config;