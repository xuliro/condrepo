var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Condom = app.models.condom;
    var condomController = {};
    condomController.listaCondoms = function (req, res) {
        Condom.find().exec()
            .then(function(condoms){
                res.json(condoms);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    condomController.obtemCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Condom.findById(_id).populate('syndic').populate('towers').exec()
            .then(function(condom){
                if(!condom) throw new Error("Condominio não encontrado");
                res.json(condom);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    condomController.obtemPorCodigo = function (req, res) {
        var code = sanitize(req.params.code);
        Condom.find({"code": code}).populate('syndic').populate('towers').exec()
            .then(function(condom){
                if(!condom) throw new Error("Condominio não encontrado");
                res.json(condom);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    condomController.removeCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Condom.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    condomController.salvaCondom = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "code": req.body.code || null,
          "syndic": req.body.syndic || null,
          "address": req.body.address || null,
          "towers": req.body.towers
        };
        if(_id){
            Condom.findByIdAndUpdate(_id, dados).exec()
                .then(function(condom){
                    res.json(condom);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Condom.create(dados)
                .then(function(condom){
                    res.status(201).json(condom);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return condomController;
};
