var mongoose = require('mongoose');
module.exports = function(uri){
    mongoose.connect(uri);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + uri);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + uri);
    });
    mongoose.connection.on('error', function() {
        console.log('Mongoose! Erro na conectado com ' + uri);
    });
    process.on('SIGINIT', function(){
        mongoose.connection.close(function () {
            console.log('Mongoose! Desconectado ao término da aplicação.');
            process.exit(0);
        });
    });
}
