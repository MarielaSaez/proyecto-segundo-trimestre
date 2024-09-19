import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';
import { cookie } from 'express-validator';
//crear la app
const app=express();
//habilitar cookie parser

//habilitar recibir datos desde formularios
app.use(express.urlencoded({extended:true}));
///app.use(express.json());
app.use(cookieParser());
//habilitar csrf
app.use(csrf({cookie:true}));
//conexion a bd



try{
    db.authenticate();
    db.sync();
    console.log('Conexion exitosa a la BD');
}
catch(err){
    console.log(err);
}

//habilitar pug
app.set('view engine','pug');
app.set('views', './views');

//carpeta pblica
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.send('App Bienes Raices');
});
app.use('/auth', usuarioRoutes);

//Definir puerto y arrancar el proyecto
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Servidor activo en el puerto ${port}`);
});
