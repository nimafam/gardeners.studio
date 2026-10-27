# Experience Engine Architecture v1

Status: Approved

Version: 1.0

Purpose:
Define the core runtime architecture of the reusable Experience Engine.

---

# Design Philosophy

Experience Engine is NOT a Website Engine.

Experience Engine is NOT an Animation Library.

Experience Engine is a Runtime responsible for orchestrating experiences regardless of how they are triggered.

It must remain completely reusable.

The engine must not know anything about:

- AKORD
- Hero
- Services
- Marketing Pages
- Three.js Scenes
- Business Logic

Everything project-specific belongs outside the Engine.

---

# Runtime Pipeline

The Experience Engine always follows the same execution pipeline.

```
Trigger
    ↓
Timeline
    ↓
Scene
    ↓
Camera
    ↓
Canvas
    ↓
Motion
    ↓
Project Layer
```

Every runtime feature must fit into this pipeline.

---

# Layer Responsibilities

## 1. Trigger Layer

Responsible for producing normalized input.

Examples

- Scroll
- Mouse
- Pointer
- Touch
- Keyboard
- Timer
- Video Time
- WebSocket
- XR Controller
- API Events

The Trigger Layer never knows about Scenes.

It only produces values.

Example

```
progress = 0.42
```

---

## 2. Timeline Layer

Responsible for converting trigger input into a unified timeline.

Timeline becomes the single source of truth.

It exposes values like

- progress
- direction
- velocity
- current frame
- current time

Scenes never read Scroll directly.

Scenes only read Timeline.

---

## 3. Scene Layer

Responsible for deciding which Scene is active.

Responsibilities

- Scene Registration
- Scene Ordering
- Active Scene
- Scene Lifecycle
- Scene Progress

The Scene Layer never reads browser APIs.

---

## 4. Camera Layer

Responsible for camera state.

Examples

- Position
- Rotation
- Zoom
- Focus
- Dolly
- Target

Camera never knows about Sections.

---

## 5. Canvas Layer

Responsible for rendering.

Examples

- Three.js
- React Three Fiber
- WebGL Renderer

Canvas only renders.

---

## 6. Motion Layer

Responsible for visual transitions.

Examples

- Fade
- Reveal
- Stagger
- SplitText
- Parallax
- Hover
- Magnetic

Motion consumes Engine State.

Motion never owns application state.

---

## 7. Project Layer

Only this layer contains business logic.

Examples

Hero

About

Services

Projects

Digital

Innovation

These consume the Engine.

The Engine never consumes them.

---

# Runtime Rules

## Rule 1

Providers store serializable application state only.

Never store

- HTMLElement
- Three.js Objects
- Camera
- Renderer
- DOM References

---

## Rule 2

Managers own runtime behavior.

Managers are headless.

Managers return

```
null
```

Managers communicate through Providers.

---

## Rule 3

Triggers are replaceable.

Scroll is only one Trigger.

The Engine must work without Scroll.

---

## Rule 4

Scenes never know who triggered them.

A Scene receives normalized timeline data only.

---

## Rule 5

Everything flows downward.

```
Trigger
↓

Timeline
↓

Scene
↓

Camera
↓

Canvas
↓

Motion
```

No layer may directly skip another layer.

---

# Current Managers

Implemented

✅ ScrollManager

Planned

⬜ TimelineManager

⬜ SceneManager

⬜ CameraManager

⬜ RouteManager

---

# Current Development Order

Foundation

↓

Experience Provider

↓

Trigger Layer

↓

Timeline Layer

↓

Scene Layer

↓

Camera Layer

↓

Canvas Layer

↓

Motion Layer

↓

Project Sections

---

# Long-term Goal

The Experience Engine should be portable.

A future project should be able to copy the Engine with minimal or no modifications.

Only the Project Layer should change.