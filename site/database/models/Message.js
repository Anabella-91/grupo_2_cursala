'use strict';

const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {
    const Message = sequelize.define("Messages", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        telefono: {
            allowNull: true,
            type: dataTypes.INTEGER(11)
        },
        asunto: {
            allowNull: false,
            type: dataTypes.STRING(60)
        },
        medio_contacto: {
            allowNull: true,
            type: dataTypes.STRING(45)
        },
        mensaje: {
            allowNull: false,
            type: dataTypes.TEXT
        },
        created_at: {
            allowNull: false,
            type: dataTypes.DATETIME
        }
    },{
        tableName: "messages",
        timestamps : false,
    });
    return Message;
};