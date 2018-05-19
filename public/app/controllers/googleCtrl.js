angular.module('googleCtrl',[])


.controller('GoogleController', function($rootScope, $location, Google, Auth) {

  var vm = this;
  vm.goFetchData4 = function(){
    vm.processing = true;
    vm.error = '';

    Google.fetchData4(sessionStorage.s1,sessionStorage.s2,sessionStorage.s3,sessionStorage.s4,sessionStorage.s5,sessionStorage.s6,sessionStorage.s7)
    .success(function(data){
      vm.processing = false;
      vm.fetch = {};
      if(data.success){
        console.log("Google Ctrl Success");
        $location.path('/');
      }else {
        vm.error = data.message;
        //console.log(vm.error);
      }
    })
  }
  vm.goGetData4 = function(){
    vm.processing = true;
    vm.error = '';
    Google.getData4()
      .success(function(data){
        vm.googledriveData = data;
        vm.processing= false;
      });
  }

  vm.goGetId4 = function(){
    //console.log("In Id controller");
    vm.processing = true;
    vm.error = '';
    console.log(vm.pringles.parent);
    Google.getLatestId4(vm.pringles.name, vm.pringles.parent)
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
  vm.goGetAllChildren2 = function(){
    vm.processing = true;
    vm.error = '';
    Google.getAllChildren2(vm.childData.parent)
      .success(function(data){
        vm.children = data;
        vm.processing= false;
      })
  }

})
