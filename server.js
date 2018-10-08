var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var autos = [
{
    id: 1,
    modelo: 'Corolla',
    marca: 'Toyota',
    year: '2001'
},
{
    id: 2,
    modelo: 'Mustang',
    marca: 'Ford',
    year: '1968'
}
];

var usuarios = [
{
    id: 1,
    rut: '21.142.124-2',
    nombre: 'Jose Camboya',
    auto: 1
},
{
    id: 2,
    rut: '12.634.456-6',
    nombre: 'Carlos Gonzalez',
    auto: 1
},
{
    id: 3,
    rut: '18.924.689-4',
    nombre: 'Benito Diaz',
    auto: 1
},
{
    id: 4,
    rut: '8.389.812-k',
    nombre: 'Gonzalo Gutierrez',
    auto: 2
}
];

var currentIdAuto = 2;

var currentIdUser = 4;

var PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/autos', function(req, res) {
    res.send({ autos: autos });
});

app.post('/autos', function(req, res) {
    var autoModelo = req.body.modelo,
        autoMarca = req.body.marca,
        autoYear = req.body.year;
    
    currentIdAuto++;

    autos.push({
        id: currentIdAuto,
        modelo: autoModelo,
        marca:  autoMarca,
        year:   autoYear
    });

    res.send('Auto creado');
});

app.put('/autos/:id', function(req, res) {
    var id = req.params.id;
    var newAutoModelo = req.body.newAutoModelo,
        newAutoMarca = req.body.newAutoMarca,
        newAutoYear = req.body.newAutoYear;

    var found = false;

    autos.forEach(function(auto, index) {
        if (!found && auto.id === Number(id)) {
            auto.modelo = newAutoModelo;
            auto.marca = newAutoMarca;
            auto.year = newAutoYear;
        }
    });

    res.send('Auto actualizado');
});

app.delete('/autos/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    autos.forEach(function(auto, index) {
        if (!found && auto.id === Number(id)) {
            autos.splice(index, 1);
        }
    });

    usuarios.forEach(function(user, index) {
        if (!found && user.auto === Number(id)) {
            usuarios.splice(index, 1);
        }
    });

    res.send('Auto y usuarios asociados Borrados');
});

app.get('/usuarios/:auto', function(req, res) {
    
    var auto = req.params.auto;

    var userList = [];
    if(Number(auto)>0){
        usuarios.forEach(function(user, index) {
            if (user.auto === Number(auto)) {
                    userList.push(user);
            }
        });

        res.send({ users: userList, autos: autos });    
    }else{
        res.send({ users: usuarios, autos: autos });
    }

});

app.post('/usuarios', function(req, res) {
    var userRut = req.body.rut,
        userNombre = req.body.nombre,
        userAuto = req.body.auto;
    
    currentIdUser++;

    usuarios.push({
        id: currentIdUser,
        rut: userRut,
        nombre:  userNombre,
        auto:   userAuto
    });

    res.send('Usuario creado');
});

app.put('/usuarios/:id', function(req, res) {
    var id = req.params.id;
    var newUserRut = req.body.newUserRut,
        newUserNombre = req.body.newUserNombre,
        newUserAuto = req.body.newUserAuto;

    var found = false;

    usuarios.forEach(function(user, index) {
        if (!found && user.id === Number(id)) {
            user.rut = newUserRut;
            user.nombre = newUserNombre;
            user.auto = Number(newUserAuto);
        }
    });

    res.send('Usuario actualizado');
});

app.delete('/usuarios/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    usuarios.forEach(function(user, index) {
        if (!found && user.id === Number(id)) {
            usuarios.splice(index, 1);
        }
    });

    res.send('Usuario Borrado');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
