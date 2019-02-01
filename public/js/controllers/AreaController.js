angular.module('prototipo').controller('AreaController',
function($scope, $http, $window, $location, $routeParams, Area, Condom, Tower, AuthService) {

    $scope.loggedUser = AuthService.getLoggedUser();

    if($routeParams.areaId){
        Area.get({id: $routeParams.areaId},
            function(area){
                $scope.area = area;
                $http.get('/events/area/' + area._id)
                .then(function(response) {
                    $scope.events = response.data;
                });
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter a área comum'};
                console.log(erro);
            }
        );
    } else {
        $scope.area = new Area();
    }
    $scope.salvaArea = function(){
        if (condom != ''){
          $scope.area.condom = condom;
        }
        if (tower != ''){
          $scope.area.tower = tower;
        }

        $scope.area.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Área comum salva com sucesso'};
                //$location.path('/areas/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar a área comum'};
            });
    };
    Area.query(function(areas) {
        $scope.areas = areas;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    var tower = '';

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });
    $scope.coAreaChanged =  function(){
      $scope.filtroCo = '';
      if ($scope.filtroC != ''){
        condom = JSON.parse($scope.filtroC);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroCo = condom.name;
        });
      }
    }
    $scope.toAreaChanged = function(){
      $scope.filtroTo = '';
      if ($scope.filtroT != ''){
        tower = JSON.parse($scope.filtroT);
        $http.get('/towers/' + tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroTo = tower.name;
        });
      }
    }
});
