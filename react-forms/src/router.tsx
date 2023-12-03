import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import UncontrolledForm from "./UncontrolledForm";
import HookForm from "./HookForm";
import { FormData } from "./formDataSlice";

const Main: React.FC = () => {
  const location = useLocation();
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (location.state && location.state.newEntry) {
      setIsNewEntry(true);
      setFormData(location.state.formData);
      setTimeout(() => {
        setIsNewEntry(false);
      }, 3000);
    }
  }, [location.state]);

  return (
    <div
      className={`container mt-5 ${
        isNewEntry ? "border border-primary p-3" : ""
      }`}
    >
      <h2>Main Route</h2>
      {isNewEntry && <p className="text-primary">New Entry Indicator</p>}
      {formData && (
        <div>
          <h3>Previously Entered Data:</h3>
          <ul>
            <li>Name: {formData.name}</li>
            <li>Age: {formData.age}</li>
            <li>Email: {formData.email}</li>
            <li>Gender: {formData.gender}</li>
            <li>Country: {formData.country}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/hook-form">Hook Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
