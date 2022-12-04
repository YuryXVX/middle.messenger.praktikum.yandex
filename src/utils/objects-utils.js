export const pick = (obj, fields, omit = false) => {
  return Object.keys(obj).reduce((acc, key) => {
    if(omit) {
      if(!fields.includes(key)) {
        acc[key] = obj[key];
      }  
    } else {
      if(fields.includes(key)) {
        acc[key] = obj[key];
      }  
    }
    
    return acc;
  }, {})
}

export const omit = (obj, fields) => {
  return pick(obj, fields, true)
}