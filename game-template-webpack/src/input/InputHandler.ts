class InputHandler implements GeoDash.ISubject {
    private observers: GeoDash.IObserver[] = [];
    public scene: Phaser.Scene;
    public pointer: Phaser.Input.Pointer;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.pointer = scene.input.activePointer;
        this.setupInputs();
    }

    public attach(observer: GeoDash.IObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has already been attached.');
        }

        this.observers.push(observer);
    }

    public detach(observer: GeoDash.IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.onNotify(this);
        }
    }

    private setupInputs(): void {
        // Setup pointer inputs
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            console.log(`Pointer down at x: ${pointer.x}, y: ${pointer.y}`);
            this.notify(); // Notify observers about the pointer event
        });
        this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            console.log(`Pointer up at x: ${pointer.x}, y: ${pointer.y}`);
            this.notify(); // Notify observers about the pointer event
        });
        // Setup keyboard inputs, etc.
        // Remember to call this.notify() when an event you want to observe happens
    }

    // Additional methods related to input handling
}