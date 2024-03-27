const { response } = require("express");
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const {generateJWT} = require('../helpers/jwt')


const userCreate = async(req, res = response) => {
    // res = response asegura que siempre haya un objeto "res" disponible dentro de la función (userCreate) aunque no se pasase explicitamente como argumento al llamar a la función.
  
    const {email, password } = req.body;

  try {

    let user = await User.findOne({email})
    if(user) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo introducido ya está registrado en la base de datos.'
      })
    }

     user = new User(req.body) // Le manda lo del body (name, email, password)
     
  // Encriptar contraseña
    const salt = bcrypt.genSaltSync(); // Utiliza 10 de encriptación por defecto
    user.password = bcrypt.hashSync(password, salt) // Encriptación de la contraseña
     await user.save(); //Guardar en la BBDD

     // Generar token
     const token = await generateJWT(user.id, user.name)
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador.'
    })
  }

};

const userLogin = async(req, res = response) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({email})

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario o la contraseña son incorrectos.'
      })
    }

    // Comparación password introducida con la guardada en BBDD
    const validatePassword = bcrypt.compareSync(password, user.password); // Password introducida, Password de BBDD

    if(!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecta'
      })
    }

    // Generar JWT
    const token = await generateJWT(user.id, user.name)


    res.status(201).json({
      ok: true,
      msg: "login",
      uid: user.id,
      token
      
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador.'
    })
  }

};

const tokenRevalidate = async(req, res = response) => {
  //Revalidar token si el usuario está activo para mantenerlo logueado

  const {uid, name} = req;


  // Generar un nuevo JWT y devolverlo en esta petición
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    token
  });
};

module.exports = { userCreate, userLogin, tokenRevalidate };
