import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import History from "./pages/History";
import StudentRecords from "./pages/StudentRecords";
import IssueBook from "./pages/IssueBook";
import FineCalculation from "./pages/FineCalculation";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<History />} />
        <Route path="/issue-book" element={<IssueBook />} />
      <Route path="/fine-calculation" element={<FineCalculation />} />
       <Route path="/students" element={<StudentRecords />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;