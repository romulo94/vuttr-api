import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async index(req, res) {
    return res.json({ message: 'Token is valid' });
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Password is wrong' });

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: {
        id,
        name,
      },
      token,
    });
  }
}

export default new SessionController();
