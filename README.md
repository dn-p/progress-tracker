# Learning Goals Tracker

A comprehensive learning goals tracker built with Next.js, React, and Tailwind CSS. Track your learning progress with goals, tasks, progress analytics, and contribution heatmaps.

## Features

✅ **Multi-Goal Management** - Create and manage multiple learning goals simultaneously  
✅ **Task Management** - Add, edit, delete, and track individual tasks within goals  
✅ **Drag & Drop** - Reorder tasks easily with intuitive drag-and-drop interface  
✅ **Auto-Progress Calculation** - Progress automatically calculated based on completed tasks  
✅ **Daily Tracking** - Record progress daily with automatic history tracking  
✅ **Progress Charts** - View progress over 7 days, 4 weeks, or 12 months  
✅ **Contribution Heatmap** - GitHub-style heatmap showing activity over 16 weeks  
✅ **Streak Counter** - Track consecutive days of learning activity  
✅ **Local Storage** - All data persisted in browser, no backend needed  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/learning-goals-tracker.git
cd learning-goals-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

### Creating a Goal
1. Click the "+ Goal baru" button in the top-right
2. Enter a goal name (e.g., "Belajar React")
3. Click "Buat" to create the goal

### Managing Tasks
1. Click on a goal card to select it
2. Enter a task name in the input field
3. Click "+ Tambah" to add the task
4. Check the checkbox to mark a task as done
5. Drag tasks to reorder them
6. Click × to delete a task

### Viewing Progress
1. Click on the "Progress" tab
2. Use the range buttons to switch between 7 Days, 4 Weeks, or 12 Months
3. View your contribution heatmap below the chart
4. Stats show streak, best record, active days, and today's progress

## Project Structure

```
learning-goals-tracker/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── LearningGoalsApp.tsx
│   ├── TasksTab.tsx
│   ├── ProgressTab.tsx
│   ├── TaskCard.tsx
│   ├── GoalCard.tsx
│   ├── ProgressBar.tsx
│   ├── ProgressChart.tsx
│   ├── HeatmapChart.tsx
│   └── StatBox.tsx
├── store/
│   └── goalStore.ts      # Zustand state management
├── lib/
│   └── utils.ts          # Utility functions
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Local Storage

All data is automatically saved to your browser's localStorage under the key `goal-store`. This means:
- Your goals and tasks persist across browser sessions
- No account or backend server needed
- Data is stored locally on your device only

To clear all data, open browser DevTools → Application → Local Storage and delete the `goal-store` entry.

## Progress Calculation

- Progress is calculated as: (Completed Tasks / Total Tasks) × 100
- Each task has equal weight
- For example: 6 tasks = 16.67% per task; 5 tasks = 20% per task
- Progress updates immediately when you check/uncheck a task
- Daily progress is recorded in the history for charts and heatmap

## Statistics

- **Streak**: Number of consecutive days with at least 1% progress
- **Best Record**: Highest progress percentage achieved in a single day
- **Active Days**: Total number of days with recorded progress
- **Today's Progress**: Current day's progress percentage

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. Click "Deploy"

The app will be live on a Vercel URL. Each push to main will auto-deploy.

### Deploy to Netlify

1. Push your code to GitHub
2. Build the project: `npm run build`
3. Go to [Netlify](https://www.netlify.com)
4. Drag and drop the `.next/standalone` folder, or connect your Git repo
5. Set build command to `npm run build`

### Self-Hosted

1. Build the project: `npm run build`
2. Run the production server: `npm start`
3. Deploy to your server or VPS

## Development

### Available Scripts

```bash
npm run dev      # Start development server on :3000
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Adding New Features

1. Create new components in `components/`
2. Add new store actions in `store/goalStore.ts`
3. Add utility functions in `lib/utils.ts`
4. Use Tailwind CSS classes for styling
5. Test locally with `npm run dev`

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Roadmap

- [ ] Export data as JSON/CSV
- [ ] Import data from file
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] Cloud sync (optional)
- [ ] Sharing & collaboration
- [ ] Custom goal templates
- [ ] Goal analytics & insights

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for learners everywhere
