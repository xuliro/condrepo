angular.module('prototipo').controller('CondomController',
    function($scope, $http, $window, $location, $routeParams, Condom, Tower, Area, AuthService) {
        if($routeParams.condomId){
            $scope.loggedUser = AuthService.getLoggedUser();
            Condom.get({id: $routeParams.condomId},
                function(condom){
                    $scope.condom = condom;
                    $http.get('/areas/condom/' + condom._id)
                    .then(function(response) {
                        $scope.areas = response.data;
                    });
                    if ($scope.loggedUser.isAdmin || $scope.loggedUser.isSuper)
                    {
                      $http.get('/workers/condom/all/' + condom._id)
                      .then(function(response) {
                          $scope.workers = response.data;
                      });
                    }
                    else{
                      $http.get('/workers/condom/' + condom._id)
                      .then(function(response) {
                          $scope.workers = response.data;
                      });
                    }
                    $http.get('/servers/condom/' + condom._id)
                    .then(function(response) {
                        $scope.servers = response.data;
                    });
                    $http.get('/users/condom/adms/' + condom._id)
                    .then(function(response) {
                        $scope.users = response.data;
                    });
                },
                function(erro){
                    $scope.mensagem = {texto: 'Não foi possível obter o condominio'};
                    console.log(erro);
                }
            );
        } else {
            $scope.condom = new Condom();
        }
        $scope.salvaCondom = function(){
            $scope.condom.$save()
                .then(function(){
                   $window.location.reload();
                   $scope.mensagem = {texto: 'Condominio salvo com sucesso'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar o condominio'};
                });
        };
        $scope.addTowerToCondom = function(name){
            if ($scope.condom.towers == undefined){
              $scope.condom.towers = [];
            }
            var tower = new Tower();
            tower.name = name;
            tower.$save()
                .then(function(){
                    $scope.condom.towers.push(tower);
                    $scope.mensagem = {texto: 'Torre salva com sucesso ao condomínio'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar a torre do condomínio'};
                });
        };
        $scope.removeTowerFromCondom = function(tower){
          if ($window.confirm("Confirma a exclusão da torre " + tower.name + "?")){
            var position = $scope.condom.towers.indexOf(tower);
            $scope.condom.towers.splice(position, 1);
            Tower.delete({id: tower._id},
                function(erro){
                    $scope.mensagem = {texto: 'Removido com sucesso'};
                }
            );
          }
        };
        $scope.changeSyndic = function(user){
          $scope.condom.syndic = JSON.parse(user);
          $scope.mensagem = {texto: 'Salve o condomínio para que a alteração no síndico seja salva.'};
        };

        $scope.back = () => $window.history.back()

        Condom.query(function(condoms) {
            $scope.condoms = condoms;
        });
    });
