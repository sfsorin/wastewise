# Implementare RBAC (Role-Based Access Control)

## Descriere

Acest document descrie implementarea sistemului de control al accesului bazat pe roluri (RBAC) în aplicația WasteWise. RBAC permite definirea și gestionarea permisiunilor utilizatorilor în funcție de rolurile acestora.

## Componente Implementate

### 1. Decoratori

#### 1.1 Decorator pentru Roluri (`@Roles`)

Acest decorator permite specificarea rolurilor necesare pentru accesarea unui endpoint.

```typescript
@Roles('admin', 'manager')
@Get('users')
findAll() {
  return this.usersService.findAll();
}
```

#### 1.2 Decorator pentru Permisiuni (`@Permissions`)

Acest decorator permite specificarea permisiunilor necesare pentru accesarea unui endpoint.

```typescript
@Permissions('create:users', 'update:users')
@Post('users')
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

#### 1.3 Decorator pentru Rute Publice (`@Public`)

Acest decorator permite marcarea unui endpoint ca fiind public, fără a necesita autentificare.

```typescript
@Public()
@Get('public-info')
getPublicInfo() {
  return { message: 'Informații publice' };
}
```

### 2. Guard-uri

#### 2.1 JwtAuthGuard

Guard pentru verificarea autentificării utilizatorului. Verifică dacă utilizatorul este autentificat, cu excepția rutelor marcate ca publice.

#### 2.2 RolesGuard

Guard pentru verificarea rolurilor utilizatorului. Verifică dacă utilizatorul are cel puțin unul dintre rolurile necesare pentru accesarea unui endpoint.

#### 2.3 PermissionsGuard

Guard pentru verificarea permisiunilor utilizatorului. Verifică dacă utilizatorul are cel puțin una dintre permisiunile necesare pentru accesarea unui endpoint.

### 3. Servicii

#### 3.1 PermissionsService

Serviciu pentru gestionarea permisiunilor. Oferă metode pentru verificarea permisiunilor unui utilizator și pentru obținerea tuturor permisiunilor unui utilizator.

### 4. Cache

Implementare cache pentru permisiuni pentru a îmbunătăți performanța. Permisiunile utilizatorilor sunt stocate în cache pentru a evita interogări repetate la baza de date.

## Utilizare

### 1. Protejarea unui Endpoint cu Roluri

```typescript
@Get('admin-only')
@Roles('admin')
adminOnly() {
  return { message: 'Acesta este un endpoint doar pentru administratori' };
}
```

### 2. Protejarea unui Endpoint cu Permisiuni

```typescript
@Post('users')
@Permissions('create:users')
createUser(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

### 3. Combinarea Rolurilor și Permisiunilor

```typescript
@Delete('users/:id')
@Roles('admin')
@Permissions('delete:users')
removeUser(@Param('id') id: string) {
  return this.usersService.remove(id);
}
```

### 4. Marcarea unui Endpoint ca Public

```typescript
@Get('public')
@Public()
publicEndpoint() {
  return { message: 'Acesta este un endpoint public' };
}
```

## Testare

Pentru testarea funcționalității RBAC, a fost creat un controller special (`RbacController`) care oferă endpoint-uri pentru testarea diferitelor scenarii:

- Endpoint public care nu necesită autentificare
- Endpoint care necesită doar autentificare
- Endpoint care necesită rolul de admin
- Endpoint care necesită permisiunea de a crea utilizatori
- Endpoint pentru verificarea permisiunilor unui utilizator
- Endpoint pentru obținerea tuturor permisiunilor unui utilizator

## Configurare

### 1. Înregistrarea Guard-urilor Globale

Guard-urile sunt înregistrate global în modulul de autentificare (`AuthModule`):

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

### 2. Configurare Cache

Cache-ul pentru permisiuni este configurat în modulul de utilizatori (`UsersModule`):

```typescript
@Module({
  imports: [
    // ...
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: 3600, // 1 oră în secunde
      }),
    }),
  ],
  // ...
})
export class UsersModule {}
```

## Concluzii

Implementarea RBAC oferă un sistem flexibil și securizat pentru controlul accesului în aplicație. Utilizatorii pot avea roluri diferite, iar fiecare rol poate avea permisiuni specifice. Acest sistem permite o gestionare granulară a accesului la diferite funcționalități ale aplicației.
