angular.module('prototipo').controller('UserController',
function($scope, $http, $window, $location, $routeParams, User, Condom, Tower, Unit, Possession, AuthService) {
    $scope.loggedUser = AuthService.getLoggedUser();
    if($routeParams.userId){
        User.get({id: $routeParams.userId},
            function(user){
                $scope.user = user;
                $http.get('/messages/sender/' + user._id)
                .then(function(response) {
                    $scope.sent = response.data;
                });
                $http.get('/messages/receiver/' + user._id)
                .then(function(response) {
                    $scope.received = response.data;
                });
                countPossessions();
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o usuário'};
                console.log(erro);
            }
        );
    } else {
        $scope.user = new User();
    }
    $scope.salvaUser = function(){
        if ($scope.user.provider == undefined){
           $scope.user.provider = "Internal";
           $scope.user.id = new Date().getTime();
        }

        if (condom != ''){
          $scope.user.condom = condom;
        }
        if (tower != ''){
          $scope.user.tower = tower;
        }
        if (unit != ''){
          $scope.user.unit = unit;
        }

        $scope.user.$save()
            .then(function(){
                $window.location.reload();
            })
            .catch(function(errors){
                console.log(JSON.stringify(errors));
                $scope.mensagem = {texto: 'Não foi possível salvar o usuário'};
            });
    };
    User.query(function(users) {
        $scope.users = users;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    var tower = '';
    var unit = '';

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.coUserChanged =  function(filtro){
      $scope.filtroCo = '';
      if (filtro != ''){
        condom = JSON.parse(filtro);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroCo = condom.name;
        });
      }
    }
    $scope.toUserChanged = function(filtro){
      $scope.filtroTo = '';
      if (filtro != ''){
        tower = JSON.parse(filtro);
        $http.get('/towers/' + tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroTo = tower.name;
        });
      }
    }
    $scope.unUserChanged = function(filtro){
      $scope.filtroUn = '';
      if (filtro != ''){
          unit = JSON.parse(filtro);
          $scope.filtroUn = unit.name;
      }
    }
    $scope.removeCond = function(){
        if ($window.confirm("Esta ação irá desassociar permanentemente este usuário, deseja continuar?")){
          $scope.user.condom = null;
          $scope.user.tower = null;
          $scope.user.unit = null;
        }
    };

    $scope.addPossession = function(p){
        var possession = new Possession();
        possession.id = p.id;
        possession.details = p.details;
        possession.category = p.category;
        possession.license = p.license;
        possession.$save()
          .then(function(){
            $scope.mensagem = {texto: 'Salvo com sucesso'};
            if ($scope.user.possessions == undefined){
              $scope.user.possessions = [];
            }
            $scope.user.possessions.push(possession);
            console.log("USER " + JSON.stringify($scope.user) + " possessions " + JSON.stringify($scope.user.possessions));
            countPossessions();
          })
          .catch(function(){
              $scope.mensagem = {texto: 'Não foi possível salvar'};
          });
    };

    $scope.removePossession = function(possession){
      if ($window.confirm("Confirma a exclusão de " + possession.category + " " + possession.details + "?")){
        var position = $scope.user.possessions.indexOf(possession);
        $scope.user.possessions.splice(position, 1);
        Possession.delete({id: possession._id},
            function(erro){
                $scope.mensagem = {texto: 'Removido com sucesso'};
            }
        );
        countPossessions();
      }
    };

    function countPossessions(){
      $scope.animals = 0;
      $scope.vehicles = 0;
      if ($scope.user.possessions != undefined){
        $scope.user.possessions.forEach(function(entry) {
            if (entry.id == 0){
              $scope.animals++;
            }
            else if (entry.id == 1){
              $scope.vehicles++;
            }
        });
      }
    }
});
