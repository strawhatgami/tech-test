# Shingeki no Smartrentin'

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de stocker le nombre d'heure d'anime regardé par jour

## 1. Data

```
User {
  id: number,
  username: string,
  password: string
}

Watchtime {
  id: number
  hours: number
  watchDate: Date
  userId: number
}
```

## 2. Les étapes

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/watchtime?token={myJWTToken}`

### 2.2 CRUD

#### 2.2.1 Un utilisateur peut créer de nouveaux scores de watchtime (on considère que le score est ajouté le même jour que le visionnage)

#### 2.2.2 Un utilisateur peut visionner la liste des watchtime de tout les utilisateurs sans restrictions

#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres scores de watchti!e

### 2.3 Statistiques

#### 2.3.1 Somme (pour tout les user) du watchtime à une date donnée

#### 2.3.2 Moyenne de watchtime

#### 2.3.3 Répartition des plus gros otaku (diagramme / liste)

### 2.4 Docker

#### 2.4.1 Côté BACK : dockeriser API et DB

#### 2.4.2 Côté FRONT : dockeriser le client

### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !

![Another one](https://i.imgur.com/e9hW7be.jpg)
