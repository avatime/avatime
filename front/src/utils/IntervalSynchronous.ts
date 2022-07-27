export class IntervalSynchronous {
    private static instance: IntervalSynchronous | undefined;
    callbackList: Array<() => Promise<any>>;
    id: any;

    private constructor() {
        this.callbackList = [];
    }

    getInstance(): IntervalSynchronous {
        if (!IntervalSynchronous.instance) {
            IntervalSynchronous.instance = new IntervalSynchronous();
        }
        return IntervalSynchronous.instance;
    }

    start(interval: number) {
        this.id = setInterval(async () => {
            for (const callback of this.callbackList) {
                await callback();
            }
        }, interval);
    }

    stop() {
        clearInterval(this.id);
        this.id = undefined;
    }

    add() {

    }

    remove() {

    }
}