import { DateBaseConnection } from '../database';
import { ShareData } from '../entities/share-data.entity';
import { AppConfig } from '../app-config';

export class ShareDataInfoDb {
    public static readonly database = new DateBaseConnection(AppConfig.databaseURL, AppConfig.databaseName);

    /**
     * Method to get the filtered data according to the parameters passed.
     * @param requestParameters parameters to filter the data
     */
    public static async getDataWithRequestParameters(requestParameters: any): Promise<ShareData[]> {
        try {
            const db = await ShareDataInfoDb.database.start();
            let list: any = await db.collection(AppConfig.shareDataInfoCollectionName).find(requestParameters);
            let shareDataList: ShareData[] = [];
            await list.forEach(function (doc: any) {
                shareDataList.push(ShareData.ConvertToModel(doc));
            });
            ShareDataInfoDb.database.stop();
            return shareDataList;
        }
        catch (e) {
            ShareDataInfoDb.database.stop();
            throw e;
        }
    }
}