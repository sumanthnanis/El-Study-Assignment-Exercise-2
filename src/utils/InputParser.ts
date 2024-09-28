export class InputParser {
    static parseAddTask(input: string): { description: string; startTime: string; endTime: string; priority: string } {
        const matches = input.match(/Add Task\("([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)"\)/);
        if (matches && matches.length === 5) {
            const [, description, startTime, endTime, priority] = matches;
            return { description, startTime, endTime, priority };
        }
        throw new Error("Invalid Add Task command format.");
    }

    static parseRemoveTask(input: string): string {
        const matches = input.match(/Remove Task\("([^"]+)"\)/);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        throw new Error("Invalid Remove Task command format.");
    }

    static parseEditTask(input: string): string {
        const matches = input.match(/Edit Task\("([^"]+)"\)/);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        throw new Error("Invalid Edit Task command format.");
    }

    static parseMarkTaskCompleted(input: string): string {
        const matches = input.match(/Mark Task Completed\("([^"]+)"\)/);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        throw new Error("Invalid Mark Task Completed command format.");
    }

    static parseViewTasksPriority(input: string): string {
        const matches = input.match(/View Tasks Priority\("([^"]+)"\)/);
        if (matches && matches.length === 2) {
            return matches[1];
        }
        throw new Error("Invalid View Tasks Priority command format.");
    }
}