#img base
FROM node:20 as build

#criar app
WORKDIR /app

#copiar package.json
COPY package*.json ./

#instalar dependencias
RUN npm install

#copiar arquivos
COPY . .

#build
RUN npm run build

#iniciar o nginx
FROM nginx:alpine

#pegar os arquivos da dist e colocar no nginx
COPY --from=build /app/dist /usr/share/nginx/html

#porta
EXPOSE 80