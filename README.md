# SBA 308 - JavaScript Fumdamentals

## Project Summary

The purpose of this project is to apply fundamental JavaScript concepts in a practical manner. Some sample data was provided that needed to be processed and manipulated to meet a specified final output.

## Project Requirements

- Declare variables using `let` and `const` where appropriate.
- Use operators to perform calculations on variables and literals.
- Use strings, numbers and boolean values cached within variables.
- Use at least two if / else statements to control program flow.
- Use try / catch statments to manage potential errors in the code.
- Utilize at least two different types of loops.
- Utilize at least one loop control keyword such as `break` or `continue`.
- Create and manipulate arrays and objects.
- Demonstrate retrieval of items in an array or properties in an object.
- Use functions to handle repeated tasks.
- Program outputs data as described.
- Program runs without errors.
- Commit frequently to git repository.
- Include a README file that contains a description of the application.

## Application Details

This application processes data from a real-world-like example of what you might see from an online course. The provided data incldues a `Course Info` object, `AssignmentGroup` object as well as an array of `LearnerSubmission` objects as seen in the index.js file.

The desired output is an array of objects that looks as follows:

```js
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];
```

## My Solution

My goal for this project was to achieve the desired result by creating functions and variables with meaningful names making the code easier to understand and maintain. I did this by creating a series of helper functions to handle repetitive tasks and to avoid writing repetitive code.

 My overall approach was broken down into 3 major steps: 

**Step 1:** Create an object for each unique learner and store it in an array. To do this I created a `getLearners()` function that took in the provided submission data to generate an object for each unique learner.

**Step 2:** Find submissions that correspond with their respective learner and process it so that all data required for the final output is available. I accomplished this by creating a function called `processLearnerSubmissions()`. 

**Step 3:** Once all data required for the final output is available on each learner object, format it based on the desired final result. I did this by passing the data returned in step 2 to a function called `formatLearnerData()`.
