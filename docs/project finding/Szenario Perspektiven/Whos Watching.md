---
title: Who’s Watching?
---
# Core Idea

An **interactive web installation** that explores how **perceived surveillance** changes what people share, how honest they are, and how they express themselves online.

Participants enter an anonymous platform where they can post **confessions, study tips, or personal thoughts**. Some are told their post is **visible to others**, while others are told it’s **private** — but in reality, **everything is anonymous**.

The installation reveals how our sense of being watched shapes our words, tone, and openness a digital mirror of social pressure and online disinhibition.

---

## 1. **Perception of Visibility**

The system randomly assigns a visibility message when a user starts typing:

> e.g.
> - “Your message will be visible to 50 other students.”
> - “Only you can see this message.”
> - “This post might appear on the public wall.”

In truth, all posts remain anonymous but the illusion of audience changes how people behave.

Collected inputs are visualized as a **living feed of thoughts**, showing differences in emotional tone, word choice, and openness between groups.

## 2. **Behavioral & Emotional Analysis**

Using **text sentiment analysis** and **NLP techniques** (TensorFlow.js or OpenAI API), the system measures:

1. **Tone**: positive, negative, neutral
2. **Length**: brief vs. expressive
3.  **Emotional openness**: detected keywords related to vulnerability or self-expression

A dashboard shows aggregate results as evolving graphs or abstract visuals, revealing how *being watched* changes how we communicate.

## 3. **Interactive Visualization**

Posts appear on a public “confession wall” as floating text bubbles or ripples:
each color or movement represents emotional intensity or honesty level.

The audience sees only fragments — anonymized sentences drifting across the screen creating a sense of **collective digital psychology**.

> Example visualization:
>
> 1. Bright, expanding shapes → confident, open tones
> 2. Small, fading ones → cautious, reserved posts
> 3. Color gradients shift as the “mood of honesty” changes over time

## 4. **Psychological & Artistic Concept**

The installation functions both as **social experiment** and **data art**:
It visualizes the invisible tension between **privacy, trust, and truth** in the digital age.

Inspired by surveillance culture, social media behavior, and the blurred line between **authenticity and performance**, the work invites reflection:

> *Are we ever truly anonymous online?*

## 5. **Technical Realization Sketch**

* **Frontend:** React + Three.js / p5.js for animated text visualization
* **Backend:** Node.js + Socket.io for live message flow
* **AI:** TensorFlow.js (sentiment) or OpenAI text classification
* **Database:** Firebase or Supabase (for anonymous data logging)
* **Visualization:** D3.js or WebGL shaders for dynamic honesty/emotion maps

## Summary

The **“Who’s Watching?”** project is:

* **Psychologically insightful**
* **Visually thought-provoking**
* **Technically achievable**
* **Socially relevant**

It combines **web technology, data analysis, and interactive visualization** to explore a core human tension — how **the feeling of being observed** shapes what we say, think, and share.

A perfect blend of **art, tech, and behavioral science**, designed to both engage and challenge the viewer.

<div align="center">

**Author:** Imran Moujtahid

</div>
