var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Unit = app.models.unit;
    var unitController = {};
    unitController.listaUnits = function (req, res) {
        Unit.find().exec()
            .then(function(units){
                res.json(units);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    unitController.obtemUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        Unit.findById(_id).exec()
            .then(function(unit){
                if(!unit) throw new Error("Unit não encontrada");
                res.json(unit);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    unitController.removeUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        Unit.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    unitController.salvaUnit = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "fraction": req.body.fraction
        };
        if(_id){
            Unit.findByIdAndUpdate(_id, dados).exec()
                .then(function(unit){
                    res.json(unit);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Unit.create(dados)
                .then(function(unit){
                    res.status(201).json(unit);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return unitController;
};
