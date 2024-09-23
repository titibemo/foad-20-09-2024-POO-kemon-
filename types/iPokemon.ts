export interface iPokemon {
  nom: string
  hp: number
  attaque: number
  defense: number
  sort: Function
}

export interface iDresseur {
  nom: string, 
  pokemons: iPokemon[], 
  inventaire?: iObjets[], 
}

export interface iObjets {
  nom: string, 
  utiliser: Function
}