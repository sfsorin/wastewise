import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

/**
 * Serviciu pentru gestionarea listei negre de token-uri JWT
 * Utilizat pentru a invalida token-urile JWT înainte de expirare
 */
@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly enabled: boolean;
  private readonly prefix = 'bl_';

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.enabled = this.configService.get<boolean>('security.jwtBlacklist.enabled') || false;
    if (this.enabled) {
      this.logger.log('Lista neagră pentru token-urile JWT a fost activată');
    } else {
      this.logger.warn('Lista neagră pentru token-urile JWT este dezactivată');
    }
  }

  /**
   * Adaugă un token JWT în lista neagră
   * @param token Token-ul JWT de adăugat în lista neagră
   * @returns Promise<void>
   */
  async blacklistToken(token: string): Promise<void> {
    if (!this.enabled) {
      this.logger.debug('Lista neagră pentru token-urile JWT este dezactivată, token-ul nu a fost adăugat');
      return;
    }

    try {
      // Decodificăm token-ul pentru a obține data de expirare
      const decoded = this.jwtService.decode(token) as { exp?: number };
      if (!decoded || !decoded.exp) {
        this.logger.warn('Token-ul nu conține o dată de expirare validă');
        return;
      }

      // Calculăm TTL-ul în secunde
      const now = Math.floor(Date.now() / 1000);
      const ttl = decoded.exp - now;

      if (ttl <= 0) {
        this.logger.debug('Token-ul a expirat deja, nu este necesar să fie adăugat în lista neagră');
        return;
      }

      // Adăugăm token-ul în lista neagră
      const key = `${this.prefix}${token}`;
      await this.cacheManager.set(key, true, ttl * 1000);
      this.logger.debug(`Token-ul a fost adăugat în lista neagră cu TTL ${ttl} secunde`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la adăugarea token-ului în lista neagră: ${errorMessage}`);
    }
  }

  /**
   * Verifică dacă un token JWT este în lista neagră
   * @param token Token-ul JWT de verificat
   * @returns Promise<boolean> true dacă token-ul este în lista neagră, false în caz contrar
   */
  async isBlacklisted(token: string): Promise<boolean> {
    if (!this.enabled) {
      return false;
    }

    try {
      const key = `${this.prefix}${token}`;
      const result = await this.cacheManager.get(key);
      return !!result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la verificarea token-ului în lista neagră: ${errorMessage}`);
      return false;
    }
  }

  /**
   * Șterge un token JWT din lista neagră
   * @param token Token-ul JWT de șters din lista neagră
   * @returns Promise<void>
   */
  async removeFromBlacklist(token: string): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      const key = `${this.prefix}${token}`;
      await this.cacheManager.del(key);
      this.logger.debug('Token-ul a fost șters din lista neagră');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la ștergerea token-ului din lista neagră: ${errorMessage}`);
    }
  }
}
