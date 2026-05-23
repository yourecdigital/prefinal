/**
 * Animated emojis (WebP).
 * Telegram-набор: `npm run telegram-emojis`
 * grenki — анимированная буханка хлеба 🍞 (Noto, для «Горячих закусок»)
 * sauce — соусница 🫗 (Noto; в Anik — стакан, не соусница)
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

export function telegramEmojiSrc(id: TelegramEmojiId, basePath = ""): string {
  return `${basePath.replace(/\/$/, "")}/telegram-emojis/${id}.webp`;
}
