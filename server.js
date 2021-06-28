const sequelize = require('./config/connection');
const tracker = require('./tracker')

const PORT = process.env.PORT || 3001;

// turn on connection to db and server
async function startSync() {
    await sequelize.sync({ force: false }).then(() => {
        tracker
    })
}
startSync();