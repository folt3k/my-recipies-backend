import { CreateRecipeDto } from './recipe.dto';
import { SwaggerExampleData } from '../../shared/types/swagger.types';

export const createRecipeExampleData: SwaggerExampleData<CreateRecipeDto> = {
  withCategories: {
    value: {
      name: 'Pyszna beza',
      content: 'To jest przykładowy przepis na wuzetkę.',
      images: [
        {
          id: '0f1021a5-38b0-4629-8c84-ed45cbcc78d3',
        },
      ],
      ingredients: [
        {
          name: 'Biszkopt',
          items: [
            {
              name: '50 dag mąki',
            },
            {
              name: '20dag kakao',
            },
          ],
        },
        {
          name: 'Krem',
          items: [
            {
              name: '50 dag śmietany 30%',
            },
            {
              name: '50 dag mascarpone',
            },
          ],
        },
      ],
    },
  },
  withoutCategories: {
    value: {
      name: 'Pyszna beza',
      content: 'To jest przykładowy przepis na wuzetkę.',
      images: [
        {
          id: '0f1021a5-38b0-4629-8c84-ed45cbcc78d3',
        },
      ],
      ingredients: [
        {
          name: '50 dag mąki',
        },
        {
          name: '20dag kakao',
        },
      ],
    },
  },
};
