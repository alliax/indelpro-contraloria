import fs from 'fs';
import { resolve, join } from 'path';
import { Application } from '@feathersjs/feathers';

export enum NotifierTypes {
  resendVerifySignup = 'resendVerifySignup', // send another email with link for verifying user's email address
  verifySignup = 'verifySignup', // inform that user's email is now confirmed
  sendResetPwd = 'sendResetPwd', // send link to reset password
  resetPwd = 'resetPwd', // inform that user's password has been reset
  passwordChange = 'passwordChange', // inform the user that it's password has been updated
  identityChange = 'identityChange', // inform the user that it's information has been changed
}

export interface Email {
  from: string;
  to: string;
  subject?: string;
  html?: string;
  attachments?: any;
}

export function customNotifier(app: Application) {
  const smtp = app.get('smtp');
  const authOptions = app.get('authManagement');

  function getLink(type: string, hash: string, appName: string = 'default') {
    return `${authOptions[appName].authUrl || ''}/${type}?token=${hash}`;
  }
  function getMailUrl(appName: string = 'default') {
    return `${authOptions[appName].mailUrl || ''}`;
  }
  function sendEmail(email: Email) {
    return app
      .service(app.get('path') + 'mailer')
      .create(email)
      .then((result: any) => console.log('Sent email', result))
      .catch((err: any) => console.log('Error sending email', err));
  }
  function readTemplate(filename: string) {
    return fs.readFileSync(
      resolve(`${app.get('templates')}/mails/${filename}.html`),
      'utf8'
    );
  }
  return {
    ...app.get('authManagement'),
    notifier: function (type: NotifierTypes, user: any, notifierOptions?: any) {
      let tokenLink: string;
      let body: string;
      const email: Email = {
        from: smtp.from,
        to: user.email,
        attachments: [
          {
            path: join(app.get('public'), 'mails', 'logo-main.png'),
            cid: 'ImgLogoMain',
          },
          {
            path: join(app.get('public'), 'mails', 'logo-footer.png'),
            cid: 'ImgLogoFooter',
          },
        ],
      };
      const userFormas: boolean = user.role.some(
        (r: string) => r.indexOf('formas') > -1
      );
      switch (type) {
        case NotifierTypes.resendVerifySignup: //Send the user the verification email
          tokenLink = getLink(
            'verify-account',
            user.verifyToken,
            user.profile.creationApp
          );
          email.subject = 'Confirma tu correo electrónico';
          body = readTemplate(
            userFormas === true
              ? 'resend-verify-signup-formas'
              : 'resend-verify-signup'
          ).replace('##LIGA_ACCESO##', tokenLink);
          break;
        case NotifierTypes.verifySignup:
          email.subject = 'Cuenta confirmada';
          body = readTemplate('verify-signup').replace(
            '##LIGA_ACCESO##',
            getMailUrl(user.profile.creationApp)
          );
          break;
        case NotifierTypes.sendResetPwd:
          tokenLink = getLink(
            'change-password',
            user.resetToken,
            user.profile.creationApp
          );
          email.subject = 'Resetea tu contraseña';
          body = readTemplate('send-reset-password').replace(
            '##LIGA_ACCESO##',
            tokenLink
          );
          break;
        case NotifierTypes.resetPwd:
          email.subject = 'Has reseteado tu contraseña';
          body = readTemplate('reset-password');
          break;
        case NotifierTypes.passwordChange:
          email.subject = 'Se ha actualizado tu contraseña';
          body = readTemplate('password-change');
          break;
        case NotifierTypes.identityChange:
          email.subject = 'Se ha actualizado tu método de acceso';
          body = readTemplate('identity-change');
          break;
      }
      email.html = body.replace('##ASUNTO##', email.subject);
      return sendEmail(email);
    },
  };
}
