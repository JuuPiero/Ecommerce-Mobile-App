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
    return link.includes('https') ? link : API_URL + '/strorage/' + link
}
const reloadPage = (navigation) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index];
    navigation.replace(currentRoute.name, currentRoute.params);
};
export {
    decodeEntities,
    imageUrl,
    reloadPage
}