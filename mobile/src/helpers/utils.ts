export const getDay = (date:Date) => {
    return date.getDate();
}

export const getMonth = (date:Date) => {
    let res;
    switch(date.getMonth()){
        case 0:
            res = "Jan";
            break;
        case 1:
            res = "Feb";
            break;
        case 2:
            res = "Mar";
            break;
        case 3:
            res = "Abr";
            break;
        case 4:
            res = "May";
            break;
        case 5:
            res = "Jun";
            break;
        case 6:
            res = "Jul";
            break;
        case 7:
            res = "Ago";
            break;
        case 8:
            res = "Sep";
            break;
        case 9:
            res = "Oct";
            break;
        case 10:
            res = "Nov";
            break;
        case 11:
            res = "Dic";
            break;
    }
    return res;
}

export const computeDistance = (lat1: number, long1: number, lat2: number, long2: number) => {
    const lat1InRad = toRad(lat1);
    const long1InRad = toRad(long1);
    const lat2InRad = toRad(lat2);
    const long2InRad = toRad(long2);
  
    return (
      // In kilometers
      6377.830272 *
      Math.acos(
        Math.sin(lat1InRad) * Math.sin(lat2InRad) +
          Math.cos(lat1InRad) * Math.cos(lat2InRad) * Math.cos(long2InRad - long1InRad),
      )
    );
  }
  
  function toRad(angle: number) {
    return (angle * Math.PI) / 180;
  }