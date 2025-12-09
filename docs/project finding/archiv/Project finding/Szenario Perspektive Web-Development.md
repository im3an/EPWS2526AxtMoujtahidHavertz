# Scenario Perspectives

## Our Approach

Rather than limiting ourselves to one of the [predefined scenarios](https://cnoss.github.io/entwicklungsprojekt/szenario-ep-2025/), we've decided to take an independent path. We believe that innovation often emerges when you leave established paths and adopt new perspectives.

While the predefined scenario undoubtedly offers a valuable framework, for our specific usage problem and vision, it seemed more sensible to develop a tailored scenario perspective. This allows us to respond more authentically to the actual needs of our stakeholders and create a prototype that doesn't have to be forced into predetermined patterns.

## Our Scenario Ideas

Below we present various scenario perspectives we're considering for our project. Each scenario is evaluated based on its feasibility, relevance, and potential impact.

### Scenario 1: [[./Szenario Perspektiven/Emotional wall.md | Emotional Wall]]

**Problem Statement:**
People often struggle to express or share their emotions – especially in public spaces. There's a lack of creative, anonymous ways to make feelings visible and experience them collectively.

**Target Audience:**
Event attendees, festival guests, museum or gallery visitors – anyone who wants to share emotions spontaneously and anonymously.

**Solution Approach:**
An interactive wall where visitors can input or speak their feelings. The system transforms these emotions into abstract, animated visuals and matching sounds that are projected on a large scale. This creates a vivid mood picture of all those present.

**Technical Challenges:**

- Emotion recognition from text or voice (ML / Sentiment Analysis)
- Real-time visualization (Canvas / WebGL / SVG Animation)
- Scalable projection & browser performance

**Evaluation Criteria from Professional Perspective:**

- **Interaction Design:** intuitive, low-threshold usage
- **Technical Implementation:** stable real-time processing
- **Aesthetics & Expression:** convincing emotional translation

---

### Scenario 2: [[./Szenario Perspektiven/Interactive Study Chooser.md| Interactive Study Chooser]]

**Problem Statement:**
Prospective students often struggle to find the right degree program – information pages are dry and impersonal.

**Target Audience:**
High school students, prospective students, trade fair visitors.

**Solution Approach:**
An interactive screen with camera and AR elements: users answer brief questions while the system responds with visual filters, facial feedback, and playful animations. At the end, a suitable degree program is suggested – emotionally, immersively, and entertainingly.

**Technical Challenges:**

- Facial recognition & emotion tracking (e.g., TensorFlow.js)
- Real-time AR filters and animations
- Personalized recommendations based on responses

**Evaluation Criteria from Professional Perspective:**

- **Usability:** intuitive and motivating
- **Technology:** stable real-time processing
- **Creativity:** connection of consultation and AR experience

---

### Scenario 3: [[./Szenario Perspektiven/Whos Watching.md| Who’s Watching? - Privacy & Behavioral Change ]]

**Problem Statement:**
People behave differently online depending on whether they feel observed. How does perceived surveillance influence honesty and expressive behavior?

**Target Audience:**
Students, online communities, privacy advocates.

**Solution Approach:**
A web portal for anonymous posts (e.g., student confessions or tips). Users receive random hints about their post's visibility ("visible to 50 people") — in reality, everything remains anonymous. The system analyzes how perceived publicity affects writing style and openness.

**Technical Challenges:**

- Building an anonymous posting system with data analysis
- Text analysis (tone, length, emotion)
- Privacy & ethical data collection

**Evaluation Criteria from Professional Perspective:**

- **Interactivity:** low-threshold, emotional
- **Technology:** solid backend architecture, sentiment analysis
- **Creativity:** social-psychological experiment as web art

---

### Scenario 4: [[./Szenario Perspektiven/The Bias Interface.md | The Bias Interface]]

**Problem Statement:**
Users often make decisions unconsciously influenced by design elements. How strongly do colors, layouts, or word choices manipulate our online decisions?

**Target Audience:**
Students, UX/UI designers, researchers in cognitive and behavioral psychology.

**Solution Approach:**
A simulated platform (e.g., for scholarships or voting), where small UI variations (button colors, size, position) are tested. The system measures how design decisions influence user behavior.

**Technical Challenges:**

- A/B testing system for UI variants
- Data collection and evaluation of user decisions
- Visualization of bias results

**Evaluation Criteria from Professional Perspective:**

- **Interactivity:** directly experienceable effect of design decisions
- **Technology:** precise tracking and analysis tools
- **Creativity:** reflects ethical questions in UX design

---

### Scenario 5: [[./Szenario Perspektiven/Mosaic Generator.md | Mosaic Generator]]

**Problem Statement:**
Collective digital art is usually static or created by individual artists. How can technology enable many users to simultaneously participate in a constantly evolving, aesthetically harmonious artwork?

**Target Audience:**
Artists, digital designers, developers, community platforms, and interactive media projects.

**Solution Approach:**
A collaborative digital platform where each user-uploaded image becomes a "pixel" in a constantly growing mosaic. Each image's position is calculated based on its dominant color and automatically integrated into a larger target graphic (e.g., a painting or logo). When hovering or zooming, the original photos become visible, revealing the diversity of contributions.

**Technical Challenges:**

- Image analysis for dominant color extraction (e.g., via *color-thief* or *k-means clustering*)
- Real-time rendering and dynamic mosaic updates with new uploads
- Performant storage and management of large image volumes (Cloudinary, Firebase, AWS S3)
- Implementation of smooth zoom and hover effects (Canvas, WebGL, or Pixi.js)
- Color-matching algorithm for optimal image placement within the target motif

**Evaluation Criteria from Professional Perspective:**

- **Interactivity:** collective, permanently changing artwork
- **Technology:** seamless integration of frontend, backend, and color analysis
- **Creativity:** aesthetic interplay of algorithms, design, and community

---

### Scenario 6: [[./Scenario Perspectives/Work Map.md | Work Map – Synced To-Do Floor Plan]]

**Problem Statement:**  
In many work environments — such as restaurants, workshops, co-working spaces, or event venues — task distribution often becomes confusing. Traditional to-do lists don’t reflect the spatial context (e.g., which table, room, or area a task belongs to). How can task management be directly linked to the physical layout of a space and synchronized in real time?  

**Target Audience:**  
Team leaders, service staff, facility managers, project teams, hospitality and event operations.  

**Proposed Solution:**  
A collaborative web app where users can create a simplified building or floor plan. On this map, individual objects (e.g., a table, room, or piece of equipment) can have tasks attached to them. Any changes or new tasks are instantly synchronized across all connected users. The platform supports daily task cycles, templates for recurring to-dos, and quick selection of frequently used tasks.  

**Technical Challenges:**  

- Real-time synchronization (e.g., via *Firebase Realtime Database*, *WebSockets*, or *Supabase*)  
- Intuitive floor plan creation with a drag-and-drop interface (Canvas or SVG-based implementation)  
- Data structure linking objects (e.g., “Table 7”) with tasks and their status  
- Recurring task logic and suggestion algorithm for frequently used to-dos  
- User and permission management (who can edit plans, who can only view)  

**Evaluation Criteria (from a professional perspective):**  

- **Interactivity:** collaborative real-time work on a visual map  
- **Technology:** seamless synchronization of data and UI elements  
- **Creativity:** merging spatial thinking with task organization  
- **Applicability:** adaptable for a wide range of use cases, from restaurants to project management  

---

### Scenario 7: [[./Scenario Perspectives/Open Search Map.md | Open Search Map – Collaborative Missing Person Search Tracker]]

**Problem Statement:**  
When a person goes missing, search efforts are often scattered across official authorities and volunteers. There is usually no unified, transparent overview of which areas have already been searched, leading to duplicated efforts and missed regions. How can technology help coordinate and visualize official and volunteer search activities to make rescue efforts more efficient and organized?  

**Target Audience:**  
Police departments, search-and-rescue organizations, volunteer groups, and concerned community members.  

**Proposed Solution:**  
A web-based interactive map that allows both police and individual volunteers to mark the areas they have already searched. Users can choose to view only officially confirmed police search zones or include additional areas covered by independent individuals. GPS data can be integrated to automatically log where searchers have been, ensuring more accurate and verifiable coverage data.  

**Technical Challenges:**  

- Integration of GPS data from mobile devices for live tracking of search areas  
- Role-based access control to distinguish between official and volunteer contributions  
- Real-time map synchronization and data updates (e.g., via *Leaflet.js*, *Mapbox*, or *Google Maps API*)  
- Secure data handling and privacy protection, especially for sensitive or personal information  
- Visual differentiation between official and unofficial search zones (e.g., color-coding, opacity layers)  

**Evaluation Criteria (from a professional perspective):**  

- **Impact:** improving coordination and transparency in missing person searches  
- **Technology:** combining mapping, GPS tracking, and real-time data synchronization  
- **Collaboration:** bridging official and community-led efforts in one shared interface  
- **Ethics & Privacy:** ensuring that data use complies with safety and privacy standards  

## Decision Matrix

| Criterion | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 |
|-----------|------------|------------|------------|------------|------------|
| **Feasibility** (1-5) | 5 | 4 | 4 | 5 | 3 |
| **Innovation** (1-5) | 3 | 3 | 5 | 3 | 2 |
| **User Impact** (1-5) | 4 | 5 | 4 | 4 | 1 |
| **Professional Relevance** (1-5) | 5 | 5 | 5 | 5 | 4 |
| **Team Interest** (1-5) | 2 | 3 | 3 | 4 | 1 |
| **Total** | 19 | 20 | 21 | 21 | 11 |

## Final Decision

> 🎯 **Selected Scenario:** [To be entered after team discussion]

**Rationale:**
[Why did we choose this scenario?]

**Next Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Reflection & Feedback

This section will be updated throughout the project to document whether our decision to create our own scenario proved correct.

**Update [Date]:**
[Lessons Learned, Challenges, Successes]

---

<div align="center">

**Status:** [Insert date]  
**Stage:** 🚧 Under Discussion | ✅ Decided

</div>