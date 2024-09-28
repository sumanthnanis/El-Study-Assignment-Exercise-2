import { Task } from '../models/Task';
import { TaskObserver } from '../observers/TaskObserver';

export class ScheduleManager {
    private static instance: ScheduleManager;
    private tasks: Task[] = [];
    private observers: TaskObserver[] = [];

    private constructor() {}

    public static getInstance(): ScheduleManager {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }

    public addObserver(observer: TaskObserver): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: TaskObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    private notifyObservers(message: string): void {
        this.observers.forEach(observer => observer.update(message));
    }

    public addTask(task: Task): void {
        if (this.isTaskConflict(task)) {
            const message = `Task conflicts with existing task: ${task.description}`;
            this.notifyObservers(message);
            throw new Error(message);
        }
        if (task.startTime >= task.endTime) {
            throw new Error("Start time must be before end time.");
        }
        this.tasks.push(task);
        this.notifyObservers(`New task added: ${task.description}`);
    }

    public removeTask(description: string): void {
        const index = this.tasks.findIndex(task => task.description === description);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.notifyObservers(`Task removed: ${description}`);
        } else {
            throw new Error("Task not found.");
        }
    }

    public viewTasks(): void {
        if (this.tasks.length === 0) {
            console.log("No tasks scheduled for the day.");
            return;
        }
        this.tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.tasks.forEach(task => {
            console.log(`${task.startTime} - ${task.endTime}: ${task.description} [${task.priority}]${task.completed ? ' (Completed)' : ''}`);
        });
    }

    public getTask(description: string): Task | undefined {
        return this.tasks.find(task => task.description === description);
    }

    public updateTask(oldDescription: string, updatedTask: Task): void {
        const index = this.tasks.findIndex(task => task.description === oldDescription);
        if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.notifyObservers(`Task updated: ${oldDescription} -> ${updatedTask.description}`);
        } else {
            throw new Error("Task not found.");
        }
    }

    public markTaskCompleted(description: string): void {
        const task = this.getTask(description);
        if (task) {
            task.completed = true;
            this.notifyObservers(`Task marked as completed: ${description}`);
        } else {
            throw new Error("Task not found.");
        }
    }

    public viewTasksByPriority(priority: string): void {
        const filteredTasks = this.tasks.filter(task => task.priority === priority);
        if (filteredTasks.length === 0) {
            console.log(`No tasks found with priority: ${priority}`);
        } else {
            filteredTasks.forEach(task => {
                console.log(`${task.startTime} - ${task.endTime}: ${task.description} [${task.priority}]${task.completed ? ' (Completed)' : ''}`);
            });
        }
    }

    public isTaskConflict(newTask: Task): boolean {
        return this.tasks.some(task => 
            (newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
            (newTask.endTime > task.startTime && newTask.endTime <= task.endTime) ||
            (newTask.startTime <= task.startTime && newTask.endTime >= task.endTime)
        );
    }
}