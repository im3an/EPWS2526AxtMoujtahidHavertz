---
title: Emotional Wall
---

# Core Idea

An **interactive, anonymous “emotional wall” installation**:
People type what’s on their mind or how they feel →
The system transforms that input into **artistic, animated visual poetry** projected across walls, accompanied by music chosen by the participant.

Visitors see a **constantly evolving emotional landscape** a living reflection of everyone’s mood in the room.

---

## 1. **Emotional Color Mapping**

Use NLP or sentiment analysis (like TensorFlow.js sentiment model) to detect the mood — happy, calm, sad, anxious, hopeful —
→ map that to **color palettes**, **particle motion**, or **visual shapes**.

> e.g.
> “I feel anxious about the future” → shaky particles, cold blue tones, ripple motion.
> “I’m excited for summer” → warm orange explosion, soft flow animation.

## 2. **Word → Motion → Form**

Every word could have a *style personality*:

- “Love” = grows and glows softly
- “Anger” = shakes violently and fades
- “Hope” = rises upwards slowly
- “Lost” = drifts away into the dark

→ Use **generative typography** or **particle systems** (p5.js, Three.js, or PixiJS).

## 4. **Collective Mood Cloud**

Over time, your installation could build a *“mood climate”*:

- Aggregates all inputs and visualizes the general mood of the crowd (like a weather forecast of feelings).
- Maybe a glowing “mood orb” floats in the corner and changes color as the collective emotion shifts.

## 5. **Projection**

Use multiple projectors or large wall projections for immersion:

- The words float, merge, or dissolve into each other.
- You could use a **motion sensor** (like a Kinect or webcam) so when someone walks near the wall, their presence makes nearby emotions “stir” or “bloom.”

## 7. **Technical Realization Sketch**

- **Frontend:** React or p5.js for text input and visual rendering.
- **Backend:** Node.js + Socket.io (to broadcast new emotions to the wall in real time).
- **Projection Wall:** A second browser window running fullscreen (connected via WebSocket).
- **Extras:** TensorFlow.js (sentiment), Howler.js (audio), and some WebGL shaders for glow/distortion effects.

# Optional Artistic Angle

Give it a poetic name — something that captures emotional expression:

* **“WhisperWall”** – where emotions speak in color
* **“Echoes of Us”** – collective emotional landscape
* **“Feel/Field”** – emotional fields visualized
* **“Unspoken”** – a wall for what’s left unsaid
* **“Innerverse”** – our inner universe made visible

## Summary

Your “Interactive Emotional Wall” idea is:

* **Emotionally human**
* **Visually artistic**
* **Technically achievable**
* **Publicly powerful**

It’s exactly the kind of *art-tech-interaction* project the course description aims for.
It merges web tech, sensors/projectors, and aesthetic storytelling while staying deeply personal and accessible.


<div align="center">

**Author:** Imran Moujtahid

</div>