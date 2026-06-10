const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

pptx.author = 'Monika B';
pptx.company = 'Prime Vector Private Limited';
pptx.subject = 'Employee Management System';
pptx.title = 'Employee Management System Presentation';

pptx.layout = 'LAYOUT_16x9'; // Slide is 10 x 5.625 inches

// Define master slide for a premium look
pptx.defineSlideMaster({
    title: 'PREMIUM_MASTER',
    background: { color: 'F4F6F9' },
    objects: [
        { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: '2C3E50' } } },
        { text: { text: 'Employee Management System', options: { x: 0.5, y: 0.1, w: 6, h: 0.6, fontSize: 18, color: 'FFFFFF', bold: true, align: 'left', valign: 'middle' } } },
        { text: { text: 'Prime Vector Private Limited', options: { x: 6.5, y: 0.1, w: 3, h: 0.6, fontSize: 14, color: 'ECF0F1', align: 'right', valign: 'middle' } } },
        { rect: { x: 0, y: 5.2, w: '100%', h: 0.4, fill: { color: '2980B9' } } },
        { text: { text: 'Submitted by Monika B', options: { x: 0.5, y: 5.25, w: 4, h: 0.3, fontSize: 12, color: 'FFFFFF', align: 'left' } } }
    ]
});

function addTitle(slide, text) {
    slide.addText(text, { x: 0.5, y: 1.0, w: 9, h: 0.8, fontSize: 32, bold: true, color: '2980B9', border: { type: 'bottom', pt: 2, color: 'BDC3C7' } });
}

// Slide 1: Title Slide
let slide1 = pptx.addSlide();
slide1.background = { color: '2C3E50' };
slide1.addText('EMPLOYEE MANAGEMENT SYSTEM', { x: 1, y: 1.5, w: 8, h: 1.2, fontSize: 44, bold: true, color: 'FFFFFF', align: 'center' });
slide1.addText('Full Stack Web Development Mini Project', { x: 1, y: 2.8, w: 8, h: 0.6, fontSize: 24, color: '3498DB', align: 'center', bold: true });
slide1.addText('Submitted By: Monika B', { x: 1, y: 3.8, w: 8, h: 0.5, fontSize: 20, color: 'ECF0F1', align: 'center' });
slide1.addText('Submitted To: Prime Vector Private Limited', { x: 1, y: 4.4, w: 8, h: 0.5, fontSize: 20, color: 'ECF0F1', align: 'center' });

// Slide 2: Introduction
let slide2 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide2, 'Project Overview');
slide2.addText([
    { text: 'What is it?\n', options: { bold: true, fontSize: 22, color: '34495E' } },
    { text: 'A comprehensive, modern web-based application designed to manage employee data, streamline administrative tasks, and provide dedicated self-service portals for both Admins and Employees.\n\n', options: { fontSize: 18, color: '7F8C8D' } },
    { text: 'Key Benefits:\n', options: { bold: true, fontSize: 22, color: '34495E' } },
    { text: '• Replaces manual record-keeping with automation.\n• High data security & role-based privacy.\n• Centralized MySQL database for quick access.', options: { fontSize: 18, color: '7F8C8D', lineSpacing: 25 } }
], { x: 0.5, y: 2, w: 9, h: 3 });

// Slide 3: Project Modules & Tasks
let slide3 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide3, 'Modules Completed');
slide3.addText([
    { text: ' Requirement Analysis & Project Planning' },
    { text: ' UI/UX Design using HTML, CSS & Bootstrap' },
    { text: ' Frontend Development with JavaScript' },
    { text: ' Backend Development using Node.js' },
    { text: ' Database Design & Integration (MySQL)' },
    { text: ' Employee Registration & Management Module' },
    { text: ' Authentication & Role-Based Access Control' },
    { text: ' Deployment & Cloud Hosting (Vercel)' }
], { x: 0.5, y: 1.8, w: 9, h: 3.2, bullet: { type: 'number' }, fontSize: 18, color: '34495E', lineSpacing: 35 });

// Slide 4: Technology Stack
let slide4 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide4, 'Technology Stack');
// Centered layout for tech stack
slide4.addText('Frontend', { x: 1.5, y: 2, w: 3, h: 0.5, fontSize: 22, bold: true, color: '2980B9', align: 'center', fill: { color: 'ECF0F1' } });
slide4.addText('HTML5, CSS3\nBootstrap, JS', { x: 1.5, y: 2.6, w: 3, h: 1, fontSize: 18, color: '34495E', align: 'center', fill: { color: 'FFFFFF' } });

slide4.addText('Backend', { x: 5.5, y: 2, w: 3, h: 0.5, fontSize: 22, bold: true, color: '27AE60', align: 'center', fill: { color: 'ECF0F1' } });
slide4.addText('Node.js\nExpress.js', { x: 5.5, y: 2.6, w: 3, h: 1, fontSize: 18, color: '34495E', align: 'center', fill: { color: 'FFFFFF' } });

slide4.addText('Database', { x: 1.5, y: 4, w: 3, h: 0.5, fontSize: 22, bold: true, color: 'D35400', align: 'center', fill: { color: 'ECF0F1' } });
slide4.addText('MySQL\nRelational DB', { x: 1.5, y: 4.6, w: 3, h: 0.8, fontSize: 18, color: '34495E', align: 'center', fill: { color: 'FFFFFF' } });

slide4.addText('Hosting', { x: 5.5, y: 4, w: 3, h: 0.5, fontSize: 22, bold: true, color: '8E44AD', align: 'center', fill: { color: 'ECF0F1' } });
slide4.addText('Vercel (Frontend)\nRender (Backend)\nAiven (Database)', { x: 5.5, y: 4.6, w: 3, h: 1.0, fontSize: 18, color: '34495E', align: 'center', fill: { color: 'FFFFFF' } });

// Slide 5: System Architecture (FIXED LAYOUT - Perfectly scaled to 10 inches width)
let slide5 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide5, 'System Architecture Flow');
slide5.addText('Client Browser\n(Vercel)', { x: 1.0, y: 2.5, w: 2.0, h: 1.5, align: 'center', color: 'FFFFFF', bold: true, fill: { color: '3498DB' }, fontSize: 18 });
slide5.addText('REST API\n--->', { x: 3.0, y: 2.5, w: 1.0, h: 1.5, align: 'center', color: '34495E', bold: true, fontSize: 14 });
slide5.addText('Backend API\n(Node.js)', { x: 4.0, y: 2.5, w: 2.0, h: 1.5, align: 'center', color: 'FFFFFF', bold: true, fill: { color: '27AE60' }, fontSize: 18 });
slide5.addText('Queries\n--->', { x: 6.0, y: 2.5, w: 1.0, h: 1.5, align: 'center', color: '34495E', bold: true, fontSize: 14 });
slide5.addText('MySQL DB\n(Database)', { x: 7.0, y: 2.5, w: 2.0, h: 1.5, align: 'center', color: 'FFFFFF', bold: true, fill: { color: 'E67E22' }, fontSize: 18 });

// Slide 6: Login & Authentication
let slide6 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide6, 'Secure Login System');
slide6.addImage({ path: 'login.png', x: 0.5, y: 2, w: 5, h: 2.81 });
slide6.addText([
    { text: 'Secure Authentication' },
    { text: 'Role-Based Access (Admin / Employee)' },
    { text: 'Database-driven validation' },
    { text: 'Prevents unauthorized access' }
], { x: 5.8, y: 2, w: 3.8, h: 2.5, bullet: true, fontSize: 18, color: '34495E', lineSpacing: 30 });

// Slide 7: Admin Dashboard
let slide7 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide7, 'Admin Dashboard');
slide7.addImage({ path: 'admin_dashboard.png', x: 0.5, y: 2, w: 5, h: 2.81 });
slide7.addText([
    { text: 'Centralized Control Panel' },
    { text: 'Manage complete workforce' },
    { text: 'Track total employee metrics' },
    { text: 'Responsive Bootstrap Layout' }
], { x: 5.8, y: 2, w: 3.8, h: 2.5, bullet: true, fontSize: 18, color: '34495E', lineSpacing: 30 });

// Slide 8: Employee Portal
let slide8 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide8, 'Employee Self-Service Portal');
slide8.addImage({ path: 'employee_dashboard.png', x: 0.5, y: 2, w: 5, h: 2.81 });
slide8.addText([
    { text: 'Dedicated personal portal' },
    { text: 'View job profile securely' },
    { text: 'Restricted access boundaries' },
    { text: 'Secure session management' }
], { x: 5.8, y: 2, w: 3.8, h: 2.5, bullet: true, fontSize: 18, color: '34495E', lineSpacing: 30 });

// Slide 9: Backend API Architecture
let slide9 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide9, 'Backend API Architecture');
slide9.addText([
    { text: 'Node.js & Express API:\n', options: { bold: true, fontSize: 22, color: '2980B9' } },
    { text: '• Modular Routing (Auth, Employees)\n• Secure RESTful endpoints\n• Middleware for JWT Token Verification\n• Password hashing using bcryptjs\n• CORS enabled for Frontend communication', options: { fontSize: 18, color: '34495E', lineSpacing: 25 } }
], { x: 0.5, y: 2, w: 9, h: 3 });

// Slide 10: Database Design
let slide10 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide10, 'Database Design (MySQL)');
slide10.addText([
    { text: 'Centralized Cloud Database (Aiven):\n', options: { bold: true, fontSize: 22, color: '2980B9' } },
    { text: '• Table 1: `users` (id, name, email, password, role)\n• Table 2: `employees` (id, employee_id, name, phone, dept...)\n• Foreign Keys for relational integrity\n• Prepared Statements to prevent SQL Injection', options: { fontSize: 18, color: '34495E', lineSpacing: 25 } }
], { x: 0.5, y: 2, w: 9, h: 3 });

// Slide 11: Deployment & Hosting
let slide11 = pptx.addSlide({ masterName: 'PREMIUM_MASTER' });
addTitle(slide11, 'Deployment Strategy');
slide11.addText([
    { text: 'Frontend Hosting (Vercel):\n', options: { bold: true, fontSize: 22, color: '2980B9' } },
    { text: '• Continuous Integration from GitHub\n• Global CDN for fast access\n\n', options: { fontSize: 18, color: '34495E' } },
    { text: 'Backend Hosting (Render):\n', options: { bold: true, fontSize: 22, color: '27AE60' } },
    { text: '• Auto-scaling Node.js server\n• Environment variable protection (.env)', options: { fontSize: 18, color: '34495E' } }
], { x: 0.5, y: 2, w: 9, h: 3 });

// Slide 12: Conclusion & Q&A
let slide12 = pptx.addSlide();
slide12.background = { color: '2C3E50' };
slide12.addText('Thank You!', { x: 1, y: 1.5, w: 8, h: 1, fontSize: 54, bold: true, color: 'FFFFFF', align: 'center' });
slide12.addText('Any Questions?', { x: 1, y: 2.8, w: 8, h: 0.5, fontSize: 32, color: '3498DB', align: 'center', bold: true });
slide12.addText('Future Scope:\nPayroll System Integration • Advanced Attendance Tracking', { x: 1, y: 4, w: 8, h: 1, fontSize: 20, color: 'BDC3C7', align: 'center' });

pptx.writeFile({ fileName: 'Employee_Management_System_Final.pptx' })
    .then(fileName => {
        console.log(`created file: ${fileName}`);
    })
    .catch(err => {
        console.error(err);
    });
