export const pick = <T extends Record<K, unknown>, K extends keyof T>(
  obj: T, fields: K[], omit = false as boolean,
): Pick<T, K> =>  {
  return (Object.keys(obj) as K[]).reduce((acc, key) => {
    if (omit) {
      if (!fields.includes(key)) {
        acc[key] = obj[key];
      }  
    } else {
      if (fields.includes(key)) {
        acc[key] = obj[key];
      }  
    }
    
    return acc;
  }, {} as Pick<T, K>);
};

export const omit = <T extends Record<K, unknown>, K extends keyof T>(obj: T, fields: K[]) => (
  pick(obj, fields, true)
);
