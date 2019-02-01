var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Event = app.models.event;
    var eventController = {};
    eventController.listaEvents = function (req, res) {
        Event.find().populate('user').populate('area').exec()
            .then(function(events){
                res.json(events);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    eventController.listByUser = function (req, res) {
        var _id = sanitize(req.params.id);
        Event.find({user:_id}).populate('user').populate('area').exec()
            .then(function(events){
                res.json(events);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    eventController.listByArea = function (req, res) {
        var _id = sanitize(req.params.id);
        Event.find({area:_id}).populate('user').populate('area').exec()
            .then(function(events){
                res.json(events);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    eventController.obtemEvent = function (req, res) {
        var _id = sanitize(req.params.id);
        Event.findById(_id).populate('user').populate('area').exec()
            .then(function(event){
                if(!event) throw new Error("Funcionario não encontrado");
                res.json(event);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    eventController.removeEvent = function (req, res) {
        var _id = sanitize(req.params.id);
        Event.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    eventController.salvaEvent = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "name": req.body.name,
          "description": req.body.description,
          "date": req.body.date,
          "user": req.body.user || null,
          "area": req.body.area || null
        };
        if(_id){
            Event.findByIdAndUpdate(_id, dados).exec()
                .then(function(event){
                    res.json(event);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Event.create(dados)
                .then(function(event){
                    res.status(201).json(event);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return eventController;
};
