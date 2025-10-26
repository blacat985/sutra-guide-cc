#!/bin/bash
# Batch optimize all images larger than 1MB
# Uses macOS sips to convert PNG to JPEG

set -e

QUALITY="${1:-80}"  # Default quality 80%
MIN_SIZE_MB=1       # Only optimize images > 1MB

echo "🔍 Finding images larger than ${MIN_SIZE_MB}MB..."
echo ""

# Find all PNG images larger than 1MB
find public/content -name "*.png" -size +${MIN_SIZE_MB}M | while read -r IMAGE_PATH; do
  ORIGINAL_SIZE=$(stat -f%z "$IMAGE_PATH")
  ORIGINAL_SIZE_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1048576" | bc)

  echo "📸 Processing: $IMAGE_PATH (${ORIGINAL_SIZE_MB}MB)"

  # Run optimization script
  ./scripts/optimize-images.sh "$IMAGE_PATH" "$QUALITY"

  echo ""
done

echo "✅ Batch optimization complete!"
echo ""
echo "Next steps:"
echo "1. Review the generated JPEG files"
echo "2. Update YAML files to reference .jpg instead of .png"
echo "3. Remove .backup files when satisfied"
echo "4. Delete original .png files"
