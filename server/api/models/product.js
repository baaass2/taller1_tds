const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DestinoSchema = new Schema({
   nombre:{
    type: String,
    unique: true
   }
 }, {
	timestamps: true
});

const ProovedorSchema = new Schema({
   nombre:{
    type: String,
    unique: true
   }
 }, {
	timestamps: true
});

const CategoriaSchema = new Schema({
   nombre:{
    type: String,
    unique: true
   }
 }, {
	timestamps: true
});
 
const ProductoSchema = new Schema({
   proovedor_id: {
     type: Schema.Types.ObjectId,
     ref: 'Proovedor',
     require: true
   },
   categoria_id: {
     type: Schema.Types.ObjectId,
     ref: 'Categoria',
     require: true
   },
   nombre: {
    type:String,
    require: true,
    unique: true
   },
   stock: {
    type:String,
    require: true
   },
   valor: {
    type:Number,
    require: true
   }

 }, {
	timestamps: true
});


const IngresoSchema = new Schema({
    query:{}

  }, {
     timestamps: true
 });

 const EgresoSchema = new Schema({
    query:{},
    destino_id: {
        type: Schema.Types.ObjectId,
        ref: 'Destino',
        require: true
      },

  }, {
     timestamps: true
 });
 // Your models
 const Destino = mongoose.model('Destino', DestinoSchema);
 const Proovedor = mongoose.model('Proovedor', ProovedorSchema);
 const Categoria = mongoose.model('Categoria', CategoriaSchema);
 const Producto = mongoose.model('Producto', ProductoSchema);
 const Ingreso = mongoose.model('Ingreso', IngresoSchema);
 const Egreso = mongoose.model('Egreso', EgresoSchema);

//CRUD INGRESO
module.exports.createIngreso= function (req, res) {
    let newIngreso = new Ingreso();
    newIngreso.query = req;
    newIngreso.save(res);
}

//CRUD DESTINO
module.exports.createDestino = function (req, res) {
    let newDestino = new Destino();
    newDestino.nombre = req.body.nombre;
    newDestino.save(res);
};

module.exports.getDestino = function(id, callback){
    Destino.findById(id, callback);
}

//CRUD PROOVEDOR
module.exports.createProovedor = function (req, res) {
    let newProovedor = new Proovedor();
    newProovedor.nombre = req.body.nombre;
    newProovedor.save(res);
}

module.exports.getProovedor= function(id, callback){
    Proovedor.findById(id, callback);
}


//CRUD CATEGORIA
module.exports.createCategoria = function (req, res) {
    let newCategoria = new Categoria();
    newCategoria.nombre = req.body.nombre;
    newCategoria.save(res);
}

module.exports.getCategoria = function(id, callback){
    Categoria.findById(id, callback);
}


//CRUD PRODUCTO
module.exports.createProducto = function (req, res) {
    let newProducto = new Producto();
    newProducto.nombre = req.body.nombre;
    newProducto.stock = req.body.stock;
    newProducto.valor = req.body.valor;
    newProducto.categoria_id = req.body.categoria_id;
    newProducto.proovedor_id = req.body.proovedor_id;
    newProducto.save(res);
};

module.exports.getProduct = function(id, callback){
    Producto.findById(id, callback);
}