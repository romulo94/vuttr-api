import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const isDuplicatedEmail = await User.findOne({
      where: { email },
    });

    if (isDuplicatedEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { id, name } = await User.create(req.body);

    return res.status(201).json({ id, name, email });
  }
}

export default new UserController();
