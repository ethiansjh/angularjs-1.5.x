app.controller('TestCtrl', ['$scope', function($scope){
    console.log('in TestCtrl');
    $scope.who = ' tu';
    $scope.what = ' vas bien? ';

    $scope.$on('evt', function (evt, msg) {
        console.log('Reçu dans parent : ' + msg);
        $scope.messageAuxDescendants = msg + 'Renvoyé';
    });
}]);

app.controller('ChildCtrl', ['$scope', function($scope){
    console.log('ChildCtrl');
    $scope.what = ' bien ou bienne? ';

    $scope.$on('evt', function (evt, msg) {
        console.log('Reçu dans ChildController : ' + msg);
    });
}]);

app.controller('GrandChildCtrl', ['$scope', function($scope){
    console.log('GrandChildCtrl');
    $scope.who = ' Noemie';
    $scope.what = ' tu vas bien?';

    // $scope.$emit('evt-e', 'Message aux parents de GrandChildController');
    $scope.$on('evt', function (evt, msg) {
        console.log('Reçu dans GrandChildController : ' + msg);
    });
}]);

app.controller('BroadcastCtrl', function($rootScope, $scope){
    $scope.send = function(){
        $rootScope.$broadcast('importantName', $scope.name)
    }

    $scope.name = "Misko Hevery";

    $scope.$watch('name', function(newValue, oldValue) {
        console.log('New value: ' + newValue);
        console.log('Old value: ' + oldValue);

        if(newValue === 'Khalid Sookia') {
            $rootScope.$broadcast('importantName', $scope.name);
        }
    });
});

app.controller('ReciverCtrl', function($scope){
  $scope.$on('importantName', function(events, args){
    console.log(args);
    $scope.name = args;
  })
});