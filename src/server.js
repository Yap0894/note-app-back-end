const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5001,
    host: process.env.NODE_ENV !== 'production' ?
      'localhost' : '172.31.35.79', // Harcode productiom host
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);

  await server.start();
  console.log(`Server Berjalan di ${server.info.uri}`);
};

init();
