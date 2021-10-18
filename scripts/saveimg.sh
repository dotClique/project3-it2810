#!/bin/bash

# Script to save all images from a docker-compose.yml file
for img in $(docker-compose -f docker-compose.prod.yml config | awk '{if ($1 == "image:") print $2;}'); do
  images="$images $img"
done

docker save -o services.img $images