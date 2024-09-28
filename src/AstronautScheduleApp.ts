import { ScheduleManager } from './managers/ScheduleManager';
import { TaskFactory } from './factories/TaskFactory';
import { TaskObserver, ConsoleObserver } from './observers/TaskObserver';
import { InputParser } from './utils/InputParser';
import * as readline from 'readline';

export class AstronautScheduleApp {
    private scheduleManager: ScheduleManager;
    private observer: TaskObserver;
    private rl: readline.Interface;

    constructor() {
        this.scheduleManager = ScheduleManager.getInstance();
        this.observer = new ConsoleObserver();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public run(): void {
        console.log("Welcome to Astronaut Schedule Organizer!");
        this.displayMenu();
        this.processUserInput();
    }

    private displayMenu(): void {
        console.log("\nAvailable commands:");
        console.log("1. Add Task(\"description\", \"start time\", \"end time\", \"priority\")");
        console.log("2. Remove Task(\"description\")");
        console.log("3. View Tasks");
        console.log("4. Edit Task(\"description\")");
        console.log("5. Mark Task Completed(\"description\")");
        console.log("6. View Tasks Priority(\"priority\")");
        console.log("Type 'end' to exit the program.");
    }

    private processUserInput(): void {
        this.rl.question("Enter command: ", (input) => {
            if (input.toLowerCase() === 'end') {
                console.log("Thank you for using Astronaut Schedule Organizer. Goodbye!");
                this.rl.close();
                return;
            }

            try {
                if (input.startsWith("Add Task")) {
                    this.handleAddTask(input);
                } else if (input.startsWith("Remove Task")) {
                    this.handleRemoveTask(input);
                } else if (input === "View Tasks") {
                    this.scheduleManager.viewTasks();
                } else if (input.startsWith("Edit Task")) {
                    this.handleEditTask(input);
                    return; 
                } else if (input.startsWith("Mark Task Completed")) {
                    this.handleMarkTaskCompleted(input);
                } else if (input.startsWith("View Tasks Priority")) {
                    this.handleViewTasksPriority(input);
                } else {
                    console.log("Invalid command. Please try again.");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Error: ${error.message}`);
                } else {
                    console.error('An unknown error occurred');
                }
            }

            if (!input.startsWith("Edit Task")) {
                this.displayMenu();
                this.processUserInput();
            }
        });
    }

    private handleAddTask(input: string): void {
        const { description, startTime, endTime, priority } = InputParser.parseAddTask(input);
        const task = TaskFactory.createTask(description, startTime, endTime, priority);
        this.scheduleManager.addTask(task);
        this.observer.update(`New task added: ${description}`);
    }

    private handleRemoveTask(input: string): void {
        const description = InputParser.parseRemoveTask(input);
        this.scheduleManager.removeTask(description);
        this.observer.update(`Task removed: ${description}`);
    }

    private handleEditTask(input: string): void {
        const description = InputParser.parseEditTask(input);
        this.editTask(description);
    }

    private editTask(description: string): void {
        const task = this.scheduleManager.getTask(description);
        if (!task) {
            console.log("Task not found.");
            this.displayMenu();
            this.processUserInput();
            return;
        }
    
        const promptWithValidation = (question: string, validator: (input: string) => boolean, errorMessage: string): Promise<string> => {
            return new Promise((resolve) => {
                const prompt = () => {
                    this.rl.question(question, (input) => {
                        if (input === '' || validator(input)) {
                            resolve(input);
                        } else {
                            console.log(errorMessage);
                            prompt();
                        }
                    });
                };
                prompt();
            });
        };
    
        const timeValidator = TaskFactory['isValidTime'];
        const priorityValidator = TaskFactory['isValidPriority'];
    
        (async () => {
            let newDescription = await promptWithValidation(
                `Enter new description (current: ${task.description}): `,
                (input) => input.trim().length > 0,
                'Description cannot be empty.'
            );
            newDescription = newDescription || task.description;
    
            let newStartTime = await promptWithValidation(
                `Enter new start time (current: ${task.startTime}, format HH:MM): `,
                timeValidator,
                'Invalid time format. Please use HH:MM format.'
            );
            newStartTime = newStartTime || task.startTime;
    
            let newEndTime;
            do {
                newEndTime = await promptWithValidation(
                    `Enter new end time (current: ${task.endTime}, format HH:MM): `,
                    timeValidator,
                    'Invalid time format. Please use HH:MM format.'
                );
                newEndTime = newEndTime || task.endTime;
    
                if (newEndTime <= newStartTime) {
                    console.log('End time must be after start time. Please try again.');
                }
            } while (newEndTime <= newStartTime);
    
            let newPriority = await promptWithValidation(
                `Enter new priority (current: ${task.priority}, options: Low, Medium, High): `,
                priorityValidator,
                'Invalid priority. Please enter Low, Medium, or High.'
            );
            newPriority = newPriority || task.priority;
    
            try {
                const updatedTask = TaskFactory.createTask(newDescription, newStartTime, newEndTime, newPriority);
                if (this.scheduleManager.isTaskConflict(updatedTask) && updatedTask.description !== description) {
                    console.log("The updated task conflicts with an existing task. Please choose different times.");
                    this.editTask(description);
                    return;
                }
                this.scheduleManager.updateTask(description, updatedTask);
                this.observer.update(`Task updated: ${description}`);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Error: ${error.message}`);
                } else {
                    console.error('An unknown error occurred');
                }
            }
    
            this.displayMenu();
            this.processUserInput();
        })();
    }

    private handleMarkTaskCompleted(input: string): void {
        const description = InputParser.parseMarkTaskCompleted(input);
        this.scheduleManager.markTaskCompleted(description);
        this.observer.update(`Task marked as completed: ${description}`);
    }

    private handleViewTasksPriority(input: string): void {
        const priority = InputParser.parseViewTasksPriority(input);
        this.scheduleManager.viewTasksByPriority(priority);
    }
}