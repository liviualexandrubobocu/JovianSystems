interface ICalculatorButton {
    id: string;
    interfaceSymbol: string;
    mathSymbol: string;
    cssClasses: string[];
}

export class CalculatorButton implements ICalculatorButton {
    private _id: string;
    private _interfaceSymbol: string;
    private _mathSymbol: string;
    private _cssClasses: string[];

    constructor(id?: string, interfaceSymbol?: string, mathSymbol?: string, cssClasses?: string[]) {
        this.id = id;
        this.interfaceSymbol = interfaceSymbol;
        this.mathSymbol = mathSymbol;
        this.cssClasses = cssClasses;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get interfaceSymbol(): string {
        return this._interfaceSymbol;
    }

    set interfaceSymbol(interfaceSymbol: string) {
        this._interfaceSymbol = interfaceSymbol;
    }

    get mathSymbol(): string {
        return this._mathSymbol;
    }

    set mathSymbol(mathSymbol: string) {
        this._mathSymbol = mathSymbol;
    }

    get cssClasses(): string[] {
        return this._cssClasses;
    }

    set cssClasses(cssClasses: string[]) {
        this._cssClasses = cssClasses;
    }
}