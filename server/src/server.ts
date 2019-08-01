import * as path from 'path';
import * as express from 'express';
import * as _ from 'lodash';
import * as fs from 'fs';
import {Application, Request, Response, NextFunction} from 'express';

const bodyParser: any = require('body-parser');

const http = require('http');

const app: Application = express();

const server = http.createServer(app);


app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

///////////////////////
app.get('/api/get-config/:ver', function (req, resp) {
  const ver = Number(req.params.ver);
  const file = path.join(__dirname, '../etc/app-config.json');

  fs.readFile(file, 'utf8', function (err, data) {
    if (err) resp.json({error: 'no-file'});
    else {
      try {
        const cfg = JSON.parse(data);
       resp.json(cfg);
        //else resp.json({success:'success', message: 'YOU_ARE_GOOD'})
      } catch (e) {
        resp.json({error: 'parse-error', data: e})
      }
    }
  });
});

server.listen(48000, function () {
  console.log('Server now running on port: ' + server.address().port);
});


function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.error("API error handler triggered", err);

  res.status(500).json({
    errorCode: 'ERR-001-Vlad',
    message: 'Internal Server Error'
  });
}




/*
const elasticService: ElasticService =  new ElasticService('cps-ecp.dev.innovexa.com:5200','trace');
elasticService.connect().then(() => {
  console.log('Elastic connected')
  getMemberByUid('4567');
}).catch(console.error);
*/


