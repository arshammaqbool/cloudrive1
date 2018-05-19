angular.module('cloudService',[])

.factory('Cloud',function($http, $window, $q){

  var cloudFactory = {};

  cloudFactory.fetchData6 = function(cloud_name, e_mail, password, total_space, remaining_space){

    var allu = localStorage.getItem('allu');
    if(!total_space){
      total_space=1;
      remaining_space=1;
    }

    return $http.post('/cloud_info_api/cloudinfo',{
      user_id: allu,
      cloud_name: cloud_name,
      e_mail: e_mail,
      password: password,
      total_space: total_space,
      remaining_space: remaining_space,
    })
      .success(function(data){
        return data;
      })
  }

  cloudFactory.getData6 = function(){
    var allu = localStorage.getItem('allu');
    return $http.post('/cloud_info_api/getuserinfo',{allu: allu});
  }
  cloudFactory.updateUser6 = function(total_space, remaining_space, cloud_name){
    console.log("Service: "+total_space + remaining_space + cloud_name);
    if(cloud_name=="mega"){
      var cloudId = localStorage.getItem('cloudmega');
    }
    if(cloud_name=="onedrive"){
      var cloudId = localStorage.getItem('cloudonedrive');
    }
    if(cloud_name=="googledrive"){
      var cloudId = localStorage.getItem('cloudgoogledrive');
    }
    if(cloud_name=="mediafire"){
      var cloudId = localStorage.getItem('cloudmediafire');
    }
    if(cloud_name=="dropbox"){
      var cloudId = localStorage.getItem('clouddropbox');
    }
    var allu = localStorage.getItem('allu');
    return $http.post('/cloud_info_api/updateuser', {allu: allu, cloudId: cloudId, total_space, remaining_space, cloud_name});
  }

  return cloudFactory;
})
