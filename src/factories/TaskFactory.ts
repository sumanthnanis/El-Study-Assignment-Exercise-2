import { Task } from '../models/Task';

export class TaskFactory {
    public static createTask(description: string, startTime: string, endTime: string, priority: string): Task {
        if (!this.isValidTime(startTime) || !this.isValidTime(endTime)) {
            throw new Error("Invalid time format. Use HH:MM format.");
        }
        if (!this.isValidPriority(priority)) {
            throw new Error("Invalid priority. Use 'High', 'Medium', or 'Low'.");
        }
        if (description.trim().length === 0) {
            throw new Error("Task description cannot be empty.");
        }
        return new Task(description.trim(), startTime, endTime, priority);
    }

    private static isValidTime(time: string): boolean {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(time);
    }

    private static isValidPriority(priority: string): boolean {
        return ['High', 'Medium', 'Low'].includes(priority);
    }
}

