PRAGMA foreign_keys = ON;

CREATE TABLE journey_sessions (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  story_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'abandoned')),
  total_steps INTEGER NOT NULL CHECK (total_steps BETWEEN 1 AND 50),
  current_step INTEGER NOT NULL DEFAULT 1,
  started_at TEXT NOT NULL,
  last_activity_at TEXT NOT NULL,
  completed_at TEXT,
  recovery_count INTEGER NOT NULL DEFAULT 0,
  help_variant TEXT NOT NULL DEFAULT 'none'
);

CREATE INDEX idx_journey_sessions_actor ON journey_sessions(actor_id, last_activity_at);
CREATE INDEX idx_journey_sessions_stale ON journey_sessions(status, last_activity_at);

CREATE TABLE journey_steps (
  journey_id TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  completion_mode TEXT NOT NULL CHECK (completion_mode IN ('manual', 'guided', 'safe_auto')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'blocked', 'completed')),
  viewed_at TEXT,
  completed_at TEXT,
  blocked_reason TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  help_requests INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (journey_id, step_number),
  FOREIGN KEY (journey_id) REFERENCES journey_sessions(id) ON DELETE CASCADE
);

CREATE TABLE journey_events (
  id TEXT PRIMARY KEY,
  journey_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  step_number INTEGER,
  occurred_at TEXT NOT NULL,
  payload_json TEXT NOT NULL DEFAULT '{}',
  FOREIGN KEY (journey_id) REFERENCES journey_sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_journey_events_journey ON journey_events(journey_id, occurred_at);

CREATE TABLE friction_analysis (
  id TEXT PRIMARY KEY,
  journey_id TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  reason_code TEXT NOT NULL,
  evidence_json TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  help_variant TEXT NOT NULL,
  created_at TEXT NOT NULL,
  resolved_at TEXT,
  FOREIGN KEY (journey_id) REFERENCES journey_sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_friction_unresolved ON friction_analysis(resolved_at, created_at);
