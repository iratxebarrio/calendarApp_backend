/* 
Rutas de Usuarios / Auth
host + /api/auth
*/
//Es recomendable poner el comentario de arriba en todas las rutas para saber como funcionan de un vistazo

const { Router } = require("express");
const { check } = require("express-validator"); //middleware para validar un campo en particular
const { fieldsValidate } = require("../middlewares/fields-validate");
const {
  userCreate,
  userLogin,
  tokenRevalidate,
} = require("../controllers/auth");
const {validateJWT} = require('../middlewares/validate-jwt');
const router = Router();


router.post(
  "/new",
  [
    // midlewares
    // Luego en fields-validate se valida donde Control de errores.
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de seis caracteres").isLength({
      min: 6
    }),
    fieldsValidate
  ],
  userCreate
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de seis caracteres").isLength({
      min: 6
    }),
    fieldsValidate,
  ],
  userLogin
);

router.get("/renew", validateJWT ,tokenRevalidate);

module.exports = router;
