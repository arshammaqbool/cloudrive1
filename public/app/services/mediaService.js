angular.module('mediaService',[])

.factory('Media',function($http, $window, $q){

  var mediaFactory = {};
  mediaFactory.fetchData3 = function(key, size, is_dir, name, mime_type, created, downloadlink, parent){

    var allu = $window.localStorage.getItem('allu');
    var isParent = $window.localStorage.getItem('parentid1');
    parent = isParent;

    return $http.post('/media_meta_api/mediadata',{
      key: key,
      size: size,
      is_dir: is_dir,
      name: name,
      mime_type: mime_type,
      created: created,
      downloadlink: downloadlink,
      parent: parent,
      media_id: allu
    })
    .success(function(data){
      return data;
    })
  }

  mediaFactory.getData3 = function(){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/media_meta_api/pouch',{allu: allu});
  }
  mediaFactory.getLatestId3 = function(name , parent){
    //console.log("In Id Service");
    return $http.post('/media_meta_api/findid',{
      name: name,
      parent, parent
    })
    .success(function(data){
      return data;
    })
  }

  mediaFactory.getAllChildren3 = function(parent){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/media_meta_api/findchild',{
      parent: parent,
      allu: allu
    })
      .success(function(data){
        return data;
      })
  }

  return mediaFactory;
})
