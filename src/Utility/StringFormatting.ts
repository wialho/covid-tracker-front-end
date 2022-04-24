export function ConvertDatabaseFieldToDisplayString (field: string): string {
    return field.toLowerCase()
        .split('_')
        .map(x => x.charAt(0).toUpperCase() + x.substring(1))
        .join(' ');
}

export function ConvertZuluDateToDisplayableDate(date: string){
    return date.split('T')[0];
}