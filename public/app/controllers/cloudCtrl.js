angular.module('cloudCtrl',[])


.controller('CloudController', function($rootScope, $location, Cloud, Auth) {

  var vm = this;

  vm.goFetchData6 = function(){
    vm.processing = true;
    vm.error = '';

    Cloud.fetchData6(vm.cloudData.cloud_name, vm.cloudData.e_mail, vm.cloudData.password, vm.cloudData.total_space, vm.cloudData.remaining_space)
      .success(function(data){
        vm.processing = false;
        vm.cloudData = {};

        if(data.success){
          console.log("Cloud Ctrl Success");
          $location.path('/');
        }else {
          vm.error = data.message;
          //console.log(vm.error);
        }

      })
  }

  vm.goGetData6 = function(){
    vm.processing = true;
    vm.error = '';

    Cloud.getData6()
    .success(function(data){
      console.log(data);
      if(data){
        for(i=0; i< data.length; i++){
          localStorage.setItem(data[i].cloud_name+"_id", data[i]._id);
          localStorage.setItem(data[i].cloud_name+"_total_space", data[i].total_space);
          localStorage.setItem(data[i].cloud_name+"_remaining_space", data[i].remaining_space);
        }
      }
      vm.processing= false;
    });
  }

  vm.goUpdateUser6= function(){
    vm.processing = true;
    vm.error = '';
    console.log("Controller: "+vm.updateData.total_space+ vm.updateData.remaining_space + vm.updateData.cloud_name);
    Cloud.updateUser6(vm.updateData.total_space, vm.updateData.remaining_space, vm.updateData.cloud_name)
      .success(function(data){
        vm.processing= false;
      })
  }
})
