TAG=${1:-latest}

docker tag chatbi-frontend:latest panda1024/chatbi-frontend:${TAG}
docker push panda1024/chatbi-frontend:${TAG}
