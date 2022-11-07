function envProperties() {
  var url = "westpac-orch-en-au-stage.kitsys.net"; // REPLACE THIS WITH VALID URL + PORT (IF NEEDED)

  const username = "dev_user";
  const password = "9KMjYuYDTxux";
  const auth = "Basic " + btoa(username + ":" + password);

  var env = {
    SERVER_CONFIG: {
      SERVER_URL: "https://" + url + "/kai/api/v2/capi",
      APP_AUTH_HEADER: "secret",
      APP_AUTH_KEY: "1a07b772-eb18-11eb-9a03-0242ac130003", // REPLACE THIS WITH APP AUTH KEY PROVIDED BY KASISTO
      assistant_name: "default_assistant",
      assistant_target: "dev",
      KEY: 'Authorization',
      VALUE: auth
    }
  };
  return env;
}

if (typeof module !== "undefined") {
  module.exports = new envProperties();
}
