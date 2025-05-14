import { useState } from "react";
import api from "../api";

export default function StudentList({ students, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await api.delete(`/students/${id}`);
      onDelete(id);
    }
  };

  const handleEdit = async (id) => {
    if (editingId !== id) {
      setEditingId(id);
      setEditedValues({
        [id]: students.find((student) => student._id === id),
      });
    } else {
      const updatedStudent = editedValues[id];
      try {
        const res = await api.put(`/students/${id}`, updatedStudent);
        onUpdate(res.data);
        setEditingId(null);
      } catch (err) {
        alert("Failed to update student");
        console.error(err);
      }
    }
  };

  const handleInputChange = (e, field) => {
    setEditedValues({
      ...editedValues,
      [editingId]: {
        ...editedValues[editingId],
        [field]: e.target.value,
      },
    });
  };

  return (
    <ul className="student-list">
      {students.map((student) => (
        <li key={student._id} className="student-item">
          <div className="student-info">
            {Object.entries(student).map(([key, val]) => {
              if (key !== "_id" && key !== "__v") {
                if (editingId === student._id) {
                  return (
                    <div key={key} className="student-field">
                      <input
                        type="text"
                        value={editedValues[student._id][key]}
                        onChange={(e) => handleInputChange(e, key)}
                        className="input-field"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="student-field">
                      <span>{val}</span>
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
          <div className="actions">
            <button
              onClick={() => handleDelete(student._id)}
              className="action-btn delete-btn"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(student._id)}
              className="action-btn edit-btn"
            >
              {editingId === student._id ? "Save" : "Edit"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
