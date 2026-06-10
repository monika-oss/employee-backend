const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ channel: 'chrome' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    try {
        console.log('Capturing login page...');
        await page.goto('https://employee-frontend-liart.vercel.app/');
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'login.png' });

        // Setup Request Interception for Mocking Backend APIs
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().includes('/api/employees/profile/me')) {
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: 2, employee_id: 'EMP002', name: 'Employee', email: 'emp@example.com', 
                        phone: '0987654321', department: 'HR', designation: 'Executive', salary: '40000'
                    })
                });
            } else if (request.url().includes('/api/employees')) {
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([
                        { id: 1, employee_id: 'EMP001', name: 'John Doe', email: 'john@example.com', phone: '1234567890', department: 'IT', designation: 'Developer', salary: '60000' },
                        { id: 2, employee_id: 'EMP002', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', department: 'HR', designation: 'Manager', salary: '75000' },
                        { id: 3, employee_id: 'EMP003', name: 'Mike Ross', email: 'mike@example.com', phone: '1122334455', department: 'Finance', designation: 'Analyst', salary: '55000' }
                    ])
                });
            } else if (request.url().includes('/api/auth/login')) {
                // Mock login to prevent actual network request delay
                request.respond({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ id: 1, role: 'Admin', name: 'Admin', accessToken: 'mock_token' })
                });
            } else {
                request.continue();
            }
        });

        console.log('Setting Admin LocalStorage...');
        await page.evaluate(() => {
            localStorage.setItem('role', 'Admin');
            localStorage.setItem('token', 'mock_admin_token');
            localStorage.setItem('userName', 'Admin User');
        });

        console.log('Navigating to Admin Dashboard...');
        await page.goto('https://employee-frontend-liart.vercel.app/admin-dashboard.html');
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'admin_dashboard.png' });

        console.log('Setting Employee LocalStorage...');
        await page.evaluate(() => {
            localStorage.setItem('role', 'Employee');
            localStorage.setItem('token', 'mock_employee_token');
            localStorage.setItem('userName', 'Employee User');
        });

        console.log('Navigating to Employee Dashboard...');
        await page.goto('https://employee-frontend-liart.vercel.app/employee-dashboard.html');
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'employee_dashboard.png' });

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        console.log('Done!');
    }
})();
