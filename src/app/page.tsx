'use client';
import { useState } from 'react';

interface Task {
  gid: string;
  name: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  async function load() {
    const res = await fetch('/api/asana/list-tasks?project=<gid>');
    const json = await res.json();
    setTasks(json.data);
  }
  return (
    <main className="p-8">
      <button onClick={load} className="border p-2 rounded">
        Load tasks
      </button>
      <ul className="mt-4 space-y-2">
        {tasks.map(t => (
          <li key={t.gid} className="border p-2 rounded">
            {t.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
