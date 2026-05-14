const { Quest } = require('../models');

exports.getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.findAll();
    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
};

exports.getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findByPk(req.params.id);
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quest' });
  }
};

exports.createQuest = async (req, res) => {
  try {
    const { title, description, pricePerPerson, minPlayers, maxPlayers, duration, difficulty, genre, rating, image } = req.body;

    const quest = await Quest.create({
      title,
      description,
      pricePerPerson,
      minPlayers,
      maxPlayers,
      duration,
      difficulty,
      genre,
      rating,
      image
    });

    res.status(201).json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quest' });
  }
};
