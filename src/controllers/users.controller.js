const crypto = require('crypto'); //seguridad y criptografía
const randomUUID = crypto.randomUUID; //genera un id único

const users = []; //almacena los usuarios en memoria

// GET /api/users listar todos
function getAll(req, res) {
  res.json(users);
}
// POST /api/users crear uno nuevo
function create(req, res){
    const {name, email} = req.body; //desestructuración

    if(!name || !email){
        return res.status(400).json({error: "Faltan datos"});
    }
    //chequeo simple de email repetido
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Email ya registrado' });
      }

    //crea el nuevo usuario
    const user = {
        id: randomUUID(),
        name,
        email,
        createdAt: new Date()
    }

    users.push(user); //agrega el nuevo usuario al array
    res.status(201).json(user); 
}
// PUT /api/users/:id
function update(res, req){
    const {id} = req.params; //contiene los parámetros de la URL (route parameters)
    const {name, email} = req.body; 

    const idx = users.findIndex(u => u.id === id); //devuelve el índice del primer elemento que cumple la condición
    if (idx === -1){
        return res.status(404).json({error: "Usuario no encontrado"});
    }
    if (!name || !email){
        return res.status(400).json({error: "Faltan datos"});
    }
    if (email && users.some(u => u.email === email && u.id !== id)){
        return res.status(400).json({error: "Email ya registrado"});
    }
    //(...) copia todas las propiedades del objeto original
    //Actualiza el usuario solo con los campos enviados y mantiene el resto iguall
    users [idx] = {
        ...users[idx],
        ...(name ? {name}: {}),
        ...(email ? {email}: {}),
        updatedAt: new Date()
    }
}
//DELETE /api/users/:id
function remove(req ,res){
    const {id} = req.params;
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1){
        return res.status(404).json({error: "Usuario no encontrado"});
    }
    const [deleted] = users.splice(idx, 1); //splice elimina elementos de un array y devuelve un array con los elementos eliminados
    return res.json({deleted});//En la respuesta JSON que recibe, va a aparecer deleted con el valor del usuario borrado
}

module.exports = { getAll, create, update, remove };
