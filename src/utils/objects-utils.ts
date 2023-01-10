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

export function areDeepEqual<T extends any>(value1: T, value2: T): boolean {
  const type1 = typeof value1;
  const type2 = typeof value2;
  if (type1 !== type2) {
    return false;
  }

  if (type1 !== 'object') {
    return value1 === value2;
  }

  const isArray1 = Array.isArray(value1);
  const isArray2 = Array.isArray(value2);

  if (isArray1 !== isArray2) {
    return false;
  }

  if (isArray1) {
    const array1 = value1 as any[];
    const array2 = value2 as any[];

    if (array1.length !== array2.length) {
      return false;
    }

    return array1.every((member1, i) => areDeepEqual(member1, array2[i]));
  }

  const object1 = value1 as AnyLiteral;
  const object2 = value2 as AnyLiteral;


  if (!object1 || !object2) return false;
  
  const keys1 = Object.keys(object1);

  return keys1.every((key1) => areDeepEqual(object1[key1], object2[key1]));
}

export function toObjectWithCamelCase<T, U>(obj: T): U {
  return (Object.keys(obj)).reduce((accum, key) => {
    const keySymbols = key.split('_') as string[];

    if (keySymbols.length >= 2) {
      const camelkey = keySymbols.map((s, i) => {
        if (i !== 0) {
          return s[0].toUpperCase() + s.slice(1);
        }

        return s;
      }).join('') as string;

      accum[camelkey] = obj[key];
    } else {
      accum[key] = obj[key];

    }

    return accum;
  }, {} as Record<string, T>);
}
