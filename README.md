# Servidor WEB/REST con ExpressJS + Mongoose + Passport-session + ConnectMongo + Passport-Local, persistencia en MongoDB Local, process, env, args, yargs, proceso hijos, BALANCE DE CARGA con PM2 y NGINX

### Para instalar los paquetes necesarios usar:

``` npm install ```

### Para usar en local entrar a cada carpeta según el interes y ejecutar:

``` npm run dev ``` or ``` npm start ```

### Nota 1: Usar mongo local o atlas
### Nota 2: Para el puerto del server usar el parametro -p 3000 en package.json, si no se pasa parametro del puerto lo busco en .env en la variable PORT, y si no esta definida usara por defecto 8080
### Nota 3: Para comprobar el child_process consultar el endpoint /api/randoms?cant=500000000 esto genera un proceso muy grande y no bloquea el proceso del servidor que se puede seguir usando, probar entrando al localhost:port al "/"

# Balance de carga
### Nota 4: Para el balance de carga se puede usar solamente PM2 o se puede usar la configuración de NGINX que se adjunta en este readme, tambien se puede mezclar ambas.

# Como probar ?

### Configuración de NGNIX

``` 
events {
}

http {
    include       mime.types;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 8080;
        location /api/randoms/ {
            proxy_pass http://node_app;
        }
    }

}
``` 

### Para ejecutar las combinaciones posibles elegir algunos de los scripts de:

```
    "start": "node src/index.js --port 3000 --mode CLUSTER",
    "devNodemon": "nodemon src/index.js --port 3000 --mode CLUSTER",
    "pm2Fork": "pm2 start src/index.js --name server --watch -- --port 3000 --mode FORK",
    "pm2Cluster": "pm2 start src/index.js -i max --name server --watch -- --port 8080 --mode FORK",
    "pm2Monitor": "pm2 monit",
    "pm2DeleteAll": "pm2 delete all"
```