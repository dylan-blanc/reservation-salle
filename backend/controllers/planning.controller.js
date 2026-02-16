import Planning from "../models/planning.model.js";

export const createPlanning = async (req, res) => {
  const { meaning, StartHour, EndHour } = req.body;
  
  const userId = req.user.id; 

  try {
    const planning = await Planning.create({ 
      reunion_title: meaning, 
      organizer: userId,
      start_date: StartHour, 
      end_date: EndHour,
      user_id: userId,
    });
    
    res.status(201).json(planning);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getPlanning = async (req, res) => {
  try {
    const planning = await Planning.findAll();
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updatePlanning = async (req, res) => {
  const { meaning, StartHour, EndHour } = req.body;
  
  const userId = req.user.id; 

  try {
    const planning = await Planning.update({ 
      reunion_title: meaning, 
      organizer: userId,
      start_date: StartHour, 
      end_date: EndHour,
      user_id: userId,
    });
    
    res.status(201).json(planning);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deletePlanning = async (req, res) => {
  try {
    const planning = await Planning.delete(req.params.id);
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
