function envProperties(){
  var url = 'name.kitsys.net:8090'; // REPLACE THIS WITH VALID URL + PORT (IF NEEDED)

  var env = {
    "SERVER_CONFIG":
      {
        SERVER_URL:       'https://'+url+'/kai/api/v2/capi',
        APP_AUTH_HEADER:  'secret',
        APP_AUTH_KEY:     'APP_AUTH_KEY', // REPLACE THIS WITH APP AUTH KEY PROVIDED BY KASISTO
      }
    };
  return env;
}

if(typeof module !== 'undefined'){
  module.exports = new envProperties();
}