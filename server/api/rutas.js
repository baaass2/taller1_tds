const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require("../config/database")

const Product = require('./models/product.js');

//RUTAS DESTINO
router.post('/createIngreso', (req, res, next) => {
    Product.createIngreso(req, (err, data) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error con el log ingreso", errInfo:err});
        }else{return res.json({ success: true, msg: "ingreso Log creado!", data:data });}    
    });
});

//RUTAS DESTINO
router.post('/createDestino', (req, res, next) => {
    Product.createDestino(req, (err, data) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error", errInfo:err});
        }else{return res.json({ success: true, msg: "Destino creado!", data:data });}    
    });
});


router.post('/getDestino', (req, res, next) => {
    const id = req.body._id;

    Product.getDestino(id, (err,data) => {
        if(err){
            return res.json({success:false, msg:"Destino no encontrado", errInfo:err});
        }else{return res.json({success:true, msg:"Destino encontrado", data:data});}
    });
});

//RUTAS CATEGORIA
router.post('/createCategoria', (req, res, next) => {
    Product.createCategoria(req, (err, data) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error", errInfo:err});
        }else{return res.json({ success: true, msg: "Categoria creado!", data:data });}    
    });
});

router.post('/getCategoria', (req, res, next) => {
    const id = req.body._id;

    Product.getCategoria(id, (err,data) => {
        if(err){
            return res.json({success:false, msg:"Categoria no encontrada", errInfo:err});
        }else{return res.json({success:true, msg:"Categoria encontrada", data:data});}
    });
});

//RUTAS PROOVEDOR
router.post('/createProovedor', (req, res, next) => {
    Product.createProovedor(req, (err, data) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error", errInfo:err});
        }else{return res.json({ success: true, msg: "Proovedor creado!", data:data });}    
    });
});

router.post('/getProovedor', (req, res, next) => {
    const id = req.body._id;

    Product.getProovedor(id, (err,data) => {
        if(err){
            return res.json({success:false, msg:"Proovedor no encontrado", errInfo:err});
        }else{return res.json({success:true, msg:"Proovedor encontrado", data:data});}
    });
});
//RUTAS PRODUCTO
router.post('/createProduct', (req, res, next) => {
    Product.createProducto(req, (err, producto) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error", errInfo:err});
        }else{
            Product.createIngreso(producto, (err, callback) => {
                if (err){
                    return res.json({ success: false, msg: "Ha ocurrido un error con el log ingreso", errInfo:err});
                }else{return res.json({ success: false, msg: "Producto Creado", errInfo:err, data:producto});
                }    
            });
            
        }    
    });
});

router.post('/getProduct', (req, res, next) => {
    const id = req.body._id;

    Product.getProduct(id, (err,producto) => {
        if(err){
            return res.json({success:false, msg:"Producto no encontrado", errInfo:err});
        }else{
            Product.getProovedor(producto.proovedor_id, (err,proovedor) => {
                if(err){
                    return res.json({success:false, msg:"Proovedor no encontrado", errInfo:err});
                }else{
                    Product.getCategoria(producto.categoria_id, (err,categoria) => {
                        if(err){
                            return res.json({success:false, msg:"Categoria no encontrada", errInfo:err});
                        }else{
                            dict = {
                                "nombre_producto":producto.nombre,
                                "valor_producto":producto.valor,
                                "stock_producto":producto.stock,
                                "nombre_proovedor":proovedor.nombre,
                                "nombre_categoria":categoria.nombre,
                            }
                            return res.json({success:true, data:dict, res:data});
                                
                        }
                    });
                }
            });     
        }
    });
});

















//Controlador User

const User = require('./models/user.js');

router.post('/editUser', (req, res, next) => {

    User.eliminarUsuario(req, (err, user) => {
        if (!user){
            return res.json({ success: false, msg: "Ha ocurrido un error" });
        }else{
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
    
            });
    
            User.addUser(newUser, (err, user) => {
                if (err) {
                    return res.json({ success: false, msg: "Ha ocurrido un error" });
                } else {
                    return res.json({ success: true, msg: "Usuario editado" })
                }
            });
        }  
    });
    
});

router.post('/deleteUser', (req, res, next) => {
    User.eliminarUsuario(req, (err, user) => {
        if (!user){
            return res.json({ success: false, msg: "Ha ocurrido un error" });
        }else{return res.json({user:user, msg: "Eliminado con exito" });}
        
    });
});

router.get('/getUsers', (req, res, next) => {
    User.obtenerUsuarios({}, (err,users) => {
        if (err){
            return res.json({ success: false, msg: "Ha ocurrido un error" });
        }else{return res.json({users:users});}
        
    });
});

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password

    });
    User.getUserByUsername(newUser.name, (err,user) => {
        if (err) throw err;
        if(!user){
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: "Ha ocurrido un error" });
                } else {
                    res.json({ success: true, msg: "Usuario registrado" })
                }
            });;
        }else{return res.json({success:false, msg:"Usuario no disponible"});}
    });
});

router.post('/getUsername', (req, res, next) => {
    const username = req.body.username;

    User.getUserByUsername(username, (err,user) => {
        if (err) throw err;
        if(!user){
            return res.json({success:true, msg:"Usuario disponible"});
        }else{return res.json({success:false, msg:"Usuario no disponible"});}
    });
});
//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if (err) throw err;
        if(!user){
            return res.json({success:'false', msg:"Usuario incorrecto"});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800    
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    msg:"Autenticación exitosa!"
                });
            } else {
                return res.json({success:'false', msg:"Clave incorrecta"});
            }
        })
    })
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});



module.exports = router;