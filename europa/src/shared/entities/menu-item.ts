interface IMenuItem {
    id: number;
    guid: string;
    url: string;
    label: string;
}

export class MenuItem implements IMenuItem {
    private _id: number;
    private _guid: string;
    private _url: string;
    private _label: string;
    constructor(id?: number, guid?: string, url?: string, label?: string){
        this.id = id;
        this.guid = guid;
        this.url = url;
        this.label = label;
    }

    get id(){
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }

    get guid(){
        return this._guid;
    }

    set guid(guid: string){
        this._guid = guid;
    }

    get url(){
        return this._url;
    }

    set url(url: string){
        this._url = url;
    }

    get label(){
        return this._label;
    }

    set label(id: string){
        this._label = id;
    }
}