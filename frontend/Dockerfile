# Etapa de build
FROM node:20 as build

# Criar o diretório do app
WORKDIR /app

# Copiar os arquivos package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar os arquivos do projeto e criar o build
COPY . .
RUN npm run build

# Etapa de produção com Nginx
FROM nginx:alpine

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos de build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80
