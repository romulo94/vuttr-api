import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        link: Sequelize.STRING,
        tags: Sequelize.ARRAY(Sequelize.STRING),
      },
      {
        sequelize,
        createdAt: 'created_at', // <====== this line and the following one
        updatedAt: 'updated_at',
      }
    );

    return this;
  }
}

export default Tool;
