/**
 * Animated emojis (WebP / GIF).
 * Telegram-набор: `npm run telegram-emojis`
 * grenki — отдельная GIF (ломтик тоста с маслом)
 */
export const TELEGRAM_EMOJI_IDS = [
  "fire", "herb", "rocket", "heart", "party", "gift",
  "fork_plate", "bento", "flatbread", "bun", "mushroom",
  "shashlik", "grenki",
  "clover", "hot_face", "stew", "fries", "sauce",
  "stopwatch", "money", "compass", "check", "phone",
  "mobile", "speech", "wine", "meat", "cooking",
  "confetti", "cart",
] as const;

export type TelegramEmojiId = (typeof TELEGRAM_EMOJI_IDS)[number];

const EMOJI_EXT: Partial<Record<TelegramEmojiId, "gif" | "webp">> = {
  grenki: "gif",
};

export function telegramEmojiSrc(id: TelegramEmojiId, basePath = ""): string {
  const ext = EMOJI_EXT[id] ?? "webp";
  return `${basePath.replace(/\/$/, "")}/telegram-emojis/${id}.${ext}`;
}
