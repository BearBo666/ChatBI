TAG=${1:-latest}

docker build -t chatbi-frontend:$TAG  -f ./docker/Dockerfile .
