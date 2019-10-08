import { Op } from 'sequelize';
import Tool from '../models/Tool';

class ToolController {
  async index(req, res) {
    if (req.query.tag) {
      const response = await Tool.findAll({
        where: {
          tags: {
            [Op.contains]: [String(req.query.tag)],
          },
        },
      });

      return res.status(200).json(response);
    }

    const data = await Tool.findAll();

    return res.status(200).json(data);
  }

  async store(req, res) {
    const { title, link, description, tags } = req.body;
    const response = await Tool.create({
      title,
      link,
      description,
      tags,
      user_id: req.userId,
    });

    return res.status(201).json(response);
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await Tool.destroy({ where: { id } });

    return res.status(204).json(data);
  }
}

export default new ToolController();
