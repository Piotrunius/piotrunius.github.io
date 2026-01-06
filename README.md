# Piotrunius Personal Website

[![Production Deploy](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/main.yml/badge.svg)](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/main.yml)
[![Development Deploy](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/dev.yml/badge.svg)](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/dev.yml)
[![CodeQL](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/codeql.yml)
[![Health Check](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/health-check.yml/badge.svg)](https://github.com/Piotrunius/piotrunius.github.io/actions/workflows/health-check.yml)

Personal portfolio and bio website with advanced CI/CD pipeline.

🌐 **Live Site:** [piotrunius.github.io](https://piotrunius.github.io)

## ✨ Features

- 🎨 Modern, responsive design with dark/light mode
- 🎵 Spotify integration for real-time music status
- 🎮 Steam profile integration
- 💬 Discord status display
- 📊 Live GitHub activity feed
- 🚀 Progressive Web App (PWA) support
- 🔄 Automatic data updates every 15 minutes
- 🎭 Custom background animations
- 📱 Mobile-first responsive design

## 🏗️ CI/CD System

This project features an advanced CI/CD system with:

### 🔄 Automated Workflows

- **Production Deployment** - Automatic deployment to GitHub Pages on merge to `main`
- **Development Deployment** - Separate dev environment on `dev` branch
- **Feature Branch CI** - Automated testing and validation for feature branches
- **Security Scanning** - Trivy, CodeQL, and npm audit integration
- **Performance Monitoring** - Lighthouse CI and uptime checks
- **Dependency Management** - Daily vulnerability scans and update checks
- **Release Automation** - Automatic changelog generation and version tagging

### 🧪 Quality Assurance

- HTML/CSS/JS validation and linting
- Accessibility testing (WCAG 2.0 AA)
- Link checking
- Performance budgets
- Security vulnerability scanning
- Code quality analysis

### 📊 Monitoring

- Hourly uptime monitoring
- Performance metrics tracking
- Security alert notifications
- Automatic issue creation for critical problems

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Piotrunius/piotrunius.github.io.git
cd piotrunius.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linters
npm run lint

# Build for production
npm run build
```

### Environment Variables

Optional environment variables for data fetching:

```bash
GITHUB_TOKEN=your_github_token
STEAM_API_KEY=your_steam_api_key
STEAM_ID64=your_steam_id64
```

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── main.yml        # Production deployment
│       ├── dev.yml         # Development deployment
│       ├── feature.yml     # Feature branch CI
│       ├── health-check.yml # Monitoring
│       ├── release.yml     # Release automation
│       ├── cleanup.yml     # Branch cleanup
│       ├── codeql.yml      # Security analysis
│       └── dependencies.yml # Dependency management
├── assets/                 # Images, fonts, and media
├── data/                   # Dynamic data (auto-generated)
│   ├── github-stats.json   # GitHub statistics
│   └── steam-status.json   # Steam profile data
├── docs/                   # Documentation
│   ├── CI-CD.md           # Full CI/CD documentation
│   └── CI-CD-QUICK-START.md # Quick start guide
├── index.html             # Main HTML file
├── styles.css             # Styles
├── app.js                 # Application logic
├── sw.js                  # Service worker (PWA)
├── manifest.json          # Web app manifest
├── package.json           # Dependencies and scripts
├── lighthouserc.js        # Lighthouse CI config
└── .eslintrc.json         # ESLint configuration
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.eslintrc.json` | JavaScript linting rules |
| `.stylelintrc.json` | CSS linting rules |
| `.htmlvalidate.json` | HTML validation rules |
| `.pa11yci.json` | Accessibility testing config |
| `lighthouserc.js` | Performance testing config |
| `.gitignore` | Git ignore patterns |

## 🌿 Branch Strategy

```
main (production)
├── dev (development)
│   ├── feature/new-feature
│   ├── bugfix/fix-issue
│   └── hotfix/critical-fix
```

### Workflow

1. Create feature branch from `dev`
2. Develop and test locally
3. Push and create PR to `dev`
4. Automated checks run
5. Review and merge to `dev`
6. Test in dev environment
7. Create PR from `dev` to `main`
8. Deploy to production

## 🧪 Testing

```bash
# Run all tests
npm test

# Individual test suites
npm run test:html          # HTML validation
npm run test:css           # CSS validation
npm run test:links         # Link checking
npm run test:a11y          # Accessibility tests
npm run test:lighthouse    # Performance tests
```

## 🔒 Security

- **Vulnerability Scanning**: Daily automated scans with Trivy and npm audit
- **CodeQL Analysis**: Weekly static code analysis
- **Dependency Updates**: Automated monitoring and alerts
- **Security Headers**: Verification and recommendations
- **Access Control**: Branch protection and required reviews

## 📊 Monitoring & Analytics

- **Uptime Monitoring**: Hourly health checks with automatic alerting
- **Performance Tracking**: Lighthouse CI integration
- **Security Monitoring**: Vulnerability scanning and alerts
- **Analytics**: Umami analytics integration

## 🚀 Deployment

### Automatic Deployment

- **Production**: Automatic on merge to `main`
- **Development**: Automatic on push to `dev`
- **Feature Branches**: No automatic deployment (testing only)

### Manual Deployment

```bash
# Trigger production deployment
gh workflow run main.yml

# Trigger dev deployment
gh workflow run dev.yml
```

### Rollback

```bash
# Quick rollback via revert
git revert <commit-hash>
git push origin main

# Emergency rollback (use with caution)
git reset --hard <commit-hash>
git push --force origin main
```

## 📦 Release Process

### Automatic Releases

1. Create and push a version tag:
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

2. GitHub Actions automatically:
   - Generates changelog
   - Creates GitHub Release
   - Updates CHANGELOG.md
   - Publishes release notes

### Manual Release

```bash
gh workflow run release.yml -f version=1.0.0
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build all assets |
| `npm run build:css` | Compile SCSS to CSS |
| `npm run build:js` | Minify JavaScript |
| `npm run optimize:images` | Optimize images |
| `npm test` | Run all tests |
| `npm run lint` | Run all linters |
| `npm run dev` | Start dev server |
| `npm run clean` | Clean build artifacts |

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [docs/CI-CD-QUICK-START.md](docs/CI-CD-QUICK-START.md) for detailed workflow.

## 🐛 Bug Reports

Found a bug? Please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub Pages for hosting
- GitHub Actions for CI/CD
- Umami for privacy-friendly analytics
- Font Awesome for icons
- Spotify & Steam for API integrations

## 📚 Documentation

- **[CI/CD Quick Start](docs/CI-CD-QUICK-START.md)** - Get started with the CI/CD system
- **[Full CI/CD Docs](docs/CI-CD.md)** - Comprehensive CI/CD documentation
- **[Workflows](/.github/workflows/)** - Workflow configuration files

## 📞 Contact

- **Website**: [piotrunius.github.io](https://piotrunius.github.io)
- **GitHub**: [@Piotrunius](https://github.com/Piotrunius)
- **Email**: piotrunius.v2@gmail.com

---

**Status**: 🟢 Active Development  
**Version**: 1.0.0  
**Last Updated**: 2026-01-06

Made with ❤️ by Piotrunius
