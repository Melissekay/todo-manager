import { useState, type FormEvent } from "react";

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "do the homework",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "go to the market",
      description: "to buy milk",
      priority: "low",
      completed: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title,
                description: description.trim() || undefined,
                priority,
              }
            : task
        )
      );
      setEditingId(null);
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description: description.trim() || undefined,
        priority,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900">Your Tasks</h1>
          <button
            onClick={handleLogoutClick}
            className="rounded-md bg-[#0f172a] px-1.5 py-0.5 bg-blue-600 py-2 text-sm font-semibold text-white"
          >
            Log out
          </button>
        </div>

        <form
          onSubmit={handleAddOrUpdateTask}
          className="mb-6 space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <input
            type="text"
            placeholder="Task title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-green-500/30"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-green-500/30"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-[#00f060] px-4 py-2 bg-blue-600 py-2 text-sm font-semibold text-white"
            >
              {editingId !== null ? "Update Task" : "Add Task"}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setDescription("");
                  setPriority("medium");
                }}
                className="rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 accent-[#00f060]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        task.completed
                          ? "text-gray-400 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        task.priority === "high"
                          ? "bg-green-100 text-green-600"
                          : task.priority === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white"

                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-md bg-[#0f172a] px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-slate-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
