import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const DBConnect = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        database: 'jwt_fullstack',
        Promise: bluebird
    });
    return connection;
}

export default DBConnect;
