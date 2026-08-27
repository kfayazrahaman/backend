import Sequelize from 'sequelize';

const dbConnect = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgresql',
    logging: false,
})

dbConnect.authenticate()
    .then(() => {
        console.log('Database connected...');   
    })
    .catch(err => {
        console.log('Error: ' + err);
    }); 

export default dbConnect
;   