interface IPage {
    pageTitle: string;
    pageContent: string;
}

export class Page implements IPage {
    private _pageTitle: string;
    private _pageContent: string;

    constructor(pageTitle?: string, pageContent ?: string){
        this.pageTitle = pageTitle;
        this.pageContent = pageContent;
    }

    get pageTitle(): string {
        return this._pageTitle;
    }

    set pageTitle(pageTitle: string) {
        this._pageTitle = pageTitle;
    }

    get pageContent(): string {
        return this._pageContent;
    }

    set pageContent(pageContent: string) {
        this._pageContent = pageContent;
    }
}