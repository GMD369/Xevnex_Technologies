-- Projects table
create table projects (
  id           bigint generated always as identity primary key,
  slug         text not null unique,
  client       text not null,
  year         text,
  title        text not null,
  summary      text,
  challenge    text,
  approach     text,
  outcome      text,
  results      text[],           -- array of strings
  metrics      jsonb,            -- [{ value, label }]
  tags         text[],
  created_at   timestamptz default now()
);

-- Services table
create table services (
  id           bigint generated always as identity primary key,
  slug         text not null unique,
  kicker       text,
  title        text not null,
  description  text,
  deliverables text[],
  created_at   timestamptz default now()
);

-- Testimonials table
create table testimonials (
  id         bigint generated always as identity primary key,
  name       text not null,
  role       text,
  quote      text,
  created_at timestamptz default now()
);

-- Blog posts table
create table blog_posts (
  id        bigint generated always as identity primary key,
  slug      text not null unique,
  title     text not null,
  category  text,
  date      text,
  read_time text,
  excerpt   text,
  content   text[],            -- array of paragraphs
  created_at timestamptz default now()
);
