import http from 'http';
import app from './app.js';

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(
    'mode : %s \nserver is running at : %d  ',
    app.get('env'),
    app.get('port')
  );
});
