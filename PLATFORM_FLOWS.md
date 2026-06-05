# Tech with Brands (TwB) Platform Flows

## Complete User Journey Map

### 1. Assessment Flow

#### Free Assessment (`/assessments/free`)
- **Entry Point**: `/assessments` → Click "Start Assessment" on Free plan
- **Questions**: 5 quick questions across multiple AI Genome dimensions
- **Duration**: ~10 minutes
- **Completion Screen**: Shows percentage score
- **Next Actions**:
  - View Full Profile → `/assessment-results` (requires login)
  - Upgrade to Professional → `/assessments/professional`

#### Professional Assessment (`/assessments/professional`)
- **Entry Point**: `/assessments` → Click "Start Assessment" on Professional plan
- **Questions**: 5 comprehensive questions (expandable to 80)
- **Duration**: ~45 minutes
- **Completion Screen**: Shows score with detailed insights
- **Auth Gate**: Download results button requires:
  - User signup/login OR
  - Continue without saving (view only, no download)
- **Modal Prompt**: "Save & Print Your Results" with sign-up options
- **Next Actions**:
  - Download Results (requires auth)
  - View Full Genome Profile → `/assessment-results` (requires auth)

#### Enterprise Assessment (`/assessments/enterprise`)
- **Entry Point**: `/assessments` → Click "Start Assessment" on Enterprise plan
- **Auth Requirement**: MANDATORY - Shows auth gate immediately
- **Content**: Description of assessment scope (150+ questions)
- **Action**: Schedule with expert team via WhatsApp
- **No Standalone Assessment**: Requires expert guidance

---

### 2. Results & Analysis Flow

#### Assessment Results Page (`/assessment-results`)
- **Auth Gate**: Requires login/signup to access
- **Unauth Flow**:
  - Shows lock icon
  - Prompts to sign up or login
  - Lists benefits of account creation
- **Authenticated Flow**:
  - AI Genome Radar visualization
  - 8-dimension breakdown with scores
  - Immediate action items (prioritized by lowest scores)
  - Certification pathway (Level 1-5 progression)
  - Industry comparison (global avg, industry avg, user score)
  - Next steps with CTAs
- **Actions Available**:
  - Print & Save (opens browser print dialog)
  - Talk to Expert (WhatsApp CTA)

---

### 3. Authentication Flow

#### Sign Up (`/auth/sign-up`)
- Email + Password
- Auto-creates profile via Supabase trigger
- Redirects to sign-up-success on completion
- Email confirmation required

#### Login (`/auth/login`)
- Email + Password
- Session management via middleware
- Redirects to auth callback route

#### Sign Out (`/auth/signout`)
- Route handler `/auth/signout`
- Clears session
- Redirects to home

#### Auth Callback (`/auth/callback`)
- Handles OAuth/email confirmation flows
- Exchanges code for session
- Redirects to protected route

---

### 4. Core Feature Pages

#### Certification (`/certification`)
- Shows 5 certification levels
- Current level indicator
- Requirements for each level
- Benefits per level
- Links to academy for learning paths

#### Playbooks (`/playbooks`)
- 8 industries covered
- Implementation workflows
- Templates and resources
- Downloads available

#### Solutions (`/solutions`)
- Curated AI tools registry
- Categories and use cases
- Certification alignment ratings
- Vendor information

#### Benchmarks (`/benchmarks`)
- Industry comparisons
- Trend analysis
- Global vs. local averages
- Dimension-by-dimension breakdown

#### Academy (`/academy`)
- Certification-aligned courses
- Levels 1-5 learning tracks
- Progress tracking (requires auth)
- Certificate earning

---

### 5. Database Schema & Storage

#### Tables with RLS Enabled:
- `assessments` - User assessment responses
- `ai_genome_profiles` - 8-dimension scores
- `assessment_questions` - Question bank
- `certifications` - User certification records
- `courses` - Academy content
- `course_progress` - User progress tracking
- `playbooks` - Industry implementation guides
- `solutions` - Solution registry
- `benchmarks` - Industry trend data

#### File Storage Paths (Supabase):
- `academy-content/{course_id}/videos/`
- `academy-content/{course_id}/resources/`
- `playbooks/{industry}/templates/`
- `solutions/{vendor}/logos/`
- `certifications/{user_id}/badges/`

---

### 6. WhatsApp Integration

**Number**: +254791472688

**Integration Points**:
- Homepage hero CTA
- Services overview CTA
- Professional assessment results (Save & Print prompt)
- Enterprise assessment scheduling
- Results page expert consultation
- Footer contact
- General inquiry links

**Pre-filled Messages**:
- "Hi TwB! I'm interested in AI training for my team."
- "Hi! I want to learn more about your AI assessments."
- "Hi TwB! I want to discuss AI certification for my organization."
- "I have my assessment results and want to discuss next steps."
- "Hi TwB! I want to schedule an Enterprise Assessment."

---

### 7. Trust & Reliability Features

**Authentication Security**:
- Supabase auth with email confirmation
- Session-based security via middleware
- Row Level Security on all data tables
- Per-user data isolation

**Design for Trust**:
- Auth-gated sensitive results (assessment-results page)
- Clear signup prompts before high-value actions
- Lock icons indicating protected features
- Transparent pricing (no hidden costs)
- Expert consultation always available

**Speed & Reliability**:
- Real-time assessment scoring
- Instant result visualization (radar charts)
- No pending buttons (all actions immediate)
- Fast page loads with optimized images
- Graceful error handling

---

### 8. Missing Implementations (Ready for Content)

Currently functional with sample data:
- Dynamic assessment questions (ready for DB integration)
- Personalized genome scoring (algorithm ready)
- Course content (DB structure ready)
- Solution ratings (DB structure ready)
- Industry benchmarks (DB structure ready)

All backend tables created with RLS policies - ready for real data integration.

---

## Navigation Structure

```
/ (homepage)
├── /assessments
│   ├── /free
│   ├── /professional
│   └── /enterprise
├── /assessment-results (auth-gated)
├── /certification
├── /academy
├── /playbooks
├── /solutions
├── /benchmarks
├── /about
├── /contact
├── /services
├── /pricing
├── /auth
│   ├── /login
│   ├── /sign-up
│   ├── /sign-up-success
│   ├── /error
│   └── /callback (route handler)
├── /dashboard (auth-gated)
│   ├── /profile (auth-gated)
└── /auth/signout (route handler)
```

---

## Key Differentiators

✓ **No Fake Data** - Removed client counts, fake testimonials
✓ **Auth-Gated Results** - Protects sensitive data, builds trust
✓ **Print-Ready** - Certification documents printable for sharing
✓ **WhatsApp-First** - Fast lead capture on every key page
✓ **Independent Pages** - Each page fully functional standalone
✓ **Global Standards** - Certification levels based on global benchmarks
✓ **Local Expertise** - Kenyan market focus, WhatsApp-native experience
