FROM node

# files and folders in .dockerignore are ignored

# copy relevant files and folders to the folder /app in the container
ADD src /app/src
ADD public /app/public
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

WORKDIR /app

RUN apt-get update -yq \
    && npm ci \
    && npm run build \
    && npm install -g serve
  
EXPOSE 3000

# [Static Server](https://create-react-app.dev/docs/deployment/#static-server)
CMD serve -s build -l 3000
#CMD echo $(ls)