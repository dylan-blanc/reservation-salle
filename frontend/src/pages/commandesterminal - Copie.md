Si commandes non autoriser, entrer ceci dans le PowerShell en mode admin :

Set-ExecutionPolicy RemoteSigned // permettre l'acces aux commandes (dangereux)

Set-ExecutionPolicy Restricted // restreindre l'acces aux commandes

Sinon, mettre les commandes dans GitBash (plus sécurisé)

---

<hr style="height: 8px; border: none; background-color: grey;">

---

### GENERER UNE CLE privé pour les token JWT :

---

(base64) (nombre de caractères)

```
openssl rand -base64 128
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

### COMMANDS COMPOSER :

Voir la version de composer :

```
composer -v
```

```
composer init
```

```
composer dump-autoload
```

# Pas besoin d'initialisé ou dump l'autoload si cela a déjà était fait, juste faire : composer i (install)

⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇ ⬇

```
composer i
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

# \&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&

# \&\&\&\&\&\&\& Commandes GIT \&\&\&\&\&\&\&\&\&\&\&\&\&

# \&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&

#### git clone "URL HTTPS GitHub" a faire dans le dossier www (ou le dossier racine de laragon)

```
git clone https://github.com/jean-ely-gendrau/NomDuDossierGit.git
```

#### change la direction du terminal, dossier source > dossier cible : possible de faire TAB pour completer la cible

```
cd mvc- (TAB = \mvc-mini\)
```

#### ouvre VS code du dossier cible dans le terminal de commande

```
code .
```

#### Voir la direction du pull et du push

```
git remote -v
```

#### Supprime l'origin et la cible

```
git remote remove origin
```

#### créer un repo GitHub

```
gh repo create NomDuRepo --public
```

#### Ajoute une nouvelle origine pull/push

```
git remote add origin https://github.com/dylan-blanc/NomDuDossierGit.git
```

#### prend en compte les modifications, nouveaux fichier ou fichier modifié = a faire avant un git commut/push

```
git add .
```

#### commit les fichier

```
git commit -m "commentaire"
```

#### crée la branche master si cela n'a pas deja était fait

```
git push --set-upstream origin master
```

#### push les modifications

```
git push
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

---

--------------------AU PIF--------------------

---

---

<hr style="height: 8px; border: none; background-color: grey;">

---

cd c:. // permet de changer de disque dur

cd NomDuDossier // permet de changer de dossier dans le terminal

cd - // retourne un dossier en arrière

pwd // affiche la destination actuel

mkdir NomDuDossierAcreer // permet de créer un dossier

touch NomDuFichier // permet de créer un fichier

ls // affiche la liste des fichier/dossier

ls -la // affiche la liste des fichier/dossier en details et ordonnée

du -sh -- \* // voir la taille de tous les dossier/fichier du dossier cible

history // historique des commandes de ce terminal (max 500)

---

## &&&&& Installation TailwindCSS (V4) - Projet Local (PHP/HTML) &&&&&

---

### 1. Installation

Ouvrez votre terminal à la racine du projet et lancez :

```bash
npm install tailwindcss @tailwindcss/cli
```

### 2. Création du fichier CSS source

Créez un fichier **`input.css`** (par exemple dans un dossier `assets/`) et ajoutez-y simplement :

```css
@import "tailwindcss";
```

### 3. Configuration des scripts

Ouvrez le fichier **`package.json`** et ajoutez ces lignes dans la section `"scripts"`.
_(Cela définit les fichiers d'entrée `-i` et de sortie `-o`. Adaptez les chemins si nécessaire)_

```json
"scripts": {
  "tw:watch": "npx @tailwindcss/cli -i ./assets/input.css -o ./assets/app.css --watch",
  "tw:prod": "npx @tailwindcss/cli -i ./assets/input.css -o ./assets/app.css --minify"
}
```

### 4. Lier le CSS dans votre PHP/HTML

⚠️ **Important :** Dans votre `index.php`, liez le fichier **généré** (ex: `app.css`), pas le fichier input.

```html
<link rel="stylesheet" href="./assets/app.css" />
```

### 5. Utilisation

**En développement :**
Lance le mode "écoute".
Cette commande surveille vos fichiers, repère les classes Tailwind que vous avez écrites dans votre HTML/PHP, et utilise `input.css` pour générer un fichier `app.css` contenant **les styles de toutes les classes détectées**.

```bash
npm run tw:watch
```

**Pour la production :**
Génère une version optimisée et minifiée du CSS.

```bash
npm run tw:prod
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

---

## &&&&& COMMANDES CLI NodesJS &&&&&

---

#### installer NVM :

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

```
nvm install <versions>
```

---

#### Changer de version :

```
node -v
```

```
npm install 20.19.0 (version)
```

```
npm use 20.19.0
```

```
nvm ls (voir toutes les versions installé et celle utilisé)
```

```
npm view react versions (react, express)
```

---

initialiser le package.json en auto-accept :

```
npm init -y
```

lancer le contenu du fichier via nodeJS 1 seule fois :

```
node NomDuFichier.js
```

---

#### Ajouter dans package.json

```
"scripts": {

"dev": "nodemon index.js"   // OU juste "dev": "nodemon" le packet et dependance étant préciser

}
```

---

permet d'installer le pacquet uniquement pour le developpement)

```
npm install --save-dev nodemon // install nodemon (--save-dev
```

permet d'utitiliser la commande sans utiliser un script

```
npx nodemon index.js
```

------- OU (via script) --------

lancer le script "dev": "nodemon index.js" dans le package.json "dev" peut avoir n'importe quel nom (unique)

```
npm run dev
```

---- .ENV ----

telecharge et install le packet dotenv

```
npm install dotenv
```

--

mettre ceci dans l'index.js

```
require("dotenv").config();
```

--

### express(framework NodeJS)

```
npm install express --save
```

### React JS

a faire dans le dossier racine car cela crée un dossier

(Commande , NomDuDossier)

```
npx create-react-app test-reactjs

```

(commande , DossierCible)

```
npx create-react-app .
```

(installer un système de router React, dossier cible)

```
npm install react-router-dom .
```

\&\&\&\&\&\&\&\&\&\&\&\&\&\&\&

installer boothstrap icons pour react, dossier cible

```
npm install react-bootstrap-icons .
```

## icones react

```
npm install  react-icons .
```

#### il faudra remplacer les SVG comme ci :

(AVANT, sans import react)

```
<svg className="bi d-block mx-auto mb-1" width="24" height="24"> <use xlinkHref="#home"></use> </svg>
```

(APRES, avec import react)

```
<House size={24} className="d-block mx-auto mb-1" />
```

#### C'est possible de modifier la taille indépendament ex :

```
<house size={32} height={24}>
```

#### ne pas oublier d'import le SVG cible dans la page ex:

```
import { House } from 'react-bootstrap-icons';
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

# &&&&& VITE &&&&&

### Créer un projet React via Vite et non pas create

---

```
npm create vite@latest NomDuDossier -- --template react

npm install react-router-dom react-icons

npm install tailwindcss @tailwindcss/vite

npm i js-cookie
```

---

si le packet tailwindcss est installer Dans vite.config.js ajouter :

```
import tailwindcss from '@tailwindcss/vite'
```

ET

```
plugins: \[react(), tailwindcss()],

})
```

---

## installer toutes les icones fontawesome

```
npm i --save @fortawesome/react-fontawesome@latest
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

## &&&&& BACKEND EXPRESS MERN &&&&&

créer un dossier séparer du dossier front-end

```
npm init -y
npm install express
npm install dotenv
npm install cors
npm install mysql2
npm install --save-dev nodemon
npm install bcrypt jsonwebtoken
```

---

<hr style="height: 8px; border: none; background-color: grey;">

---

---

## &&&&& GOOGLE AUTHENTIFICATION &&&&&

a mettre dans le frontend :

```
npm install @react-oauth/google
```

a mettre dans le backend :

```
npm install google-auth-library
```
