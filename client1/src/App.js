// ==================== FRONTEND (src/App.js) ====================
import { useEffect, useState } from "react";
import api from "./api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchBar from "./components/SearchBar";
import "./global.css";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async (query = "") => {
    const res = await api.get(`/students?q=${query}`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h1>Student Manager</h1>
      <SearchBar onSearch={fetchStudents} />
      <StudentForm
        onAdd={(newStudent) => setStudents([...students, newStudent])}
      />
      <StudentList
        students={students}
        onUpdate={(updated) =>
          setStudents(
            students.map((s) => (s._id === updated._id ? updated : s))
          )
        }
        onDelete={(id) => setStudents(students.filter((s) => s._id !== id))}
      />
    </div>
  );
}

export default App;
