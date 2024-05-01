
#definir que tipo de aplciacion construimos
FROM node

#dnd se guarda el poryecto / imagen
WORKDIR /balanzasml

#copio o muevo el package de la aplicacion hacia el servidor
COPY package*json ./

#instalo paquetes
RUN npm install

#copiamos el resto de los archivos del server al contendor
COPY . .

#definimos el puerto de exposicion 
EXPOSE 8080

#configurar el comando de ejecucion del servidor
CMD ["npm","start"]





