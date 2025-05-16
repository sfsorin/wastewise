# Guards și Decoratori pentru Autorizare

Acest document descrie în detaliu implementarea și utilizarea guards și decoratorilor pentru autorizare în aplicația WasteWise.

## Arhitectura de autorizare

Aplicația WasteWise utilizează un sistem de autorizare bazat pe roluri și permisiuni, implementat prin guards și decoratori NestJS. Acest sistem permite:

1. **Autentificarea utilizatorilor** - verificarea identității utilizatorilor prin token-uri JWT
2. **Autorizarea bazată pe roluri** - restricționarea accesului la anumite endpoint-uri în funcție de rolul utilizatorului
3. **Autorizarea bazată pe permisiuni** - restricționarea accesului la anumite endpoint-uri în funcție de permisiunile utilizatorului
4. **Endpoint-uri publice** - marcarea anumitor endpoint-uri ca fiind accesibile fără autentificare

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│   JwtAuthGuard  │────▶│   RolesGuard    │────▶│ PermissionsGuard│────▶│    Controller   │
│                 │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                      ▲                       ▲                       ▲
        │                      │                       │                       │
        │                      │                       │                       │
┌───────┴───────┐     ┌───────┴───────┐     ┌─────────┴─────────┐     ┌───────┴───────┐
│               │     │               │     │                   │     │               │
│@Public()      │     │@Roles()       │     │@Permissions()     │     │Endpoint       │
│Decorator      │     │Decorator      │     │Decorator          │     │Implementation │
│               │     │               │     │                   │     │               │
└───────────────┘     └───────────────┘     └───────────────────┘     └───────────────┘
```

## Guards

### 1. JwtAuthGuard

Guard pentru verificarea autentificării utilizatorului. Verifică dacă utilizatorul este autentificat, cu excepția rutelor marcate ca publice.

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Verificăm dacă ruta este marcată ca publică
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Dacă ruta este publică, permitem accesul fără autentificare
    if (isPublic) {
      return true;
    }

    // Altfel, verificăm autentificarea
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    // Dacă există o eroare sau utilizatorul nu este autentificat, aruncăm excepție
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message || 'Autentificare necesară');
    }
    return user;
  }
}
```

#### Utilizare

JwtAuthGuard este înregistrat global în modulul de autentificare, astfel încât toate rutele sunt protejate implicit, cu excepția celor marcate cu decoratorul `@Public()`.

```typescript
@Module({
  // ...
  providers: [
    // ...
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  // ...
})
export class AuthModule {}
```

### 2. RolesGuard

Guard pentru verificarea rolurilor utilizatorului. Verifică dacă utilizatorul are cel puțin unul dintre rolurile necesare pentru accesarea unui endpoint.

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return false;
    }

    return requiredRoles.some(role => user.role === role);
  }
}
```

#### Utilizare

RolesGuard este înregistrat global în modulul de autentificare și se activează doar pentru rutele marcate cu decoratorul `@Roles()`.

```typescript
@Module({
  // ...
  providers: [
    // ...
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  // ...
})
export class AuthModule {}
```

### 3. PermissionsGuard

Guard pentru verificarea permisiunilor utilizatorului. Verifică dacă utilizatorul are cel puțin una dintre permisiunile necesare pentru accesarea unui endpoint.

```typescript
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Dacă nu sunt specificate permisiuni, permitem accesul
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Dacă nu există utilizator sau nu are permisiuni, blocăm accesul
    if (!user || !user.permissions) {
      return false;
    }

    // Verificăm dacă utilizatorul are cel puțin una dintre permisiunile necesare
    return requiredPermissions.some(
      permission => user.permissions?.includes(permission) || false,
    );
  }
}
```

#### Utilizare

PermissionsGuard este înregistrat global în modulul de autentificare și se activează doar pentru rutele marcate cu decoratorul `@Permissions()`.

```typescript
@Module({
  // ...
  providers: [
    // ...
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  // ...
})
export class AuthModule {}
```

## Decoratori

### 1. Decorator pentru Roluri (`@Roles`)

Acest decorator permite specificarea rolurilor necesare pentru accesarea unui endpoint.

```typescript
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
```

#### Utilizare

```typescript
@Roles(UserRole.ADMIN, UserRole.MANAGER)
@Get('users')
findAll() {
  return this.usersService.findAll();
}
```

### 2. Decorator pentru Permisiuni (`@Permissions`)

Acest decorator permite specificarea permisiunilor necesare pentru accesarea unui endpoint.

```typescript
export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
```

#### Utilizare

```typescript
@Permissions('create:users', 'update:users')
@Post('users')
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### 3. Decorator pentru Rute Publice (`@Public`)

Acest decorator permite marcarea unui endpoint ca fiind public, fără a necesita autentificare.

```typescript
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

#### Utilizare

```typescript
@Public()
@Get('public-info')
getPublicInfo() {
  return { message: 'Informații publice' };
}
```

## Exemple de utilizare

### Exemplu 1: Endpoint public

```typescript
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

### Exemplu 2: Endpoint care necesită autentificare

```typescript
@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }
}
```

### Exemplu 3: Endpoint care necesită un anumit rol

```typescript
@Controller('admin')
export class AdminController {
  constructor(private usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get('users')
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
```

### Exemplu 4: Endpoint care necesită anumite permisiuni

```typescript
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Permissions('create:users')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

## Testare

Pentru testarea funcționalității guards și decoratorilor, a fost creat un controller special (`RbacController`) care oferă endpoint-uri pentru testarea diferitelor scenarii:

```typescript
@Controller('rbac')
export class RbacController {
  @Public()
  @Get('public')
  public() {
    return { message: 'Acesta este un endpoint public care nu necesită autentificare' };
  }

  @Get('authenticated')
  authenticated() {
    return { message: 'Acesta este un endpoint care necesită autentificare' };
  }

  @Roles('admin')
  @Get('admin')
  adminOnly() {
    return { message: 'Acesta este un endpoint care necesită rolul de admin' };
  }

  @Permissions('create:users')
  @Get('permissions/create-users')
  createUsersPermission() {
    return { message: 'Acesta este un endpoint care necesită permisiunea create:users' };
  }
}
```

## Bune practici

1. **Utilizați decoratorul `@Public()` pentru rutele care nu necesită autentificare** - Acest decorator este mai explicit decât omiterea guards-urilor.

2. **Utilizați decoratorul `@Roles()` pentru restricționarea accesului bazat pe roluri** - Acest decorator este mai explicit decât verificarea rolurilor în controller.

3. **Utilizați decoratorul `@Permissions()` pentru restricționarea accesului bazat pe permisiuni** - Acest decorator este mai flexibil decât restricționarea bazată pe roluri.

4. **Combinați decoratorii pentru a crea reguli complexe de autorizare** - De exemplu, puteți combina `@Roles()` și `@Permissions()` pentru a crea reguli de autorizare mai complexe.

5. **Testați guards și decoratorii în mod izolat** - Utilizați mock-uri pentru a testa guards și decoratorii în mod izolat, fără a depinde de alte componente.

6. **Documentați guards și decoratorii** - Documentați guards și decoratorii pentru a facilita utilizarea lor de către alți dezvoltatori.
