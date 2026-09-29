import { Router } from "express";
import { actualizarCompletaTarea, actualizarParcialTarea, crearTarea, eliminarTarea, obtenerPorIdTareas, obtenerTodasTareas,obtenerPorTituloTarea } from "../controllers/tarea.controller.js";



const routerTareas = Router();

routerTareas.get('/', obtenerTodasTareas);

// GET /api/tareas/:id - Obtener una tarea por ID
routerTareas.get('/:id', obtenerPorIdTareas);
routerTareas.get('/titulo/:titulo',obtenerPorTituloTarea)
// POST /api/tareas - Crear una nueva tarea
routerTareas.post('/', crearTarea);

// PUT /api/tareas/:id - Actualizar tarea completamente
routerTareas.put('/:id', actualizarCompletaTarea);

// PATCH /api/tareas/:id - Actualizar tarea parcialmente
routerTareas.patch('/:id', actualizarParcialTarea);

// DELETE /api/tareas/:id - Eliminar una tarea
routerTareas.delete('/:id', eliminarTarea);


export default routerTareas