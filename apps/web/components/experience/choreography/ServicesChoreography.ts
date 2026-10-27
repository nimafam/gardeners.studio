import type {
    SceneChoreographyDefinition,
} from "@/types/choreography";

export const servicesChoreography:
    SceneChoreographyDefinition = {
    sceneId: "services",

    /*
     * ========================================================
     * ENTRY
     * ========================================================
     *
     * About → Services transition تمام شده
     * و Camera وارد محدوده Services می‌شود.
     *
     * اینجا:
     *
     * Camera Dolly
     *      ↓
     * Services Node
     *
     * Intro Content هنوز hidden است.
     */

    entry: {
        start: 0,
        end: 0.08,
    },

    /*
     * ========================================================
     * SETTLE
     * ========================================================
     *
     * Services Node به مقصد رسیده.
     *
     * این Phase فعلاً کاملاً متعلق به Intro است:
     *
     * 0.00 → 0.25
     * Intro Reveal
     *
     * 0.25 → 1.00
     * Reading Hold
     *
     * IMPORTANT:
     *
     * Background هنوز سفید است.
     * Text هنوز Dark است.
     *
     * Takeover نباید در این Phase اجرا شود.
     */

    settle: {
        start: 0.08,
        end: 0.15,
    },

    /*
     * ========================================================
     * TRAVERSE
     * ========================================================
     *
     * این Phase بعداً Services Experience را در بر می‌گیرد.
     *
     * ساختار داخلی پیشنهادی:
     *
     * 1. Takeover
     *
     * 2. Post-Takeover Hold
     *
     * 3. Services Intro Exit
     *
     * 4. Internal Services Experience
     *
     *      Core
     *      Identity
     *      Digital
     *      Promotion
     *      ...
     *      Edge
     *
     * فعلاً Takeover کامنت است،
     * بنابراین این محدوده برای توسعه بعدی آماده می‌ماند.
     */

    traverse: {
        start: 0.15,
        end: 0.88,
    },

    /*
     * ========================================================
     * EXIT
     * ========================================================
     *
     * خروج کامل از Services World.
     *
     * بعداً Camera transition به Scene بعدی
     * در این محدوده اجرا خواهد شد.
     */

    exit: {
        start: 0.88,
        end: 1,
    },
};
