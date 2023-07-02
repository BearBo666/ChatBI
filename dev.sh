TAG=${1:-latest}

docker run --rm -it \
    -p 5000:8080 \
    -p 443:443 \
     chatbi-frontend:$TAG
