angular.module('prototipo').controller('ArchiveController',
function($scope, $http, $window, $location, $routeParams, Archive, Condom) {
    if($routeParams.archiveId){
        Archive.get({id: $routeParams.archiveId},
            function(archive){
                $scope.archive = archive;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o arquivo'};
                console.log(erro);
            }
        );
    } else {
        $scope.archive = new Archive();
    }
    $scope.salvaArchive = function(){
        if (condom != ''){
          $scope.archive.condom = condom;
        }

        $scope.archive.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Arquivo salvo com sucesso'};
                //$location.path('/archives/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o arquivo'};
            });
    };
    Archive.query(function(archives) {
        $scope.archives = archives;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });
    
    $scope.coArchiveChanged =  function(){
      $scope.filtroCo = '';
      if ($scope.filtroC != ''){
        condom = JSON.parse($scope.filtroC);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.filtroCo = condom.name;
        });
      }
    }
});
