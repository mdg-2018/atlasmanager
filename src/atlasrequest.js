const request = require('request');
const config = require('../config');

var uri = config.atlas_root + "groups/";

var auth = {
  'auth': {
    'user': config.username,
    'pass': config.api_key,
    'sendImmediately': false
  }
}

module.exports = {
  doGet : function(endpoint,projectid,callback){
    endpoint = uri + projectid + endpoint;
    request.get(endpoint,auth,callback);
  },
  doPost: function(endpoint,postbody,projectid,callback){
    endpoint = uri + projectid + endpoint;

    opts = {
      headers: {"content-type":"application/json"},
      uri: endpoint,
      body: JSON.stringify(postbody),
    }

    opts.auth = auth.auth;

    request.post(opts,callback);
  },
  doDelete: function(endpoint,projectid,callback){
    endpoint = uri + projectid + endpoint;

    request.delete(endpoint,auth,callback);
  },
  doPatch: function(endpoint,projectid,clustername,body,callback){
    endpoint = uri + projectid + endpoint + `/${clustername}`;
    var opts = {};
    opts.headers = {"content-type":"application/json"};
    opts.auth = auth.auth;
    opts.uri = endpoint;
    opts.body = JSON.stringify(body);

    console.log(opts);
    
    request.patch(endpoint,opts,callback);
  }
}

