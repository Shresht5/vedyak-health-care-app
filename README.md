# Vedyak Health Care App
A React Native mobile application designed to manage medication tracking and health data for patients.

## 🧭 At a Glance
- **What it is:** A cross-platform mobile health management tool.
- **What problem it solves:** Simplifies medication adherence and health record keeping through local persistence.
- **Who uses it:** Patients needing a reliable way to track daily medication schedules.
- **Complexity level:** Intermediate.
- **Best way to explore:** Start with `App.tsx` to see the initialization, then examine `src/services/db/MedicationDB.ts` for data logic.

## 💡 Why This Exists
Managing health data often requires complex, cloud-dependent software that lacks privacy or offline reliability. This project provides a lightweight, mobile-first solution that keeps health data local to the device.

The insight here is the use of SQLite for structured data storage, allowing for robust querying of medication schedules without requiring a persistent internet connection. It prioritizes data sovereignty and speed.

It fits into the mobile health (mHealth) ecosystem as a foundational template for developers building personal health assistants, focusing on local-first architecture rather than cloud-syncing overhead.

## ✨ Key Features
- **SQLite Persistence** — Uses `react-native-sqlite-storage` to ensure medication data remains available offline.
- **Navigation Stack** — Implements `react-navigation` for a fluid, native-like transition between health screens.
- **Media Integration** — Leverages `react-native-image-picker` to allow users to attach visual records to health logs.
- **Local Notifications** — Uses `@notifee/react-native` to trigger timely medication reminders.
- **Date Management** — Integrates `react-native-date-picker` for intuitive scheduling of health events.

## 🏗️ Core Architecture
- **System Design Pattern**: Monolithic Mobile Architecture (all application logic, navigation, and data access layers reside within a single repository).
- **Data Flow**: User Input (UI) → Service Layer (`src/services/db/MedicationDB.ts`) → SQLite Storage → State Update → Re-render.
- **Key Abstractions**: The `MedicationDB` service acts as the primary data access object (DAO), abstracting raw SQL queries from the UI components.
- **Boundaries & Seams**: The `src/utils/ApiCall.ts` module provides a seam for future integration with external health APIs, currently acting as a placeholder for network requests.

## 🛠️ Tech Stack
- **Languages & Frameworks:** TypeScript, React Native 0.83.1, React 19.2.0.
- **Build & Tooling:** Metro Bundler, Babel, ESLint, Prettier, Jest.
- **Infrastructure:** CocoaPods (iOS), Gradle (Android).
- **External Runtime Requirements:** Node.js (LTS), Android SDK, Xcode (for iOS builds).

## 📦 Critical Dependencies
- `react-native-sqlite-storage` — The backbone of the app; provides the local database engine required for storing medication records.
- `@react-navigation/native` — Manages the application's routing state; essential for the multi-screen user experience.
- `@notifee/react-native` — Handles the background notification system; critical for the app's core value proposition of medication reminders.

## 🗂️ Project Structure
```text
/__tests__          → Jest unit tests for component verification
/.bundle            → Ruby bundler configuration for iOS dependencies
/android            → Native Android project files and Gradle configuration
/ios                → Native iOS project files and CocoaPods configuration
/src                → Core application source code
  /components       → Reusable UI primitives (e.g., AddButton)
  /navigation       → Routing logic and stack definitions
  /screens          → View-level components (e.g., Home)
  /services         → Data persistence and business logic
  /utils            → Helper functions and network wrappers
/App.tsx            → Root entry point and provider wrapper
/index.js           → App registration entry point for the React Native engine
```
*Mental Map: To understand this project, think of it as a local-first CRUD application where the database is the source of truth.*

## 🔍 Where to Start Reading

**For engineers:**
- `App.tsx` — *The entry point that initializes the navigation container and global providers.*
- `src/Main.tsx` — *The central layout hub that orchestrates the primary application view.*
- `src/navigation/MainNavigation.tsx` — *The routing map that defines how users traverse the app.*

**For learners:**
- `src/components/button/AddButton.tsx` — *A simple, reusable component that teaches basic React Native styling and event handling.*
- `src/screens/Home.tsx` — *Demonstrates how to fetch data from a service and render it in a list.*
- `README.md` — *Provides the essential commands to get the environment running.*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Watchman
- Android Studio / Xcode
- Ruby (for CocoaPods)

### Setup
```bash
# Install dependencies
npm install
# Install iOS native dependencies
bundle install
bundle exec pod install
# Start the Metro bundler
npm start
```

### Verify It's Working
Run `npm run android` or `npm run ios`. You should see the default React Native splash screen or the Home screen if already implemented.

## 🤝 How to Contribute

**Jump right in:**
- [Open in GitHub Codespaces](https://codespaces.new/Shresht5/vedyak-health-care-app)

**Contribution path for first-timers:**
1. Improve documentation in `README.md`.
2. Add unit tests in `__tests__/` for existing utility functions.
3. A good PR includes a clear description of the feature or bug fix and updated test coverage.

**Testing & linting before you push:**
```bash
npm run lint
npm test
```

## 🐛 Active Good First Issues
None currently open.

## 📚 What You'll Learn
- **Local Data Persistence:** How to manage an SQLite database in a mobile environment.
- **Navigation Patterns:** Implementing complex navigation stacks in React Native.
- **Native Integration:** Bridging JavaScript logic with native iOS/Android notification and storage APIs.

## 🤖 Machine-Readable Metadata [AI-READABLE]
```yaml
repo: Shresht5/vedyak-health-care-app
description: "Medication tracking and health management application."
stars: 0
forks: 0
open_issues: 0
language: "TypeScript"
license: "none"
architecture_pattern: "Monolithic Mobile"
entry_point: "App.tsx"
external_dependencies_required: true
test_command: "npm test"
ci_present: false
```

## 📊 Quick Stats [AI-READABLE]
| Metric | Value |
|--------|-------|
| ⭐ Stars | 0 |
| 🍴 Forks | 0 |
| 🐛 Open Issues & PRs | 0 |
| 💬 Primary Language | TypeScript |
| ⚖️ License | N/A |