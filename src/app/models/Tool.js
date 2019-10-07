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
      }
    );

    return this;
  }
}

export default Tool;
