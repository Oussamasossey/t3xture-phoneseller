/**
 * Unsplash CDN sizing helper. Product data stores the bare photo URL, every
 * consumer asks for the width it actually needs so cards don't pull 4K assets.
 */
export function unsplash(src: string, width = 800, quality = 80) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality),
  });
  return `${src}?${params.toString()}`;
}

/** Square crop used by thumbnails, cart lines and carousels. */
export function square(src: string, size = 400) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(size),
    h: String(size),
    q: "80",
  });
  return `${src}?${params.toString()}`;
}
