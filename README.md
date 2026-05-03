# 🔐 Cybersecurity Demo Project

## A Complete Web Security & Ethical Hacking Platform

[![License](https://img.shields.io/badge/License-Internship-blue)](#)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Security Headers](https://img.shields.io/badge/Security%20Headers-Active-success)](https://helmetjs.github.io/)
[![OWASP Top 10](https://img.shields.io/badge/OWASP%20Top%2010-Compliant-blue)](https://owasp.org/Top10/)

This project is a **comprehensive demonstration of real-world web application security**. It was developed as the final portfolio for my cybersecurity internship at **DevelopersHub Corporation**. The platform deliberately includes both **vulnerable** (for learning attack vectors) and **secure** (for implementing defenses) versions of common web features.

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Project Purpose](#-project-purpose)
3. [Live Demonstration](#-live-demonstration)
4. [Security Features Deep Dive](#-security-features-deep-dive)
5. [Vulnerability Demos (Educational)](#-vulnerability-demos-educational)
6. [API Reference & Testing](#-api-reference--testing)
7. [Security Audit & Tooling](#-security-audit--tooling)
8. [OWASP Top 10 Compliance](#-owasp-top-10-compliance)
9. [Technology Stack](#-technology-stack)
10. [Project Structure](#-project-structure)
11. [Related Portfolio Repositories](#-related-portfolio-repositories)
12. [Author](#-author)

---

## 🎯 Project Purpose

This platform was built to answer three critical questions:

| Question | Answer Demonstrated |
| :--- | :--- |
| **How do attackers actually exploit web apps?** | Interactive SQL injection demo shows real-time login bypass and data extraction. |
| **What are the correct defenses?** | Side-by-side comparison of vulnerable vs. secure code (prepared statements). |
| **How do you validate security?** | Integration of professional-grade audit tools (ZAP, Nikto, Lynis). |

### Who is this for?
- **Hiring Managers:** See practical application of OWASP Top 10 security controls.
- **Developers:** Learn *why* prepared statements and security headers are not optional.
- **Students:** A complete, real-world example of DevSecOps principles.

---

## 🖥️ Live Demonstration

The application includes an interactive web UI and a REST API for testing.

### Quick Start
```bash
# Clone the repository
git clone https://github.com/mnadeem2074/Cybersecurity-Demo-Project.git
cd Cybersecurity-Demo-Project

# Install dependencies
npm install

# Start the secure server
npm start
