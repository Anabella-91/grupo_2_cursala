'use strict';
module.exports = function (sequelize, dataTypes) {
    let alias = "Carrito";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true

        },
        id_producto: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    };
    let config = {
        tableName: "messages",
        timestamps: false
    };  
    let Carrito = sequelize.define(alias, cols, config);
   
    Carrito.associate = function(models) {
        Carrito.belongsTo(models.Users, {
            as: 'usuario',
            foreignKey: 'id_user'
        });
        Carrito.belongsTo(models.Products, {
            as: 'curso',
            foreignKey: 'id_producto'
        });
    };

    return Carrito;

}