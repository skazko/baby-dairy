export class LocalDateTime {
    constructor(private _date: Date) {}

    public get localISOString() {
        const timeWithoutOffset = this._date.getTime() - this._date.getTimezoneOffset() * 60000;
        const localISOTimeString = (new Date(timeWithoutOffset)).toISOString();
        const endIndex = localISOTimeString.indexOf('.');
        return localISOTimeString.substring(0, endIndex);
    }

    public get time() {
        return this._date.toLocaleTimeString().substring(0, 5);
    }

    public get isToday() {
        return this._date.getDate() === (new Date()).getDate();
    }

    static now(): LocalDateTime {
        return new this(new Date());
    }
    static fromString(dateString: string): LocalDateTime {
        return new this(new Date(dateString));
    }
}
