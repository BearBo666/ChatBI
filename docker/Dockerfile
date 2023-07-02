# stage1
FROM node:20.2.0-buster as node-builder

WORKDIR /chatbi-frontend

# Copy the package.json and install dependencies
COPY package*.json ./

## need to following line in mainland China
#RUN npm config set registry https://registry.npm.taobao.org/
#
#RUN npm config get registry
RUN npm install -g npm@9.7.2

RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build


FROM nginx:alpine as prod-nginx
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=node-builder /chatbi-frontend/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
