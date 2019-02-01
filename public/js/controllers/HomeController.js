angular.module('prototipo').controller('HomeController',
function($scope, $http, $window, $location, $routeParams, Area, User, Condom, Tower, Unit, Possession, AuthService) {
    $scope.saved = false;
    if($routeParams.userId){
        User.get({id: $routeParams.userId},
            function(user){
                $scope.loggedUser = user;
                AuthService.setLoggedUser(user);
                if (user.tower != undefined){
                    $scope.filtroTower = user.tower._id;
                }
                if (!user.isSuper && user.condom != undefined && user.condom != null){
                  $http.get('/servers/condom/' + $scope.loggedUser.condom._id)
                  .then(function(response) {
                      $scope.servers = response.data;
                  });
                  $http.get('/workers/condom/' + $scope.loggedUser.condom._id)
                  .then(function(response) {
                      $scope.workers = response.data;
                  });
                  $http.get('/workers/tower/' + $scope.loggedUser.tower._id)
                  .then(function(response) {
                    response.data.forEach(function(item) {
                      $scope.workers.push(item);
                    });
                  });
                  $http.get('/workers/unit/' + $scope.loggedUser.unit._id)
                  .then(function(response) {
                    response.data.forEach(function(item) {
                      $scope.workers.push(item);
                    });
                  });
                  if (user.isAdmin){
                    $http.get('/users/condom/' + user.condom._id)
                    .then(function(response) {
                        $scope.users = response.data;
                    });
                  }
                  $http.get('/areas/condom/' + user.condom._id)
                  .then(function(response) {
                      $scope.areas = response.data;
                  });
                  $http.get('/condoms/' + $scope.loggedUser.condom._id)
                  .then(function(response) {
                      $scope.condom = response.data;
                  });
                }
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o usuário'};
                console.log(erro);
            }
        );
    } else if($scope.loggedUser == undefined) {
        console.log("Não tem userId")
        $scope.loggedUser = new User();
    }

    $scope.cadastrar = function(code){
      $http.get('/condoms/code/' + code)
      .then(function(response) {
          $scope.condomNewUser = response.data[0];
          if($scope.condomNewUser != undefined){
            $scope.towers = $scope.condomNewUser.towers;
          }
      });
    };

    $scope.towerNewUser = ''
    $scope.toUserChanged = function(torre){
      if (torre != ''){
        $scope.towerNewUser = JSON.parse(torre);
        $http.get('/towers/' + $scope.towerNewUser._id)
        .then(function(response) {
            $scope.units = response.data.units;
        });
      }
    };

    $scope.unitNewUser = ''
    $scope.unUserChanged = function(unidade){
      if (unidade != ''){
          $scope.unitNewUser = JSON.parse(unidade);
      }
    }

    $scope.showSyndicDetails = function(syndic) {
      var alertMessage = "Síndico: " + syndic.name + "\nContato: " + syndic.contact + "\nEmail: " + syndic.email;
      $window.alert(alertMessage);
    }

    $scope.saveLoggedUser = function(condominio, torre, unidade){
      var logged = new User($scope.loggedUser);
      logged.isBlocked = true;
      logged.condom = condominio;
      logged.tower = JSON.parse(torre);
      logged.unit = JSON.parse(unidade);
      logged.$save()
          .then(function(){
              $scope.saved = true;
              $window.location.reload();
              $scope.mensagem = {texto: 'Dados salvos com sucesso, aguarde o desbloqueio por parte do responsável pela unidade.'};
          })
          .catch(function(){
              $scope.mensagem = {texto: 'Não foi possível salvar o usuário'};
          });
    }

    $scope.back = function(){
         $window.history.back();
    };
});
