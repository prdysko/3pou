import { storage } from '../../server/storage.js';

export const handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api', '');
  
  if (path === '/quiz/questions' && event.httpMethod === 'GET') {
    const questions = await storage.getAllQuizQuestions();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questions)
    };
  }
  
  if (path === '/quiz/sessions' && event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    const session = await storage.createQuizSession(data);
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session)
    };
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found' })
  };
};