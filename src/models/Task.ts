export class Task {
    public completed: boolean = false;

    constructor(
        public description: string,
        public startTime: string,
        public endTime: string,
        public priority: string
    ) {}
}