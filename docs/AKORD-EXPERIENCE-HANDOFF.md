# AKORD Experience Engine — Development Handoff

## Status
Active development. This document records the current architectural direction and reasoning behind recent Services Experience work. Inspect the repository before implementation changes because code may have evolved beyond this document.

## Current Focus
The current focus is the AKORD Services Experience:

Core → Identity → Digital → Promotion → Edge

The Services Experience must not simply repeat the navigation language used by earlier main Experience sections. Once Services takes over, the five Service environments use a distinct internal choreography system.

## Service Concepts

### 01 — Core · The Score
Core represents structure, foundation, composition, organization, and system.

### 02 — Identity · The Voice
**Identity** is the emphasized Service name; “The Voice” is the conceptual subtitle.

A voice is what makes a musician recognizable across a crowded hall. We craft identities that are unmistakable — coherent, expressive, and built to last across every touchpoint.

Services:
- Brand naming
- Visual identity & logo design
- Brand book & guidelines
- Stationery & office suite design
- Verbal identity & tone of voice
- Sonic branding
- Tagline & slogan development

### 03 — Digital · The Stage
Digital represents the environment where the brand performs and becomes interactive. Identity → Digital developed around resonance → transmission → stage.

### 04 — Promotion
Promotion represents reach, amplification, and outward movement.

### 05 — Edge
Edge represents concentration, differentiation, strategic advantage, and a threshold toward what comes next.

## Current Experience Architecture
Known concepts/files from the current development history include:
- `ServicesExperience.tsx`
- `ServicesExperienceConfig.ts`
- `ServicesTimelineConfig.ts`
- `ResolveServicesTimeline.ts`
- `ServicesCinematicStage.tsx`
- `ServiceExperienceRenderer.tsx`
- `ServicesTiming.ts`

Service-specific areas include `core`, `identity`, `digital`, `promotion`, and `edge`.

Transition architecture includes concepts/files such as:
- `CoreToIdentity`
- `IdentityToDigital`
- `DigitalToPromotion`
- `PromotionToEdge`
- `ServiceTransition`
- `ServiceTransitionStage`
- `TransitionRhythmConfig`
- `ResolveTransitionRhythm`

Inspect the repository for exact current filenames and exports.

## Previous Major Problem — Scroll Lock
At one stage the Experience became stuck after repeated scrolling or direction changes. Browser scrollbar movement and later debug updates could stop corresponding to Experience changes. This was addressed sufficiently to continue development.

Lesson: do not casually introduce browser-level scroll locking. Manage navigation ownership rather than freezing browser scroll.

## Previous Major Problem — Uneven Scroll Rhythm
The Services Experience suffered from pauses between wheel events, jerky progress, and inconsistent speed. A smoothed Services progress layer was introduced, with damping around `9` during a stabilized iteration. Do not tune smoothing while debugging unrelated transition behavior unless necessary.

## Weighted Services Timeline
Services and transitions were represented as weighted timeline segments. Increasing transition weight exposed a deeper UX problem: users needed more wheel input to finish transitions. This led to the current architecture decision.

## Critical Current Interaction Decision
Service content may remain scroll-driven.

Service transitions must be **scroll-triggered but time-driven**:

Service → user reaches transition → transition begins → transition owns progress → runs 0 → 1 automatically → destination settles → normal navigation resumes.

Incorrect:
Identity → wheel → IdentityToDigital starts → user stops → animation freezes → another wheel gesture is required.

Correct:
Identity → wheel triggers transition → user releases wheel → IdentityToDigital completes autonomously → Digital arrives and settles.

The Experience should behave like directed choreography rather than a frame scrubber.

## ServiceTransitionStage
A major improvement was introducing a Transition Stage so handoffs behave as continuous transformations:

FROM SERVICE → departure → TRANSITION → TO SERVICE → settle

During a transition:
- source Service may remain visible
- source departs
- transition visual takes ownership
- destination begins appearing before transition completion
- destination settles
- transition hands ownership to destination

## Destination Preload
Destination Services can begin internal composition during the preceding transition.

Example:
Digital may reach about `localProgress = 0.24` during Identity → Digital.

Incorrect continuity:
Transition: Digital 0 → 0.24
then Digital Service: 0 → 1

Correct continuity:
Transition: Digital 0 → 0.24
then Digital Service: 0.24 → 1

This prevents visible rewind.

## Transition Rhythm
A centralized rhythm system was introduced around semantic phases:

departure hold → motion → arrival → arrival hold

A conceptual profile includes:
- duration
- departureHoldEnd
- motionStart
- motionEnd
- arrivalStart
- arrivalEnd
- visualExitStart
- destinationPreload

`ResolveTransitionRhythm` converts raw transition progress into semantic motion progress.

## Transition Profiles
Starting design intent:
- Core → Identity: deliberate, organic, composed; ~1650 ms
- Identity → Digital: deep, cinematic, resonance/transmission/stage; ~1950 ms
- Digital → Promotion: energetic, outward, quicker; ~1500 ms
- Promotion → Edge: heavier, concentrated, dramatic threshold; ~1850 ms

These are starting points, not immutable constants.

## Current Architectural Transition
Originally:
physical scroll → ServicesTimeline → transition segment localProgress → ServiceTransitionRuntime.progress → visual transition

This caused transition progress to stop when scroll input stopped.

Current target:
physical scroll → ServicesTimeline detects transition → trigger autonomous transition → requestAnimationFrame/time-driven progress → 0 → 1 → commit destination

During an autonomous transition, `ServiceTransitionRuntime.progress` must come from time-driven transition state, not directly from `activeSegment.localProgress`.

## Autonomous Transition Controller
Recent work was moving autonomous transition control into existing `ServicesExperience.tsx` rather than creating unnecessary controller files.

Conceptual state:

```ts
{
  id,
  progress,
  completed
}
```

When a physical transition segment is reached:
1. detect transition ID
2. prevent duplicate trigger
3. read duration from Transition Rhythm profile
4. start `requestAnimationFrame`
5. animate progress 0 → 1
6. mark completed
7. visually commit destination

## Important Synchronization Problem
Autonomous visual progress and physical scroll timeline can diverge.

Example:
- physical IdentityToDigital progress = 0.20
- visual autonomous IdentityToDigital progress = 1.00

After autonomous completion, the renderer must not rewind to physical transition progress.

Instead:
transition completes → Digital is visually committed → Digital remains visible → physical timeline catches up → normal Digital progression resumes.

## Current Testing Goal
1. Navigate to Identity.
2. Begin scrolling toward Digital.
3. As soon as Identity → Digital begins, completely stop wheel input.
4. Observe.

Expected: the entire transition continues automatically and reaches Digital.

Not expected: transition freezes halfway.

## Tests After Forward Transition Works
- Reverse navigation
- Fast wheel input
- Rapid direction changes
- Re-trigger protection while physical timeline remains in the same transition segment
- No blank frames
- No destination rewind
- No debug/runtime freezes

## React / Type Safety
Hooks must remain unconditional. Resolve safe defaults first, call hooks, then conditionally render.

`ServiceTransitionRuntime.definition` may be nullable. Guard it and narrow the type rather than relying on widespread non-null assertions.

## Legacy Architecture
Older transition resolver/config systems may still exist. Before deleting anything, search imports, identify consumers, and confirm obsolescence.

## Current Priority
1. autonomous forward transition completion
2. physical/visual timeline synchronization
3. destination commit
4. reverse navigation
5. rapid wheel protection
6. timing polish
7. full Core → Edge pass
8. Services exit / next major section handoff

## Next Major Experience Task
Once internal Services navigation is stable:
Edge → Services exit → handoff to the next major website experience/section.

## Definition of Done
Services navigation is stable when slow and fast scrolling work; transitions finish without continuous wheel input; reverse navigation works; no state freezes occur; no blank frames or rewinds appear; transitions retain distinct personalities; and Core → Edge feels like one continuous composition.
