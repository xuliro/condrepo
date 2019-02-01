angular.module('prototipo',['ngRoute', 'ngResource', 'angular.filter'])
    .config(function($routeProvider, $httpProvider){

        $httpProvider.interceptors.push('meuInterceptor');

        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/home/:userId', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        });
        //Condom
        $routeProvider.when('/condoms', {
            templateUrl: 'partials/condoms.html',
            controller: 'CondomsController'
        });
         $routeProvider.when('/condom', {
            templateUrl: 'partials/condom.html',
            controller: 'CondomController'
        });
        $routeProvider.when('/condom/:condomId', {
            templateUrl: 'partials/condom.html',
            controller: 'CondomController'
        });
        //Tower
        /*$routeProvider.when('/towers', {
            templateUrl: 'partials/towers.html',
            controller: 'TowersController'
        });
        $routeProvider.when('/tower', {
            templateUrl: 'partials/tower.html',
            controller: 'TowerController'
        });*/
        $routeProvider.when('/tower/:towerId', {
            templateUrl: 'partials/tower.html',
            controller: 'TowerController'
        });
        //Unit
        $routeProvider.when('/unit/:unitId', {
            templateUrl: 'partials/unit.html',
            controller: 'UnitController'
        });
        //User
        $routeProvider.when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'UsersController'
        });
        $routeProvider.when('/user', {
            templateUrl: 'partials/user.html',
            controller: 'UserController'
        });
        $routeProvider.when('/user/:userId', {
            templateUrl: 'partials/user.html',
            controller: 'UserController'
        });
        //Message
        $routeProvider.when('/messages', {
            templateUrl: 'partials/messages.html',
            controller: 'MessagesController'
        });
         $routeProvider.when('/message', {
            templateUrl: 'partials/message.html',
            controller: 'MessageController'
        });
        $routeProvider.when('/message/:messageId', {
            templateUrl: 'partials/message.html',
            controller: 'MessageController'
        });
        //Possession
        $routeProvider.when('/possessions', {
            templateUrl: 'partials/possessions.html',
            controller: 'PossessionsController'
        });
         $routeProvider.when('/possession', {
            templateUrl: 'partials/possession.html',
            controller: 'PossessionController'
        });
        $routeProvider.when('/possession/:possessionId', {
            templateUrl: 'partials/possession.html',
            controller: 'PossessionController'
        });
        //Bill
        $routeProvider.when('/bills', {
            templateUrl: 'partials/bills.html',
            controller: 'BillsController'
        });
         $routeProvider.when('/bill', {
            templateUrl: 'partials/bill.html',
            controller: 'BillController'
        });
        $routeProvider.when('/bill/:billId', {
            templateUrl: 'partials/bill.html',
            controller: 'BillController'
        });
        //Sell
        $routeProvider.when('/sells', {
            templateUrl: 'partials/sells.html',
            controller: 'SellsController'
        });
         $routeProvider.when('/sell', {
            templateUrl: 'partials/sell.html',
            controller: 'SellController'
        });
        $routeProvider.when('/sell/:sellId', {
            templateUrl: 'partials/sell.html',
            controller: 'SellController'
        });
        //Worker
        $routeProvider.when('/workers', {
            templateUrl: 'partials/workers.html',
            controller: 'WorkersController'
        });
         $routeProvider.when('/worker', {
            templateUrl: 'partials/worker.html',
            controller: 'WorkerController'
        });
        $routeProvider.when('/worker/:workerId', {
            templateUrl: 'partials/worker.html',
            controller: 'WorkerController'
        });
        //Server
        $routeProvider.when('/servers', {
            templateUrl: 'partials/servers.html',
            controller: 'ServersController'
        });
         $routeProvider.when('/server', {
            templateUrl: 'partials/server.html',
            controller: 'ServerController'
        });
        $routeProvider.when('/server/:serverId', {
            templateUrl: 'partials/server.html',
            controller: 'ServerController'
        });
        //Area
        $routeProvider.when('/areas', {
            templateUrl: 'partials/areas.html',
            controller: 'AreasController'
        });
         $routeProvider.when('/area', {
            templateUrl: 'partials/area.html',
            controller: 'AreaController'
        });
        $routeProvider.when('/area/:areaId', {
            templateUrl: 'partials/area.html',
            controller: 'AreaController'
        });
        //Event
        $routeProvider.when('/events', {
            templateUrl: 'partials/events.html',
            controller: 'EventsController'
        });
         $routeProvider.when('/event', {
            templateUrl: 'partials/event.html',
            controller: 'EventController'
        });
        $routeProvider.when('/event/:eventId', {
            templateUrl: 'partials/event.html',
            controller: 'EventController'
        });
        //Visitor
        $routeProvider.when('/visitors', {
            templateUrl: 'partials/visitors.html',
            controller: 'VisitorsController'
        });
         $routeProvider.when('/visitor', {
            templateUrl: 'partials/visitor.html',
            controller: 'VisitorController'
        });
        $routeProvider.when('/visitor/:visitorId', {
            templateUrl: 'partials/visitor.html',
            controller: 'VisitorController'
        });
        //Archive
        $routeProvider.when('/archives', {
            templateUrl: 'partials/archives.html',
            controller: 'ArchivesController'
        });
         $routeProvider.when('/archive', {
            templateUrl: 'partials/archive.html',
            controller: 'ArchiveController'
        });
        $routeProvider.when('/archive/:archiveId', {
            templateUrl: 'partials/archive.html',
            controller: 'ArchiveController'
        });
        //Autenticacao
        $routeProvider.when('/auth', {
            templateUrl: 'partials/auth.html'
        });
        //Default route
        $routeProvider.otherwise({redirectTo: '/auth'});
    });
