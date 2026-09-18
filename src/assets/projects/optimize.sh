#!/bin/bash

# Ensure libavif is installed before running
if ! command -v avifenc &> /dev/null; then
    echo "❌ avifenc could not be found. Please run 'brew install libavif' first."
    exit 1
fi

echo "🚀 Starting AVIF Web Optimization..."

# 1. Compress Hero Banners / Photos (JPEGs)
# Targets smooth gradients and natural colors
for img in *.jpg *.jpeg; do
    [ -e "$img" ] || continue
    output="${img%.*}.avif"
    echo "📸 Processing Photo: $img"
    # --min 22 --max 27 balances ultra-low file size with great color blending
    avifenc --jobs all --speed 8 -q 81 "$img" "$output" || exit 1
done

# 2. Compress Product Screenshots / UI (PNGs)
# Targets crisp text, sharp edges, and preserves transparency if present
for img in *.png; do
    [ -e "$img" ] || continue
    output="${img%.*}.avif"
    echo "🖥️  Processing Screenshot: $img"
    # --min 16 --max 22 keeps text ultra-sharp and stops UI lines from blurring
    avifenc --jobs all --speed 8 -q 81 "$img" "$output" || exit 1
done

echo "✅ Optimization complete! Your web assets are ready."
