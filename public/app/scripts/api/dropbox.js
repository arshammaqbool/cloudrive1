var dropBox={}; 
hello.init({
	dropbox : '27hvto4ucs4y8mw'
},	{
	redirect_uri:'redirect.html',
	scope : 'publish_files'
});

//ADDITTION1

//var DropboxTeam = require('dropbox').DropboxTeam;

//ADDITION2
var CLIENT_ID = '9kzbv3em31mjr6d';
//var hey = 'eBOJomztgQAAAAAAAAABEcyynDGQcxAEXXebJpQK9cp_Omr12NSyArxpZANrYkmP';
      function formatBytes(a,b){
      	if(0==a)
      		return"0 Bytes";
      	var c=1024,
      	d=b||1,
      	e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],
      	f=Math.floor(Math.log(a)/Math.log(c));
      	return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f];
      }

    // Render a list of items to #files
    function renderItems(items) {
            var time,size,modified,fsize; 
            for(i=items.length-1;i>=0;i--)
            {
            //formatting time
             time = items[i]["server_modified"];
        	 modified = time.substr(0,10) + " " + time.substr(11);

        	//formatted size
        	 size =  items[i]["size"];
        	 fsize = formatBytes(size);
        	//storing files metadata
            sessionStorage.clear();
            sessionStorage.setItem("b1", true);  //readonly
            sessionStorage.setItem("n1", items[i]["size"]);  //bytes
            sessionStorage.setItem("s1", items[i]["rev"]);  //rev
            sessionStorage.setItem("s2", modified);  //modified
            sessionStorage.setItem("s3", fsize);    //size
            sessionStorage.setItem("s4", items[i]["path_lower"]);   //path
            sessionStorage.setItem("b2", false);  //isDirectory
            sessionStorage.setItem("s5", items[i]["parent_shared_folder_id"]);  //root
            sessionStorage.setItem("s6", items[i][".tag"]);  //type
            sessionStorage.setItem("s7", items[i]["name"]);  //name
            sessionStorage.setItem("s8", "");   //downloadLink
            sessionStorage.setItem("s9", items[i]["id"]);  //file
            
            document.getElementById("sub").click();
            }
            sessionStorage.clear();

        
    }
function logy(res){
        var time,size,modified,fsize; 
            
            //formatting time
             time = res["server_modified"];
             modified = time.substr(0,10) + " " + time.substr(11);

            //formatted size
             size =  res["size"];
             fsize = formatBytes(size);

            //storing files metadata
            sessionStorage.clear();

            sessionStorage.setItem("b1", true);  //readonly
            sessionStorage.setItem("n1", res["size"]);  //bytes
            sessionStorage.setItem("s1", res["rev"]);  //rev
            
            sessionStorage.setItem("s2", modified);  //modified
            sessionStorage.setItem("s3", fsize);    //size
            sessionStorage.setItem("s4", res["path_lower"]);   //path
            sessionStorage.setItem("b2", false);  //isDirectory
            
            sessionStorage.setItem("s5", res["parent_shared_folder_id"]);  //root
            sessionStorage.setItem("s6", "file");  //type
            sessionStorage.setItem("s7", res["name"]);  //name
            sessionStorage.setItem("s8", "");   //downloadLink
           
            sessionStorage.setItem("s9", res["id"]);  //file
            document.getElementById("wadiChuss").click();
            sessionStorage.clear();

          /*  sessionStorage.clear();
            sessionStorage.setItem("b1", true);  //readonly
            sessionStorage.setItem("n1", 918156);  //bytes
            sessionStorage.setItem("s1", "14f48636dab");  //rev
            
            sessionStorage.setItem("s2", "2018-03-29T18:56:07Z");  //modified
            sessionStorage.setItem("s3", "54.9 KB");    //size
            sessionStorage.setItem("s4", "/d1 (final).pdf");   //path
            sessionStorage.setItem("b2", false);  //isDirectory
            
            sessionStorage.setItem("s5", "undefined");  //root
            sessionStorage.setItem("s6", "file");  //type
            sessionStorage.setItem("s7", "D1 (final).pdf");  //name
            sessionStorage.setItem("s8", "");   //downloadLink
           
            sessionStorage.setItem("s9", "hsGlyDEcmBAAAAAAAAAA2g");  //file
            document.getElementById("sub").click();
            alert('here here here');
            sessionStorage.clear();*/

    }

    /*function renderItems(items) {
      var filesContainer = document.getElementById('files');
      items.forEach(function(item) {
        var li = document.createElement('li');
        li.innerHTML = item.name;
        filesContainer.appendChild(li);
      });
    }*/

/*function upload(network){

		hello("dropbox").api('me/files', 'post', {
			parent:"Dropbox",
			name:(document.getElementById('file').value).split("\\")[2],
			file : document.getElementById('file')
		}).then(function(response){
			log(response);
		},function(e){
			alert('errrr ! '+ e.error.message);
		});
	return false;
}*/
	function getAccessTokenFromUrl() {
     return utils.parseQueryString(window.location.hash).access_token;
    }

    // If the user was just redirected from authenticating, the urls hash will
    // contain the access token.
    function isAuthenticated() {
      return !!getAccessTokenFromUrl();
    }

    function ilog(s){
	document.querySelector('.response').appendChild(document.createTextNode(JSON.stringify(s, true, 2)));
}

function upload(network) {
      
      var token = hello('dropbox').getAuthResponse();
      var dbx = new Dropbox.Dropbox({ accessToken: token["access_token"] });
      var name = (document.getElementById('file').value).split("\\")[2];
      var file = document.getElementById('file');
      dbx.filesUpload({path: '/' + name, contents: file})
        .then(function(response) { 
       //var results = document.getElementById('results');
       //results.appendChild(document.createTextNode('File uploaded!'));
          
          logy(response);
        },function(e) {
            alert('errrr ! '+ e.error.message);
        });
      return false;
    }
function getName(network){
		var arr = [];
		get_children("/",arr);
}
/*function get_children(path,queue)
{
		var i;
		hello("dropbox").api('me/files','get',{
			path: path
		}).then(function(json){
			var arr = JSON.parse(JSON.stringify(json.data, true, 2));
			sessionStorage.setItem("s7", arr[0]["name"]);
			var ii = queue.shift();
			for(i = 0; i<=arr.length-1; i++){
				if(arr[i]["is_dir"]) {
					queue.push(arr[i]["path"]);
					continue;
				}
				console.log("files : " + arr[i]["path"]);
				
			}
			while(queue.length > 0){
				var ii = queue.shift();
				console.log("folders " + ii);
				var k;
				hello("dropbox").api('me/files','get',{
					path: ii
				}).then(function(json1){	
				var arr1 = JSON.parse(JSON.stringify(json1.data, true, 2));
				console.log("arr length: " + arr1.length);
				for(k = 0; k<=arr1.length-1; k++){
					if(arr1[k]["is_dir"]) {
						queue.push(arr1[k]["path"]);
						console.log("Grand Kaka " + arr1[k]["path"]);
						continue;
					}
					console.log("folder k undar files : " + arr1[k]["path"]);
				}
				},function(e){
					alert('errrr ! '+ e.error.message);
				});
				console.log(queue.length);
			}
			//for(i = 0; i<=arr.length-1; i++)
            //{
            	//sessionStorage.clear();
            	//sessionStorage.setItem("b1", arr[i]["read_only"]);
            	//sessionStorage.setItem("n1", arr[i]["bytes"]);
            	//sessionStorage.setItem("s1", arr[i]["rev"]);
            	//sessionStorage.setItem("s2", arr[i]["modified"]);
            	//sessionStorage.setItem("s3", arr[i]["size"]);
            	//sessionStorage.setItem("s4", arr[i]["path"]);
            	//console.log("Path    " + arr[i]["path"]);
            	//sessionStorage.setItem("b2", arr[i]["is_dir"]);
            	//sessionStorage.setItem("s5", arr[i]["root"]);
            	//sessionStorage.setItem("s6", arr[i]["type"]);
            	//sessionStorage.setItem("s7", arr[i]["name"]);
            	//console.log("Name    " + arr[i]["name"]);
            	//var pr = localStorage.getItem('parentid1');
            	//console.log(pr);
            	//sessionStorage.setItem("s8", arr[i]["downloadLink"]);
            	//sessionStorage.setItem("s9", arr[i]["file"]);
            	//document.getElementById("sub").click();

            	//if(arr[i]["is_dir"])
            	//{
            		//var pr = localStorage.getItem('parentid1');
            		//queue.enqueue(pr);
            		//document.getElementById('name2').value = arr[i]["name"];
            		//document.getElementById('parent2').value = localStorage.getItem('parentid1');
            		//document.getElementById("lala").click();
            	//	console.log("i am in folder : "+arr[i]["path"]);
            		//console.log(localStorage.getItem('parentid1'));
                //	get_children(arr[i]["path"],arrayx);
            	//}
            	//var it = queue.dequeue(localStorage.getItem('parentid1'));
            	//console.log("i am out folder : "+arr[i]["path"]);
            	//console.log(localStorage.getItem('parentid1'));

            //}
            sessionStorage.clear();

		},function(e){
				alert('errrr ! '+ e.error.message);
			});
	}*/
	function get_children(path,arrayx)
	{
		var i;
		hello("dropbox").api('me/files','get',{
			path: path
		}).then(function(json){
			var arr=JSON.parse(JSON.stringify(json.data, true, 2));
			
			for(i=arr.length-1;i>=0;i--)
            {
            sessionStorage.clear();
            sessionStorage.setItem("b1", arr[i]["read_only"]);
            sessionStorage.setItem("n1", arr[i]["bytes"]);
            sessionStorage.setItem("s1", arr[i]["rev"]);
            sessionStorage.setItem("s2", arr[i]["modified"]);
            sessionStorage.setItem("s3", arr[i]["size"]);
            sessionStorage.setItem("s4", arr[i]["path"]);
            sessionStorage.setItem("b2", arr[i]["is_dir"]);
            sessionStorage.setItem("s5", arr[i]["root"]);
            sessionStorage.setItem("s6", arr[i]["type"]);
            sessionStorage.setItem("s7", arr[i]["name"]);
            sessionStorage.setItem("s8", arr[i]["downloadLink"]);
            sessionStorage.setItem("s9", arr[i]["file"]);
            document.getElementById("sub").click();

            	if(arr[i]["is_dir"]==true)
            	{
                	get_children(arr[i]["path"],arrayx);
            	}

            }
            sessionStorage.clear();

		},function(e){
				alert('errrr ! '+ e.error.message);
			});
	}


	function dropLogin(network){
		//ADDITION3
	    if (isAuthenticated()) {

      		// Create an instance of Dropbox with the access token and use it to
     		// fetch and render the files in the users root directory.
     		var dbx = new Dropbox.Dropbox({ accessToken: getAccessTokenFromUrl() });
     		 dbx.filesListFolder({path: ''})
       			 .then(function(response) {
        		  renderItems(response.entries);
        	})
        	.catch(function(error) {
        		  console.error(error);
        	});
    	}else {
    		
     		 // Set the login anchors href using dbx.getAuthenticationUrl()
     		var dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });
     		var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
     		var authUrl = dbx.getAuthenticationUrl('http://localhost:8000/dashboard/cloudManagement');
     		document.getElementById('authlink').href  =  authUrl;
     		// window.open(authUrl,'_blank',strWindowFeatures);
     		}
	   
		/*hello("dropbox").login({
			scope:"basic, files, publish_files"
		});
		getName('dropbox');*/
		//window.location.replace("http://localhost:8000/dashboard/overview");
		//alert('hi');
	}
	function dropLogout(network){
		hello("dropbox").logout();
	}
	var online = function(session) {
	var currentTime = (new Date()).getTime() / 1000;
	//alert(session.expires/1000);
	return session && session.access_token && session.expires > currentTime;

	};

	//var fb = hello('dropbox').getAuthResponse();



function createF(network)	{
	hello("dropbox").api('me/folders', 'post', {
			//parent:"Dropbox",
			//access_type:"sandbox",
			name:'combi'//(document.getElementById('file').value).split("\\")[2],
			//file : document.getElementById('file')
		}).then(function(response){
			log(response);
		},function(e){
			alert('errrr ! '+ e.error.message);
		});

}

function dropboxUser(network){

			hello("dropbox").api('me').then(function(json){
				//var str = json.name.split(" ");
				dropBox.drop_total=json["quota_info"]["quota"];
				dropBox.drop_used=json["quota_info"]["normal"];
				var dp = dropBox.drop_total;
				dp =dp/1048576;
				dp = +dp.toFixed(2);
				var du = dropBox.drop_used;
				du =du/1048576;
				du = +du.toFixed(2);
				console.log(dp);
				console.log(du);
				//console.log(JSON.stringify(json));
				//alert('Your name is '+ str[0]);
			}, function(e){
				alert('errrr ! '+ e.error.message);
			});

		return false;
}

