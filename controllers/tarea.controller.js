import { 
  obtenerPorId, 
  obtenerTodas, 
  crear, 
  eliminar, 
  actualizarCompleta, 
  actualizarParcial, 
  obtenerPorTitulo 
} from "../models/tarea.model.js";

const obtenerTodasTareas = (req, res) => {
  try {
    const datos = obtenerTodas();
    const { formato } = req.query; 

    if (formato === 'text') {
      const textoRespuesta = datos
        .map(tarea => `${tarea.id}. ${tarea.titulo} - [${tarea.completada ? 'Completada' : 'Pendiente'}]`)
        .join('\n');

      return res.type('text/plain').send(`LISTA DE TAREAS:\n\n${textoRespuesta}`);
    }

    return res.status(200).json({
      success: true,
      data: datos
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
};

const obtenerPorIdTareas = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }
    
    const tarea = obtenerPorId(id);

    if (!tarea) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.status(200).json({
      success: true,
      data: tarea
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener la tarea',
      error: error.message
    });
  }
};

const crearTarea = (req, res) => {
  try {
    const { titulo, completada } = req.body;

    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }

    const nuevaTarea = crear({ titulo, completada });

    return res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: nuevaTarea
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
};

const actualizarCompletaTarea = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El campo "titulo" es requerido'
      });
    }

    const tareaActualizada = actualizarCompleta(id, { titulo, completada });

    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea actualizada completamente',
      data: tareaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

const actualizarParcialTarea = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    if (Object.keys(datosParciales).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe enviar al menos un campo para actualizar'
      });
    }

    const tareaActualizada = actualizarParcial(id, datosParciales);

    if (!tareaActualizada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea actualizada parcialmente',
      data: tareaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

const eliminarTarea = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Debe ser un número'
      });
    }

    const tareaEliminada = eliminar(id);

    if (!tareaEliminada) {
      return res.status(404).json({
        success: false,
        message: `Tarea con ID ${id} no encontrada`
      });
    }

    return res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: tareaEliminada
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
};

const obtenerPorTituloTarea = (req, res) => {
  try {
    const { titulo } = req.params;

    if (!titulo) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro "titulo" es requerido'
      });        
    }

    const tareas = obtenerPorTitulo(titulo);

    // Validamos si no se encontraron resultados en el arreglo
    if (!tareas || tareas.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron tareas con el título: "${titulo}"`
      });   
    }

    return res.json({
      success: true,
      message: 'Tareas encontradas exitosamente',
      data: tareas,
      count: tareas.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al buscar tarea por título',
      error: error.message
    });     
  }
};

export {
  crearTarea,
  obtenerPorIdTareas,
  obtenerTodasTareas,
  actualizarCompletaTarea,
  actualizarParcialTarea,
  eliminarTarea,
  obtenerPorTituloTarea
};