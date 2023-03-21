export const removeAllPrivateProperties = function (object: any, processedObjects: any[] = []) {
    if (processedObjects.includes(object)) {
        return object;
    }
    processedObjects.push(object);
    object = clone(object);
    let nextObject = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (key.startsWith("_")) {
                delete object[key];
            } else if (typeof object[key] === "object") {
                object[key] = removeAllPrivateProperties(object[key], processedObjects);
            }
        }
    }
    return object;
}

export function clone(object: any) {
    return { ...object}
}
