angular.module('prototipo').controller('ArchivesController',
function($scope, $window, $http, Archive, Condom, AuthService) {
    $scope.archives = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();
    
    function buscaArchives() {
        Archive.query(
        function(archives){
            $scope.archives = archives;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de arquivos'};
            console.log(erro);
        });
    }
    buscaArchives();

    $scope.removeArchive = function(archive) {
        if ($window.confirm("Confirma a exclusão do arquivo " + archive.brief + "?")) {
          Archive.delete({id: archive._id},
              buscaArchives,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover o arquivo'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.condoms = [];
    $scope.condom = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.condomArchiveChanged =  function(filtro){
      $scope.condom = [];
      if (filtro != ''){
        $scope.condom = JSON.parse(filtro);
        $http.get('/condoms/' + $scope.condom._id)
        .then(function(response) {
            $scope.filtroC = $scope.condom.name;
        });
      }
    }

    $scope.filterArchives = function(archive) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (archive.brief.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (archive.condom == undefined || archive.condom == null || archive.condom.name != $scope.filtroC){
            return;
          }
        }
        return archive;
    }

    $scope.showDetails = function(archive) {
      var alertMessage = "Arquivo: " + archive.brief +
          "\nDetalhes: " + archive.details +
          "\nData de inclusão: " + archive.inclusion;
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
