# Use uma imagem base do Node.js (ou a imagem apropriada para o seu aplicativo)
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# codigo em typescript
RUN npm run build

# Exponha a porta em que o aplicativo estará ouvindo (a mesma porta definida no docker-compose.yml)
EXPOSE 3333

# Comando para iniciar o aplicativo (o mesmo comando definido no docker-compose.yml)
CMD ["npm", "start"]
