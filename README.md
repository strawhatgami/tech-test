# VLSmart

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de logger leur watchtime sur un lecteur multimédia donné.

## 0. Installation
```
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
docker-compose up
```

## 1. Data

```
User {
  id: number,
  username: string,
  password: string
}

Session {
  id: number
  time: number
  userId: number
  playerId: string
}

Player {
  id: number
  name: string
}
```

## 2. Les étapes

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/players?token={myJWTToken}`

### 2.2 CRUD

#### 2.2.1 Un utilisateur peut créer de nouvelles sessions

#### 2.2.2 Un utilisateur peut visionner la liste des sessions de tout les utilisateurs sans restrictions

#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres sessions

### 2.3 Statistiques

#### 2.3.1 Nombre d'heure de session totale (et par player)

#### 2.3.2 Distribution des utilisateurs ayant le plus de watchtime (diagramme / liste)

#### 2.3.3 % d'utilisation par player en fonction du temps (exemple, VLC a été utilisé 3h, Windows media player 1h, winamp 1h ça nous donne 60% VLC et 20% WMP et 20% winamp)

### 2.4 Docker

#### 2.4.1 Côté BACK : dockeriser API et DB

#### 2.4.2 Côté FRONT : dockeriser le client

### Petit bonus : l'interface n'est pas belle, tu as carte blanche !

![Steps](https://i.imgflip.com/6610pz.jpg)
