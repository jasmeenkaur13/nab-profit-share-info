let MongoClient = require('mongodb').MongoClient;
let dbContext: any;
let db: any;

/**
 * Class to create/destroy database connection
 */
export class DateBaseConnection {
    private url: string;
    private databaseName: string;

    constructor(url: string, databaseName: string) {
        this.url = url;
        this.databaseName = databaseName;
    }

    public async start() {
        let self = this;
        await new Promise((resolve, reject) => {
            MongoClient.connect(self.url, {
                useNewUrlParser: true
            }, (err: any, database: any) => {
                if (err)
                    reject();
                else {
                    dbContext= database;
                    db = database.db(self.databaseName);
                    resolve();
                }
            });
        });
        return db;
    }

    public stop()
    {
        dbContext.close();
    }
}
