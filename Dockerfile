FROM node as build
RUN mkdir -p /workspace
WORKDIR /workspace
COPY . /workspace
RUN npm install
RUN npm run build
FROM nginx
COPY --from=build /workspace/dist/weather /usr/share/nginx/html
