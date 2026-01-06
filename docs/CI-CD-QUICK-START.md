# CI/CD System Documentation

## Overview

This repository implements an advanced CI/CD system for automated testing, security scanning, and deployment to GitHub Pages. The system supports multiple environments and provides comprehensive quality assurance checks.

## Architecture

### Branch Strategy

```
main (production)
├── dev (development)
│   └── feature/* (feature branches)
│   └── bugfix/* (bug fix branches)
│   └── hotfix/* (hotfix branches)
```

### Environments

1. **Production** (`main` branch)
   - URL: https://piotrunius.github.io
   - Automatic deployment on merge to `main`
   - Full test suite execution
   - Security scanning
   - Performance monitoring

2. **Development** (`dev` branch)
   - URL: https://dev.piotrunius.github.io (requires GitHub Pages configuration)
   - Automatic deployment on push to `dev`
   - Quick validation checks
   - Development data updates

3. **Feature Branches** (`feature/*`)
   - No automatic deployment
   - Full quality checks on PR
   - Security scanning
   - Preview information in PR comments

## Workflows

### 1. Production Deploy (`main.yml`)

**Triggers:**
- Push to `main` branch
- Scheduled (every 15 minutes)
- Manual dispatch

**Jobs:**
- Security scanning with Trivy
- HTML/CSS validation
- Link checking
- Lighthouse performance testing
- Data updates (GitHub stats, Steam status)
- Deployment to GitHub Pages
- Health checks
- Version tagging

**Required Secrets:**
- `GITHUB_TOKEN` (automatically provided)
- `STEAM_API_KEY` (optional, for Steam integration)
- `STEAM_ID64` (optional, for Steam integration)

### 2. Development Deploy (`dev.yml`)

**Triggers:**
- Push to `dev` branch
- Pull requests to `dev`
- Manual dispatch

**Jobs:**
- CSS/JS linting
- HTML validation
- Security checks
- Build and test
- Development data updates
- Deployment to dev environment
- Lighthouse checks

### 3. Feature Branch CI (`feature.yml`)

**Triggers:**
- Push to `feature/*` branches
- Pull requests to `main` or `dev`

**Jobs:**
- Quick linting
- Security scanning
- Code quality checks
- Accessibility testing
- PR preview information
- Bundle size analysis

### 4. Health Check & Monitoring (`health-check.yml`)

**Triggers:**
- Scheduled (every hour)
- Manual dispatch

**Jobs:**
- Uptime monitoring
- Performance metrics
- Security headers check
- Broken link detection
- Automatic issue creation on failure

### 5. Release Management (`release.yml`)

**Triggers:**
- Git tag push (`v*`)
- Manual dispatch with version input

**Jobs:**
- Automatic changelog generation
- GitHub Release creation
- CHANGELOG.md updates
- Release notes compilation

### 6. Branch Cleanup (`cleanup.yml`)

**Triggers:**
- Pull request closed (merged)
- Manual dispatch

**Jobs:**
- Automatic deletion of merged feature branches
- Stale branch detection (60+ days old)

### 7. CodeQL Security (`codeql.yml`)

**Triggers:**
- Push to `main` or `dev`
- Pull requests
- Scheduled (weekly on Mondays)
- Manual dispatch

**Jobs:**
- JavaScript code analysis
- Security vulnerability detection
- Quality analysis

### 8. Dependency Management (`dependencies.yml`)

**Triggers:**
- Scheduled (daily at 2 AM UTC)
- Manual dispatch

**Jobs:**
- NPM audit for vulnerabilities
- Trivy security scanning
- Outdated dependency checks
- License compliance verification
- Automatic issue creation for critical vulnerabilities

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linters
npm run lint
```

### Creating a Feature

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature

# Create pull request
gh pr create --base dev --head feature/my-feature
```

### Deployment

**To Development:**
```bash
git checkout dev
git merge feature/my-feature
git push origin dev
# Automatically deploys to dev environment
```

**To Production:**
```bash
# Create PR from dev to main
gh pr create --base main --head dev --title "Release v1.0.0"
# After approval and merge, automatically deploys to production
```

## Configuration

### Required Secrets

Set in Repository Settings → Secrets and variables → Actions:

- `STEAM_API_KEY` (optional)
- `STEAM_ID64` (optional)
- `DISCORD_WEBHOOK` (optional)
- `SLACK_WEBHOOK` (optional)

### Branch Protection

Recommended settings for `main` branch:
- Require pull request reviews (1 approval)
- Require status checks to pass
- Require branches to be up to date
- Include administrators

## Monitoring

- **Uptime**: Hourly health checks with automatic alerting
- **Performance**: Lighthouse CI integration
- **Security**: Daily vulnerability scans
- **Dependencies**: Automated updates and audit

## Troubleshooting

### Workflow Failures

```bash
# View recent workflow runs
gh run list

# View specific run logs
gh run view <run-id> --log

# Re-run failed workflow
gh run rerun <run-id>
```

### Common Issues

1. **npm install fails**: Clear cache and retry
2. **Pages deployment fails**: Check GitHub Pages settings
3. **Security scan false positives**: Review and update dependencies
4. **Lighthouse fails**: Ensure site is accessible

## Support

For detailed documentation, see [docs/CI-CD.md](./CI-CD.md)

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review workflow logs

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-06
