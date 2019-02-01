var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Area = app.models.area;
    var areaController = {};
    areaController.listaAreas = function (req, res) {
        Area.find().populate('condom').populate('tower').exec()
            .then(function(areas){
                res.json(areas);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    areaController.listByTower = function (req, res) {
        var _id = sanitize(req.params.id);
        Area.find({tower:_id}).populate('tower').exec()
            .then(function(areas){
                res.json(areas);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    areaController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Area.find({condom:_id}).populate('tower').exec()
            .then(function(areas){
                res.json(areas);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    areaController.obtemArea = function (req, res) {
        var _id = sanitize(req.params.id);
        Area.findById(_id).populate('condom').populate('tower').exec()
            .then(function(area){
                if(!area) throw new Error("Area comum não encontrada");
                res.json(area);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    areaController.removeArea = function (req, res) {
        var _id = sanitize(req.params.id);
        Area.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    areaController.salvaArea = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "description": req.body.description,
          "capacity": req.body.capacity,
          "condom": req.body.condom || null,
          "tower": req.body.tower || null
        };
        if(_id){
            Area.findByIdAndUpdate(_id, dados).exec()
                .then(function(area){
                    res.json(area);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Area.create(dados)
                .then(function(area){
                    res.status(201).json(area);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return areaController;
};
