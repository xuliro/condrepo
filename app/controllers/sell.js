var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Sell = app.models.sell;
    var sellController = {};
    sellController.listaSells = function (req, res) {
        Sell.find().populate('condom').populate('user').exec()
            .then(function(sells){
                res.json(sells);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    sellController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Sell.find({condom:_id}).exec()
            .then(function(sells){
                res.json(sells);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    sellController.listByUser= function (req, res) {
        var _id = sanitize(req.params.id);
        Sell.find({user:_id}).exec()
            .then(function(sells){
                res.json(sells);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    sellController.obtemSell = function (req, res) {
        var _id = sanitize(req.params.id);
        Sell.findById(_id).populate('condom').populate('user').exec()
            .then(function(sell){
                if(!sell) throw new Error("Anúncio não encontrado");
                res.json(sell);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    sellController.removeSell = function (req, res) {
        var _id = sanitize(req.params.id);
        Sell.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    sellController.salvaSell = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "title": req.body.title,
          "details": req.body.details,
          "contact": req.body.contact,
          "value": req.body.value,
          "condom": req.body.condom || null,
          "user": req.body.user || null
        };
        if(_id){
            Sell.findByIdAndUpdate(_id, dados).exec()
                .then(function(sell){
                    res.json(sell);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Sell.create(dados)
                .then(function(sell){
                    res.status(201).json(sell);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return sellController;
};
