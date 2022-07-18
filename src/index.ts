import express from 'express';


const path = require('path');
import { graphqlHTTP } from 'express-graphql';
import { connectDB } from './db';
import { schema } from './schema';
import { Router } from 'express';
import {usuarios} from './Entities/usuarios'
import session  from 'express-session';
import { Electrodomesticos } from './Entities/Electrodomesticos';
import { Direccion } from './Entities/Direccion';


const app = express();

// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


declare module "express-session" {
  interface SessionData {
    loggedin: boolean;
    nombre: string;
    secret: 'secret',
	resave: true,
	saveUninitialized: true
  }
}

//decimos que la capeta public va a ser statica
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('views engine', 'ejs');




//Método para Registrase
app.post('/register', async (req, res)=>{
	const nombre = req.body.nombre;
  const apellido1 = req.body.apellido1;
	const apellido2 = req.body.apellido2;
	const usuario = req.body.usuario;
	const password = req.body.password;


  const ciudad = req.body.Ciudad
  const barrio = req.body.Barrio
  const calle = req.body.Calle
  
  if(nombre != null && apellido1 != null && apellido2 != null && usuario != null && password != null){

    const resul = await usuarios.findOne({where:{usuario:usuario}})
    
    if(usuario == resul?.usuario){
      res.render('register.ejs', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Usuario ya en uso",
        alertIcon:'Error',
        showConfirmButton: false,
        timer: 1500,
        ruta: '/'
      });
      console.log(usuario, ' este usuario esta en uso')
    }else{
      await usuarios.insert({
        nombre:nombre,
        apellido1:apellido1,
        apellido2:apellido2,
        usuario:usuario,
        password:password
      })

      const idus = usuario
      console.log(idus)
      await Direccion.insert({
        idUsuario:idus,
        Ciudad:ciudad,
        Barrio:barrio,
        Calle:calle
      })

      res.render('register.ejs', {
        alert: true,
        alertTitle: "Registration",
        alertMessage: "¡Successful Registration!",
        alertIcon:'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: '/login'
      });
    }
   
  }
});


//Metodo para la autenticacion
app.post('/login', async (req, res)=> {

	const usuario = req.body.usuario;
	const password = req.body.password;    
  
  if(usuario && password){
    console.log(usuario, password)
    const pass = await usuarios.findOne({where:{password:password }} && {where:{usuario:usuario }})
    console.log(pass?.password)

    if(password == pass?.password && usuario ==  pass?.usuario){
      console.log(pass?.nombre)
      req.session.loggedin = true;                
      req.session.nombre = pass?.nombre;
      res.render('login.ejs', {
        
        alert: true,
        alertTitle: "Bienvenido",
        alertMessage: "Accediendo a su cuenta",
        alertIcon:'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: ''  
          
    });
    }else{
      res.render('login.ejs', {
        alert: true,
        alertTitle: "error",
        alertMessage: "USUARIO y/o PASSWORD incorrectas",
        alertIcon:'error',
        showConfirmButton: true,
        timer: false,
        ruta: '/'    
    });
    }
  } 
    res.end()
  }
)



app.post('/guardar', async(req, res)=>{
    var nom = req.session.nombre
		var	nombre = req.session.nombre	
    console.log(nom)	
	
})



//rutas
// Método para controlar que está auth en todas las páginas
app.get('/', async function(req, res){ 
  const elec = await Electrodomesticos.find({select: {
    nombre: true,
    Precio: true, 
    Categoria: true,
    Marca: true,
    Descripcion: true}})
  
  console.log(elec)
  if (req.session.loggedin) {
		res.render('home.ejs',{
      
			login: true,
			name: req.session.nombre		
		}
    );		
	} else {
		res.render('index.ejs',{
      elec: elec,
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});

app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});



app.get('/cart', function(req, res){ 
  if (req.session.loggedin) {
		res.render('cart.ejs',{
			login: true,
			name: req.session.nombre	
		});		
	} else {
		res.render('index.ejs',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});
  


app.get('/login',(req, res)=>{
  res.render('login.ejs');
  
})

app.get('/register',(req, res)=>{
  res.render('register.ejs');
})
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));



export default app