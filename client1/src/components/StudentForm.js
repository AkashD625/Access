// ==================== FRONTEND (src/components/StudentForm.js) ====================
import { useState } from "react";
import api from "../api";

export default function StudentForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    usn: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/students", form);
    onAdd(res.data);
    setForm({ name: "", usn: "", phone: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          required
        />
      ))}
      <button type="submit">Add Student</button>
    </form>
  );
}
