angular.module('googleService',[])


.factory('Google',function($http, $window, $q){

  var googleFactory = {};

  googleFactory.fetchData4 = function(key, name, size, modified, mime_type, is_dir, parent_id, downloadlink){

    var allu = $window.localStorage.getItem('allu');
    var isParent = $window.localStorage.getItem('parentid1');
    parent_id = isParent;

    return $http.post('/google_meta_api/googledata',{
      key: key,
      name: name,
      size: size,
      modified: modified,
      mime_type: mime_type,
      is_dir: is_dir,
      parent_id: parent_id,
      downloadlink: downloadlink,
      google_id: allu
    })
      .success(function(data){

        return data;
      })
  }

  googleFactory.getData4 = function(){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/google_meta_api/hunt',{allu: allu});
  }
  googleFactory.getLatestId4 = function(name, parent){
    //console.log("In Id Service");
    console.log(name);
    return $http.post('/google_meta_api/findid',{
      name: name,
      parent: parent
    })
    .success(function(data){

      return data;
    })
  }
  googleFactory.getAllChildren2 = function(parent){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/google_meta_api/findchild',{
      parent: parent,
      allu: allu
    })
      .success(function(data){
        return data;
      })
  }

  return googleFactory;

})
