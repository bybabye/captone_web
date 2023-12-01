//export const API_SERVER = "https://cap1.onrender.com";

export const API_SERVER = 'http://localhost:4000';
export const API_SERVER_ADD_USER = `${API_SERVER}/user/add`;


export const API_SERVER_LOGIN_USER = `${API_SERVER}/user/login`;
export const API_SERVER_LIST_USER = `${API_SERVER}/user/listUser`;

export const API_SERVER_LIST_CHAT = `${API_SERVER}/chat/list`;

export const API_SERVER_LIST_HOME = `${API_SERVER}/home/list?page=1`;

export const API_SERVER_SEARCH_FOR_ADDRESS = `${API_SERVER}/home/search`;
export const API_SERVER_SEARCH_FOR_ROOMTYPE = `${API_SERVER}/home/search/type`;

export const API_SERVER_UPDATE_PERSONAL_PROFILE = `${API_SERVER}/user/update`;
export const API_SERVER_GET_LIST_MESSAGES_FOR_ID = `${API_SERVER}/chat/message/list`;
export const API_SERVER_SEND_MESSAGE_FOR_ID = `${API_SERVER}/chat/message/send`;
export const API_SERVER_GET_GUEST_USER = `${API_SERVER}/chat/message`;
export const API_SERVER_GET_REPORT_USER = `${API_SERVER}/admin/list/report`;
