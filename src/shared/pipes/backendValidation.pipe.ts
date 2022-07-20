import {
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class BackendValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length === 0) return value;

    throw new HttpException(
      { erros: this.formatError(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  formatError(erros: ValidationError[]) {
    return erros.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints);
      return acc;
    }, {});
  }
}
