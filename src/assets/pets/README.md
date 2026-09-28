# Frela sprite assets

The user supplied `ChatGPT Image Sep 28, 2026, 04_47_07 PM.png` as the chosen character design. The original Downloads file is unchanged.

- `frela-original-poses.png`: the supplied sheet with the backdrop removed using the built-in image-generation tool. The sitting sprite and three-frame left/right running cycles use these original poses.
- `frela-directional-poses.png`: matching front, rear and diagonal running frames created with the built-in image-generation tool, using the supplied character as the reference. Each view has two gait frames; left diagonals mirror the right diagonals.

Both PNGs retain real alpha transparency. `FrelaSprite.tsx` displays crops directly from the atlases, without remote asset dependencies. Crop coordinates are based on their opaque silhouettes. After two seconds without pointer movement, the follower cycles through the original sheet's four sleeping poses. Pointer movement wakes her immediately; reduced-motion mode shows a static sleeping pose.

Follower travel is capped to the distance of each pointer movement, so Frela never accelerates faster than the cursor or keeps catching up after it stops. Her introduction bubble is hidden for the entire walk, including while sleeping, without changing the layout below the photo.

Performance: pointer samples are batched into one display-frame update, and rest/sleep use one-shot timers rather than a permanent animation loop. The sprite component is memoised; its atlases load only as it approaches the viewport. The follower uses an isolated compositor layer. Hidden-tab or stopped walks cancel their pending frame and timers.

Slow movement: the running pose has a 600 ms idle grace period (position still stops immediately), followed by sleep at two seconds. Facing changes use six pixels of accumulated travel and a ten-degree angular margin to avoid twitching at direction boundaries. Deliberate turns and wake-up remain responsive.

Touch interaction: tap the docked Frela to start, then drag the floating Frela to
guide her with a finger (or pen). Pointer capture keeps the gesture active outside
her small hit area. Only that 80px handle disables browser panning; swipes and
pinch gestures elsewhere still work normally. She follows above the finger at
the same capped pace as desktop, rests on release, and sleeps after two seconds.
Tap Frela, the docked button or the fixed Done button to finish. Ordinary page
taps do not stop a touch walk. A completed drag does not count as a stop tap.
The touch instructions sit above the safe-area inset, and the follower stays
above those controls. Height changes from browser chrome keep her in bounds;
rotation, tab changes and Escape end the walk. Desktop behaviour is unchanged.

## Background extraction prompt

Use case: background-extraction.
Asset type: transparent pixel-art sprite atlas for a website cursor-following pet.
Input image 1 is the EDIT TARGET, not merely a style reference.
Primary request: remove ONLY the dark brown/black background and all diffuse glow behind the dogs from this supplied Frela sprite sheet. Return the same complete sheet on genuinely transparent alpha. Keep the exact 1536x1024 composition, all 14 dogs, every pose, relative position, dimensions, pixel edges, thick black outlines, apricot/fawn curly fur, floppy ears, happy face, pink tongue, paw positions and sleeping poses unchanged. Preserve the black dog outlines; do not make those transparent. Do not redesign, redraw, reposition, smooth or add anything. No checkerboard painted into the image, no backdrop, no shadows or halos. This is a faithful cutout for direct sprite cropping in a website.

## Directional-frame prompt

Use case: identity-preserve.
Asset type: additional transparent pixel-art sprite atlas for the attached Frela cursor-pet.
Input image 1: exact character design and existing sprites to preserve. This is the user's chosen Frela, a happy fawn/apricot toy poodle with a fluffy head, long caramel floppy ears, big dark eyes, black pixel outline, small black nose, pink tongue, short legs and curly pompom tail. Do not redesign or add a collar.
Primary request: create ONLY the missing directional RUNNING frames matching this exact Frela. Genuinely transparent alpha background, no glow, no backdrop, no grid or labels. Keep the same pixel-art line weight, colours, proportions and crisp stepped pixel edges as the supplied image.
Composition: square sprite atlas, EXACTLY 4 equal columns and 2 equal rows, 8 full-body dogs total. Every cell contains one complete Frela, centred, consistent scale, at least 15% transparent padding around each dog.
Column 1 (both rows): running UP/NORTH away from viewer, rear view with no visible face.
Column 2 (both rows): running DOWN/SOUTH toward viewer, frontal face visible.
Column 3 (both rows): running diagonally UP-RIGHT/NORTHEAST away, rear three-quarter view.
Column 4 (both rows): running diagonally DOWN-RIGHT/SOUTHEAST toward viewer, front three-quarter view.
Row 1: first running gait with front-right and rear-left legs extended.
Row 2: alternate running gait with opposite front-left and rear-right legs extended.
The two frames in each column must have a matching head/body position and visibly different leg positions. These are running, not sitting poses. Pixel outlines stay black and fully opaque, body fully opaque. No ground shadows, no text or watermark. All 8 poses use the SAME attached character, not a simplified substitute.
