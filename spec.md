# Specification

## Summary
**Goal:** Replace the existing 3D car game entirely with a reel-style short-video feed app called "Reel Stream."

**Planned changes:**
- Remove all car game UI, 3D canvas, and related logic from the frontend.
- Build a vertical full-screen scrollable feed where one reel card is visible at a time.
- Each reel card displays a looping video/animated placeholder background, title, description, author name, and right-aligned like/comment/share icons.
- Add a top navigation bar with the app name/logo and "For You" / "Following" tabs.
- Apply a dark background theme with vibrant non-blue/non-purple accent colors and bold typography throughout.
- Seed the feed with at least 5 static mock reel items (unique id, title, description, author, looping visual); no backend calls needed.
- Clear the Motoko backend actor to a minimal empty placeholder with no car game functions.

**User-visible outcome:** Users see a modern dark-themed reel feed app where they can scroll through full-screen video cards one at a time, view content details and author info, and interact with like/comment/share icons — with no trace of the previous car game.
