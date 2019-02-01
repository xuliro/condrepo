angular.module('prototipo').controller('UnitController',
    function($scope, $http, $window, $routeParams, User, Unit) {
        if($routeParams.unitId){
            Unit.get({id: $routeParams.unitId},
                function(unit){
                    $scope.unit = unit;
                    $http.get('/users/unit/' + unit._id)
                    .then(function(response) {
                        $scope.users = response.data;
                    });
                    $http.get('/users/notunit/' + unit._id)
                    .then(function(response) {
                        $scope.usrs = response.data;
                    });
                    $http.get('/visitors/unit/' + unit._id)
                    .then(function(response) {
                        $scope.visitors = response.data;
                    });
                    $http.get('/workers/unit/' + unit._id)
                    .then(function(response) {
                        $scope.workers = response.data;
                    });
                },
                function(erro){
                    $scope.mensagem = {texto: 'Não foi possível obter a unidade'};
                    console.log(erro);
                }
            );
        } else {
            $scope.unit = new Unit();
        }
        $scope.salvaUnit = function(){
            $scope.unit.$save()
                .then(function(){
                    $window.location.reload();
                    $scope.mensagem = {texto: 'Unidade salva com sucesso'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar a unidade'};
                });
        };
        $scope.back = function(){
             $window.history.back();
        };
        Unit.query(function(units) {
            $scope.units = units;
        });
    });
