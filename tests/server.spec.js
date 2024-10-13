const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obtener un 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    //* Validar que devuelve código 200
    expect(response.statusCode).toBe(200)
     //* Validar que la respuesta sea un arreglo
     expect(Array.isArray(response.body)).toBe(true);
     //* Validar que al menos haya un elemento
     expect(response.body.length).toBeGreaterThan(0);
     //* Validar que cada elemento sea un objeto
     response.body.forEach(item => {
       expect(typeof item).toBe('object');
     });
  });

  it("obtiene un código 404 al intentar eliminar un café con un id queno existe", async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvY2VudGVAZGVzYWZpb2xhdGFtLmNvbSIsImlhdCI6MTcyODgwMDA0MH0.w3FfWfNrXKYa_JXw2RhCcQzmUGqJ5OVyl11byJVIhf8';
    const response = await request(server).delete("/cafes/99999").set('Authorization', token).send();
    //* Validar que devuelve código 404
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No se encontró ningún cafe con ese id');
  });

  it("Agrega un nuevo café y devuelve un código 201", async () => {
    const response = await request(server).post("/cafes").send({
      id: 5,
      nombre: "Largo",
    });
    //* Validar que devuelve código 201
    expect(response.statusCode).toBe(201)
     //* Validar que la respuesta sea un arreglo
     expect(Array.isArray(response.body)).toBe(true);
     //* Validar que al menos haya un elemento
     expect(response.body.length).toBeGreaterThan(0);
     //* Validar que cada elemento sea un objeto
     response.body.forEach(item => {
       expect(typeof item).toBe('object');
     });
  });

  it("Devuelve un status code 400 id de parámetro diferente al id dentro del payload", async () => {
    const response = await request(server).put("/cafes/1").send({
      id: 2,
      nombre: "Americano",
    });
    //* Validar que devuelve código 400
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('El id del parámetro no coincide con el id del café recibido');
  });
});
