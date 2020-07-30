'use strict';
module.exports = function (sequelize, dataTypes) {
    let alias = "Mensaje";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING(60),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(60),
            allowNull: false
        },
        telefono:{
            type: dataTypes.INTEGER,
            alloNull: true
        },
        asunto:{
            type: dataTypes.STRING(60),
            allowNull: false
        },
        medio_contacto:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        mensaje:{
            type: dataTypes.TEXT,
            allowNull: false
        }
    };
    let config = {
        tableName: "messages",
        timestamps: false
    };
    let Mensaje = sequelize.define(alias, cols, config);
    return Mensaje;

}