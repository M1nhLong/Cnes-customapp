#!/bin/bash

# Check for correct usage
if [ "$#" -ne 1 ]; then
  echo "Usage: bash setup.sh [prod|dev]"
  exit 1
fi

# Determine the environment
if [ "$1" == "prod" ]; then
  SOURCE_FILE=".env.production"
elif [ "$1" == "dev" ]; then
  SOURCE_FILE=".env.development"
else
  echo "Invalid argument: $1"
  echo "Use 'prod' for production or 'dev' for development"
  exit 1
fi

# Check if the source file exists
if [ ! -f "$SOURCE_FILE" ]; then
  echo "Error: $SOURCE_FILE does not exist."
  exit 1
fi

# Move the file to .env
cp "$SOURCE_FILE" .env
echo "Successfully set up environment from $SOURCE_FILE"
