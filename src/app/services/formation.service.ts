import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  #formations = [
    {
      "id": 1,
      "name": "Angular",
      "date": "15/02/2022",
      "duration": 5,
      "price": 2500,
      "level": "base",
      "online": false,
      "program": "Créer des composants\n" +
        "String interpollation\n" +
        "Binding propriétés DOM\n" +
        "Binding style\n" +
        "Binding classes CSS\n" +
        "Binding événements\n" +
        "Binding bidirectionnel",
      "category": "Développement",
      "teacher": "Julie Dugard",
      "student": "Sprenom2 Snom2\n" +
        "Sprenom4 Snom4\n" +
        "Sprenom5 Snom5"
    },
    {
      "id": 2,
      "name": "Excel",
      "date": "20/04/2022",
      "duration": 3,
      "price": 1200,
      "level": "base",
      "online": false,
      "program": "ligne1\n" +
        "ligne2\n" +
        "ligne3\n" +
        "ligne4",
      "category": "Bureautique",
      "teacher": "Marie Dupond",
      "student": "Sprenom2 Snom2\n" +
        "Sprenom4 Snom4\n" +
        "Sprenom5 Snom5"
    },
    {
      "id": 3,
      "name": "PhotoShop",
      "date": "25/02/2022",
      "duration": 4,
      "price": 2000,
      "level": "base",
      "online": false,
      "program": "ligne1\n" +
        "ligne2\n" +
        "ligne3\n" +
        "ligne4",
      "category": "Design",
      "teacher": "Julie Dugard",
      "student": "Sprenom2 Snom2\n" +
        "Sprenom4 Snom4\n" +
        "Sprenom5 Snom5"
    }
  ];

  constructor() { }

  getAllFormation()
  {
    return this.#formations;
  }

  getFormation(idFormation:any):any
  {
    let formationSelected:any

    this.#formations.forEach((formation:any) => {
      if (formation.id == idFormation) {
        console.log(formation)
        formationSelected = formation
      }
    })

    return formationSelected
  }
}
