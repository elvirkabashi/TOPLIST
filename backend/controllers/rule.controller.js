import Rule from "../models/rule.js";


export const createOrUpdateRule = async (req, res) => {
    const { id, rule_text } = req.body;
  
    try {
      let rule;
  
      if (id) {
        rule = await Rule.findByPk(id);
  
        if (!rule) {
          return res.status(404).json({ message: 'Rule not found' });
        }
  
        rule.rule_text = rule_text || rule.rule_text;
        await rule.save();
  
        res.json({
          message: 'Rule updated successfully',
          rule
        });
      } else {
        rule = await Rule.create({
          rule_text
        });
  
        res.status(201).json({
          message: 'Rule created successfully',
          rule
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getRules = async (req, res) => {
    try {
      const rules = await Rule.findAll();
  
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
