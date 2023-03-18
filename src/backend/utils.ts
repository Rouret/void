export const removeAllPrivateProperties = function (object: any) {
    object = clone(object);
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (key.startsWith("_")) {
                console.log("DELETE", key);
                delete object[key];
            } else if (typeof object[key] === "object") {
                console.log("RECUR", key);
                removeAllPrivateProperties(object[key]);
            }
        }
    }
    return object;
}
export function clone(object: any) {
    return { ...object}
}
