const Sequelize = require('sequelize');
const db = require('../configs/db');

const ForwarderReport = db.define('forwarder_report', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    addressee: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title:{
        type: Sequelize.STRING(600),
        allowNull: false,
    },
    content:{
        type: Sequelize.STRING(1000),
        allowNull: false,
    }
});

//Criar a tabela
ForwarderReport.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//User.sync({ alter: true })

module.exports = ForwarderReport;