#!/bin/bash
# Generates gallery/manifest.json from the contents of gallery/media/
# Sorted by modification date, newest first
# Run from the public/ directory

MEDIA_DIR="gallery/media"
MANIFEST="gallery/manifest.json"

echo "[" > "$MANIFEST"

first=true
for file in $(ls -t "$MEDIA_DIR" 2>/dev/null); do
  [ -f "$MEDIA_DIR/$file" ] || continue
  [ "$file" = ".gitkeep" ] && continue
  if [ "$first" = true ]; then
    first=false
  else
    echo "," >> "$MANIFEST"
  fi
  printf '  "%s"' "$file" >> "$MANIFEST"
done

echo "" >> "$MANIFEST"
echo "]" >> "$MANIFEST"

echo "Generated $MANIFEST"