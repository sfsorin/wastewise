import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail(
    to: string,
    resetLink: string,
    username: string,
  ): Promise<void> {
    const mailOptions = {
      from: `"WasteWise" <${this.configService.get<string>('MAIL_FROM')}>`,
      to,
      subject: 'Resetare parolă WasteWise',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Resetare parolă WasteWise</h2>
          <p>Salut ${username},</p>
          <p>Ai solicitat resetarea parolei pentru contul tău WasteWise.</p>
          <p>Pentru a-ți reseta parola, te rugăm să accesezi link-ul de mai jos:</p>
          <p>
            <a 
              href="${resetLink}" 
              style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              Resetează parola
            </a>
          </p>
          <p>Acest link va expira în 1 oră.</p>
          <p>Dacă nu ai solicitat resetarea parolei, te rugăm să ignori acest email.</p>
          <p>Cu stimă,<br>Echipa WasteWise</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Eroare la trimiterea email-ului:', error);
      throw new Error('Nu s-a putut trimite email-ul de resetare a parolei');
    }
  }
}
