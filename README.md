# 🔥🍋 Sizzle & Zesty — India's Kids Cooking App

> India's first voice-guided cook-along app for children aged 7–16. Step-by-step recipes, animated chef characters, AI-powered help, and a mission to preserve India's culinary heritage.

---

## ✨ Features

### Core Cook-Along
- **87+ real recipes** with complete step-by-step instructions
- **Voice guidance** — say "Done!" or "Ho Gaya!" to advance steps hands-free
- **Animated chef characters** — Sizzle 🔥 (bold, street-smart) and Zesty 🍋 (sharp, elegant)
- **Safety gates** — adult confirmation required for fire/heat steps
- **Parent gate** — maths challenge before Chef Boss (fire) recipes

### AI-Powered Features
- 🤔 **"What does this mean?"** — AI explains any step in simple, fun language
- 😬 **"Oops! Fix it"** — AI rescues cooking disasters with specific steps
- 📣 **Cheerleader Mode** — encouraging voice narration as you cook
- 🧊 **Fridge-to-Recipe** — describe your fridge, get a custom family recipe

### Recipe Collections
- **87 cookable recipes** in the main app (with full guided steps)
- **117 additional recipes** in the Recipe Explorer (Solo/Team/Parent tiers)
- Categories: Indian Snacks, Chaat & Street Food, Comfort Bowls, Sweets, Drinks, Global, Build-Your-Own

### Gamification & Progress
- ⚔️ **Cooking Quest** — 10 badges, parent title progression ("Best Chef Dad/Mom 🏆")
- ⭐ **Power Levels** — Starter → Explorer → Chef Boss → Kitchen Survival
- 📸 **Memory Book** — photo diary with printable achievement certificates
- 🌍 **Recipe Explorer** — 157 recipes across Solo / Team Cook / Parent Leads tiers

### Quick Access
- ⚡ **30-Min Recipes** — curated weeknight meals, always under 30 minutes
- 🌍 **Recipe Browser** — filter by cuisine, diet, level, with search
- 🌶️ **Street Food filter** — all chaat and Indian street food
- ❄️ **No-Cook filter** — everything kids can make without fire

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/sizzle-zesty.git
cd sizzle-zesty

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your Anthropic API key (optional — app works without it)

# 4. Start development server
npm run dev
# App opens at http://localhost:3000
```

### Build for Production

```bash
npm run build
# Output goes to dist/
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_ANTHROPIC_API_KEY` | Optional | Enables AI features (step explanations, recipe rescue, fridge-to-recipe). Get yours at [console.anthropic.com](https://console.anthropic.com) |

The app runs fully without an API key — all AI features gracefully fall back to silent no-ops.

> ⚠️ **Security note:** This app calls the Anthropic API directly from the browser. This is fine for development and personal use, but for a production app with real users you should proxy API calls through a backend server so your key is never exposed.

---

## 📁 Project Structure

```
sizzle-zesty/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global reset styles
│   └── App.jsx           # Complete application (single file)
├── .env.example          # Environment variable template
├── .gitignore
├── index.html            # Vite HTML entry
├── netlify.toml          # Netlify deployment config
├── package.json
├── README.md
└── vite.config.js
```

### Why a single App.jsx?

The entire app lives in one file by design — making it easy to run as a Claude artifact, copy-paste into any React environment, and deploy instantly. For a production team this would be split into separate component files.

---

## 🚢 Deployment

### Deploy to Netlify (Recommended — free tier)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Connect your GitHub repo
4. Build command: `npm run build` · Publish directory: `dist`
5. Add environment variable: `VITE_ANTHROPIC_API_KEY` = your key
6. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/sizzle-zesty)

### Deploy to Vercel (also free)

```bash
npm install -g vercel
vercel
# Follow the prompts — it auto-detects Vite
```

Or connect the GitHub repo at [vercel.com](https://vercel.com) and set the `VITE_ANTHROPIC_API_KEY` environment variable in project settings.

---

## 🍳 Recipe Database

| Category | Count | Notes |
|---|---|---|
| Main RECIPES (cookable) | 87 | Full step-by-step guided cook-along |
| Solo Explorer (no-cook) | 117 | Browse only in Recipe Explorer tab |
| Team Cook | 25 | Kid + adult together |
| Parent Leads | 15 | Parent cooks, kid assists |
| **Total** | **244** | |

### Cuisine coverage
- 🇮🇳 North Indian, South Indian, Gujarati, Maharashtrian, Punjabi, Kerala, Mumbai Street Food
- 🌍 Italian, French, Mexican, Greek, Japanese, Thai, Korean, Vietnamese, Lebanese, Spanish, American

### Dietary filters
- 🌿 Vegetarian · 🍗 Non-Veg · ❄️ No-Cook · 🌶️ Street Food

---

## 🛡️ Safety Features

- **Parent gate** on Chef Boss recipes — maths problem must be solved before proceeding
- **Safety steps** (🔥 ADULT STEP) require adult confirmation before advancing
- **No ads** shown to children — ever
- **COPPA-friendly** design — no social features for children, memory book is private

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Adding New Recipes

Recipes are defined in the `RECIPES` array in `src/App.jsx`. Each recipe follows this structure:

```js
{
  id: 88,                          // Unique number
  name: "Recipe Name",
  hindi: "हिंदी नाम",              // Hindi name
  emoji: "🍛",
  cuisine: "North Indian",
  diet: "veg",                     // "veg" or "non-veg"
  level: "starter",                // "starter" | "explorer" | "boss" | "survival"
  section: "kids",                 // "kids" | "college" | "special-*"
  time: "15 mins",
  badge: "Badge Name 🏅",
  tags: ["snack", "indian", "no-cook"],
  desc: "Short description",
  ingredients: ["item 1", "item 2"],
  steps: [
    { safety: false, text: "Step instruction shown on screen and spoken aloud" },
    { safety: true,  text: "GROWN-UP — step requiring adult" },
  ],
}
```

---

## 📱 Browser Compatibility

| Feature | Chrome | Safari | Firefox | Samsung Internet |
|---|---|---|---|---|
| Core app | ✅ | ✅ | ✅ | ✅ |
| Voice narration (TTS) | ✅ | ✅ | ✅ | ✅ |
| Voice input ("Done!") | ✅ | ✅ | ⚠️ Limited | ✅ |
| AI features | ✅ | ✅ | ✅ | ✅ |

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built with ❤️ for India's 250 million school-going children — and their grandparents.*
