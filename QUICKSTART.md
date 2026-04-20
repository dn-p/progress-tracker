# Quick Start Guide - Learning Goals Tracker

Get the Learning Goals Tracker running in 5 minutes! 🚀

## Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

## Installation & Setup

### 1. Clone or Download the Project

```bash
# Option A: Clone from GitHub
git clone https://github.com/YOUR_USERNAME/learning-goals-tracker.git
cd learning-goals-tracker

# Option B: If you have the files locally
cd /path/to/learning-goals-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js
- React
- Zustand (state management)
- Tailwind CSS
- TypeScript

Takes about 1-2 minutes. ☕

### 3. Run Development Server

```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

### 4. Open in Browser

Go to **http://localhost:3000** and you should see the app! 🎉

## First Time Using the App

### Create Your First Goal

1. Click the **"+ Goal baru"** button (top-right)
2. Enter a goal name: `Belajar React`
3. Click **"Buat"**

### Add Some Tasks

1. The goal card appears in the grid
2. Click on it to select
3. Type a task: `Pahami JSX dan Components`
4. Press Enter or click **"+ Tambah"**
5. Repeat to add more tasks

### Track Progress

1. Check the checkbox next to a task to mark it done
2. Progress bar updates automatically
3. Each task = equal percentage (auto-calculated)

### View Analytics

1. Click the **"Progress"** tab
2. See charts for the last 7 days
3. Scroll down to see contribution heatmap
4. Try changing the time range (7 Days, 4 Weeks, 12 Months)

## Common Tasks

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Check Code with Linter
```bash
npm run lint
```

### Stop the Server
Press `Ctrl+C` in terminal

## Project Structure Explained

```
learning-goals-tracker/
│
├── app/                  # Next.js pages & layout
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root HTML structure
│   └── globals.css      # Global styles
│
├── components/          # React components
│   ├── LearningGoalsApp.tsx  # Main app
│   ├── TasksTab.tsx     # Task management
│   ├── ProgressTab.tsx  # Charts & heatmap
│   └── ...other components
│
├── store/              # State management
│   └── goalStore.ts    # Zustand store
│
├── lib/                # Utility functions
│   └── utils.ts        # Helpers (calc, date, etc)
│
├── types/              # TypeScript types
│   └── api.ts          # API types
│
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── tailwind.config.js  # Tailwind CSS config
```

## Understanding the App

### State Management (Zustand)

All data is managed in `store/goalStore.ts`:
- Goals, tasks, and history
- Auto-saved to browser localStorage
- No backend server needed

```typescript
// Example: Create a goal
const { addGoal } = useGoalStore()
addGoal('Belajar React')
```

### Components

Each component is self-contained:
- **LearningGoalsApp** - Main container
- **GoalCard** - Goal display
- **TaskCard** - Task with checkbox
- **ProgressChart** - Bar chart
- **HeatmapChart** - Contribution heatmap

### Styling

Uses Tailwind CSS:
- No CSS files to edit (except globals.css)
- Everything uses Tailwind classes
- Colors defined in tailwind.config.js

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Add task (when input focused) |
| `Enter` | Create goal (when modal input focused) |
| `Drag` | Reorder tasks |
| `Click ×` | Delete task/goal |

## Troubleshooting

### Error: "Port 3000 already in use"

```bash
# Use different port
npm run dev -- -p 3001
```

### Error: "Cannot find module"

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### App looks broken/no styles

```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run dev
```

### Data disappeared

- Check localStorage: Dev Tools → Application → Local Storage → `goal-store`
- If empty, data was cleared (or using private browsing mode)

## What's Next?

### Learn More About

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zustand**: https://github.com/pmndrs/zustand

### Deploy Your App

See `GITHUB_SETUP.md` for:
1. Push to GitHub
2. Deploy to Vercel (free!)
3. Get live URL

### Customize the App

1. **Change colors**: `tailwind.config.js`
2. **Modify layout**: Components in `components/`
3. **Add features**: Extend `store/goalStore.ts`

### Build Upon This

Future features you could add:
- [ ] Dark mode
- [ ] Export to CSV
- [ ] Import data from file
- [ ] Goal templates
- [ ] Share goals with friends
- [ ] Notifications
- [ ] Mobile app

## Tips for Success

1. **Practice with the app first** before modifying code
2. **Read component files** to understand how it works
3. **Check browser console** (Dev Tools) for errors
4. **Use Ctrl+Shift+I** (or Cmd+Option+I on Mac) to open Dev Tools
5. **Restart dev server** if something feels broken

## Getting Help

- Check error messages in terminal
- Look at browser console (F12)
- Read the code comments
- Check GitHub issues

## Have Fun! 🎉

This is YOUR learning tracker. Make it yours:
- Customize colors
- Add your own learning goals
- Share with friends
- Track your progress

Happy learning! 📚
