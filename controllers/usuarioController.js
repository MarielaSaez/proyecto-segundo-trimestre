import { check, body, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { Where } from 'sequelize/lib/utils';
import { generarId } from '../helpers/token.js';
import {emailRegistro} from '../helpers/email.js'
class UsuarioController {
    formularioLogin(req, res) {
       res.render('auth/login', {
          pagina: 'Iniciar Sesión'
       });
    }
 
    formularioRegistro(req, res) {
       res.render('auth/registro', {
          pagina: 'Crear Cuenta',
          csrfToken:req.csrfToken()
       });
      
    }

 
    async registrar(req, res) {
      // Validación de campos
      await Promise.all([
        check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').run(req),
        check('email').isEmail().withMessage('El email no es válido').run(req),
        check('password').isLength({ min: 6 }).withMessage('El password debe tener un mínimo de 6 caracteres').run(req),
        body('repetir_password').custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales');
          }
          return true;
        }).run(req)
      ]);
    
      // Resultado de las validaciones
      const resultado = validationResult(req);
    
      // Extraer datos
      const { nombre, email, password } = req.body;
    
      // Verificar si hay errores de validación
      if (!resultado.isEmpty()) {
        return res.render('auth/registro', {
          pagina: 'Crear Cuenta',
          errores: resultado.array(),
          usuario: {
            nombre,
            email
          }
        });
      }
    
      // Verificar si el usuario ya existe
      const existeUsuario = await Usuario.findOne({ where: { email } });
      if (existeUsuario) {
        return res.render('auth/registro', {
          pagina: 'Crear Cuenta',
          errores: [{ msg: 'El usuario ya existe' }],
          usuario: {
            nombre,
            email
          }
        });
      }
   
      let usuario = await Usuario.create({
         nombre,
         email,
         password,
         token: generarId()
       });
      
       //ENVIO DE EMAIL DE CONFIRMACIÓN
       await emailRegistro({
          nombre: usuario.nombre,
          email: usuario.email,
          token: usuario.token
       })
      // Mostrar mensaje de confirmación
      res.render('templates/mensaje',{
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace'
      });
      

      
    }
   
    async confirmar(req, res){
       const {token }=req.params;
       const usuario= await usuario.findOne({where:{token}});
       if (!usuario){
          return res.render('auth/confirmar-cuenta',{
            pagina:'Error al confirmar tu cuenta',
            mensaje:'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error:true
          });
       }
       //confirmar la cuenta
       usuario.token=null;
       usuario.confirmado=true;
       await usuario.save();

       res.render('auth/confirmar-cuenta',{
        pagina:'Cuenta confirmada',
        mensaje:'La cuenta se confirmó con exito',
       // error:false
       })
    }

      
      
 
    formularioOlvidePassword(req, res) {
       res.render('auth/olvide-password', {
          pagina: 'Recupera tu acceso a Bienes Raíces'
       });
    }
 }
 
 export default new UsuarioController();
 