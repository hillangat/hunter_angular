


export const utilFuncs = {
    constains:  (value, array: any[]) => {
        if (array == null || array.length == 0)
            return false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == value)
                return true;
        }
        return false;
    },
    arrayCSV: ( array: any[] ) => {
        if (array == null || array.length == 0)
            return null;
        var csv:string = '';
        for( var i=0; i<array.length; i++ ){
            csv = csv.length > 0 ? csv + "," + array[i] : array[i];
        }
        return csv;
    } 
}