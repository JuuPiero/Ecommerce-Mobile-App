import { API_URL } from "../api/api";

const htmlEntities = {
    "&laquo;": "«",
    "&raquo;": "»",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
  };
  
const decodeEntities = (str) =>
    str.replace(/&[a-z]+;/g, (match) => htmlEntities[match] || match);


function imageUrl(link) {
    const realLink = link.includes('https') ? link : API_URL + '/storage/' + link
    return realLink
}
const reloadPage = (navigation) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index];
    navigation.replace(currentRoute.name, currentRoute.params);
};


function dateFormat(isoDate) {
    // const isoDate = "2025-04-18T19:29:23.000000Z";
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString('vi-VN'); // "18/04/2025"
    return formatted
}
export {
    decodeEntities,
    imageUrl,
    reloadPage,
    dateFormat
}