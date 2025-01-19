import Guest from '../models/Guest.js';

const guestsController = {

   getGuests: async (req, res) => {
      try {
         const guests = await Guest.find();
         res.status(200).json(guests);
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Error al obtener los invitados' });
      }
   },

   postGuests: async (req, res) => {
      const { fullName, phone, assist, partner, partnersName, childrens, childrensQuantity, assistChurch, dietaryRestrictions, dietaryRestrictionsIndications, message } = req.body;
      const formatedName = fullName.toLowerCase().trim().replace(/\s+/g, ' ');
      try {
         const existingGuest = await Guest.findOne({ fullName: formatedName });
         if (existingGuest) {
            return res.status(400).json({ success: false, error: 'Ya existe un invitado con el mismo nombre completo' });
         }

         const newGuest = new Guest({ fullName: formatedName, phone, assist, partner, partnersName, childrens, childrensQuantity, assistChurch, dietaryRestrictions, dietaryRestrictionsIndications, message });
         await newGuest.save();
         res.json({ success: true });
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Error al almacenar el invitado' });
      }
   },

   updateGuest: async (req, res) => {
      const { id } = req.params;
      try {
         const updatedGuest = await Guest.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
         );
         
         if (!updatedGuest) {
            return res.status(404).json({ 
               success: false, 
               error: 'Invitado no encontrado' 
            });
         }

         res.status(200).json(updatedGuest);
      } catch (error) {
         console.error(error);
         res.status(500).json({ 
            success: false, 
            error: 'Error al actualizar el invitado' 
         });
      }
   }
}

export default guestsController;