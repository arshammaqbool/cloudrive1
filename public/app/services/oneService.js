angular.module('oneService',[])


.factory('One',function($http, $window, $q){

  var oneFactory = {};
  oneFactory.fetcData2 = function(id1, name, parentid, size, downloadlink, type, modified){
    var allu = $window.localStorage.getItem('allu');
    var isParent = $window.localStorage.getItem('parentid1');
    parentid = isParent;

    return $http.post('/one_meta_api/onedata',{
      id1: id1,
      name: name,
      parentid: parentid,
      size: size,
      downloadlink: downloadlink,
      type: type,
      modified: modified,
      one_id: allu
    })
    .success(function(data){
      //console.log(id1);
      //console.log(name);
      //console.log(parentid);
      //console.log(size);
      //console.log(downloadlink);
    //  console.log(type);
      //console.log(modified);
    //  console.log("Data is entered");
      return data;
    })

  }
  oneFactory.getData2 = function(){
    //console.log("In One Service");
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/one_meta_api/catch',{allu: allu});
  }
  oneFactory.getLatestId2 = function(name, parent){
    //console.log("In Id Service");
    //console.log(name);
    return $http.post('/one_meta_api/findid',{
      name: name,
      parent: parent
    })
    .success(function(data){
      return data;
    })
  }
  oneFactory.getAllChildren5 = function(parent){
    var allu = $window.localStorage.getItem('allu');
    return $http.post('/one_meta_api/findchild',{
      parent: parent,
      allu: allu
    })
      .success(function(data){
        return data;
      })
  }

  return oneFactory;

})
