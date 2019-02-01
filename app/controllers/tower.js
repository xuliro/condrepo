var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Tower = app.models.tower;
    var towerController = {};
    towerController.listaTowers = function (req, res) {
        Tower.find().exec()
            .then(function(towers){
                res.json(towers);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    towerController.obtemTower = function (req, res) {
        var _id = sanitize(req.params.id);
        Tower.findById(_id).populate('units').exec()
            .then(function(tower){
                if(!tower) throw new Error("Torre não encontrada");
                res.json(tower);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    towerController.removeTower = function (req, res) {
        var _id = sanitize(req.params.id);
        Tower.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    towerController.salvaTower = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "units": req.body.units
        };
        if(_id){
            Tower.findByIdAndUpdate(_id, dados).exec()
                .then(function(tower){
                    res.json(tower);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Tower.create(dados)
                .then(function(tower){
                    res.status(201).json(tower);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return towerController;
};
