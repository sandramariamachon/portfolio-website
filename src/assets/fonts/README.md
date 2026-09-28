# Portfolio typography

The entire site uses **Be Vietnam Pro**, matching the original home-page hero.
All fonts are served locally, with `font-display: swap`; there are no runtime
Google Fonts, CDNFonts or CodePen font dependencies.

- `be-vietnam-pro-regular.woff2`: existing regular 400 hero face, unchanged.
- `be-vietnam-pro-medium.woff2`: 500 for navigation and project titles.
- `be-vietnam-pro-semibold.woff2`: 600 for small headings and emphasis.
- `be-vietnam-pro-bold.woff2`: 700 for the Selected Projects heading.
- `be-vietnam-pro-italic.woff2`: genuine 400 italic for quotations and book titles.

The additional Latin WOFF2 subsets were downloaded from the
[Google Fonts stylesheet](https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap)
on 28 September 2026. The existing SIL Open Font License is included in
`OFL-BeVietnamPro.txt` and covers this family.

Main headings use regular weight and slightly tightened tracking, body text
uses regular weight with relaxed line height, and labels use medium or semibold
weight. Keep future interface text on the shared `--font-sans` token.
