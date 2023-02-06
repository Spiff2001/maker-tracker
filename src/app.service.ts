import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'the strong shall be made weak, and the weak shall kneel before me';
  }
}
