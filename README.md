# LearnForge — Learn by Doing 🚀

Welcome to **LearnForge**, a developer-focused learning platform for documenting the journey of learning, building, and creating.

LearnForge brings structured learning notes, technical blogs, real-world projects, useful resources, and personal learning experiences together in one open knowledge platform. The goal is simple: turn concepts into practical work and share the journey as it happens.

---

## 💡 Why LearnForge?

Learning becomes more useful when it is connected to something you can build. LearnForge is designed to make that process visible and reusable through:

✅ Course-wise learning notes

✅ Topic-level explanations written from practical experience

✅ Technical blogs and experiences from the learning journey

✅ Real-world projects that turn theory into practice

✅ Curated resources for continued learning

✅ An open record of progress, experiments, and lessons learned

---

## 🧭 Platform Sections

| Section          | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| 📚 **Learning**  | Structured notes organized by course, chapter, and topic    |
| ✍️ **Blogs**     | Technical writing and experiences from the learning journey |
| 🛠️ **Projects**  | Practical projects built while learning new concepts        |
| 🔗 **Resources** | Useful tools, references, and learning material             |

---

## 🛠️ Technology Stack

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| Frontend         | Next.js, React, TypeScript |
| Styling          | TailwindCSS                |
| Icons            | React Icons                |
| Backend          | Node.js, NestJS            |
| Database         | PostgreSQL                 |
| Database plugin  | Sequelize                  |
| Monorepo tooling | Nx                         |
| Package manager  | pnpm                       |

The current web application lives in `apps/web`, while the workspace is organized to support shared packages and future platform services.

---

## 🗂️ Monorepo Structure

```text
LearnForge/
├── apps/
│   └── web/                       # Next.js web application
│       ├── app/                   # App Router pages and routes
│       ├── public/                # Static assets and learning images
│       └── views/                 # Components, contexts, learning data, and utilities
├── packages/
│   ├── async/                     # Async utility package
│   ├── colors/                    # Color utility package
│   ├── strings/                   # String utility package
│   └── utils/                     # Shared utility package
├── .husky/                        # Git pre-commit and pre-push hooks
├── nx.json                        # Nx workspace configuration
├── package.json                   # Workspace scripts and dependencies
├── pnpm-workspace.yaml            # pnpm workspace configuration
└── tsconfig.base.json             # Shared TypeScript configuration
```

---

## 🚀 Development Setup

### Prerequisites

- Node.js
- pnpm

### Install dependencies

```bash
git clone https://github.com/omjpatel586/LearnForge.git
cd LearnForge
pnpm install
```

### Run the web application

```bash
pnpm nx serve web
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Useful commands

```bash
# Explore projects in the workspace
pnpm nx show projects

# Run type checking for the web app
pnpm nx run web:typecheck

# Build the web app
pnpm nx build web

# Run tasks for affected projects
pnpm nx affected -t build

# View the Nx project graph
pnpm nx graph
```

---

## 🧪 Git Hooks

LearnForge uses Husky to keep changes checked before they are shared:

- **Pre-commit:** When you commit it will run oxlint for all your affected changes in each app and it is faster than eslint.
- **Pre-push:** When you push in your branch then it runs typecheck and build on your affected changes in each app using typescript stable version ( using golang ) for faster compilation of typescript.

The hooks are installed automatically through the root `prepare` script after `pnpm install`.

---

## 🤝 Contributing

Contributions, ideas, corrections, and learning notes, write your blogs are welcome.

1. Fork the repository.
2. Create a feature or hotfix branch: `git switch -c feature/my-feature`.
3. Make and verify your changes.
4. Commit your changes: `git commit -m "Describe the change"`.
5. Push the branch: `git push origin feature/my-feature`.
6. Open a pull request.

---

## 🔗 Let's Connect

- [LearnForge on GitHub](https://github.com/omjpatel586/LearnForge)
- [LearnForge on Portfolio](https://www.omjpatel.dev)
- [Om J Patel on LinkedIn](https://www.linkedin.com/in/om-j-patel/)

LearnForge is an evolving platform. New chapters, topics, projects, and notes will be added as the learning journey continues.
