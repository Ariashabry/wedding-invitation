import Wish from '../models/Wish.js';

const wishesController = {
   getWishes: async (req, res) => {
      try {
         const wishes = await Wish.find().sort({ createdAt: -1 });
         res.status(200).json(wishes);
      } catch (error) {
         console.error(error);
         res.status(500).json({ 
            success: false, 
            error: 'Error al obtener los deseos' 
         });
      }
   },

   postWish: async (req, res) => {
      const { name, message } = req.body;
      
      try {
         const newWish = new Wish({ 
            name: name.trim(), 
            message: message.trim() 
         });
         
         await newWish.save();
         res.status(201).json({ 
            success: true, 
            message: 'Deseo guardado exitosamente' 
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ 
            success: false, 
            error: 'Error al guardar el deseo' 
         });
      }
   },

   updateWish: async (req, res) => {
      const { id } = req.params;
      const { name, message } = req.body;

      try {
         const updatedWish = await Wish.findByIdAndUpdate(
            id,
            { 
               name: name.trim(), 
               message: message.trim() 
            },
            { new: true } // Retorna el documento actualizado
         );

         if (!updatedWish) {
            return res.status(404).json({ 
               success: false, 
               error: 'Deseo no encontrado' 
            });
         }

         res.status(200).json({ 
            success: true, 
            message: 'Deseo actualizado exitosamente',
            wish: updatedWish
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ 
            success: false, 
            error: 'Error al actualizar el deseo' 
         });
      }
   },

   deleteWish: async (req, res) => {
      const { id } = req.params;

      try {
         const deletedWish = await Wish.findByIdAndDelete(id);

         if (!deletedWish) {
            return res.status(404).json({ 
               success: false, 
               error: 'Deseo no encontrado' 
            });
         }

         res.status(200).json({ 
            success: true, 
            message: 'Deseo eliminado exitosamente' 
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ 
            success: false, 
            error: 'Error al eliminar el deseo' 
         });
      }
   }
};

export default wishesController; 