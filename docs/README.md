# Advanced CI/CD Configuration

This directory contains comprehensive documentation for the CI/CD system implemented in this repository.

## 📚 Documentation

- **[CI-CD-QUICK-START.md](./CI-CD-QUICK-START.md)** - Quick start guide for developers
- **[CI-CD.md](./CI-CD.md)** - Complete CI/CD system documentation (to be created)

## 🚀 Overview

The CI/CD system provides:

- **Automated Testing**: HTML/CSS validation, link checking, accessibility testing
- **Security Scanning**: Trivy, CodeQL, npm audit
- **Performance Monitoring**: Lighthouse CI, uptime checks
- **Automated Deployment**: Production, development, and feature environments
- **Quality Assurance**: Linting, code quality checks
- **Release Management**: Automatic changelog generation, version tagging
- **Monitoring**: Health checks, performance metrics, security alerts

## 🔧 Workflows

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| `main.yml` | Production deployment | Push to main, schedule, manual |
| `dev.yml` | Development deployment | Push to dev, PR to dev |
| `feature.yml` | Feature branch CI | Push to feature/*, PR |
| `health-check.yml` | Monitoring | Hourly, manual |
| `release.yml` | Release management | Tag push, manual |
| `cleanup.yml` | Branch cleanup | PR closed, manual |
| `codeql.yml` | Security analysis | Push, PR, weekly |
| `dependencies.yml` | Dependency management | Daily, manual |

## 📖 Quick Links

- [GitHub Actions](../.github/workflows/)
- [Configuration Files](../)
- [Repository Settings](../../settings)

## 🤝 Contributing

See [CI-CD-QUICK-START.md](./CI-CD-QUICK-START.md) for development workflow.

## 📝 License

Same as parent project.
