var sanitize = require('mongo-sanitize');
module.exports = function (app) {
    var Message = app.models.message;
    var messageController = {};
    messageController.listaMessages = function (req, res) {
        Message.find().populate('sender').populate('receiver').exec()
            .then(function(messages){
                res.json(messages);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    messageController.listBySender = function (req, res) {
        var _id = sanitize(req.params.id);
        Message.find({sender:_id}).populate('sender').populate('receiver').exec()
            .then(function(messages){
                res.json(messages);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    messageController.listByReceiver = function (req, res) {
        var _id = sanitize(req.params.id);
        Message.find({receiver:_id}).populate('sender').populate('receiver').exec()
            .then(function(messages){
                res.json(messages);
            }, function(erro){
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    messageController.obtemMessage = function (req, res) {
        var _id = sanitize(req.params.id);
        Message.findById(_id).populate('sender').populate('receiver').exec()
            .then(function(message){
                if(!message) throw new Error("Mensagem não encontrada");
                res.json(message);
            }, function(erro){
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    messageController.removeMessage = function (req, res) {
        var _id = sanitize(req.params.id);
        Message.remove({"_id":_id}).exec()
            .then(function(){
                res.status(204).end();
            }, function(erro){
                return console.error(erro);
            });
    };
    messageController.salvaMessage = function (req, res) {
        var _id = req.body._id;
        var dados = {
          "title": req.body.title,
          "message": req.body.message,
          "type": req.body.type,
          "more": req.body.more || null,
          "sender": req.body.sender || null,
          "receiver": req.body.receiver || null
        };
        if(_id){
            Message.findByIdAndUpdate(_id, dados).exec()
                .then(function(message){
                    res.json(message);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
             Message.create(dados)
                .then(function(message){
                    res.status(201).json(message);
                }, function(erro){
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return messageController;
};
