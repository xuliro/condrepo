var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Worker = app.models.worker;
    var workerController = {};
    workerController.listaWorkers = function (req, res) {
        Worker.find().populate('condom').populate('tower').populate('unit').exec()
            .then(function(workers){
                res.json(workers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    workerController.listByUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.find({unit:_id}).exec()
            .then(function(workers){
                res.json(workers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    workerController.listByTower = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.find({tower:_id, unit: null}).exec()
            .then(function(workers){
                res.json(workers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    workerController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.find({condom:_id, tower: null, unit: null}).exec()
            .then(function(workers){
                res.json(workers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    workerController.listAllByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.find({condom:_id}).populate('tower').populate('unit').exec()
            .then(function(workers){
                res.json(workers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    workerController.obtemWorker = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.findById(_id).populate('condom').populate('tower').populate('unit').exec()
            .then(function(worker){
                if(!worker) throw new Error("Funcionario não encontrado");
                res.json(worker);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    workerController.removeWorker = function (req, res) {
        var _id = sanitize(req.params.id);
        Worker.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    workerController.salvaWorker = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "address": req.body.address,
          "document": req.body.document,
          "contact": req.body.contact,
          "condom": req.body.condom || null,
          "tower": req.body.tower || null,
          "unit": req.body.unit || null
        };
        if(_id){
            Worker.findByIdAndUpdate(_id, dados).exec()
                .then(function(worker){
                    res.json(worker);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Worker.create(dados)
                .then(function(worker){
                    res.status(201).json(worker);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return workerController;
};
