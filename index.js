const express = require('express');
const userRouter = require('./src/routes/user.routes');

const app = express();

// Habilita JSON en requests
app.use(express.json());

// Ruta básica para chequear que el server responde
app.get('/', (req, res) => {
  res.send('API Andando...');
});

// Usa las rutas de usuario*       (****)
app.use('/api/users', userRouter);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {      //listen pone en marcha el servidor
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
