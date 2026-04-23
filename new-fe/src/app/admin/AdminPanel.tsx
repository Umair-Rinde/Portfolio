"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  demoUrl: string | null;
  codeUrl: string | null;
  stars: number;
  forks: number;
  status: string;
};

type Skill = {
  id: number;
  name: string;
  level: number;
  color: string;
  image: string;
  experience: string;
  description: string;
};

type Company = {
  id: number;
  name: string;
  logo: string | null;
  role: string | null;
  duration: string | null;
  website: string | null;
  projects: string[];
  technologies: string[];
};

type User = {
  id: number;
  email: string;
  name: string | null;
  role: "user" | "admin";
  createdAt: string;
};

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) msg = data.error;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  return (await res.json()) as T;
}

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) msg = data.error;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  const data = (await res.json()) as { path: string };
  if (!data?.path) throw new Error("Upload failed");
  return data.path;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <div className="text-xs text-foreground/70">{label}</div>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-md border bg-background px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-md border bg-background px-3 py-2 text-sm min-h-24",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function DropzoneImage({
  value,
  label,
  onUploaded,
}: {
  value: string | null;
  label: string;
  onUploaded: (path: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const path = await uploadImage(file);
      onUploaded(path);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-xs text-foreground/70">{label}</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Uploading..." : "Choose file"}
        </Button>
      </div>

      <div
        className={[
          "rounded-xl border border-dashed p-4 bg-background/40",
          isOver ? "border-primary/60 bg-primary/5" : "border-foreground/20",
        ].join(" ")}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg border bg-background overflow-hidden flex items-center justify-center shrink-0">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-xs text-foreground/50">No image</div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium">
              {busy ? "Uploading..." : "Drop an image here or click to upload"}
            </div>
            <div className="text-xs text-foreground/60 truncate">
              {value ? value : "Stores into /public/uploads and saves the path."}
            </div>
          </div>
        </div>
      </div>

      {err ? <div className="text-xs text-destructive">{err}</div> : null}
    </div>
  );
}

function TagEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    if (value.includes(t)) return;
    onChange([...value, t]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <TextInput
          value={draft}
          placeholder={placeholder ?? "Add item..."}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant="secondary" onClick={add}>
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((t) => (
            <button
              key={t}
              type="button"
              className="px-2 py-1 text-xs rounded-full border bg-foreground/5 hover:bg-foreground/10"
              onClick={() => onChange(value.filter((x) => x !== t))}
              title="Click to remove"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PanelShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xl font-semibold">{title}</div>
          {description ? <div className="text-sm text-foreground/70">{description}</div> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState<"projects" | "skills" | "companies" | "users" | "codesnippet">(
    "projects",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [codeSnippet, setCodeSnippet] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, s, c, u, sn] = await Promise.all([
        api<Project[]>("/api/projects"),
        api<Skill[]>("/api/skills"),
        api<Company[]>("/api/companies"),
        api<User[]>("/api/users"),
        api<{ value: string }>("/api/codesnippet"),
      ]);
      setProjects(p);
      setSkills(s);
      setCompanies(c);
      setUsers(u);
      setCodeSnippet(sn.value ?? "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const tabs = useMemo(
    () =>
      [
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "companies", label: "Companies" },
        { id: "users", label: "Users" },
        { id: "codesnippet", label: "Code snippet" },
      ] as const,
    [],
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 cursor-default">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Admin Panel</h1>
            <p className="text-foreground/70 mt-1 text-sm">Manage portfolio content stored in SQLite.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => void refresh()} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Button
              key={t.id}
              variant={tab === t.id ? "default" : "outline"}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </div>

        {tab === "projects" ? <ProjectsPanel items={projects} onChanged={() => void refresh()} /> : null}
        {tab === "skills" ? <SkillsPanel items={skills} onChanged={() => void refresh()} /> : null}
        {tab === "companies" ? <CompaniesPanel items={companies} onChanged={() => void refresh()} /> : null}
        {tab === "users" ? <UsersPanel items={users} onChanged={() => void refresh()} /> : null}
        {tab === "codesnippet" ? (
          <CodeSnippetPanel value={codeSnippet} setValue={setCodeSnippet} onSaved={() => void refresh()} />
        ) : null}
      </div>
    </div>
  );
}

// ---- Panels (same behavior as before) ----

function ProjectsPanel({ items, onChanged }: { items: Project[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const empty: Project = {
    id: Date.now(),
    title: "",
    description: "",
    techStack: [],
    image: "",
    demoUrl: null,
    codeUrl: null,
    stars: 0,
    forks: 0,
    status: "Stable",
  };

  const [draft, setDraft] = useState<Project>(empty);

  const startCreate = () => {
    setEditing(null);
    setDraft({ ...empty, id: Math.max(1, Math.floor(Date.now() / 1000)) });
    setErr(null);
    setOpen(true);
  };

  const startEdit = (p: Project) => {
    setEditing(p);
    setDraft(p);
    setErr(null);
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      if (editing) {
        await api<Project>(`/api/projects/${editing.id}`, { method: "PUT", body: JSON.stringify(draft) });
      } else {
        await api<Project>("/api/projects", { method: "POST", body: JSON.stringify(draft) });
      }
      setOpen(false);
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const del = async (p: Project) => {
    if (!confirm(`Delete project "${p.title}"?`)) return;
    setBusy(true);
    setErr(null);
    try {
      await api<{ ok: true }>(`/api/projects/${p.id}`, { method: "DELETE" });
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelShell title="Projects" description="Create / edit / delete the featured projects shown on the homepage.">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm text-foreground/70">{items.length} total</div>
        <Button onClick={startCreate}>New project</Button>
      </div>

      {err ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">{err}</div>
      ) : null}

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl border bg-background/40 p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="text-xs text-foreground/70 mt-1">
                #{p.id} • {p.status} • {p.techStack.join(", ")}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" onClick={() => startEdit(p)} disabled={busy}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => void del(p)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="ID (number)">
                <TextInput
                  type="number"
                  value={draft.id}
                  onChange={(e) => setDraft({ ...draft, id: Number(e.target.value) })}
                  disabled={!!editing}
                />
              </Field>
              <Field label="Status">
                <TextInput value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} />
              </Field>
            </div>

            <Field label="Title">
              <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </Field>
            <Field label="Description">
              <TextArea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </Field>

            <Field label="Tech stack">
              <TagEditor value={draft.techStack} onChange={(next) => setDraft({ ...draft, techStack: next })} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Project image">
                <DropzoneImage value={draft.image} label="Upload image" onUploaded={(path) => setDraft({ ...draft, image: path })} />
              </Field>
              <Field label="Demo URL (optional)">
                <TextInput
                  value={draft.demoUrl ?? ""}
                  onChange={(e) => setDraft({ ...draft, demoUrl: e.target.value ? e.target.value : null })}
                />
              </Field>
              <Field label="Code URL (optional)">
                <TextInput
                  value={draft.codeUrl ?? ""}
                  onChange={(e) => setDraft({ ...draft, codeUrl: e.target.value ? e.target.value : null })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stars">
                  <TextInput type="number" value={draft.stars} onChange={(e) => setDraft({ ...draft, stars: Number(e.target.value) })} />
                </Field>
                <Field label="Forks">
                  <TextInput type="number" value={draft.forks} onChange={(e) => setDraft({ ...draft, forks: Number(e.target.value) })} />
                </Field>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PanelShell>
  );
}

function SkillsPanel({ items, onChanged }: { items: Skill[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const empty: Skill = {
    id: -1,
    name: "",
    level: 50,
    color: "from-blue-500 to-cyan-500",
    image: "",
    experience: "",
    description: "",
  };
  const [draft, setDraft] = useState<Skill>(empty);

  const startCreate = () => {
    setEditing(null);
    setDraft(empty);
    setErr(null);
    setOpen(true);
  };
  const startEdit = (s: Skill) => {
    setEditing(s);
    setDraft(s);
    setErr(null);
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      if (editing) {
        await api<Skill>(`/api/skills/${editing.id}`, { method: "PUT", body: JSON.stringify(draft) });
      } else {
        await api<Skill>("/api/skills", { method: "POST", body: JSON.stringify(draft) });
      }
      setOpen(false);
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const del = async (s: Skill) => {
    if (!confirm(`Delete skill "${s.name}"?`)) return;
    setBusy(true);
    setErr(null);
    try {
      await api<{ ok: true }>(`/api/skills/${s.id}`, { method: "DELETE" });
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelShell title="Skills" description="Manage the skills list shown in About.">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm text-foreground/70">{items.length} total</div>
        <Button onClick={startCreate}>New skill</Button>
      </div>

      {err ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">{err}</div>
      ) : null}

      <div className="grid gap-3">
        {items.map((s) => (
          <div key={s.id} className="rounded-xl border bg-background/40 p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold truncate">{s.name}</div>
              <div className="text-xs text-foreground/70 mt-1">
                #{s.id} • level {s.level} • {s.color}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" onClick={() => startEdit(s)} disabled={busy}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => void del(s)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit skill" : "New skill"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Field label="Name">
              <TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Level (0-100)">
                <TextInput
                  type="number"
                  value={draft.level}
                  onChange={(e) => setDraft({ ...draft, level: Number(e.target.value) })}
                />
              </Field>
              <Field label="Color (Tailwind gradient classes)">
                <TextInput value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} />
              </Field>
            </div>

            <Field label="Skill image">
              <DropzoneImage value={draft.image} label="Upload image" onUploaded={(path) => setDraft({ ...draft, image: path })} />
            </Field>
            <Field label="Experience">
              <TextArea value={draft.experience} onChange={(e) => setDraft({ ...draft, experience: e.target.value })} />
            </Field>
            <Field label="Description">
              <TextArea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </Field>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PanelShell>
  );
}

function CompaniesPanel({ items, onChanged }: { items: Company[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const empty: Company = {
    id: -1,
    name: "",
    logo: null,
    role: null,
    duration: null,
    website: null,
    projects: [],
    technologies: [],
  };
  const [draft, setDraft] = useState<Company>(empty);

  const startCreate = () => {
    setEditing(null);
    setDraft(empty);
    setErr(null);
    setOpen(true);
  };
  const startEdit = (c: Company) => {
    setEditing(c);
    setDraft(c);
    setErr(null);
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      if (editing) {
        await api<Company>(`/api/companies/${editing.id}`, { method: "PUT", body: JSON.stringify(draft) });
      } else {
        await api<Company>("/api/companies", { method: "POST", body: JSON.stringify(draft) });
      }
      setOpen(false);
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const del = async (c: Company) => {
    if (!confirm(`Delete company "${c.name}"?`)) return;
    setBusy(true);
    setErr(null);
    try {
      await api<{ ok: true }>(`/api/companies/${c.id}`, { method: "DELETE" });
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelShell title="Companies" description="Manage the experience/companies section content.">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm text-foreground/70">{items.length} total</div>
        <Button onClick={startCreate}>New company</Button>
      </div>

      {err ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">{err}</div>
      ) : null}

      <div className="grid gap-3">
        {items.map((c) => (
          <div key={c.id} className="rounded-xl border bg-background/40 p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold truncate">{c.name}</div>
              <div className="text-xs text-foreground/70 mt-1">
                #{c.id} • {c.role ?? "—"} • {c.duration ?? "—"}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" onClick={() => startEdit(c)} disabled={busy}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => void del(c)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit company" : "New company"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Field label="Name">
              <TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Logo">
                <DropzoneImage value={draft.logo} label="Upload logo" onUploaded={(path) => setDraft({ ...draft, logo: path })} />
              </Field>
              <Field label="Website (optional)">
                <TextInput value={draft.website ?? ""} onChange={(e) => setDraft({ ...draft, website: e.target.value ? e.target.value : null })} />
              </Field>
              <Field label="Role (optional)">
                <TextInput value={draft.role ?? ""} onChange={(e) => setDraft({ ...draft, role: e.target.value ? e.target.value : null })} />
              </Field>
              <Field label="Duration (optional)">
                <TextInput value={draft.duration ?? ""} onChange={(e) => setDraft({ ...draft, duration: e.target.value ? e.target.value : null })} />
              </Field>
            </div>

            <Field label="Projects / contributions">
              <TagEditor value={draft.projects} onChange={(next) => setDraft({ ...draft, projects: next })} />
            </Field>
            <Field label="Technologies used">
              <TagEditor value={draft.technologies} onChange={(next) => setDraft({ ...draft, technologies: next })} />
            </Field>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PanelShell>
  );
}

function CodeSnippetPanel({
  value,
  setValue,
  onSaved,
}: {
  value: string;
  setValue: (v: string) => void;
  onSaved: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      await api<{ value: string }>("/api/codesnippet", { method: "PUT", body: JSON.stringify({ value }) });
      onSaved();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelShell title="Code snippet" description="Edits the code block shown in About.">
      {err ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">{err}</div>
      ) : null}

      <Field label="Snippet">
        <TextArea value={value} onChange={(e) => setValue(e.target.value)} className="min-h-80 font-mono" />
      </Field>

      <div className="flex justify-end">
        <Button onClick={() => void save()} disabled={busy}>
          {busy ? "Saving..." : "Save"}
        </Button>
      </div>
    </PanelShell>
  );
}

function UsersPanel({ items, onChanged }: { items: User[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const empty: User = {
    id: -1,
    email: "",
    name: null,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  const [draft, setDraft] = useState<User>(empty);

  const startCreate = () => {
    setEditing(null);
    setDraft(empty);
    setErr(null);
    setOpen(true);
  };
  const startEdit = (u: User) => {
    setEditing(u);
    setDraft(u);
    setErr(null);
    setOpen(true);
  };

  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      if (editing) {
        await api<User>(`/api/users/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify({ email: draft.email, name: draft.name, role: draft.role }),
        });
      } else {
        await api<User>("/api/users", {
          method: "POST",
          body: JSON.stringify({ email: draft.email, name: draft.name, role: draft.role }),
        });
      }
      setOpen(false);
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const del = async (u: User) => {
    if (!confirm(`Delete user "${u.email}"?`)) return;
    setBusy(true);
    setErr(null);
    try {
      await api<{ ok: true }>(`/api/users/${u.id}`, { method: "DELETE" });
      onChanged();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PanelShell title="Users" description="Manage users allowed to log in via OTP (admins can access /admin).">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="text-sm text-foreground/70">{items.length} total</div>
        <Button onClick={startCreate}>New user</Button>
      </div>

      {err ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm">{err}</div>
      ) : null}

      <div className="grid gap-3">
        {items.map((u) => (
          <div key={u.id} className="rounded-xl border bg-background/40 p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="font-semibold truncate">{u.email}</div>
              <div className="text-xs text-foreground/70 mt-1">
                #{u.id} • {u.role} • {u.name ?? "—"}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" onClick={() => startEdit(u)} disabled={busy}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => void del(u)} disabled={busy}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit user" : "New user"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Field label="Email">
              <TextInput type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </Field>
            <Field label="Name (optional)">
              <TextInput value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value ? e.target.value : null })} />
            </Field>
            <Field label="Role">
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value === "admin" ? "admin" : "user" })}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </Field>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={() => void save()} disabled={busy}>
              {busy ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PanelShell>
  );
}

