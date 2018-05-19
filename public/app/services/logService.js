angular.module('logService',[])

.factory('CombiLog',function($http, $window, $q){

  var logFactory ={};

  logFactory.fetchData7 = function(name, size, modified, path, parent, is_dir, type, downloadlink, upload_location){

    var allu = $window.localStorage.getItem('allu');

    return $http.post('/combi_log_api/logdata',{
      name: name,
      size: size,
      modified: modified,
      path: path,
      parent: parent,
      is_dir: is_dir,
      type: type,
      downloadlink: downloadlink,
      upload_location: upload_location,
      log_id: allu
    })
    .success(function(data){
      return data;
    })
  }
  logFactory.getData7 = function(){
    return $http.get('/combi_log_api/getalldata');
  }

})
