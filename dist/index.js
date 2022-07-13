"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const usuarios_1 = require("./Entities/usuarios");
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json()); //además le decimos a express que vamos a usar json
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//decimos que la capeta public va a ser statica
app.use('/resources', express_1.default.static('public'));
app.use('/resources', express_1.default.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('views engine', 'ejs');
//Método para Registrase
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const usuario = req.body.usuario;
    const password = req.body.password;
    if (nombre != null && apellido1 != null && apellido2 != null && usuario != null && password != null) {
        const resul = yield usuarios_1.usuarios.findOne({ where: { usuario: usuario } });
        if (usuario == (resul === null || resul === void 0 ? void 0 : resul.usuario)) {
            res.render('register.ejs', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario ya en uso",
                alertIcon: 'Error',
                showConfirmButton: false,
                timer: 1500,
                ruta: '/'
            });
            console.log(usuario, ' este usuario esta en uso');
        }
        else {
            yield usuarios_1.usuarios.insert({
                nombre: nombre,
                apellido1: apellido1,
                apellido2: apellido2,
                usuario: usuario,
                password: password
            });
            res.render('register.ejs', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Successful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: '/login'
            });
        }
    }
}));
//Metodo para la autenticacion
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body.usuario;
    const password = req.body.password;
    if (usuario && password) {
        console.log(usuario, password);
        const pass = yield usuarios_1.usuarios.findOne({ where: { password: password } } && { where: { usuario: usuario } });
        console.log(pass === null || pass === void 0 ? void 0 : pass.password);
        if (password == (pass === null || pass === void 0 ? void 0 : pass.password) && usuario == (pass === null || pass === void 0 ? void 0 : pass.usuario)) {
            console.log(pass === null || pass === void 0 ? void 0 : pass.nombre);
            req.session.loggedin = true;
            req.session.nombre = pass === null || pass === void 0 ? void 0 : pass.nombre;
            res.render('login.ejs', {
                alert: true,
                alertTitle: "Bienvenido",
                alertMessage: "Accediendo a su cuenta",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        }
        else {
            res.render('login.ejs', {
                alert: true,
                alertTitle: "error",
                alertMessage: "USUARIO y/o PASSWORD incorrectas",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: '/'
            });
        }
    }
    res.end();
}));
app.post('/guardar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var nom = req.session.nombre;
    var nombre = req.session.nombre;
    console.log(nom);
}));
//rutas
// Método para controlar que está auth en todas las páginas
app.get('/', function (req, res) {
    if (req.session.loggedin) {
        res.render('home.ejs', {
            login: true,
            name: req.session.nombre
        });
    }
    else {
        res.render('index.ejs', {
            login: false,
            name: 'Debe iniciar sesión',
        });
    }
    res.end();
});
app.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.redirect('/'); // siempre se ejecutará después de que se destruya la sesión
    });
});
app.get('/cart', function (req, res) {
    if (req.session.loggedin) {
        res.render('cart.ejs', {
            login: true,
            name: req.session.nombre
        });
    }
    else {
        res.render('index.ejs', {
            login: false,
            name: 'Debe iniciar sesión',
        });
    }
    res.end();
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get('/register', (req, res) => {
    res.render('register.ejs');
});
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema: schema_1.schema
}));
exports.default = app;
