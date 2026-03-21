#!/bin/bash
# Generates gallery/manifest.json from the contents of gallery/media/
# Run from the public/ directory

MEDIA_DIR="gallery/media"
MANIFEST="gallery/manifest.json"

echo "[" > "$MANIFEST"

first=true
for file in "$MEDIA_DIR"/*; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$MANIFEST"
  fi
  printf '  "%s"' "$filename" >> "$MANIFEST"
done

echo "" >> "$MANIFEST"
echo "]" >> "$MANIFEST"

echo "Generated $MANIFEST"