const htmlEntities = {
    "&laquo;": "«",
    "&raquo;": "»",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
  };
  
const decodeEntities = (str) =>
    str.replace(/&[a-z]+;/g, (match) => htmlEntities[match] || match);


export {
    decodeEntities
}