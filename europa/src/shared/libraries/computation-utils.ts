declare var MathQuill: any;

export class ComputationUtils {

    public static addSymbols(componentReference, symbols) {
        const MQ = MathQuill.getInterface(2);
        componentReference.nativeElement.innerText = symbols;
        MQ.StaticMath(componentReference.nativeElement);
    }

}