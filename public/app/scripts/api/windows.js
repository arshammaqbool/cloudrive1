hello.init({
	windows : '0000000048183237'
},	{
	redirect_uri:'http://localhost:8000/',
	//scope : 'publish_files'
});

	function get_win_files(network){
		
		var arr=[];
		get_children_files("me/skydrive",arr);		
	}
	function get_children_files(path,arrayx)
	{
		var i;
		hello("windows").api('me/files','get',{
			parent: path
		}).then(function(json){
			var arr=JSON.parse(JSON.stringify(json.data, true, 2));
			//log(json.data);
			for(i=arr.length-1;i>=0;i--)
			{
				sessionStorage.clear();
            	sessionStorage.setItem("s1", arr[i]["id"]);
            	sessionStorage.setItem("s2", arr[i]["name"]);
            	sessionStorage.setItem("s3", arr[i]["parent_id"]);
            	sessionStorage.setItem("s4", arr[i]["size"]);
            	sessionStorage.setItem("s5", arr[i]["upload_location"]);
            	sessionStorage.setItem("s6", arr[i]["type"]);
            	sessionStorage.setItem("s7", arr[i]["updated_time"]);
            	document.getElementById("sub1").click();

				if(arr[i]["type"]=="folder")
				{
					get_children_files(arr[i]["id"],arrayx);
				}
				if(arr[i]["type"]=="album")
				{
					get_children_albums(arr[i]["id"]);
				}
			}
			sessionStorage.clear();
		},function(e){
				alert('errrr ! '+ e.error.message);
			});
	}
	function get_children_albums(path){
		var i;
		hello("windows").api('me/album','get',{
			id: path
		}).then(function(json){
			var arr=JSON.parse(JSON.stringify(json.data, true, 2));
			//log(json);
			for(i=arr.length-1;i>=0;i--)
			{			
				sessionStorage.clear();
            	sessionStorage.setItem("s1", arr[i]["id"]);
            	sessionStorage.setItem("s2", arr[i]["name"]);
            	sessionStorage.setItem("s3", arr[i]["parent_id"]);
            	sessionStorage.setItem("s4", arr[i]["size"]);
            	sessionStorage.setItem("s5", arr[i]["upload_location"]);
            	sessionStorage.setItem("s6", arr[i]["type"]);
            	sessionStorage.setItem("s7", arr[i]["updated_time"]);
            	document.getElementById("sub1").click();	
				if(arr[i]["type"]=="folder")
				{
					var arrayx=[];
					get_children_files(arr[i]["id"],arrayx);
				}
				if(arr[i]["type"]=="album")
				{
					get_children_albums(arr[i]["id"]);
				}
			}
			sessionStorage.clear();
		},function(e){
				alert('errrr ! '+ e.error.message);
			});

	}
	function winLogin(network){
		hello("windows").login({
			token_type: "bearer",
			scope:"basic, photos, videos, files, publish_files, offline_access",

		});
		get_win_files('windows');
	}
	function winLogout(network){
		
		//hello("windows").logout();
	}
	var online = function(session) {
	var currentTime = (new Date()).getTime() / 1000;
	//alert(session.expires/1000);
	return session && session.access_token && session.expires > currentTime;

	};

	var fb = hello('windows').getAuthResponse();
function download(file)
{
 window.location=file;
}
function getUser(network){

		hello(network).login(function(){
			hello("windows").api('me').then(function(json){
				log(json);
			}, function(e){
				alert('errrr ! '+ e.error.message);
			});
		});
		return false;
	}
function getOne(network){

		hello(network).login(function(){
			hello("windows").api('me/skydrive/quota','get').then(function(json){
				log(json);
				var x=JSON.parse(JSON.stringify(json));
				oneDrive.win_total=x["quota"];
				oneDrive.win_free=x["available"];
				var op = oneDrive.win_total;
				op =op/1048576;
				var ou = oneDrive.win_free;
				ou =ou/1048576;
				console.log(op);
				console.log(ou);
			}, function(e){
				alert('errrr ! '+ e.error.message);
			});
		});
		return false;
	}

function createF(network)	{
	hello("windows").api('me/folders', 'post', {
			name:'combi'
		}).then(function(response){
			log(response);
		},function(e){
			alert('errrr ! '+ e.error.message);
		});

}
function log(s){
	document.body.querySelector('.response').appendChild(document.createTextNode(JSON.stringify(s, true, 2)));
}
// this gets all info about the folders in the root and it consider all the zips as folders
function uploadwin(network){

		hello("windows").api('me/files', 'post', {
			parent:"folder.b07211803925cd3b.B07211803925CD3B!104",
			file : document.getElementById('file1'),
			name:(document.getElementById('file1').value).split("\\")[2]
			
		}).then(function(response){
			log(response);
		},function(e){
			alert('errrr ! '+ e.error.message);
		});
	return false;
	
}