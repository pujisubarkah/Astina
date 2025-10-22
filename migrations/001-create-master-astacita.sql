-- Migration: create master_astacita table
CREATE TABLE IF NOT EXISTS public.master_astacita (
  id serial PRIMARY KEY,
  astacita_ke integer NOT NULL,
  astacita varchar(1024) NOT NULL,
  image varchar(1024)
);
