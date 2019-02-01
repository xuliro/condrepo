var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Server = app.models.server;
    var serverController = {};
    serverController.listaServers = function (req, res) {
        Server.find().populate('condom').exec()
            .then(function(servers){
                res.json(servers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    serverController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Server.find({condom:_id}).exec()
            .then(function(servers){
                res.json(servers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    serverController.obtemServer = function (req, res) {
        var _id = sanitize(req.params.id);
        Server.findById(_id).populate('condom').exec()
            .then(function(server){
                if(!server) throw new Error("Prestador não encontrado");
                res.json(server);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    serverController.removeServer = function (req, res) {
        var _id = sanitize(req.params.id);
        Server.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    serverController.salvaServer = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "category": req.body.category,
          "description": req.body.description,
          "contact": req.body.contact,
          "condom": req.body.condom || null
        };
        if(_id){
            Server.findByIdAndUpdate(_id, dados).exec()
                .then(function(server){
                    res.json(server);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Server.create(dados)
                .then(function(server){
                    res.status(201).json(server);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return serverController;
};
