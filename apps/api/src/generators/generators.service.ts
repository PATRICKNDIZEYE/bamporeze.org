import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { hash } from 'src/@types';

@Injectable()
export class GeneratorsService {
  constructor(private jwtService: JwtService) {}

  /**
   * Generates the hash of data using bcrypt with 10 saltrounds
   */
  async _generateHash(data: string): Promise<hash> {
    const hash = await bcrypt.hash(data, 10);
    return hash;
  }

  /**
   * Generates a simple random string of 5 digits
   * The verifcode is always a random string of five digits
   *
   * @example
   * const verifcode  = await _generateCode()
   * follow me on github https://github.com/rexisn
   */

  async _generateCode() {
    const number: number = Math.floor(Math.random() * (99999 - 10000)) - 10000;
    if (number < 0) {
      this._generateCode();
    }
    const verificationcode: string = number.toString();
    return verificationcode;
  }
}
