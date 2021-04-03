import { Pokemon } from '@/models/pokemon';

export default class PokemonService {
  static localStorageKey = 'tokopedia_my_pokemon_list';

  static getMyPokemon() {
    if (localStorage && localStorage[this.localStorageKey]) {
      return JSON.parse(localStorage[this.localStorageKey]);
    }

    this.setMyPokemon({});
    return {};
  }

  static setMyPokemon(list) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
  }

  static addPokemon(pokemon: Pokemon, name: string) {
    let list = this.getMyPokemon();

    if (!list[pokemon.name]) {
      list[pokemon.name] = {};
      list[pokemon.name].pokemon = pokemon;
      list[pokemon.name].names = [];
    }

    if (!this.isNameUsed(pokemon.name)) {
      list[pokemon.name].names.push(name);
    }

    this.setMyPokemon(list);
  }

  static removePokemon(pokemon: string, name: string) {
    let list = this.getMyPokemon();

    const index = list[pokemon].names.indexOf(name);

    if (index > -1) {
      list[pokemon].names.splice(index, 1);
    }

    if (list[pokemon].names.length == 0) {
      delete(list[pokemon]);
    }

    this.setMyPokemon(list);
  }

  static isNameUsed(name: string) {
    let list = this.getMyPokemon();

    for (let key in list) {
      if (list[key].names.indexOf(name) > -1) {
        return true;
      }
    }

    return false;
  }

  static getPokemonOwned(pokemon: string) {
    let list = this.getMyPokemon();

    if (list[pokemon]) {
      return list[pokemon].names.length;
    }

    return 0;
  }
}
