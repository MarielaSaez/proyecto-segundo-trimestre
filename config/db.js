import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const db=new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASSWORD ?? '' ,{
    host:process.env.BD_HOST,
    port:3306,
    dialect:'mysql',
    define:{
        timestime:true
    },
    pool:{
        max:5, //maximo de conexiones por usuario
        min:0, //si no hay actividad en el sitio libera recursos
        acquire:30000,  //tiempo que espera antes de dar error
        idle:10000 // segundos que espera antes finalizar la conxión si no está siendo usada
    },
    //operatorsAliases:false
});

export default db;