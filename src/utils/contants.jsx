export const API_SERVER = "https://cap1.onrender.com";

// export const API_SERVER = "http://localhost:4000";


//User
export const API_SERVER_ADD_USER = `${API_SERVER}/user/add`;
export const API_SERVER_LOGIN_USER = `${API_SERVER}/user/login`;
export const API_SERVER_UPDATE_PERSONAL_PROFILE = `${API_SERVER}/user/update`;
export const API_SERVER_ADD_POST = `${API_SERVER}/home/add`
export const API_SERVER_ADD_REPORT = `${API_SERVER}/user/report?homeId=`;
export const API_SERVER_ADD_RENTAL = `${API_SERVER}/rental/add`;
export const API_SERVER_UPDATE_FOR_HOST = `${API_SERVER}/user/update/host`;
export const API_SERVER_GET_RENTAL_FOR_ID = `${API_SERVER}/rental/get?rentalId=`;
export const API_SERVER_RENTAL_CONFIRM = `${API_SERVER}/rental/confirm?rentalId=`;
//home
export const API_SERVER_LIST_HOME = `${API_SERVER}/home/list?page=1`;
export const API_SERVER_SEARCH_FOR_ADDRESS = `${API_SERVER}/home/search`;
export const API_SERVER_SEARCH_FOR_ID = `${API_SERVER}/home?postId=`;
export const API_SERVER_SEARCH_FOR_ROOMTYPE = `${API_SERVER}/home/search/type`;
export const API_SERVER_ADDCOMMENT_FOR_ID = `${API_SERVER}/home/comment/add?homeId=`;

//Chat
export const API_SERVER_LIST_CHAT = `${API_SERVER}/chat/list`;
export const API_SERVER_GET_LIST_MESSAGES_FOR_ID = `${API_SERVER}/chat/message/list`;
export const API_SERVER_SEND_MESSAGE_FOR_ID = `${API_SERVER}/chat/message/send`;
export const API_SERVER_GET_GUEST_USER = `${API_SERVER}/chat/message`;
export const API_SERVER_LIST_NOTIFICATION = `${API_SERVER}/notification/list`;
export const API_SERVER_GET_LIST_RENTAL_FOR_HOST = `${API_SERVER}/rental/get/host`;
export const API_SERVER_ADD_CHAT = `${API_SERVER}/chat/add`;
export const API_SERVER_ADD_NOTIFICATION = `${API_SERVER}/notification/add`;
//Admin
export const API_SERVER_PATCH_BLOCK_USER = `${API_SERVER}/admin/block/user`;
export const API_SERVER_PATCH_UNBLOCK_USER = `${API_SERVER}/admin/unBlock/user`;
export const API_SERVER_GET_REPORT_USER = `${API_SERVER}/admin/list/report`;
export const API_SERVER_LIST_USER = `${API_SERVER}/admin/list/user`;
export const API_SERVER_LIST_REPORT = `${API_SERVER}/admin/list/report`;
export const API_SERVER_INFOMATION_USER = `${API_SERVER}/admin/infomation?id=`;
export const API_SERVER_REPORT_FOR_ID = `${API_SERVER}/admin/report?id=`;
export const API_SERVER_SKIP_REPORT = `${API_SERVER}/admin/skipped/report?id=`;
export const API_SERVER_REPORT_DELETED_ = `${API_SERVER}/admin/deleted/report?id=`;
// ML 
export const API_SERVER_VALUATION = `http://127.0.0.1:8000`;