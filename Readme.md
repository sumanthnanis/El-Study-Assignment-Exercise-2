# Astronaut Schedule Organizer

The **Astronaut Schedule Organizer** is a console-based task scheduling application built with TypeScript. It helps users add, edit, remove, and view tasks with various priorities, while also supporting task completion tracking. This application leverages the Observer pattern to notify registered observers about changes in the schedule.

## Features

- **Add tasks** with a description, start time, end time, and priority.
- **Edit tasks** by updating the description, start time, end time, or priority.
- **Remove tasks** based on the description.
- **View all tasks** sorted by start time.
- **Mark tasks as completed**.
- **View tasks by priority** (e.g., High, Medium, Low).
- **Notify observers** when tasks are added, updated, removed, or completed.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sumanthnanis/El-Study-Assignment.git
    cd El-Study-Assignment
    ```

2. **Install dependencies:**

    Make sure you have Node.js installed. Then run:

    ```bash
    npm install
    ```

3. **Build the project:**

    Compile the TypeScript code:

    ```bash
    npm run build
    ```

4. **Run the application:**

    Start the application by running:

    ```bash
    npm start
    ```

## Usage

After starting the application, you will be greeted with the available commands. The following commands can be used to interact with the task manager:

### Commands

- **Add Task**: Adds a new task to the schedule.
  ```bash
  Add Task("description", "start time", "end time", "priority")
  ```
  Example:
  ```bash
  Add Task("Research on Mars surface", "09:00", "11:00", "High")
  ```

- **Remove Task**: Removes a task by its description.
  ```bash
  Remove Task("description")
  ```
  Example:
  ```bash
  Remove Task("Research on Mars surface")
  ```

- **View Tasks**: Displays all scheduled tasks sorted by time.
  ```bash
  View Tasks
  ```

- **Edit Task**: Edits a task by its description.
  ```bash
  Edit Task("description")
  ```
  Example:
  ```bash
  Edit Task("Research on Mars surface")
  ```
  Below is an example of the `Edit Task` flow:

```plaintext
Enter command: Edit Task("Research on Mars surface")
Enter new description (current: Buy groceries): Buy drinks
Enter new start time (current: 14:00, format HH:MM): 12:30
Enter new end time (current: 14:30, format HH:MM): 12:50
Enter new priority (current: Medium, options: Low, Medium, High): High
Observer notification: Task updated: Research on Mars surface

  ```
-   **Mark Task Completed**: Marks a task as completed by its description.
  ```bash
  Mark Task Completed("description")
  ```
  Example:
  ```bash
  Mark Task Completed("Research on Mars surface")
  ```

- **View Tasks Priority**: Views tasks by a specific priority (e.g., High, Medium, Low).
  ```bash
  View Tasks Priority("priority")
  ```
  Example:
  ```bash
  View Tasks Priority("High")
  ```

- **Exit the application**: Type `end` to quit the program.

## Observer Pattern

The application uses the **Observer pattern** to notify observers whenever tasks are added, updated, removed, or marked as completed. The `ConsoleObserver` is an implementation that logs these changes to the console.

## Project Structure

- `src/` - Contains the main application code.
  - `managers/` - Contains the `ScheduleManager` class responsible for managing tasks.
  - `observers/` - Contains the `TaskObserver` and `ConsoleObserver` for notifications.
  - `factories/` - Contains the `TaskFactory` class used to create new tasks.
  - `utils/` - Contains utility classes like `InputParser` to parse user inputs.
  - `AstronautScheduleApp.ts` - The main entry point for the application.
- `package.json` - Node.js project configuration.

## Task Validation

- **Time format**: Tasks must have start and end times in the `HH:MM` format.
- **Priority**: Tasks must have one of the following priorities: `High`, `Medium`, or `Low`.
- **Task Conflict**: Tasks cannot overlap in time with existing tasks.


---

Enjoy organizing your tasks with the **Astronaut Schedule Organizer**! 🚀

---

