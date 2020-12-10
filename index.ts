import Server from './classes/server';
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

//lectura y parseo del body
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin: true, credentials: true}))

//RUTAS DE SERV
server.app.use('/', router)

server.start(() => {
   console.log(`Servidor en el puerto ${server.port}`)
});