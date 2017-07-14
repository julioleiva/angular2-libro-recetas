import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pollo al ajillo',
      'Un clásico dentro de la cocina tradicional española, tanto es así que raro es el bar o restaurante que no cuenta con este plato en su carta, bien como tapa o como sugerencia en la mesa!',
      'http://www.recetasderechupete.com/wp-content/uploads/2014/01/pollo_al_ajillo-525x360.jpg',
      [
        new Ingredient('pollo troceado (1,5 kg.)', 1),
        new Ingredient('dientes de ajo', 8),
        new Ingredient('300 ml. vino de Jerez o de un vino blanco de mi tierra, Ourense', 1),
        new Ingredient('300 ml. vino de Jerez o de un vino blanco de mi tierra, Ourense', 1),
        new Ingredient('Sal y pimienta negra recién molida (al gusto)', 1),
        new Ingredient('hoja de laurel', 1),
      ]),
    new Recipe('Guiso de conejo a la cerveza',
      'Este guiso o estofado utiliza como base una de las carnes que más me gusta, el conejo.',
      'http://www.recetasderechupete.com/wp-content/uploads/2016/11/conejo_guisado_cerveza-525x360.jpg',
      [
        new Ingredient('conejo de 1.500 gs.', 1),
        new Ingredient('cebollas moradas', 2),
        new Ingredient('zanahorias', 5 ),
        new Ingredient('patatas medianas', 8),
        new Ingredient('cucharadas de aceite de oliva virgen extra', 10),
        new Ingredient('cucharadas de tomate frito casero', 3),
        new Ingredient('bote de cerveza de 33 cl y vaso de agua.', 1),
        new Ingredient('hojas de laurel', 2),
        new Ingredient('cucharadas de harina de trigo (podéis emplear una sin glutén en caso de celiácos)', 4),


      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
