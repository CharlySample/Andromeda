const express = require('express');
const cors = require('cors');
const { connection } = require('../database/config');
const { logger } = require('../libs/logger');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/auth',
            users: '/users',
            roles: '/roles',
            utils: '/utils',
            temp: '/temp',
            humi: '/humi',
            part: '/part'
        }

        //Connect Data Base
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    async connectDB() {
        await connection();
    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //Read 
        this.app.use(express.json());
        //Views
        this.app.use(express.static('views'));
        //Static Files
        this.app.use(express.static('public/uploads'));
        this.app.use(express.static('assets/'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
        this.app.use(this.paths.users, require('../routes/usersRoutes'));
        this.app.use(this.paths.roles, require('../routes/rolesRoutes'));
        this.app.use(this.paths.utils, require('../routes/utilsRoutes'));
        this.app.use(this.paths.temp, require('../routes/temperatureRoutes'));
        this.app.use(this.paths.humi, require('../routes/humidityRoutes'));
        this.app.use(this.paths.part, require('../routes/particleRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info('Listen at :', this.port);
        });
    }

}

module.exports = Server;