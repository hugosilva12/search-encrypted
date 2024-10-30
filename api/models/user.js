const Sequelize = require('sequelize');
const db = require('../configs/db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    public_key: {
        type: Sequelize.STRING(566),
        allowNull: false,
        unique:true
    }
});

//Criar a tabela
User.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//User.sync({ alter: true })

module.exports = User;