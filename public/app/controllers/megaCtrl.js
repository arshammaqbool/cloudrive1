angular.module('megaCtrl',[])

.controller('MegaController', function($rootScope, $location, Mega, Auth) {

  var vm = this;

  vm.goFetchData5 = function(){

    vm.processing = true;
    vm.error = '';

    Mega.fetchData5(vm.minnion.node_id, vm.minnion.parent_id, vm.minnion.name, vm.minnion.size, vm.minnion.is_dir, vm.minnion.type, vm.minnion.modified)
      .success(function(data){
        vm.processing = false;
        if(data.success){
          console.log("Mega Ctrl Success");
          $location.path('/');
        }else {
          vm.error = data.message;
          //console.log(vm.error);
        }
      })
  }

  vm.goGetData5 = function(){
    vm.processing = true;
    vm.error = '';
    Mega.getData5()
      .success(function(data){
        vm.megaData = data;
        vm.processing= false;
      });
  }

  vm.goGetId5 = function(){
    //console.log("In Id controller");
    vm.processing = true;
    vm.error = '';
    Mega.getLatestId5(vm.minnion.name, vm.minnion.parent)
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
  vm.goGetAllChildren4 = function(){
    vm.processing = true;
    vm.error = '';
    Mega.getAllChildren4(vm.childData.parent)
      .success(function(data){
        vm.children = data;
        vm.processing= false;
      })
  }

})
