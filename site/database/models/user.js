module.exports = (sequelize, DataTypes) => {

    const Model = sequelize.define('User', {
      name: {
        type: DataTypes.STRING(50)
      },
      email: {
        type : DataTypes.STRING(50)
      },
      password : {
        type : DataTypes.STRING(200)
      }
    },
    {
      timestamps : false,
      tableName : 'users'
    });
  
    Model.associate = function(models) {
      // associations can be defined here
    };
  
    return Model;
  };