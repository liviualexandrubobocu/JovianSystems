export class ComputationNode {
    public value;
    public left: ComputationNode;
    public right: ComputationNode;

    constructor(value: string){
        this.value = value;
    }
}

export class ComputationTree {
    public root : ComputationNode;

    constructor(rootValue: string){
        this.root = new ComputationNode(rootValue);
    }

    addNode(position: string, value: string){
        let root = this.root;
        if(position === 'leftmost'){
            while(root.left){
                root = root.left;
                root.left = new ComputationNode(value);
            }
        } else if( position === 'rightmost') {
            while(root.right){
                root = root.right;
                root.right = new ComputationNode(value);
            }
        }
        
    }
}

