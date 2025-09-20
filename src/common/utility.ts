export class Utility {
    static parseDDMMYYHHMMSS(dateStr: string): Date | null {
        if (!/^\d{12}$/.test(dateStr)) return null;
        const day = parseInt(dateStr.slice(0, 2), 10);
        const month = parseInt(dateStr.slice(2, 4), 10) - 1;
        const year = 2000 + parseInt(dateStr.slice(4, 6), 10);
        const hour = parseInt(dateStr.slice(6, 8), 10);
        const minute = parseInt(dateStr.slice(8, 10), 10);
        const second = parseInt(dateStr.slice(10, 12), 10);
        const d = new Date(Date.UTC(year, month, day, hour, minute, second));
        return isNaN(d.getTime()) ? null : d;
    }

    static validateUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(uuid)) {
            return false
        }
        return true
    }
}