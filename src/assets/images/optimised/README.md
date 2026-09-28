# Optimised hero and work images

These are compressed derivatives of the existing images in the parent folder.
All original files are preserved. No image-generation or content changes were used.

Generated with Sharp 0.35.4 (via a temporary sharp-cli install), WebP effort 6:

- Hero portrait: 256 x 256, centred square matching the existing circular crop,
  quality 84. Original: `regenerated_image_1778511595814.png`.
- Hero work image: 448 px wide, original aspect ratio, quality 82.
  Original: `regenerated_image_1781797455425.jpg`.
- Work previews: resize to cover a 640 x 480 box **without cropping or enlarging**
  (`fit: 'outside', withoutEnlargement: true`), preserving original aspect ratio,
  quality 80. The existing CSS controls the displayed crop.

| Derivative | Original | Original bytes | WebP bytes |
| --- | --- | ---: | ---: |
| hero-portrait.webp | regenerated_image_1778511595814.png | 2,031,043 | 9,868 |
| hero-work.webp | regenerated_image_1781797455425.jpg | 1,451,977 | 16,924 |
| work-pcos.webp | pcos-lifestyle-wellness.jpg | 1,566,711 | 66,218 |
| work-battery.webp | pump.png | 983,630 | 9,670 |
| work-ocr.webp | elvie-breastfeeding-elvie-breast-milk-storage-bags-pack-of-100-1125072807_1200x.webp | 45,612 | 12,698 |
| work-cultural-index.webp | images.jpeg | 11,385 | 6,902 |
| work-segmentation.webp | 04.png | 405,954 | 22,204 |
| work-chatbot.webp | 05.jpg | 678,157 | 52,272 |
| work-sentiment.webp | 06.jpg | 345,801 | 18,264 |
| work-dashboard.webp | 07.jpg | 375,944 | 21,406 |
| work-research.webp | 08.jpg | 2,151,296 | 6,402 |

Total: 10,047,510 -> 242,828 bytes (97.6% smaller).

The hero images have high fetch priority. Work previews are warmed at low
priority when their section approaches the viewport, except with Save-Data
enabled; they are decoded asynchronously for hover and touch previews.
