export interface GameData {
  adminUser: string;
  adminPass: string;
  favoriteMovie: string;
  movieGenre: string;
  password: string;
  secretMessage: string;
}

const DEFAULT_DATA: GameData = {
  adminUser: "admin",
  adminPass: "1234",
  favoriteMovie: "Interstellar",
  movieGenre: "Sci-Fi",
  password: "gravity949",
  secretMessage: "You Win! 🎉"
};

const STORAGE_KEY = "cipher_charades_data";

export function loadGameData(): GameData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_DATA, ...JSON.parse(stored) };
    }
  } catch {
    console.error("Failed to load game data");
  }
  return DEFAULT_DATA;
}

export function saveGameData(data: GameData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error("Failed to save game data");
  }
}

export function generateMovieHints(movie: string, genre: string): string[] {
  const hints: string[] = [];
  const words = movie.split(' ');

  hints.push(`🎬 Movie title starts with: '${movie[0]}'`);
  hints.push(`🧩 Title has ${words.length} word(s)`);
  hints.push(`🔤 Title has ${movie.length} characters (including spaces)`);
  hints.push(`🎭 Genre hint: ${genre}`);

  // Emoji vibes based on genre
  const g = genre.toLowerCase();
  let emojiHint: string;
  
  if (g.includes("sci")) {
    emojiHint = "🚀🌌🤯 (space / mind-blowing / futuristic vibes)";
  } else if (g.includes("horror")) {
    emojiHint = "👻😱🌑 (scary / dark / jumpscares)";
  } else if (g.includes("comedy")) {
    emojiHint = "😂🤣🎭 (funny / light-hearted / goofy)";
  } else if (g.includes("rom")) {
    emojiHint = "💖🥺🌙 (romance / feelings / relationships)";
  } else if (g.includes("action")) {
    emojiHint = "💥🔥🚗 (explosions / fights / chases)";
  } else if (g.includes("thriller") || g.includes("mystery")) {
    emojiHint = "🕵️🥷🧠 (mystery / suspense / plot twists)";
  } else if (g.includes("drama")) {
    emojiHint = "🎭😢💔 (emotional / deep / character-driven)";
  } else if (g.includes("animation") || g.includes("animated")) {
    emojiHint = "🎨✨🎬 (animated / colorful / creative)";
  } else {
    emojiHint = "🎬🤔 (hard to classify… interesting one!)";
  }
  
  hints.push(`Emoji vibes: ${emojiHint}`);
  hints.push("💡 This movie is quite popular.");
  hints.push("💡 It has some memorable scenes.");
  hints.push("💡 People often recommend this movie.");

  return hints;
}
