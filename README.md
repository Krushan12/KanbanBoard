# Kanban Board Project

A dynamic Kanban board application built with React and @dnd-kit, featuring drag-and-drop functionality, task management, and priority filtering.

## Features

### Core Functionality
- Drag-and-drop task management across columns
- Reorder tasks within columns
- Priority-based task filtering
- Responsive design with Tailwind CSS

### Task Management
- Create, edit, and delete tasks
- Set task priorities (High, Medium, Low)
- Assign tasks to team members
- Set due dates
- Add task descriptions

### Board Organization
- Three default columns: To-Do, In Progress, Done
- Priority view mode (High, Medium, Low Priority columns)
- Collapsible sidebar for better space utilization
- Persistent storage using localStorage

## Technologies Used

- React.js
- @dnd-kit (Drag and Drop toolkit)
- Tailwind CSS
- localStorage for data persistence

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kanban-board.git
```

2. Navigate to the project directory:
```bash
cd kanban-board
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or your configured port).

## Dependencies

```json
{
  "@dnd-kit/core": "^6.0.0",
  "@dnd-kit/sortable": "^7.0.0",
  "@dnd-kit/utilities": "^3.2.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0"
}
```

## Usage

### Creating a Task
1. Click the "Add Task" button in any column
2. Fill in the task details:
   - Title (required)
   - Description
   - Priority level
   - Assignee
   - Due date
3. Click "Save Task" to create the task

### Managing Tasks
- **Move Tasks**: Drag and drop tasks between columns
- **Reorder Tasks**: Drag tasks within a column to reorder them
- **Edit Tasks**: Click the edit icon to modify task details
- **Delete Tasks**: Click the delete icon to remove a task

### Filtering Tasks
1. Click the filter icon in the sidebar
2. Tasks will be reorganized by priority level
3. Click again to return to status-based view

### Sidebar Features
- Toggle sidebar expansion/collapse
- Switch between status and priority views
- Add new projects
- Access settings

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.jsx
│   ├── Column.jsx
│   ├── Task.jsx
│   ├── SortableTask.jsx
│   └── SideBar.jsx
├── utils/
│   └── data.js
└── App.jsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Screenshots

![Kanban Board](screenshots/kanban-board.png)
*Main view of the Kanban board with tasks*

![Priority View](screenshots/priority-view.png)
*Priority-based view of tasks*

## Future Enhancements

- User authentication and authorization
- Multiple board support
- Custom column creation
- Task labels and categories
- Task search and filtering
- Activity logging
- Team collaboration features
- Dark mode support

## Acknowledgments

- [@dnd-kit](https://github.com/clauderic/dnd-kit) for the drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [React](https://reactjs.org/) for the UI framework

---
Made with ❤️ and React