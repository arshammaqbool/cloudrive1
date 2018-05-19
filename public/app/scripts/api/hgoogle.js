// Your Client ID can be retrieved from your project in the Google
          var CLIENT_ID = '221180382540-68vacj5u3jreqptj8ls2rds0lj68dsq6.apps.googleusercontent.com';

      var SCOPES = ['https://www.googleapis.com/auth/drive','profile'];
      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          //authorizeDiv.style.display = 'none';
          console.log("usman");
          var g=document.getElementById('u3');
          g=usi;

          
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
         // authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *

       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Drive API client library.
       */
       function loadDriveApi2() {
        gapi.client.load('drive', 'v2', createFolder);
      }
      function loadDriveApi1() {
        gapi.client.load('drive', 'v2', listFiles);
      }

      function loadDriveApi() {
        gapi.client.load('drive', 'v2', printAbout);
      }








      //for info v2 is used else used v3












      /**
       * Print files.
       */
      // var access_Token=gapi.auth.getToken().access_token;
      function usi(){
        loadDriveApi();
          loadDriveApi1();
           loadDriveApi2();
      }
           function createFolder() {

            var access_token = gapi.auth.getToken().access_token;

            var request = gapi.client.request({ 
            'path': '/drive/v2/files/',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,             
                },
                'body':{
                  "title" : "Deadpool",
                  "mimeType" : "application/vnd.google-apps.folder",
       }
   });

   request.execute(function(resp) { 
       console.log(resp); 
       
   });
 }
         function printAbout() {
          var request = gapi.client.drive.about.get();
          request.execute(function(resp) {
          console.log('Current user name: ' + resp.name);
          console.log('Root folder ID: ' + resp.rootFolderId);
          console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
          console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
  });
}
  function listFiles() {
        var request = gapi.client.drive.files.list({
            'maxResults': 1000
          });

          request.execute(function(resp) {
            var files = resp.items;
            if (files && files.length > 0) {
              appendPre(JSON.stringify(files));
              //for (var i = 0; i < files.length; i++) {
                //sessionStorage.clear();
                //sessionStorage.setItem("s1", arr[i]["id"]);
                //sessionStorage.setItem("s2", arr[i]["title"]);
                //sessionStorage.setItem("s3", arr[i]["fileSize"]);
                //sessionStorage.setItem("s4", arr[i]["modifiedDate"]);
                //sessionStorage.setItem("s5", arr[i]["mimeType"]);
                //sessionStorage.setItem("s6", arr[i]["parents"]["id"]);
                //sessionStorage.setItem("s7", arr[i]["webContentLink"]);
                //document.getElementById("sub2").click();
              //}
              //sessionStorage.clear();
            } 
            else {
              appendPre('No files found.');
            }
          });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }