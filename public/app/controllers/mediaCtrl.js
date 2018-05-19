angular.module('mediaCtrl',[])

.controller('MediaController', function($rootScope, $location, Media, Auth) {

  var vm = this;

  vm.goFetchData3 = function(){

    vm.processing = true;
    vm.error = '';

    Media.fetchData3(vm.dunkin.key, vm.dunkin.size, vm.dunkin.is_dir, vm.dunkin.name, vm.dunkin.mime_type, vm.dunkin.created, vm.dunkin.downloadlink)
      .success(function(data){
        vm.processing = false;

        if(data.success){
          console.log("Media Ctrl Success");
          $location.path('/');
        }else {
          vm.error = data.message;
          console.log(vm.error);
        }
      })
  }

  vm.goGetData3 = function(){
    vm.processing = true;
    vm.error = '';
    Media.getData3()
      .success(function(data){
        vm.mediafireData= data;
        vm.processing= false;
      });
  }

  vm.goGetId3 = function(){
    //console.log("In Id controller");
    vm.processing = true;
    vm.error = '';
    Media.getLatestId3(vm.dunkin.name, vm.dunkin.parent)
      .success(function(data){
        vm.latestData = data;
        //console.log("Me1");
        //vm.dummyFunction(data);
        //console.log(vm.latestData[0]._id);


        if(!vm.latestData[0]){
          idData = 0;
        }
        else {
          idData = vm.latestData[0]._id;
        }
        $window.localStorage.setItem('parentid1', idData);
        vm.processing= false;
      });
  }
  vm.goGetAllChildren3 = function(){
    vm.processing = true;
    vm.error = '';
    Media.getAllChildren3(vm.childData.parent)
      .success(function(data){
        vm.children = data;
        vm.processing= false;
      })
  }
})
