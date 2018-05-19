angular.module('dropService',[])


.factory('Drop',function($http, $window, $q){


  var dropFactory = {};
  dropFactory.fetchData = function(readonly, bytes, rev, modified, size, path, is_dir, root, type, name, downloadlink, file, allu){

    allu = $window.localStorage.getItem('allu');
    var parent;
    var isParent = $window.localStorage.getItem('parentid1');
    //console.log(parent);

    //console.log("meo + "+ allu);
    //var x= path.split("\/");
    //var prnt = x[x.length-2];
    //if(prnt=="")
    //{
    //  prnt= "abba";
    //}
    //console.log("parent = "+ prnt);

    //place 0 in place of parent if parent is root
    var link = "https://content.dropboxapi.com/1/files/auto";
    downloadlink = link + path;
    

    parent = isParent;


    //var idData= $http.get('/drop_meta_api/findid');

    //console.log("Id Data:");
    //console.log(idData);

    return $http.post('/drop_meta_api/dropdata',{
      readonly: readonly,
      bytes: bytes,
      rev: rev,
      modified: modified,
      size: size,
      path: path,
      parent: parent,
      is_dir: is_dir,
      root: root,
      type: type,
      name: name,
      downloadlink: downloadlink,
      file: file,
      drop_id: allu
    })
    .success(function(data){
      //console.log("Data is received +" + $window.sessionStorage.getItem('u1'));
      //console.log(allu);
      //console.log(readonly);
      //console.log(sessionStorage.n1);
      //console.log(rev);
      //console.log(modified);
      //console.log(size);
      //console.log(name);
      //console.log(file);
      return data;
    })

  }

  dropFactory.getData = function(){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/drop_meta_api/pick',{allu});
  }
  dropFactory.getLatestId = function(name, parent){
    //console.log("In Id Service");
    return $http.post('/drop_meta_api/findid',{
      name: name,
      parent: parent
    })
    .success(function(data){
      return data;
    })
  }
  dropFactory.getAllChildren = function(parent){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/drop_meta_api/findchild',{
      parent: parent,
      allu: allu
    })
      .success(function(data){
        return data;
      })
  }

  return dropFactory;
})
