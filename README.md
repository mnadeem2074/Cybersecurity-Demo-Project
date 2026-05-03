# 🔐 Cybersecurity Demo Project

## A Complete Web Security & Ethical Hacking Platform

[![License](https://img.shields.io/badge/License-Internship-blue)](#)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](#)
[![Security Headers](https://img.shields.io/badge/Security%20Headers-Active-success)](#)

This project is a **comprehensive demonstration of real-world web application security**. It was developed as the final portfolio for my cybersecurity internship at **DevelopersHub Corporation**. The platform deliberately includes both **vulnerable** (for learning attack vectors) and **secure** (for implementing defenses) versions of common web features.

---

## 📖 Table of Contents
1. [Project Purpose](#-project-purpose)
2. [Live Demonstration](#-live-demonstration)
3. [Security Features Deep Dive](#-security-features-deep-dive)
4. [Vulnerability Demos (Educational)](#-vulnerability-demos-educational)
5. [Security Audit & Tooling](#-security-audit--tooling)
6. [API Reference & Testing](#-api-reference--testing)
7. [Architecture & Tech Stack](#-architecture--tech-stack)
8. [OWASP Top 10 Compliance](#-owasp-top-10-compliance)
9. [Project Structure](#-project-structure)
10. [Related Portfolio Repositories](#-related-portfolio-repositories)

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
