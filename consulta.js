var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _idProcurado = new ObjectID('58011f799c06b2d52bc78a90');
MongoClient.connect('mongodb://127.0.0.1:27017/prototipo',
    function (erro, db){
        if(erro) throw err;
        db.collection('contatos').findOne({_id:_idProcurado},
            function(erro, contato){
                if(erro) throw err;
                console.log(contato);
            }
        );
    }
);
