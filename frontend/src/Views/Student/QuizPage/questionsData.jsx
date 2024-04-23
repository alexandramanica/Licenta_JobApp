const quizQuestionsData=[
   { question: 'Do you enjoy solving puzzles or problems analytically?',
     questionId: 1,
     answers:[
            {text: ' Absolutely, it is my favorite thing to do', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:0},
            {text: ' Sometimes, if they interest me', EngineeringPath:2, DataPath:2, BussinesPath:1, UiUxPath:0},
            {text: ' Rarely, I prefer other approaches', EngineeringPath:0, DataPath:0, BussinesPath:3, UiUxPath:1},
            {text: ' Not really, I prefer creative solutions', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
        ]
    },
    {
        question: 'When you picture your ideal job, what are you doing?',
        questionId:2,
        answers:[
            {text: 'Working in a fast-paced role that pushes me to produce results', EngineeringPath:3, DataPath:2, BussinesPath:1, UiUxPath:0},
            {text: 'Getting creative and coming up with new ideas', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
            {text: 'Working with data and numbers to solve problems', EngineeringPath:1, DataPath:3, BussinesPath:1, UiUxPath:0},
            {text: 'Leading a team and making important decisions', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
        ]
    },
    {
        question: 'Which of these tasks appeals to you the most?This question is required?',
        questionId:3,
        answers:[
            {text: 'Designing and building new products', EngineeringPath:3, DataPath:0, BussinesPath:1, UiUxPath:3},
            {text: 'Analyzing data and finding patterns', EngineeringPath:1, DataPath:3, BussinesPath:1, UiUxPath:0},
            {text:' Creating and implementing new business strategies', EngineeringPath:0, DataPath:0, BussinesPath:3, UiUxPath:1},
            {text: 'Developing new software or applications', EngineeringPath:3, DataPath:1, BussinesPath:1, UiUxPath:0},
        ]
    },
    {
        question: 'Do you enjoy working with numbers and data?',
        questionId:4,
        answers:[
            {text: ' Absolutely, I love working with numbers', EngineeringPath:0, DataPath:3, BussinesPath:2, UiUxPath:0},
            {text: ' Sometimes, if it is necessary', EngineeringPath:1, DataPath:2, BussinesPath:2, UiUxPath:0},
            {text: ' Rarely, I prefer other approaches', EngineeringPath:2, DataPath:3, BussinesPath:1, UiUxPath:2},
            {text: ' Not really, I prefer creative solutions', EngineeringPath:3, DataPath:0, BussinesPath:1, UiUxPath:3},
        ]
    },
    {
        question: 'Imagine you’re starting a small business with some friends. In which area could you see yourself adding the most value?',
        questionId:5,
        answers:[
            {text: 'Taking care of all the behind-the-scenes technology', EngineeringPath:3, DataPath:1, BussinesPath:1, UiUxPath:0},
            {text: 'Designing the company’s branding and marketing materials', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
            {text: 'Ensuring progress is on track, risks are managed, and stakeholders are informed', EngineeringPath:0, DataPath:0, BussinesPath:3, UiUxPath:1},
            {text: 'Developing the company’s products or services', EngineeringPath:3, DataPath:0, BussinesPath:1, UiUxPath:3},
        ]
    },
    {
        question: 'Which of these is your strongest skill?',
        questionId:6,   
        answers:[
            {text: 'Problem-solving', EngineeringPath:3, DataPath:2, BussinesPath:1, UiUxPath:0},
            {text: 'Creativity', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
            {text: 'Leadership', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
            {text: 'Analytical thinking', EngineeringPath:1, DataPath:3, BussinesPath:1, UiUxPath:0},
        ]
    },
    {
        question: 'In a group project, how often do you try to assume control over processes, deciding what should be done and how?',
        questionId:7,
        answers:[
            {text: 'Always, I like to be in charge', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
            {text: 'Sometimes, if I feel it is necessary', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:1},
            {text: 'Rarely, I prefer to let others take the lead', EngineeringPath:0, DataPath:0, BussinesPath:1, UiUxPath:0},
            {text: 'Never, I prefer to go with the flow', EngineeringPath:0, DataPath:0, BussinesPath:0, UiUxPath:2},
        ]
    },
    {
        question:'How do you prefer to maintain your workspace?',
        questionId:8,
        answers:[
            {text: 'I like to keep my desk well-organized', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:0},
            {text: 'I prefer creative chaos', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
            {text: 'I balance organization and creativity', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
            {text: 'Perfectionism is not my thing', EngineeringPath:1, DataPath:1, BussinesPath:0, UiUxPath:2},
        ]
    }        
]

export default quizQuestionsData;