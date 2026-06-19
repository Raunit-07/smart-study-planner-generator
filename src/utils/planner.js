export function generateStudyPlan(subjects, examDate, studyMode) {

  const today = new Date();
  const exam = new Date(examDate);

  const diffTime = exam - today;

  const totalDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (totalDays <= 0) {
    return [];
  }

  const hoursPerDay =
    studyMode === "Lazy" ? 2 : 5;

  const plan = [];

  for (let i = 0; i < totalDays; i++) {

    const currentDate = new Date();

    currentDate.setDate(
      today.getDate() + i +1
    );

    plan.push({
      day: i + 1,
      date: currentDate.toLocaleDateString(),
      subject:
        subjects[i % subjects.length]
            .charAt(0)
            .toUpperCase() +
        subjects[i % subjects.length]
            .slice(1),
      hours: hoursPerDay
    });
  }

  return plan;
}