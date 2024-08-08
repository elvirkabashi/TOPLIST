import Category from "../models/category.js";

export const createCategory = async (req, res) => {
    const { name, description, parent_id } = req.body;

    try {
      const newCategory = await Category.create({
        name,
        description,
        parent_id: parent_id || null
      });
  
      res.status(201).json({
        message: 'Category created successfully',
        category: newCategory
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const getCategories = async (req, res) => {
    try {
      const categories = await Category.findAll({
        where: { parent_id: null },
        include: [{
          model: Category,
          as: 'subcategories'
        }]
      });
  
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;
  
    try {
      const category = await Category.findByPk(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      if (parent_id && parent_id === id) {
        return res.status(400).json({ message: 'Category cannot be its own parent' });
      }
  
      category.name = name || category.name;
      category.description = description || category.description;
      category.parent_id = parent_id !== undefined ? parent_id : category.parent_id;
  
      await category.save();
  
      res.json({
        message: 'Category updated successfully',
        category
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findByPk(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Delete the category
      await category.destroy();
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};