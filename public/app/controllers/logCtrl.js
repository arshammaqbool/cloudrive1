angular.module('logCtrl',[])

.controller('LogController', function($rootScope, $location, CombiLog, $window) {

  var vm = this;

  vm.goFetchData7()= function(){
    vm.processing = true;
    vm.error = '';

    CombiLog.fetchData7(vm.logdata.name, vm.logdata.size, vm.logdata.modified, vm.logdata.path, vm.logdata.parent, vm.logdata.is_dir, vm.logdata.type, vm.logdata.downloadlink, vm.logdata.upload_location)
    .success(function(data){
      vm.processing = false;
      if(data.success){
        console.log("Log Ctrl Success");
        $location.path('/');
      }else {
        vm.error = data.message;
        //console.log(vm.error);
      }
    })
  }
  vm.goGetData7 = function(){
    vm.processing = true;
    vm.error = '';
    CombiLog.getData7()
      .success(function(data){
        //console.log("me2 Sufi"+data);
        vm.logData = data;
        vm.processing= false;
      });
  }
})
