var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Visitor = app.models.visitor;
    var visitorController = {};
    visitorController.listaVisitors = function (req, res) {
        Visitor.find().populate('event').populate('unit').exec()
            .then(function(visitors){
                res.json(visitors);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    visitorController.listByEvent = function (req, res) {
        var _id = sanitize(req.params.id);
        Visitor.find({event:_id}).populate('event').populate('unit').exec()
            .then(function(visitors){
                res.json(visitors);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    visitorController.listByUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        Visitor.find({unit:_id}).populate('event').populate('unit').exec()
            .then(function(visitors){
                res.json(visitors);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    visitorController.obtemVisitor = function (req, res) {
        var _id = sanitize(req.params.id);
        Visitor.findById(_id).populate('event').populate('unit').exec()
            .then(function(visitor){
                if(!visitor) throw new Error("Visitante não encontrado");
                res.json(visitor);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    visitorController.removeVisitor = function (req, res) {
        var _id = sanitize(req.params.id);
        Visitor.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    visitorController.salvaVisitor = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "document": req.body.document,
          "contact": req.body.contact,
          "enter": req.body.enter,
          "exit": req.body.exit,
          "event": req.body.event || null,
          "unit": req.body.unit || null
        };
        if(_id){
            Visitor.findByIdAndUpdate(_id, dados).exec()
                .then(function(visitor){
                    res.json(visitor);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Visitor.create(dados)
                .then(function(visitor){
                    res.status(201).json(visitor);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return visitorController;
};
