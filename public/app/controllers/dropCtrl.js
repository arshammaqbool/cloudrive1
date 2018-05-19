angular.module('dropCtrl',[])

.controller('DropController', function($rootScope, $location, Drop, $window, Auth) {

  var vm = this;
  var allu;
  var idData ;
  var use_id_data;
  var prnt;
  vm.goFetchData = function(){

    vm.processing = true;
    vm.error = '';


  //  Drop.getLatestId()
    //  .success(function(data){
    //    vm.latestData = data;
        //idData = data;
        //console.log(idData);

      //  console.log(vm.dummyFunction(data));
      //  vm.processing= false;
      //});
      //console.log("Abcd");
      //console.log(use_id_data);

    Drop.fetchData(sessionStorage.b1,sessionStorage.n1,sessionStorage.s1,sessionStorage.s2,sessionStorage.s3,sessionStorage.s4,sessionStorage.b2,sessionStorage.s5,sessionStorage.s6,sessionStorage.s7,sessionStorage.s8,sessionStorage.s9)
    .success(function(data){
      vm.processing = false;
      vm.fetch = {};
      if(data.success){
        console.log("Drop Ctrl Success");
        $location.path('/');
      }else {
        vm.error = data.message;
        //console.log(vm.error);
      }
    })
  }
  vm.goGetData = function(){
    vm.processing = true;
    vm.error = '';
    Drop.getData()
      .success(function(data){
        //console.log("me2 Sufi"+data);
        vm.dropboxData = data;
        vm.processing= false;
      });
  }
  vm.goGetId = function(){
    //console.log("In Id controller");
    vm.processing = true;
    vm.error = '';
    Drop.getLatestId(vm.fetch.name, vm.fetch.parent)
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
  vm.goGetAllChildren = function(){
    vm.processing = true;
    vm.error = '';
    Drop.getAllChildren(vm.childData.parent)
      .success(function(data){
        vm.children = data;
        vm.processing= false;
      })
  }
  vm.dummyFunction = function(abc)
  {
    //use_id_data=  abc;
    //return use_id_data;
  }

  $rootScope.init = function () {
      vm.goGetData();
  };
})
