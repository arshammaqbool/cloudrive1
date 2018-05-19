angular.module('oneCtrl',[])


.controller('OneController', function($rootScope, $location, One, Auth) {
    var vm = this;
    vm.goFetchData2 = function(){

      vm.processing= true;
      vm.error = '';

      One.fetcData2(sessionStorage.s1,sessionStorage.s2,sessionStorage.s3,sessionStorage.s4,sessionStorage.s5,sessionStorage.s6,sessionStorage.s7)
        .success(function(data){
          vm.processing = false;
          if(data.success){
            console.log("One ctrl success");
            $location.path('/dashboard');
          }else {
            vm.error = data.message;
          }
        })
    }

    vm.goGetdata2 = function(){
      vm.processing = true;
      console.log("In One ctrl");
      vm.error = '';
      One.getData2()
        .success(function(data){
          vm.onedriveData = data;
          vm.processing= false;
        });
    }
    
    vm.goGetId2 = function(){
      //console.log("In Id controller");
      vm.processing = true;
      vm.error = '';
      console.log(vm.onedata.parent);
      console.log(vm.onedata.name);
      One.getLatestId2(vm.onedata.name, vm.onedata.parent)
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

    vm.goGetAllChildren5 = function(){
      vm.processing = true;
      vm.error = '';
      One.getAllChildren5(vm.childData.parent)
        .success(function(data){
          vm.children = data;
          vm.processing= false;
        })
    }
    $rootScope.init = function () {
      vm.goGetdata2();
    };
})
