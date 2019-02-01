var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Archive = app.models.archive;
    var archiveController = {};
    archiveController.listaArchives = function (req, res) {
        Archive.find().populate('condom').exec()
            .then(function(archives){
                res.json(archives);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    archiveController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Archive.find({condom:_id}).exec()
            .then(function(archives){
                res.json(archives);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    archiveController.obtemArchive = function (req, res) {
        var _id = sanitize(req.params.id);
        Archive.findById(_id).populate('condom').exec()
            .then(function(archive){
                if(!archive) throw new Error("Arquivo não encontrado");
                res.json(archive);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    archiveController.removeArchive = function (req, res) {
        var _id = sanitize(req.params.id);
        Archive.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    archiveController.salvaArchive = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "brief": req.body.brief,
          "details": req.body.details,
          "condom": req.body.condom || null
        };
        if(_id){
            Archive.findByIdAndUpdate(_id, dados).exec()
                .then(function(archive){
                    res.json(archive);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Archive.create(dados)
                .then(function(archive){
                    res.status(201).json(archive);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return archiveController;
};
