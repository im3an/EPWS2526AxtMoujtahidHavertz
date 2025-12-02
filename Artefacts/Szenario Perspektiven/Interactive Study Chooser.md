---
title: Interactive Study Chooser
---

# Core Idea

An **interactive, AI-driven installation** that helps visitors discover their ideal field of study not through boring surveys, but through **emotion-aware, playful interaction**.

People stand in front of a **large display with a camera**. They answer short, creative questions about interests and personality while the system responds in real time with **AR filters, dynamic animations, and visual effects** that reflect their energy and reactions.
At the end, the system reveals **a personalized “study persona”** and suggests matching study programs, all wrapped in an engaging, cinematic experience.

---

## 1. **Emotion & Expression Tracking**

Using **face tracking and "[sentiment detection](https://github.com/vladmandic/human)"** (via TensorFlow.js or MediaPipe), the system observes micro-expressions, tone, and energy to understand how the participant reacts to each question.

> e.g.
> Smiling confidently → “You seem curious and open, maybe Media Design suits you.”
> Hesitating or thinking deeply → “You might enjoy Informatics or Philosophy.”

The camera feed adds **real-time AR filters** that visually mirror emotional responses glowing halos for excitement, pixel clouds for curiosity, soft light rays for calmness.

## 2. **Interactive Question Flow**

Participants answer a series of **fun, intuitive prompts** displayed on the screen:

* “Would you rather design the world or decode it?”
* “Do you see beauty in logic?”
* “Pick your vibe → ✨Creative | ⚙️Analytical | 💡Inventive | 🌍Social

Each response dynamically alters the visual environment the background colors shift, shapes morph, and AR effects reflect personality traits.

## 3. **AI Persona & Study Match**

After 1–2 minutes of interaction, the system generates a **visualized study persona**, e.g.:

* *“The Visionary”* – loves to create and experiment → Design / Media Arts
* *“The Analyzer”* – precise, thoughtful → Computer Science / Data Engineering
* *“The Connector”* – empathic and communicative → Social Sciences / Marketing

Results are displayed with stylish typography, color-coded moods, and playful AR overlays.

## 4. **Projection & Immersion**

The installation uses **a large display or projection wall** to make participants feel part of a live experience.
Passersby can see the evolving visuals each participant adds to the collective “gallery of study personas,” forming a **living, colorful mosaic of academic inspiration**.

## 5. **Technical Realization Sketch**

* **Frontend:** React + Three.js or p5.js for AR visuals & animations
* **Backend:** Node.js + WebSocket for live persona generation
* **AI/ML:** TensorFlow.js (emotion/sentiment detection), OpenAI API (text classification)
* **Camera Input:** MediaPipe for real-time face & expression tracking
* **Audio Layer:** Howler.js for dynamic soundscapes per persona

## Summary

Your **Interactive Study Chooser** idea is:

* **Emotionally intelligent**
* **Highly visual and interactive**
* **Technically innovative yet realistic**
* **Perfect for public events or university showcases**

It merges **AR, emotion AI, and user-centered design** into an experience that’s both playful and meaningful, turning academic orientation into a moment of discovery, creativity, and joy.

<div align="center">

**Author:** Imran Moujtahid

</div>
