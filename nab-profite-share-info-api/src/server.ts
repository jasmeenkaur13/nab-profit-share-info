import express, { Request, Response, NextFunction } from 'express';
import { shareInfoDataRouter } from './routes/share-info-data.routes';
import * as bodyParser from 'body-parser';
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    // Setting CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    if ('OPTIONS' === req.method) {
        res.status(200).send();
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

//url to navigate to the verbs defined in router
app.use('/share-data', shareInfoDataRouter);

app.listen(3000, () => {
    console.log('listening on 3000');
});
