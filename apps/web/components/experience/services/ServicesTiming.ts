/*
 * ============================================================
 * SERVICES CINEMATIC TIMING
 * ============================================================
 *
 * Destination services begin composing during the
 * transition itself.
 *
 * When the transition finishes, the normal service segment
 * must continue from the SAME progress instead of restarting
 * from zero.
 */

export const SERVICE_ENTRY_PRELOAD =
    0.24;