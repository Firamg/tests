const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto
    it("Obteniendo un 200",async()=>{
        const response =await request(server).get("/cafes").send()
        const status=response.statusCode
        expect(status).toBe(200)
    })
    it("Obteniendo un Producto",async()=>{
        const {body}=await request(server).get("/cafes/1").send()
        const cafes=body
        expect(cafes).toBeInstanceOf(Object)
    })

    //código 404 al intentar eliminar un café con un id que no existe
    it("Eliminar un producto con id distinto",async()=>{
        const jwt="token"
        const idProductoAEliminar=5
        const response=await  request(server).delete(`/cafes/${idProductoAEliminar}`).set("Authorization",jwt).send()
        const status=response.statusCode
       /*  const ids=cafes.map(p => p.id) */
        expect(status).toBe(404)
    })

    //ruta POST /cafes agrega un nuevo café y devuelve un código 201
    it("Agregando un nuevo producto",async()=>{
        const id=Math.floor(Math.random()*999)
        const cafe={id,nombre:"Nuevo producto"}
        const response=await request(server).post("/cafes").send(cafe)
        const status=response.statusCode
 
        expect(status).toBe(201)
        /* expect(cafes).toContainEqual(cafe) */

        

    })
    //ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload
    it("Actualizar producto con parametros distintos",async()=>{
        const idProductoARevisar=5
        const response=await request(server).put(`/cafes/${idProductoARevisar}`).send()
        const status=response.statusCode
        expect(status).toBe(400)
    })

});
