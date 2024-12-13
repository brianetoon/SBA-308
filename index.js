// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  try {
    if (course.id !== ag.course_id) {
      throw new Error("Course ID does not match Assignment Group course ID.");
    }

    let learners = getLearners(submissions);
    let learnerData = processLearnerSubmissions(learners, submissions);
    let formattedLearnerData = formatLearnerData(learnerData);

    return formattedLearnerData;

  } catch (error) {
    console.error(error.message);
    return null; 
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("result:", result);

// Steps:
// - create an object for each unique learner and store them in an array
// - for each learner object, push LearnerSubmissions that match their ID into a completed_assignments array

// - create a formatLearnerData function
// - map through each object to format data at the end


// Helper Functions:

// Creates an object for each unique learner pushes it to the returned array
function getLearners(submissions) {
  const learners = [];

  submissions.forEach(sub => {
    if (!learners.some(learner => learner.id === sub.learner_id)) {
      learners.push({ 
        id: sub.learner_id,  
        completed_assignments: [],
        total_points_earned: 0,
        total_points_possible: 0,
        overall_grade: null
      })
    } 
  });

  return learners;
}

// Finds submissions that correspond with their respective learner
// The submission data is then processed so all information needed for final output is available
function processLearnerSubmissions(learners, submissions) {
  learners.forEach(learner => {
    submissions.forEach(sub => {
      if (learner.id === sub.learner_id) {

        let due_date = getDueDate(sub.assignment_id);
        let isDue = checkIfDue(due_date);

        if (isDue) {
          let is_on_time = checkIfOnTime(sub.submission.submitted_at, due_date, sub.assignment_id);
          let points_possible = getAssignmentPoints(sub.assignment_id);
          let grade = calculateGrade(sub.submission.score, points_possible, is_on_time);

          learner.total_points_earned += (points_possible * grade);
          learner.total_points_possible += points_possible;

          let overallGrade = learner.total_points_earned / learner.total_points_possible;
          learner.overall_grade = formatNumber(overallGrade);

          learner.completed_assignments.push({
            id: sub.assignment_id,
            submitted_at: sub.submission.submitted_at,
            score: sub.submission.score,
            points_possible,
            due_date,
            is_on_time,
            grade
          });
        }
      }
    });
  });

  return learners;
}

// Takes the processed learner data and formats it to the desired final output
function formatLearnerData(learners) {
  // Generates a new array of formatted data that will be returned to the main function
  let formattedData = learners.map(learner => {
    // Distills the assignment objects into only the information we need for final output
    let formattedAssignments = learner.completed_assignments.map(assignment => {
      return {
        id: assignment.id,
        grade: assignment.grade
      }
    });
    
    // Reduce method used to turn assignment objects into key value pairs and add them 
    // to the final learner object
    let result = formattedAssignments.reduce((acc, assignment) => {
      acc[assignment.id] = assignment.grade;
      return acc;
    }, {
      id: learner.id,
      avg: learner.overall_grade, 
    });

    return result;
  });

  return formattedData;
}

// Other helper functions:

function getAssignmentPoints(id) {
  const assignment = AssignmentGroup.assignments.find(assignment => {
    return assignment.id === id;
  });

  return assignment ? assignment.points_possible : undefined;
}

function getDueDate(id) {
  const assignment = AssignmentGroup.assignments.find(assignment => {
    return assignment.id === id;
  });

  return assignment ? assignment.due_at : undefined;
}

function checkIfDue(dueDate) {
  const due = new Date(dueDate);
  return Date.now() >= due.getTime();
}

function checkIfOnTime(submitDate, dueDate) {
  const dueOn = new Date(dueDate);
  const submittedOn = new Date(submitDate);

  return dueOn.getTime() >= submittedOn.getTime();
}

function calculateGrade(score, pointsPossible, onTime) {
  let grade;

  if (!onTime) {
    grade = ((score - (pointsPossible * 0.1)) / pointsPossible);
  } else {
    grade = (score / pointsPossible);
  }
  return formatNumber(grade);
}

function formatNumber(num, decimalPlaces = 3) {
  return Number(num.toFixed(decimalPlaces));
}
