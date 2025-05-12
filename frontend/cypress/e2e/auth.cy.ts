describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should register a new user', () => {
    // Generate a unique username and email
    const uniqueId = Date.now().toString();
    const username = `testuser${uniqueId}`;
    const email = `test${uniqueId}@example.com`;

    // Visit the register page
    cy.visit('/auth/register');

    // Fill in the registration form
    cy.get('input[name="name"]').type(`Test User ${uniqueId}`);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should be redirected to dashboard after successful registration
    cy.url().should('include', '/dashboard');

    // Check if user is authenticated
    cy.window().its('localStorage.auth-storage').should('exist');
  });

  it('should show error for existing username or email', () => {
    // Visit the register page
    cy.visit('/auth/register');

    // Fill in the registration form with existing user data
    cy.get('input[name="name"]').type('admin');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.contains('Există deja un utilizator cu același nume sau adresă de email').should('be.visible');
  });

  it('should login with valid credentials', () => {
    // Visit the login page
    cy.visit('/auth/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should be redirected to dashboard after successful login
    cy.url().should('include', '/dashboard');

    // Check if user is authenticated
    cy.window().its('localStorage.auth-storage').should('exist');
  });

  it('should show error for invalid credentials', () => {
    // Visit the login page
    cy.visit('/auth/login');

    // Fill in the login form with invalid credentials
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.contains('Credențiale invalide').should('be.visible');
  });

  it('should navigate to forgot password page', () => {
    // Visit the login page
    cy.visit('/auth/login');

    // Click on the forgot password link
    cy.contains('Ai uitat parola').click();

    // Should be redirected to forgot password page
    cy.url().should('include', '/auth/forgot-password');
  });

  it('should request password reset', () => {
    // Visit the forgot password page
    cy.visit('/auth/forgot-password');

    // Fill in the email
    cy.get('input[name="email"]').type('admin@example.com');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should show success message
    cy.contains('Verificați-vă email-ul').should('be.visible');
  });

  it('should logout', () => {
    // Login first
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait for dashboard to load
    cy.url().should('include', '/dashboard');

    // Click on the user menu
    cy.get('[data-testid="user-menu"]').click();

    // Click on the logout button
    cy.contains('Deconectare').click();

    // Should be redirected to login page
    cy.url().should('include', '/auth/login');

    // Check if user is not authenticated
    cy.window().its('localStorage.auth-storage').then((storage) => {
      const parsedStorage = JSON.parse(storage);
      expect(parsedStorage.state.isAuthenticated).to.be.false;
    });
  });

  it('should protect routes that require authentication', () => {
    // Try to access dashboard without being authenticated
    cy.visit('/dashboard');

    // Should be redirected to login page
    cy.url().should('include', '/auth/login');
  });

  it('should redirect to requested page after login', () => {
    // Try to access profile page without being authenticated
    cy.visit('/dashboard/profile');

    // Should be redirected to login page
    cy.url().should('include', '/auth/login');

    // Login
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Should be redirected to profile page
    cy.url().should('include', '/dashboard/profile');
  });
});

describe('Password Reset Flow', () => {
  // This test requires a valid reset token, which is typically sent via email
  // For testing purposes, we can mock the token validation
  it('should handle password reset with valid token', () => {
    // Mock the token validation
    cy.intercept('GET', '**/auth/validate-reset-token*', {
      statusCode: 200,
      body: { valid: true },
    }).as('validateToken');

    // Mock the password reset
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { message: 'Parola a fost resetată cu succes.' },
    }).as('resetPassword');

    // Visit the reset password page with a token
    cy.visit('/auth/reset-password?token=mock-valid-token');

    // Wait for token validation
    cy.wait('@validateToken');

    // Fill in the password reset form
    cy.get('input[id="password"]').type('NewPassword123!');
    cy.get('input[id="confirmPassword"]').type('NewPassword123!');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for password reset
    cy.wait('@resetPassword');

    // Should show success message
    cy.contains('Parolă resetată cu succes').should('be.visible');
  });

  it('should show error for invalid token', () => {
    // Mock the token validation
    cy.intercept('GET', '**/auth/validate-reset-token*', {
      statusCode: 200,
      body: { valid: false },
    }).as('validateToken');

    // Visit the reset password page with an invalid token
    cy.visit('/auth/reset-password?token=mock-invalid-token');

    // Wait for token validation
    cy.wait('@validateToken');

    // Should show error message
    cy.contains('Link invalid sau expirat').should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    // Mock the token validation
    cy.intercept('GET', '**/auth/validate-reset-token*', {
      statusCode: 200,
      body: { valid: true },
    }).as('validateToken');

    // Visit the reset password page with a token
    cy.visit('/auth/reset-password?token=mock-valid-token');

    // Wait for token validation
    cy.wait('@validateToken');

    // Fill in the password reset form with different passwords
    cy.get('input[id="password"]').type('NewPassword123!');
    cy.get('input[id="confirmPassword"]').type('DifferentPassword123!');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.contains('Parolele nu coincid').should('be.visible');
  });
});
