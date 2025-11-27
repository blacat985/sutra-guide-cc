#!/bin/bash
# Image Optimization Script for Sutra Guide
# Uses macOS built-in tools (sips) to optimize PNG images
#
# USAGE:
#   ./scripts/optimize-images.sh <image-path>
#   ./scripts/optimize-images.sh public/content/samyukta-agama/chapter-577-2.png
#
# METHODS:
#   Method 1: macOS sips (built-in, converts to JPEG with quality control)
#   Method 2: pngquant (best compression, requires installation)
#   Method 3: Manual export via Preview app

set -e

IMAGE_PATH="$1"
QUALITY="${2:-75}"  # Default quality 75% (range 0-100)
MAX_WIDTH="${3:-1200}"  # Default max width 1200px (range: 800-2000)

if [ -z "$IMAGE_PATH" ]; then
  echo "Error: No image path provided"
  echo "Usage: $0 <image-path> [quality (0-100, default: 75)] [max-width (800-2000, default: 1200)]"
  echo ""
  echo "Examples:"
  echo "  $0 public/content/samyukta-agama/chapter-577-2.png"
  echo "  $0 public/content/samyukta-agama/chapter-577-2.png 80"
  echo "  $0 public/content/samyukta-agama/chapter-577-2.png 75 1000  # Resize to max 1000px width"
  exit 1
fi

if [ ! -f "$IMAGE_PATH" ]; then
  echo "Error: File not found: $IMAGE_PATH"
  exit 1
fi

# Get original file size and dimensions
ORIGINAL_SIZE=$(stat -f%z "$IMAGE_PATH")
ORIGINAL_SIZE_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1048576" | bc)
ORIGINAL_WIDTH=$(sips -g pixelWidth "$IMAGE_PATH" | awk '/pixelWidth:/ {print $2}')
ORIGINAL_HEIGHT=$(sips -g pixelHeight "$IMAGE_PATH" | awk '/pixelHeight:/ {print $2}')
echo "Original: ${ORIGINAL_SIZE_MB}MB, ${ORIGINAL_WIDTH}x${ORIGINAL_HEIGHT}px"

# Create backup
BACKUP_PATH="${IMAGE_PATH}.backup"
cp "$IMAGE_PATH" "$BACKUP_PATH"
echo "✅ Backup created: $BACKUP_PATH"

# Resize if width exceeds MAX_WIDTH
if [ "$ORIGINAL_WIDTH" -gt "$MAX_WIDTH" ]; then
  echo "Resizing from ${ORIGINAL_WIDTH}px to max ${MAX_WIDTH}px width..."
  sips --resampleWidth "$MAX_WIDTH" "$IMAGE_PATH" > /dev/null 2>&1
  RESIZED_SIZE=$(stat -f%z "$IMAGE_PATH")
  RESIZED_SIZE_MB=$(echo "scale=2; $RESIZED_SIZE / 1048576" | bc)
  RESIZE_SAVINGS=$(echo "scale=1; 100 - ($RESIZED_SIZE * 100 / $ORIGINAL_SIZE)" | bc)
  NEW_WIDTH=$(sips -g pixelWidth "$IMAGE_PATH" | awk '/pixelWidth:/ {print $2}')
  NEW_HEIGHT=$(sips -g pixelHeight "$IMAGE_PATH" | awk '/pixelHeight:/ {print $2}')
  echo "✅ Resized: ${ORIGINAL_SIZE_MB}MB → ${RESIZED_SIZE_MB}MB (${RESIZE_SAVINGS}% reduction)"
  echo "   Dimensions: ${ORIGINAL_WIDTH}x${ORIGINAL_HEIGHT}px → ${NEW_WIDTH}x${NEW_HEIGHT}px"
  # Update ORIGINAL_SIZE for compression comparison
  ORIGINAL_SIZE=$RESIZED_SIZE
  ORIGINAL_SIZE_MB=$RESIZED_SIZE_MB
else
  echo "ℹ️  Width ${ORIGINAL_WIDTH}px ≤ ${MAX_WIDTH}px, no resize needed"
fi

# Try pngquant first (best compression)
if command -v pngquant &> /dev/null; then
  echo "Using pngquant (lossy compression, 70-80% smaller)..."
  pngquant --quality=65-80 --ext .png --force "$IMAGE_PATH"
  NEW_SIZE=$(stat -f%z "$IMAGE_PATH")
  NEW_SIZE_MB=$(echo "scale=2; $NEW_SIZE / 1048576" | bc)
  SAVINGS=$(echo "scale=1; 100 - ($NEW_SIZE * 100 / $ORIGINAL_SIZE)" | bc)
  echo "✅ Optimized with pngquant: ${ORIGINAL_SIZE_MB}MB → ${NEW_SIZE_MB}MB (${SAVINGS}% reduction)"
  rm "$BACKUP_PATH"
  exit 0
fi

# Use macOS sips as fallback (converts to high-quality JPEG)
echo "Using macOS sips (converts PNG to JPEG at ${QUALITY}% quality)..."
TEMP_JPG="${IMAGE_PATH%.png}.jpg"

# Convert PNG to JPEG using sips
sips -s format jpeg -s formatOptions "$QUALITY" "$IMAGE_PATH" --out "$TEMP_JPG" > /dev/null 2>&1

if [ -f "$TEMP_JPG" ]; then
  NEW_SIZE=$(stat -f%z "$TEMP_JPG")
  NEW_SIZE_MB=$(echo "scale=2; $NEW_SIZE / 1048576" | bc)
  SAVINGS=$(echo "scale=1; 100 - ($NEW_SIZE * 100 / $ORIGINAL_SIZE)" | bc)

  echo ""
  echo "✅ Optimized with sips: ${ORIGINAL_SIZE_MB}MB → ${NEW_SIZE_MB}MB (${SAVINGS}% reduction)"
  echo ""
  echo "⚠️  Note: Image converted from PNG to JPEG"
  echo "   Original PNG backed up to: $BACKUP_PATH"
  echo "   New JPEG saved to: $TEMP_JPG"
  echo ""
  echo "To replace the PNG with JPEG:"
  echo "   1. Update YAML file to reference: ${TEMP_JPG##*/}"
  echo "   2. Remove backup: rm $BACKUP_PATH"
  echo ""
  echo "To restore original:"
  echo "   mv $BACKUP_PATH $IMAGE_PATH"
  echo "   rm $TEMP_JPG"
else
  echo "❌ sips conversion failed"
  rm "$BACKUP_PATH"
  exit 1
fi
