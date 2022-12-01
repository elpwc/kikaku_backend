import { RECAPTCHA_SHARED_KEY } from 'src/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const httpservice = new HttpService();
    const requestData = {
      secret: RECAPTCHA_SHARED_KEY,
      response: token,
    };

    const res = await firstValueFrom(
      httpservice.post(
        `https://www.recaptcha.net/recaptcha/api/siteverify?response=${requestData.response}&secret=${requestData.secret}`,
      ),
    );

    resolve(res.data.success);
  });
};
