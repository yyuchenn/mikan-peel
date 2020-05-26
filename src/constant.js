export const API_BASE = "http://192.168.1.112:3002/api";

export const API_USER = API_BASE + "/user";
export const API_MANGA = API_BASE + "/manga";


export function api_chapter(cid, listName = undefined) {
    return API_MANGA + "/" + cid + (listName? "/" + listName : "");
}