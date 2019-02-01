angular.module('prototipo').controller('UsersController',
function($scope, $http, $window, User, Condom, Tower, Unit, AuthService) {
    $scope.users = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaUsers() {
      if ($scope.loggedUser.isSuper){
        User.query(
        function(users){
            $scope.users = users;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de usuários'};
            console.log(erro);
        });
      } else if($scope.loggedUser.isAdmin){
          $http.get('/users/condom/' + $scope.loggedUser.condom._id)
          .then(function(response) {
              $scope.users = response.data;
          });
      }
    }
    buscaUsers();

    $scope.removeUser = function(user) {
      if ($window.confirm("Confirma a exclusão do usuário " + user.name + "?")) {
        User.delete({id: user._id},
            buscaUsers,
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível remover o usuário'};
                console.log(erro);
            }
        );
      }
    }

    $scope.showDetails = function(user) {
       var alertMessage = "\nID: " + user.id +
           "\n\nLogin: " + user.login +
           "\nNome: " + user.name +
           "\nEmail: "  + (user.email === null ? "N/A" : user.email) +
           "\n\nCondomínio: " + (user.condom === null ? "N/A" : user.condom.name) +
           (user.tower === null ? "" : ("\nTorre: " + user.tower.name)) +
           (user.unit === null ? "" : ("\nUnidade: " + user.unit.name)) +
           "\n\nProvider: " + user.provider +
           "\nBloqueado: " + (user.isBlocked === true ? "Sim" : "Não") +
           "\nAdicionado em " + user.inclusion +
           "\n\nSíndico: " + (user.isAdmin === true ? "Sim" : "Não") +
           "\nGestor: " + (user.isSuper === true ? "Sim" : "Não");
            if (user.possessions != undefined && user.possessions.length){
                alertMessage += "\n\nPosses:";
                for (i=0; i<user.possessions.length; i++) {
                    if (user.possessions[i].id == 0){
                      alertMessage += "\nAnimal: ";
                    }
                    else if (user.possessions[i].id == 1){
                      alertMessage += "\nVeículo: ";
                    }
                    alertMessage += user.possessions[i].category + " " + user.possessions[i].details + (user.possessions[i].license === null ? "" : (" - " + user.possessions[i].license));
                }
            }
      $window.alert(alertMessage);
    }

    $scope.condoms = [];
    $scope.towers = [];
    $scope.units = [];

    $scope.condom = null;
    $scope.tower = null;
    $scope.unit = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.condomChanged =  function(filtro){
      $scope.condom = [];
      $scope.towers = [];
      if (filtro != ''){
        $scope.condom = JSON.parse(filtro);
        $http.get('/condoms/' + $scope.condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroC = $scope.condom.name;
        });
      }
    }

    $scope.towerChanged = function(filtro){
      $scope.tower = [];
      $scope.units = [];
      if (filtro != ''){
        $scope.tower = JSON.parse(filtro);
        $http.get('/towers/' + $scope.tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroT = $scope.tower.name;
        });
      }
    }

    $scope.unitChanged = function(filtro){
      $scope.tower = [];
      $scope.filtroU = '';
      if (filtro != ''){
          $scope.unit = JSON.parse(filtro);
          $scope.filtroU = $scope.unit.name;
      }
    }

    $scope.filterUsers = function(user) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (user.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroProvider != undefined && $scope.filtroProvider != ''){
          if (user.provider != $scope.filtroProvider){
            return;
          }
        }
        if ($scope.filtroAdmin != undefined && $scope.filtroAdmin != ''){
          if (user.isAdmin != $scope.filtroAdmin){
            return;
          }
        }
        if ($scope.filtroSuper != undefined && $scope.filtroSuper != ''){
          if (user.isSuper != $scope.filtroSuper){
            return;
          }
        }
        if ($scope.filtroBlocked != undefined && $scope.filtroBlocked != ''){
          if (user.isBlocked != $scope.filtroBlocked){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (user.condom == undefined || user.condom == null || user.condom.name != $scope.filtroC){
            return;
          }
        }
        if ($scope.filtroT != undefined && $scope.filtroT != ''){
          if (user.tower == undefined || user.tower == null || user.tower.name != $scope.filtroT){
            return;
          }
        }
        if ($scope.filtroU != undefined && $scope.filtroU != ''){
          if (user.unit == undefined || user.unit == null || user.unit.name != $scope.filtroU){
            return;
          }
        }
        return user;
    }

    $scope.back = function(){
         $window.history.back();
    };
});
