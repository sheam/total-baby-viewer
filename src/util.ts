import format from 'date-fns/format';
export function showDate(d: Date|null): string {
    if(!d) return '';
    return format(d, 'MMM dd, yyyy');
}
