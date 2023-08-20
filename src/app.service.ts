import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello() {
        return new Promise<string>((res) => {
            setTimeout(() => {
                res('Hello World!')
            }, 100)
        })
        /* return 'Hello World!'; */
    }
}
