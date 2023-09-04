import { LoginDto } from './auth.dto';
import { SwaggerExampleData } from '../../shared/types/swagger.types';

export const loginExampleData: SwaggerExampleData<LoginDto> = {
  default: {
    value: {
      login: 'foo',
      password: 'foo',
    },
  },
};
