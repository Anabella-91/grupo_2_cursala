'use strict';
module.exports = function (sequelize, dataTypes) {
    let alias = "Carrito";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
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
        tableName: "carts",
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