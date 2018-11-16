export class ComponentUtils{
    public static unsubscribeAll(subscriptions){
        for(let subscription of subscriptions){
            subscription.unsubscribe();
        }
    }
}