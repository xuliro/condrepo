angular.module('prototipo').controller('AreasController',
function($scope, $window, $http, Area, Condom, Tower, Unit) {
    $scope.areas = [];
    $scope.selectedArea = '';
    $scope.mensagem = {texto: ''};

    function buscaAreas() {
        Area.query(
        function(areas){
            $scope.areas = areas;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de áreas comuns'};
            console.log(erro);
        });
    }
    buscaAreas();

    $scope.removeArea = function(area) {
        if ($window.confirm("Confirma a exclusão da área comum " + area.name + "?")) {
          Area.delete({id: area._id},
              buscaAreas,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover a área comum'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.showDetails = function(area) {
      var alertMessage = "Área Comum: " + area.name +
          "\nDescrição: " + area.description +
          "\nCapacidade: " + area.capacity + " pessoas" +
          (area.tower === null ? "" : ("\nTorre: " + area.tower.name));
      $window.alert(alertMessage);
    }

    $scope.condoms = [];
    $scope.towers = [];

    $scope.condom = null;
    $scope.tower = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.condomAreaChanged =  function(filtro){
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

    $scope.towerAreaChanged = function(filtro){
      $scope.tower = [];
      if (filtro != ''){
        $scope.tower = JSON.parse(filtro);
        $http.get('/towers/' + $scope.tower._id)
        .then(function(response) {
            $scope.filtroT = $scope.tower.name;
        });
      }
    }

    $scope.filterAreas = function(area) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (area.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (area.condom == undefined || area.condom == null || area.condom.name != $scope.filtroC){
            return;
          }
        }
        if ($scope.filtroT != undefined && $scope.filtroT != ''){
          if (area.tower == undefined || area.tower == null || area.tower.name != $scope.filtroT){
            return;
          }
        }
        return area;
    }

    $scope.back = function(){
         $window.history.back();
    };
});
