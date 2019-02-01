var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Possession = app.models.possession;
    var possessionController = {};
    possessionController.listaPossessions = function (req, res) {
        Possession.find().exec()
            .then(function(possessions){
                res.json(possessions);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    possessionController.obtemPossession = function (req, res) {
        var _id = sanitize(req.params.id);
        Possession.findById(_id).populate("user").exec()
            .then(function(possession){
                if(!possession) throw new Error("Possession não encontrada");
                res.json(possession);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    possessionController.removePossession = function (req, res) {
        var _id = sanitize(req.params.id);
        Possession.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    possessionController.salvaPossession = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "id": req.body.id,
          "category": req.body.category,
          "details": req.body.details,
          "license": req.body.license || null
        };
        if(_id){
            Possession.findByIdAndUpdate(_id, dados).exec()
                .then(function(possession){
                    res.json(possession);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Possession.create(dados)
                .then(function(possession){
                    res.status(201).json(possession);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return possessionController;
};
