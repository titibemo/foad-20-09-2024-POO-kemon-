import { iPokemon, iDresseur, iObjets } from './types/iPokemon';

/*----- Class Pokemon ----- */

class Pokemon implements iPokemon {
  nom: string;
  hp: number;
  attaque: number;
  defense: number;
  sort: (nomSort: string, cible: Pokemon) => number|void;

  /**
   * 
   * @param nom Nom du pokemon ('ex: Bulbizarre')
   * @param hp Point de vie du pokemon (entre 70 et 150)
   * @param attaque Point d'attaque du pokemon ( entre 30 et 50 )
   * @param defense Point de défense (entre 15 et 50)
   * @param sort 
   */
  constructor(
    nom: string, 
    hp: number, 
    attaque: number, 
    defense: number, 
    sort: (nomSort: string, cible: Pokemon) => number|void
  ){
    this.nom = nom;
    this.hp = hp;
    this.attaque = attaque;
    this.defense = defense;
    this.sort = sort;
  }

 
  /**
   * Ne sert qu'a la simulation pour séparer les tours.
   */
  separerTours(): void {
    console.log(`----------------------------Tour`);
  }

  /**
   * cette fonction est utilisée pour attaquer un pokemon cible
   * @param {Pokemon} cible - Représente le pokemon cible
   * @returns Retourne les hp du pokemon ciblé ou void si le pokemon est k.0
   * 
   */
  attaquer (cible: Pokemon): number|void{
    this.separerTours();

    const ko = this.estKO(cible);

    if(!ko){
      if(this.attaque > cible.defense){
        console.log(`${this.nom} attaque en infligeant ${this.attaque - cible.defense } à ${cible.nom}.`);
        cible.hp -= this.attaque - cible.defense   
        console.log(this.afficherStats(cible));

        if(this.estKO(cible) == true){
          return cible.hp = 0
        }
        else{
          return cible.hp
        }
        
      }
      else{
        console.log(`${this.nom} ne fait aucun dégat à ${cible.nom}, ce pokemon est trop fort !`);
        return cible.hp  
      }
    }
    else{
      cible.hp = 0;
      console.log("ce pokemon est K.O, impossible de l'attaquer");
    }
  }

  /**
   * Cette fonction est utilisée pour attaquer avec un bonus de dégat un pokemon cible
   * @param nomSort le nom du sort special du pokemon
   * @param cible le pokemon ciblé
   * @returns number si en vie ou void si déjà K.O
   */
  attaqueSpecial(nomSort: string, cible: Pokemon): number|void {
    this.separerTours();

    const ko = this.estKO(cible);
    if(!ko){
      if(this.attaque > cible.defense){
        console.log(`${this.nom} utilise son attaque special ${nomSort} en infligeant ${this.attaque+30 - cible.defense } à ${cible.nom}`);
        cible.hp -= this.attaque+30 - cible.defense;
        //console.log(this.estKO(cible));
        console.log(this.afficherStats(cible));

        if(this.estKO(cible) == true){
          return cible.hp = 0
        }
        else{
          return cible.hp
        }
        
      }
      else{
        console.log(`${this.nom} ne fait aucun dégat à ${cible.nom} ! `);
        return cible.hp  
      }
    }
    else{
      cible.hp = 0;
      console.log("ce pokemon est K.O, impossible de l'attaquer");
    }
  }

  /**
   * Cette fonction affiche les statistiques d'un pokemon (nom, hp, point d'attaqu et de défense)
   * @param pokemon pokemon
   */
  afficherStats(pokemon: Pokemon){
    console.log(`Statistique pokemon ${pokemon.nom}: hp: ${pokemon.hp}, attaque: ${pokemon.attaque} defense : ${pokemon.defense}`);
  }

  /**
   * Cette fonction vérifie si le pokmon est k.0 ou en vie
   * @param pokemon pokemon
   * @returns boolean true si k.0 (hp < 0), false si en vie
   */
  estKO(pokemon: Pokemon){
    if(pokemon.hp <= 0 ){
      console.log(` le pokemon ${pokemon.nom} est K.O !`);
      return true
    }
    else{
      return false
    }
  }
}


/*----- Class Dresseur ----- */

class Dresseur implements iDresseur{
  nom: string;
  pokemons: Pokemon[];
  inventaire?: Objets[] ;

/**
 * 
 * @param nom Nom du dresseur ('ex: Sacha')
 * @param pokemons Tableau des pokemons que le dresseur possède ["goupix', 'rattata]
 * @param inventaire Tableau d'objets que le dresseur possède ['potion', 'maxiPotion']
 */
  constructor(
    nom: string, 
    pokemons: Pokemon[], 
    inventaire?: Objets[], 
  ){
    this.nom = nom;
    this.pokemons = pokemons;
    this.inventaire = inventaire || [];
  }

  /**
   * Cette fonction invoque le pokemon pret a combattre
   * @param pokemon pokemon invoqué
   * @return void
   */
  ajouterPokemon(pokemon: Pokemon): void {
    console.log(`Le pokemon ${pokemon.nom} est appelé à combattre`);
     
    }
/*
  choisirPokemon(pokemon: Pokemon): void {
    
  }
*/

/**
 * Cette fonction ajoute un ou plusieurs objets à un dresseur
 * @param objets objet avec les propriétés de la classe Objet
 * @return void
 */
  ajouterObjet(objets: Objets[]): void {
    objets.forEach(objet =>{
      this.inventaire?.push(objet)
    })
  }

  /**
   * Cette fonction utilise l'objet (s'il existe) d'un dresseur pour l'utiliser sur un pokemon. L'objet utilisé est détruit
   * @param objet objet avec les propriétés de la classe Objet
   * @param cible le pokemon qui recevra l'objet
   * @returns void
   */
  utiliserObjet(objet: Objets, cible: Pokemon): void {

    if(this.inventaire?.length == undefined){
      console.log('impossible d\'utiliser l\objet');
      return;
    }

    for(let i = 0; i < this.inventaire.length; i++){
      if( this.inventaire.indexOf(objet) > -1){
        if( objet.nom == 'maxipotion'){
          cible.hp += 50
          this.inventaire.splice(this.inventaire.indexOf(objet), 1)
          console.log(`l'objet ${objet.nom} a bien été utilisé, le pokemon ${cible.nom} a récupéré 50 pv`);
        }
        if(objet.nom == 'ranimer' && cible.hp == 0){
          cible.hp += 70
          this.inventaire.splice(this.inventaire.indexOf(objet), 1)
          console.log(`le pokemon ${cible.nom} a été ranimé avec 70 pv`);
        }
        else{
          console.log(`le pokemon est toujours en vie est a ${cible.hp} hp`);
        }
        
      }
      else{
        console.log("Impossible a utilisé l'objet");
      }

    }
  }

  /**
   * Cette fonction vérifie si les pokemons du dresseurs sont toujours en vie
   * @param pokemons les pokemons du dresseur
   * @return void
   */
  tousPokemonKo(pokemons: Pokemon[]): void{
    let vivant: number = 0
    let pokemonVivant: string[] = [];
    pokemons.forEach(pokemon => {
      vivant += pokemon.hp
      if(pokemon.hp > 0){
        pokemonVivant.push(pokemon.nom)
      }
    });
    
    if(vivant === 0){
      console.log(`Tous les pokemons sont K.O, ${this.nom} n'a plus de pokemon, ${this.nom} a perdu !!! `);
    }
    else(
      console.log(`Il reste des pokemon en états de se battre ${pokemonVivant}`)
    )
  }

}


/* ----------- class objet ---------*/

class Objets implements iObjets{
  nom: string;
  effet: (objet: string, cible: Pokemon) => number|void;

  /**
   * 
   * @param nom Nom de l'objet ('ex: maxipotion')
   * @param effet  effet de l'objet sur un pokemon
   */
  constructor(
    nom: string, 
    effet: (objet: string, cible: Pokemon) => number|void
  ){
    this.nom = nom;
    this.effet = effet;
  }

  utiliser(objet: string, cible: Pokemon){
    //
  }

}




/* Notre personnage avec ses objets */

const pikachu: Pokemon = new Pokemon('pikachu', 100, 35, 15, (nomSort: string, cible: Pokemon) => {
  return pikachu.attaqueSpecial(nomSort, cible);
});
const magicarpe: Pokemon = new Pokemon('magicarpe', 70, 15, 15, (nomSort: string, cible: Pokemon) => {
  return magicarpe.attaqueSpecial(nomSort, cible);
});

const maxipotion = new Objets('maxipotion', (objet: string, cible: Pokemon) =>{
  console.log('la maxipotion restaure 50pv du pokemon choisi');
})
const ranimer = new Objets('ranimer', (objet: string, cible: Pokemon) =>{
  console.log('la maxipotion restaure 50pv du pokemon choisi');
})

/* Le fameux rival */

const grotadmorv: Pokemon = new Pokemon('grotadmorv', 100, 50, 15, (nomSort: string, cible: Pokemon) => {
  return grotadmorv.attaqueSpecial(nomSort, cible);
});
const racaillou: Pokemon = new Pokemon('racaillou', 70, 60, 15, (nomSort: string, cible: Pokemon) => {
  return racaillou.attaqueSpecial(nomSort, cible);
});
const maxipotion2 = new Objets('maxipotion', (objet: string, cible: Pokemon) =>{
  console.log('la maxipotion restaure 50pv du pokemon choisi');
})


const sacha = new Dresseur('sacha', [pikachu, magicarpe], [maxipotion, ranimer]);
const pierre = new Dresseur('pierre', [grotadmorv, racaillou], [maxipotion2]);



// simulation pokemon console.log()


console.log(`dresseur ${sacha.nom} VS ${pierre.nom}`);
console.log(`pokemon de sacha : `);
sacha.pokemons.forEach((pokemon,i) => {
  console.log(` pokemon ${i+1} : ${pokemon.nom}`);
});
console.log(`pokemon de pierre : `);
pierre.pokemons.forEach((pokemon,i) => {
  console.log(` pokemon ${i+1} : ${pokemon.nom}`);
});

pikachu.attaquer(grotadmorv)
grotadmorv.attaquer(pikachu)
pikachu.attaqueSpecial('attaque eclair', grotadmorv)
pierre.tousPokemonKo(pierre.pokemons)
pierre.ajouterPokemon(racaillou)
racaillou.attaqueSpecial('eboullement', pikachu)
sacha.tousPokemonKo(sacha.pokemons)
sacha.ajouterPokemon(magicarpe)
sacha.utiliserObjet(ranimer, pikachu)
pikachu.afficherStats(pikachu)
racaillou.attaqueSpecial('eboullement', pikachu)
sacha.ajouterPokemon(magicarpe)
magicarpe.attaqueSpecial('trempette', racaillou)
racaillou.attaqueSpecial('eboullement', magicarpe)
sacha.tousPokemonKo(sacha.pokemons)