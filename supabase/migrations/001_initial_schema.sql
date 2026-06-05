-- Profiles: extended user info
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses: academy content
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration_minutes INTEGER,
  difficulty TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course progress: tracks user learning
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  progress_percent INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Assessments: user assessment submissions
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL,
  responses JSONB,
  ai_readiness_score INTEGER,
  genome_data JSONB,
  status TEXT DEFAULT 'in_progress',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Genome profiles: per-user benchmark snapshot
CREATE TABLE ai_genome_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE SET NULL,
  overall_score INTEGER,
  capability_score INTEGER DEFAULT 0,
  governance_score INTEGER DEFAULT 0,
  workforce_score INTEGER DEFAULT 0,
  data_score INTEGER DEFAULT 0,
  automation_score INTEGER DEFAULT 0,
  innovation_score INTEGER DEFAULT 0,
  risk_score INTEGER DEFAULT 0,
  roi_score INTEGER DEFAULT 0,
  strengths JSONB DEFAULT '[]',
  weaknesses JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment results: detailed per-assessment output
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE SET NULL,
  assessment_type TEXT NOT NULL,
  overall_score INTEGER NOT NULL,
  dimension_scores JSONB NOT NULL,
  insights JSONB,
  certificate_id TEXT UNIQUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training recommendations: AI-generated course suggestions
CREATE TABLE training_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  provider TEXT,
  duration TEXT,
  link TEXT,
  priority INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation bookings: enterprise inquiry scheduling
CREATE TABLE consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessment_results(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  consultant_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates: issued certification records
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessment_results(id) ON DELETE CASCADE,
  title TEXT,
  level TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_ai_genome_profiles_updated
  BEFORE UPDATE ON ai_genome_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_assessment_results_updated
  BEFORE UPDATE ON assessment_results
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_genome_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses: anyone can read
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (TRUE);

-- Course progress: users manage their own
CREATE POLICY "Users can view own progress"
  ON course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON course_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Assessments: users manage their own
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON assessments FOR UPDATE
  USING (auth.uid() = user_id);

-- AI Genome profiles: users can view/update their own
CREATE POLICY "Users can view own genome profile"
  ON ai_genome_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own genome profile"
  ON ai_genome_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own genome profile"
  ON ai_genome_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Assessment results: users view own
CREATE POLICY "Users can view own results"
  ON assessment_results FOR SELECT
  USING (auth.uid() = user_id);

-- Training recommendations: users view own
CREATE POLICY "Users can view own recommendations"
  ON training_recommendations FOR SELECT
  USING (auth.uid() = user_id);

-- Consultation bookings: users manage own
CREATE POLICY "Users can view own bookings"
  ON consultation_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON consultation_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Certificates: users view own
CREATE POLICY "Users can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);
