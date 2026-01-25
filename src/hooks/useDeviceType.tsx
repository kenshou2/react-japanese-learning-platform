export default function useDeviceType(): "touch" | "mouse" | "unknown" {
  // We don’t use state/effect because device type is static during a session
  if (window.matchMedia('(pointer: coarse)').matches) return 'touch';
  if (window.matchMedia('(pointer: fine)').matches) return 'mouse';
  return 'unknown';
}
