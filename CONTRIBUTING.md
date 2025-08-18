# Contributing to AI Content Manager

Terima kasih atas minat Anda untuk berkontribusi pada AI Content Manager! 🚀

## 🎯 Cara Berkontribusi

### 1. Melaporkan Bug
- Gunakan template issue yang disediakan
- Jelaskan langkah-langkah untuk mereproduksi bug
- Sertakan informasi sistem dan browser
- Lampirkan screenshot jika diperlukan

### 2. Mengusulkan Fitur Baru
- Jelaskan fitur yang diusulkan dengan detail
- Berikan use case dan manfaat
- Pertimbangkan dampak pada performa dan UX

### 3. Submit Pull Request
- Fork repository
- Buat branch untuk fitur/bug fix
- Commit perubahan dengan pesan yang jelas
- Test perubahan Anda
- Submit pull request

## 🛠️ Setup Development Environment

### Prerequisites
- Node.js (v14+)
- npm atau yarn
- Git

### Installation
```bash
# Fork dan clone repository
git clone https://github.com/YOUR_USERNAME/ai-content-manager.git
cd ai-content-manager

# Install dependencies
npm install
cd client && npm install && cd ..

# Setup environment
cp .env.example .env
# Edit .env sesuai kebutuhan

# Start development servers
npm run dev
```

## 📝 Coding Standards

### JavaScript/React
- Gunakan ES6+ features
- Gunakan functional components dengan hooks
- Ikuti ESLint rules
- Tulis komentar untuk logic yang kompleks

### CSS/Styling
- Gunakan Material-UI components
- Ikuti design system yang ada
- Responsive design untuk semua screen sizes
- Accessibility-friendly

### Backend
- Gunakan async/await
- Proper error handling
- Input validation
- Security best practices

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
npm test
```

### Manual Testing
- Test di berbagai browser
- Test di mobile devices
- Test dengan berbagai ukuran file upload
- Test error scenarios

## 📚 Documentation

### Code Documentation
- JSDoc untuk functions
- README untuk setiap component
- API documentation
- Setup instructions

### User Documentation
- User guides
- Feature explanations
- Troubleshooting guides

## 🔒 Security

### Security Guidelines
- Never commit sensitive data
- Validate all inputs
- Sanitize user data
- Use HTTPS in production
- Regular security updates

### Reporting Security Issues
- Email: security@aicontentmanager.com
- Don't create public issues for security problems
- Provide detailed information about the vulnerability

## 🚀 Release Process

### Versioning
- Semantic versioning (MAJOR.MINOR.PATCH)
- Update CHANGELOG.md
- Tag releases

### Deployment
- Test in staging environment
- Update documentation
- Deploy to production
- Monitor for issues

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn
- Constructive feedback
- No harassment or discrimination

### Communication
- Use clear and respectful language
- Be patient with newcomers
- Provide helpful feedback
- Celebrate contributions

## 📋 Issue Templates

### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Feature Request Template
```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 🎉 Recognition

### Contributors
- All contributors will be listed in CONTRIBUTORS.md
- Significant contributions will be highlighted
- Regular contributors may be invited as maintainers

### Thank You
Terima kasih untuk semua kontributor yang telah membantu membuat AI Content Manager lebih baik! 🙏

---

**Happy Contributing!** 🚀