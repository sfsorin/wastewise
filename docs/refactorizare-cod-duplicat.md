# Refactorizare Cod Duplicat în WasteWise

Acest document descrie refactorizarea codului duplicat din modulele `auth` și `users` din aplicația WasteWise.

## Problema

În urma analizei codului sursă, au fost identificate mai multe funcții duplicate în modulele `auth` și `users`. Aceste duplicări pot duce la comportamente inconsistente și pot face dificilă mentenanța codului.

Funcțiile duplicate identificate:
- `findOneWithRoles` - implementată identic în `auth/services/users.service.ts` și `users/users.service.ts`
- `findByUsernameOrEmail` - implementată cu diferențe minore în cele două servicii
- `findByEmail` - implementată cu diferențe minore în cele două servicii
- Funcționalități de resetare a parolei - implementate în ambele servicii

## Soluția implementată

Am implementat o soluție bazată pe principiul Dependency Inversion, utilizând interfețe pentru a defini contractele serviciilor și injecția de dependențe pentru a furniza implementările concrete.

### 1. Crearea unui modul comun `shared`

Am creat un modul comun `shared` pentru a găzdui interfețele comune:

```
backend/src/shared/
└── interfaces/
    ├── users-service.interface.ts
    ├── auth-service.interface.ts
    └── password-reset-service.interface.ts
```

### 2. Definirea interfețelor

Am definit interfețe clare pentru fiecare serviciu:

#### IUsersService

```typescript
export interface IUsersService {
  findOne(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
  findOneWithRoles(id: string): Promise<User>;
  updateLastLogin(id: string): Promise<void>;
  // ... alte metode
}
```

#### IAuthService

```typescript
export interface IAuthService {
  login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Partial<User>;
  }>;
  register(registerDto: RegisterDto): Promise<User>;
  validateToken(token: string): Promise<JwtPayload>;
  refreshToken(refreshToken: string): Promise<{
    access_token: string;
    user: Partial<User>;
  }>;
  invalidateRefreshTokens(userId: string): Promise<void>;
  // ... alte metode
}
```

#### IPasswordResetService

```typescript
export interface IPasswordResetService {
  createPasswordResetToken(email: string): Promise<{ token: string; user: User }>;
  validatePasswordResetToken(token: string): Promise<boolean>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
```

### 3. Implementarea interfețelor

Am actualizat serviciile existente pentru a implementa interfețele definite:

#### UsersService

```typescript
@Injectable()
export class UsersService implements IUsersService, IPasswordResetService {
  // Implementare...
}
```

#### AuthService

```typescript
@Injectable()
export class AuthService implements IAuthService {
  // Implementare...
}
```

### 4. Crearea unui serviciu specializat pentru resetarea parolei

Am creat un serviciu specializat pentru resetarea parolei:

```typescript
@Injectable()
export class PasswordResetService implements IPasswordResetService {
  // Implementare...
}
```

### 5. Configurarea injecției de dependențe

Am configurat modulul de autentificare pentru a furniza implementările concrete pentru interfețele definite:

```typescript
@Module({
  // ...
  providers: [
    AuthService,
    PasswordResetService,
    // ...
    {
      provide: IAuthService,
      useExisting: AuthService,
    },
    {
      provide: IPasswordResetService,
      useExisting: PasswordResetService,
    },
  ],
  exports: [AuthService, PasswordResetService, IAuthService, IPasswordResetService],
})
export class AuthModule {}
```

### 6. Actualizarea controllerelor pentru a utiliza interfețele

Am actualizat controllerele pentru a utiliza interfețele în loc de implementările concrete:

```typescript
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
    @Inject(IPasswordResetService) private readonly passwordResetService: IPasswordResetService,
  ) {}
  
  // Implementare...
}
```

## Beneficii

1. **Eliminarea codului duplicat**: Funcționalitățile comune sunt definite într-un singur loc.
2. **Separarea responsabilităților**: Fiecare serviciu are o responsabilitate clară și bine definită.
3. **Testabilitate îmbunătățită**: Interfețele facilitează mockarea serviciilor în teste.
4. **Flexibilitate**: Implementările pot fi schimbate fără a afecta codul client.
5. **Claritate**: Interfețele definesc clar contractele serviciilor.

## Pași următori

1. **Eliminarea completă a codului duplicat**: Unele funcționalități duplicate încă există și ar trebui eliminate.
2. **Refactorizarea altor module**: Aplicarea aceluiași model de refactorizare pentru alte module.
3. **Actualizarea testelor**: Actualizarea testelor pentru a utiliza interfețele în loc de implementările concrete.
4. **Documentație**: Actualizarea documentației pentru a reflecta noua arhitectură.

## Concluzie

Refactorizarea codului duplicat din modulele `auth` și `users` a dus la o arhitectură mai clară, mai flexibilă și mai ușor de întreținut. Utilizarea interfețelor și a injecției de dependențe a permis separarea responsabilităților și eliminarea codului duplicat.
