import { CreateRecipeDto } from './recipe.dto';
import { SwaggerExampleData } from '../../shared/types/swagger.types';

export const createRecipeExampleData: SwaggerExampleData<CreateRecipeDto> = {
  withCategories: {
    value: {
      name: 'Pyszna beza',
      description: 'Wspaniała wuzetka prosto z Warszawy',
      content: 'To jest przykładowy przepis na wuzetkę.',
      images: [
        {
          url: 'http://localhost:3000/adres_do_obrazka.png',
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
      tags: [
        {
          name: 'ciasta',
        },
        {
          name: 'czekolada',
        },
      ],
    },
  },
  withoutCategories: {
    value: {
      name: 'Pyszna beza',
      description: 'Wspaniała wuzetka prosto z Warszawy',
      content: 'To jest przykładowy przepis na wuzetkę.',
      images: [
        {
          url: 'http://localhost:3000/adres_do_obrazka.png',
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
      tags: [
        {
          name: 'ciasta',
        },
        {
          name: 'czekolada',
        },
      ],
    },
  },
};
