var express = require('express');
var shareInfoDataRouter = express.Router();

import { ShareInfoDataController } from '../share-data-info/share-data-info.controller';


// register the route for Get verb
shareInfoDataRouter.get('/', ShareInfoDataController.getCurrencyDataAnlysis);

export { shareInfoDataRouter };