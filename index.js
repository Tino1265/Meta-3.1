import server from "./server.js";

const port = 3000 || process.env.port

server.listen(port,()=>{
    console.log(`Server escuchando en http://localhost:${port}`)
})