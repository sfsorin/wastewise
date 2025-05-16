# Guards și Decoratori pentru Autorizare

Acest document descrie implementarea și utilizarea guards și decoratorilor pentru autorizare în aplicația WasteWise.

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
}
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

## Decoratori

### 1. Decorator pentru Roluri (`@Roles`)

Acest decorator permite specificarea rolurilor necesare pentru accesarea unui endpoint.

```typescript
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
```

Exemplu de utilizare:

```typescript
@Roles('admin', 'manager')
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

Exemplu de utilizare:

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

Exemplu de utilizare:

```typescript
@Public()
@Get('public-info')
getPublicInfo() {
  return { message: 'Informații publice' };
}
```

## Configurare

Guards-urile sunt înregistrate global în modulul de autentificare (`AuthModule`):

```typescript
@Module({
  // ...
  providers: [
    // ...
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  // ...
})
export class AuthModule {}
```

## Testare

Pentru testarea funcționalității guards și decoratorilor, a fost creat un controller special (`RbacController`) care oferă endpoint-uri pentru testarea diferitelor scenarii:

- Endpoint public care nu necesită autentificare
- Endpoint care necesită doar autentificare
- Endpoint care necesită rolul de admin
- Endpoint care necesită permisiunea de a crea utilizatori
- Endpoint pentru verificarea permisiunilor unui utilizator
- Endpoint pentru obținerea tuturor permisiunilor unui utilizator
