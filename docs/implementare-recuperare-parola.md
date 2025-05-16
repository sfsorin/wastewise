# Implementare Recuperare Parolă

## Descriere

Acest document descrie implementarea funcționalității de recuperare a parolei în aplicația WasteWise. Funcționalitatea permite utilizatorilor să-și reseteze parola în cazul în care au uitat-o, prin intermediul unui token unic trimis pe email.

## Componente implementate

### Backend

1. **Entități**
   - `PasswordResetToken`: Entitate pentru stocarea token-urilor de resetare a parolei

2. **DTO-uri**
   - `ForgotPasswordDto`: DTO pentru solicitarea resetării parolei (conține email)
   - `ResetPasswordDto`: DTO pentru resetarea efectivă a parolei (conține token, parolă nouă și confirmare parolă)

3. **Servicii**
   - `UsersService.createPasswordResetToken()`: Generează un token unic pentru resetarea parolei
   - `UsersService.validatePasswordResetToken()`: Validează un token de resetare a parolei
   - `UsersService.resetPassword()`: Resetează parola utilizatorului folosind un token valid
   - `AuthService.forgotPassword()`: Gestionează solicitarea de resetare a parolei
   - `AuthService.resetPassword()`: Gestionează resetarea efectivă a parolei
   - `AuthService.validateResetToken()`: Validează un token de resetare a parolei
   - `MailService.sendPasswordResetEmail()`: Trimite email-ul cu link-ul de resetare a parolei

4. **Controllere**
   - `AuthController.forgotPassword()`: Endpoint pentru solicitarea resetării parolei
   - `AuthController.resetPassword()`: Endpoint pentru resetarea efectivă a parolei
   - `AuthController.validateResetToken()`: Endpoint pentru validarea token-ului de resetare

5. **Migrări**
   - Migrare pentru crearea tabelului `password_reset_tokens`

### Frontend

1. **Pagini**
   - `ForgotPasswordPage`: Pagina pentru solicitarea resetării parolei
   - `ResetPasswordPage`: Pagina pentru resetarea efectivă a parolei

2. **Servicii**
   - `authService.forgotPassword()`: Apelează API-ul pentru solicitarea resetării parolei
   - `authService.validateResetToken()`: Apelează API-ul pentru validarea token-ului de resetare
   - `authService.resetPassword()`: Apelează API-ul pentru resetarea efectivă a parolei

3. **Rute**
   - `/auth/forgot-password`: Ruta pentru pagina de solicitare a resetării parolei
   - `/auth/reset-password`: Ruta pentru pagina de resetare a parolei

## Flux de lucru

1. Utilizatorul accesează pagina de recuperare a parolei și introduce adresa de email
2. Sistemul generează un token unic de resetare cu durată limitată (1 oră)
3. Sistemul trimite un email cu un link de resetare a parolei
4. Utilizatorul accesează link-ul și introduce noua parolă
5. Sistemul validează token-ul și actualizează parola utilizatorului

## Detalii de implementare

### Generarea token-ului

Token-ul de resetare a parolei este generat folosind biblioteca `crypto` și are o lungime de 32 de bytes (64 de caractere hexazecimale). Token-ul este stocat în baza de date împreună cu ID-ul utilizatorului și data de expirare.

```typescript
// Generare token aleatoriu
const token = crypto.randomBytes(32).toString('hex');

// Setare dată de expirare (1 oră)
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 1);
```

### Trimiterea email-ului

Email-ul de resetare a parolei este trimis folosind biblioteca `nodemailer`. Email-ul conține un link către pagina de resetare a parolei, care include token-ul de resetare ca parametru de query.

```typescript
const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;

await this.mailService.sendPasswordResetEmail(user.email, resetLink, user.username);
```

### Validarea token-ului

Token-ul de resetare a parolei este validat verificând dacă există în baza de date, dacă nu a fost deja utilizat și dacă nu a expirat.

```typescript
async validatePasswordResetToken(token: string): Promise<boolean> {
  const passwordResetToken = await this.passwordResetTokenRepository.findOne({
    where: { token, used: false },
  });

  if (!passwordResetToken) {
    return false;
  }

  const now = new Date();
  if (passwordResetToken.expiresAt < now) {
    return false;
  }

  return true;
}
```

### Resetarea parolei

Parola utilizatorului este resetată doar dacă token-ul este valid. După resetarea parolei, token-ul este marcat ca utilizat pentru a preveni reutilizarea acestuia.

```typescript
async resetPassword(token: string, newPassword: string): Promise<void> {
  const passwordResetToken = await this.passwordResetTokenRepository.findOne({
    where: { token, used: false },
    relations: ['user'],
  });

  if (!passwordResetToken) {
    throw new BadRequestException(
      'Token-ul de resetare a parolei este invalid sau a fost deja utilizat',
    );
  }

  const now = new Date();
  if (passwordResetToken.expiresAt < now) {
    throw new BadRequestException('Token-ul de resetare a parolei a expirat');
  }

  // Hash-uire parolă nouă
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Actualizare parolă utilizator
  await this.usersRepository.update(passwordResetToken.userId, {
    password: hashedPassword,
  });

  // Marcare token ca utilizat
  await this.passwordResetTokenRepository.update(passwordResetToken.id, {
    used: true,
  });
}
```

## Testare

Funcționalitatea de recuperare a parolei a fost testată atât prin teste unitare cât și prin teste manuale. Testele unitare acoperă următoarele scenarii:

1. Generarea token-ului de resetare a parolei
2. Validarea token-ului de resetare a parolei
3. Resetarea parolei cu un token valid
4. Gestionarea erorilor pentru token-uri invalide sau expirate

## Concluzii

Implementarea funcționalității de recuperare a parolei oferă utilizatorilor o metodă sigură și ușor de utilizat pentru a-și reseta parola în cazul în care au uitat-o. Funcționalitatea respectă cele mai bune practici de securitate, cum ar fi:

1. Generarea de token-uri unice și criptografic sigure
2. Limitarea duratei de viață a token-urilor
3. Invalidarea token-urilor după utilizare
4. Validarea datelor de intrare
5. Gestionarea corectă a erorilor

Funcționalitatea este completă și gata de utilizare în aplicație.
