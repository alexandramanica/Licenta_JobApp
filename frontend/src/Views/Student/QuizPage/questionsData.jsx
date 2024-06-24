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
     },
     {
         question: 'Do you prefer working in a team or independently?',
         questionId:9,
         answers:[
             {text: 'I prefer working in a team', EngineeringPath:2, DataPath:1, BussinesPath:3, UiUxPath:2},
             {text: 'I prefer working independently', EngineeringPath:1, DataPath:3, BussinesPath:1, UiUxPath:0},
             {text: 'I enjoy both equally', EngineeringPath:3, DataPath:2, BussinesPath:2, UiUxPath:1},
             {text: 'I prefer a mix of both depending on the task', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'What type of work environment do you thrive in?',
         questionId:10,
         answers:[
             {text: 'A structured and organized environment', EngineeringPath:3, DataPath:2, BussinesPath:1, UiUxPath:0},
             {text: 'A creative and dynamic environment', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
             {text: 'A fast-paced and challenging environment', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'A balanced and flexible environment', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'Which of these best describes your approach to problem-solving?',
         questionId:11,
         answers:[
             {text: 'I rely on logical and analytical thinking', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:0},
             {text: 'I prefer brainstorming and creative solutions', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
             {text: 'I use a combination of analytical and creative thinking', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I delegate tasks and oversee the process', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
         ]
     },
     {
         question: 'How do you handle tight deadlines?',
         questionId:12,
         answers:[
             {text: 'I work well under pressure and meet deadlines', EngineeringPath:3, DataPath:2, BussinesPath:1, UiUxPath:1},
             {text: 'I prefer planning ahead to avoid last-minute stress', EngineeringPath:2, DataPath:3, BussinesPath:2, UiUxPath:2},
             {text: 'I collaborate with others to ensure deadlines are met', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I focus on maintaining quality even under pressure', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'Which of these industries are you most interested in?',
         questionId:13,
         answers:[
             {text: 'Technology and Engineering', EngineeringPath:3, DataPath:2, BussinesPath:1, UiUxPath:0},
             {text: 'Creative and Design', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
             {text: 'Business and Management', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'Data and Analytics', EngineeringPath:2, DataPath:3, BussinesPath:2, UiUxPath:0},
         ]
     },
     {
         question: 'Do you enjoy learning new software or tools?',
         questionId:14,
         answers:[
             {text: 'Absolutely, I love exploring new software', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:1},
             {text: 'Sometimes, if it is necessary', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
             {text: 'Rarely, I prefer to stick with what I know', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:2},
             {text: 'Not really, I prefer hands-on work', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:3},
         ]
     },
     {
         question: 'How do you prefer to communicate with your team?',
         questionId:15,
         answers:[
             {text: 'Through regular meetings and updates', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'Through digital tools and messaging', EngineeringPath:2, DataPath:3, BussinesPath:2, UiUxPath:2},
             {text: 'Through informal and spontaneous discussions', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:3},
             {text: 'Through a mix of formal and informal methods', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'What motivates you the most in your career?',
         questionId:16,
         answers:[
             {text: 'Solving challenging problems', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:0},
             {text: 'Creating innovative solutions', EngineeringPath:0, DataPath:0, BussinesPath:2, UiUxPath:3},
             {text: 'Achieving business goals', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'Collaborating with a team', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'How do you handle feedback?',
         questionId:17,
         answers:[
             {text: 'I welcome feedback and use it to improve', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:1},
             {text: 'I consider feedback but follow my instincts', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
             {text: 'I prefer constructive feedback and guidance', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I find feedback helpful but prefer to work independently', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:2},
         ]
     },
     {
         question: 'What is your approach to continuous learning?',
         questionId:18,
         answers:[
             {text: 'I am constantly seeking new knowledge and skills', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:1},
             {text: 'I learn as needed to stay current', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
             {text: 'I focus on mastering a few key areas', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I prefer hands-on learning and experience', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:3},
         ]
     },
     {
         question: 'Which of these best describes your leadership style?',
         questionId:19,
         answers:[
             {text: 'I lead by example and inspire others', EngineeringPath:3, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I am a strategic thinker and planner', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I focus on collaboration and team cohesion', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
             {text: 'I prefer to delegate tasks and oversee progress', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:1},
         ]
     },
     {
         question: 'How do you approach new challenges?',
         questionId:20,
         answers:[
             {text: 'I embrace challenges and enjoy finding solutions', EngineeringPath:3, DataPath:3, BussinesPath:1, UiUxPath:1},
             {text: 'I analyze the situation before taking action', EngineeringPath:2, DataPath:2, BussinesPath:2, UiUxPath:2},
             {text: 'I seek input from others and collaborate', EngineeringPath:2, DataPath:2, BussinesPath:3, UiUxPath:1},
             {text: 'I prefer to tackle challenges independently', EngineeringPath:1, DataPath:1, BussinesPath:2, UiUxPath:2},
         ]
     }
 ]
 
 export default quizQuestionsData;
 