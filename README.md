docker run  --name dbname  -p 27018:27017 -v $(pwd)/wordsdb:/data/db --rm -d  mongo