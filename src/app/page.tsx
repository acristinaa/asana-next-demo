'use client';
import { useState } from 'react';

interface Task {
  gid: string;
  name: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await fetch('/api/asana/list-tasks?project=123456789012345');
    const json = await res.json();

    if (!res.ok) {
      setError(json.errors?.[0]?.message ?? 'Unknown error');
      setTasks([]);
      return;
    }
    setTasks(json.data);          // Asana returns { data: [...] } :contentReference[oaicite:2]{index=2}
  }

  return (
    <main className="p-8 space-y-4">
      <button onClick={load} className="border p-2 rounded">Load tasks</button>

      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.gid} className="border p-2 rounded">{t.name}</li>
        ))}
      </ul>
    </main>
  );
}
