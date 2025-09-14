FROM node:20-alpine as development

WORKDIR /app

RUN npm install -g @angular/cli@19

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

