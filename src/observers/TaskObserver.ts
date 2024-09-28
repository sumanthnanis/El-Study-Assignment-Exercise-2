export interface TaskObserver {
    update(message: string): void;
}

export class ConsoleObserver implements TaskObserver {
    update(message: string): void {
        console.log(`Observer notification: ${message}`);
    }
}

