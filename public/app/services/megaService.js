angular.module('megaService',[])


.factory('Mega',function($http, $window, $q){

  var megaFactory = {};
  megaFactory.fetchData5= function(node_id, parent_id, name, size, is_dir, type, modified){

    var allu = $window.localStorage.getItem('allu');
    var isParent = $window.localStorage.getItem('parentid1');
    parent_id = isParent;


    return $http.post('/mega_meta_api/megadata',{
      node_id: node_id,
      parent_id: parent_id,
      name: name,
      size: size,
      is_dir: is_dir,
      type: type,
      modified: modified,
      //downloadlink: downloadlink,
      mega_id: allu
    })
      .success(function(data){
        return data;
      })
  }

  megaFactory.getData5 = function(){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/mega_meta_api/grab',{allu: allu});
  }

  megaFactory.getLatestId5 = function(name, parent){
    //console.log("In Id Service");
    return $http.post('/mega_meta_api/findid',{
      name: name,
      parent: parent
    })
    .success(function(data){
      return data;
    })
  }
  megaFactory.getAllChildren4 = function(parent){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/mega_meta_api/findchild',{
      parent: parent,
      allu: allu
    })
      .success(function(data){
        return data;
      })
  }
  return megaFactory;

})
