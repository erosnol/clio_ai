#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download and optimize divine hall images
curl "https://example.com/divine-hall-1.jpg" > public/images/divine-hall-1.jpg
curl "https://example.com/divine-hall-2.jpg" > public/images/divine-hall-2.jpg
curl "https://example.com/divine-hall-3.jpg" > public/images/divine-hall-3.jpg
curl "https://example.com/divine-hall-4.jpg" > public/images/divine-hall-4.jpg
curl "https://example.com/clio-portrait.jpg" > public/images/clio-portrait.jpg

# Set proper permissions
chmod 644 public/images/*.jpg
