CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  pdf_key TEXT,
  pdf_name TEXT,
  pdf_size INTEGER,
  published INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_published_updated
  ON projects (published, updated_at DESC);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);

INSERT OR IGNORE INTO projects
  (id, title, description, published, created_at, updated_at)
VALUES
  ('escopo', 'Gestão de Escopo', '', 0, datetime('now'), datetime('now')),
  ('tempo', 'Gestão de Tempo', '', 0, datetime('now'), datetime('now')),
  ('qualidade', 'Gestão de Qualidade', '', 0, datetime('now'), datetime('now')),
  ('recursos', 'Gestão de Recursos', '', 0, datetime('now'), datetime('now')),
  ('custo', 'Gestão de Custo', '', 0, datetime('now'), datetime('now')),
  ('comunicacoes', 'Gestão de Comunicações', '', 0, datetime('now'), datetime('now')),
  ('riscos', 'Gestão de Riscos', '', 0, datetime('now'), datetime('now')),
  ('prince2', 'Prince2', '', 0, datetime('now'), datetime('now')),
  ('aquisicoes', 'Gestão de Aquisições', '', 0, datetime('now'), datetime('now')),
  ('partes', 'Partes Interessadas e Integração', '', 0, datetime('now'), datetime('now'));
