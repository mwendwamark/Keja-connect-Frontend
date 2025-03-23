#!/bin/bash

# Create the carousel-images directory if it doesn't exist
mkdir -p src/assets/carousel-images

# Download sample hostel images from Unsplash (free to use)
curl -L "https://images.unsplash.com/photo-1555854877-bab0e564b8d5" -o src/assets/carousel-images/hostel1.jpg
curl -L "https://images.unsplash.com/photo-1576495199011-eb94736d05d6" -o src/assets/carousel-images/hostel2.jpg
curl -L "https://images.unsplash.com/photo-1595576508898-0ad5c879a061" -o src/assets/carousel-images/hostel3.jpg
curl -L "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" -o src/assets/carousel-images/hostel4.jpg
