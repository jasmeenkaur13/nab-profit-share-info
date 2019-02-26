export class Utilities {
    /**
     * sorts the list in descending order
     * @param list list to be sorted
     * @param key property to be sorted by
     */
    public static sortByDescending(list: any, key: any) {
        return list.sort((data1: any, data2: any) => {
            return data2[key] - data1[key];
        });
    }

    /**
     * sorts the list in ascending order
     * @param list list to be sorted
     * @param key property to be sorted by
     */
    public static sortByAscending(list: any, key: any) {
        return list.sort((data1: any, data2: any) => {
            return data1[key] - data2[key];
        });
    }
}