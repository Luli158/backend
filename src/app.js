import express from "express"; 
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
//Aca le digo al servidor que voy a trabajar con JSON. 
app.use(express.urlencoded({extended: true})); 
//Aca nos permite gestionar multiples datos desde el cliente. 

//Rutas: 

app.get("/", (req, res) => {
    res.send("Hola Comisión!"); 
})


//Armemos un sistema de gestión de Clientes: 

const clientes = [
    {id: "1", nombre: "Lionel", apellido: "Messi"},
    {id: "2", nombre: "Cristiano", apellido: "Ronaldo"},
    {id: "3", nombre: "Eber", apellido: "Ludueña"},
]

//1) Creamos una ruta que nos traiga a todos nuestros clientes: 

app.get("/clientes", (req, res) => {
    res.send(clientes); 
})

//2) Creamos una ruta que recibe un parametro dinamico del id del cliente buscado

app.get("/clientes/:id", (req, res) => {
    let id = req.params.id; 

    const clienteBuscado = clientes.find(cliente => cliente.id === id); 

    if(clienteBuscado) {
        return res.send(clienteBuscado); 
    } else {
        return res.send("No se encuentra el cliente con ese ID, moriras mientras duermeeeesss"); 
    }
})

//3) Creamos una ruta post para almacenar un nuevo cliente

app.post("/clientes", (req, res) => {
    const nuevoCliente = req.body; 

    clientes.push(nuevoCliente)    ; 
    console.log(clientes); 
    res.send("Cliente creado");
})

//Listen: 
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
})

//4)PUT

app.put("/clientes/:id",(req,res)=>{
    const{ id } = req.params;
    const { nombre, apellido } = req.body;

    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if(clienteIndex !== -1){
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;

        console.log(clientes);
        res.send({status:"success", mensajes: "Cliente actualizado"});
    } else {
        res.status(404).send({status:"error", mensaje: "Cliente no encontrado"});
    }
})

//5)DELETE

app.delete("/clientes/:id",(req,res)=>{
    const{ id } = req.params;
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if(clienteIndex !== -1){
        clientes.splice(clienteIndex, 1);
        console.log(clientes);
        res.send({status:"success", mensajes: "Cliente eliminado"});
    } else {
        res.status(404).send({status:"error", mensaje: "Cliente no encontrado"});
    }
})