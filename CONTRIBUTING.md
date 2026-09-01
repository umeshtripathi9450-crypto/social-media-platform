# Contributing Guide

We welcome contributions to the Social Media Platform! Please follow these guidelines to ensure a smooth contribution process.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/social-media-platform.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Code Standards

### Naming Conventions
- **Variables/Functions**: camelCase
- **Classes/Models**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: camelCase or kebab-case

### Code Style
- Use 2-space indentation
- Use semicolons
- Use single quotes for strings
- Maximum line length: 100 characters

### Comments
```javascript
/**
 * Brief description of what this function does
 * @param {Type} paramName - Description
 * @returns {Type} Description
 */
function myFunction(paramName) {
  // Implementation
}
```

## Git Workflow

### Branch Naming
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `test/description` - Test additions
- `refactor/description` - Code refactoring

### Commit Messages
```
[Type] Brief description

More detailed explanation if needed.
- Bullet point 1
- Bullet point 2

Closes #123
```

Types: feat, fix, docs, style, refactor, test, chore

## Pull Request Process

1. Update documentation if needed
2. Add/update tests for new features
3. Ensure all tests pass: `npm test`
4. Keep PR focused on a single feature/fix
5. Write clear PR description with:
   - What changed
   - Why it changed
   - How to test it
   - Any breaking changes

## Testing Requirements

- New features must have tests
- Bug fixes should include regression tests
- Aim for >80% code coverage
- All tests must pass before merging

## Security

- Never commit secrets or credentials
- Use environment variables for sensitive data
- Follow OWASP security guidelines
- Report security issues privately (see SECURITY.md)

## Code Review

- Be respectful and constructive
- Suggest improvements, don't demand
- Ask questions if something isn't clear
- Approve once you're satisfied with the changes

## Questions?

- Open an issue for bugs or feature requests
- Discuss major changes before starting
- Join our community for general questions

Thank you for contributing! 🎉
