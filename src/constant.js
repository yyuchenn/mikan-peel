export const API_BASE = "https://api.mikan.mom";
export const CLOUD_URL = "https://pan.mikan.mom";

export const API_THIRD_PARTY = API_BASE + '/third_party';
export const API_USER = API_BASE + "/user";
export const API_TAG = API_BASE + "/tag";
export const API_TAG_DELETE = API_BASE + "/tag_delete";
export const API_MANGA = API_BASE + "/manga";
export const API_TASK = API_BASE + "/task";


export function api_chapter(cid, listName = undefined) {
    return API_MANGA + "/" + cid + (listName? "/" + listName : "");
}