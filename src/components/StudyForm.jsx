import { useState } from "react";
import "./StudyForm.css";
import { generateStudyPlan } from "../utils/planner";
import ScheduleTable from "./ScheduleTable";
import QuoteCard from "./QuoteCard";
import jsPDF from "jspdf";


function StudyForm() {
  const [subjects, setSubjects] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyPlan, setStudyPlan] = useState([]);
  const [studyMode, setStudyMode] = useState("Lazy");

  const exportPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Smart Study Planner", 20, 20);

  let y = 40;

  studyPlan.forEach((item) => {

    doc.text(
      `Day ${item.day} | ${item.date} | ${item.subject} | ${item.hours} hrs`,
      20,
      y
    );

    y += 10;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("study-plan.pdf");
};

  const handleGenerate = () => {

  if (!subjects.trim()) {
    alert("Please enter subjects");
    return;
  }

  if (!examDate) {
    alert("Please select exam date");
    return;
  }

  const subjectArray = subjects
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  const generatedPlan = generateStudyPlan(
    subjectArray,
    examDate,
    studyMode
  );

  setStudyPlan(generatedPlan);
};

  return (
    <div className="study-form-container">
      <div className="study-form-card">

        <h1>Smart Study Planner generator</h1>

        <p className="subtitle">
          Create an optimized study plan based on your subjects, exam date, and study intensity.
        </p>

        <div className="form-group">
          <label>Subjects</label>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Math, Physics, Chemistry"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Exam Date</label>

          <input
            type="date"
            className="form-control"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Study Mode</label>

          <select
            className="form-control"
            value={studyMode}
            onChange={(e) => setStudyMode(e.target.value)}
          >
            <option>Lazy</option>
            <option>Hardcore</option>
          </select>
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
        >
          Generate Study Plan
        </button>

        {studyPlan.length > 0 && (
          <>
            <div className="summary-card">
              <h3>Study Plan Summary</h3>

              <p>
                <strong>Subjects:</strong> {subjects.split(",").length}
              </p>

              <p>
                <strong>Total Study Days:</strong> {studyPlan.length}
              </p>

              <p>
                <strong>Mode:</strong> {studyMode}
              </p>

              <p>
                <strong>Hours Per Day:</strong>{" "}
                {studyMode === "Lazy" ? 2 : 5}
              </p>
            </div>

            <ScheduleTable studyPlan={studyPlan} />
            <QuoteCard />
          </>
        )}

        {studyPlan.length > 0 && (
          <button
            className="pdf-btn"
            onClick={exportPDF}
          >
            Export PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default StudyForm;