# RUSH B

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de stocker des scores de kills sur CS


## 1. Data  

```
User {
  id: number,
  username: string,
  password: string
}

Score {
  id: number,
  userId: number,
  kill: number,
  date: Date
}
```

## 2. Les étapes  

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/forum?token={myJWTToken}` 

### 2.2 CRUD
#### 2.2.1 Un utilisateur peut créer de nouveaux records de kills
#### 2.2.2 Un utilisateur peut visionner la liste de tout les records de kills de tout les utilisateurs sans restrictions
#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres records

### 2.3 Statistiques
#### 2.3.1 Somme des kills par users dans un temps donnée (e.g: entre le 1er décembre et 1er mars, 2015 à 2020, ...)
#### 2.3.2 Moyenne des kills sur une période donnée


### 2.4 Docker 
#### 2.4.1 Côté BACK : dockeriser API et DB
#### 2.4.2 Côté FRONT : dockeriser le client
  
## Bonus : l'interface n'est pas ~~très~~ belle, tu as carte blanche !
![Steps](https://i.imgur.com/vwQ0F2H.png)