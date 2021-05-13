# stage2021

## Version des logiciels :

* Angular CLI : 10.1.3
* Node : 14.15.4
* PHPMyAdmin: 4.9.2
* Apache : 2.4.41
* PHP : 7.3.12

## Comment démarrer le projet ?

Installer le projet en le clonant via git, pour compiler le frontend (port 4200):

```
$ cd ../stage2021/frontend
$ ng serve --host 0.0.0.0
```

Pour compiler le backend (port 8080) :

```
$ cd ../stage2021/backend
$ node index.js
```

**_Attention:_**  changer l'url dans le fichier ../stage2021/frontend/src/app/variableGlobal.ts qui est actuellement ```http://51.210.42.27:8080``` pour mettre l'adresse où tourne le backend Node JS

_ex_ ```http://don.stemm.lu:8080```

En ce qui concerne la base de données, un fichier sql se trouve dans ../stage2021/backend/stage.sql, il suffit d'importer le fichier dans MySQL et de changer le la configuration du connexion à la db dans ../stage/backend/config/db.config.js

**_Note:_** ajouter "ajout" dans l'url pour aller dans la page d'ajout de don pour les articles 

_ex :_ ```http://don.stemm.lu:4200/ajout```
