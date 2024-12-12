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
  
  const learners = getLearners(submissions);
  // console.log(learners);

  const learnersWithSubmissions = getLearnerSubmissionInfo(learners, submissions);
  console.log(learnersWithSubmissions);


  
  // here, we would process this data to achieve the desired result.
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  // return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log("result:", result);

// Steps:
// - create an object for each unique learner and store them in an array
// - for each learner object, push LearnerSubmissions that match their ID into a completed_assignments array

// - create a formatLearnerData function
// - map through each object to format data at the end


// Helper Functions:

function getLearners(submissions) {
  const learners = [];

  submissions.forEach(sub => {
    if (!learners.some(learner => learner.id === sub.learner_id)) {
      learners.push({ 
        id: sub.learner_id,  
        completed_assignments: []
      })
    } 
  });

  return learners;
}

function getLearnerSubmissionInfo(learners, submissions) {
  learners.forEach(learner => {
    submissions.forEach(sub => {
      if (learner.id === sub.learner_id) {

        let due_date = getDueDate(sub.assignment_id);
        let isDue = checkIfDue(due_date);

        if (isDue) {
          let is_on_time = checkIfOnTime(sub.submission.submitted_at, due_date, sub.assignment_id);
          let points_possible = getAssignmentPoints(sub.assignment_id);

          learner.completed_assignments.push({
            id: sub.assignment_id,
            submitted_at: sub.submission.submitted_at,
            score: sub.submission.score,
            points_possible,
            due_date,
            is_on_time
          });
        }
      }
    });
  });

  return learners;
}

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
