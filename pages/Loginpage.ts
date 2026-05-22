import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    readonly emailrequired: Locator;
    readonly passwordrequired: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('input[id="email"]');
        this.passwordInput = page.locator('input[id="password"]');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' }); 
        this.emailrequired = page.getByText('Email is required', { exact: true });
        this.passwordrequired = page.getByText('Password is required', { exact: true });


    }

    async navigateToLogin() {
        await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });

    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();


    }


    async loginbutton() {
        await this.loginButton.click();

    }

}
