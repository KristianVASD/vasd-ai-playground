const express = require('express');
   const axios = require('axios');
   require('dotenv').config();

   const app = express();
   app.use(express.json());

   app.post('/analyze', async (req, res) => {
     try {
       const response = await axios.post('https://api.openai.com/v1/chat/completions', req.body, {
         headers: {
           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
           'Content-Type': 'application/json'
         }
       });
       res.json(response.data);
     } catch (error) {
       console.error('Error:', error.response ? error.response.data : error.message);
       res.status(500).json({ error: 'An error occurred' });
     }
   });

   app.post('/quotation', async (req, res) => {
     try {
       const response = await axios.post('https://api.openai.com/v1/chat/completions', {
         model: "gpt-3.5-turbo",
         messages: [
           {
             role: "system",
             content: "You are a helpful assistant that creates quotation requests based on home repair problems."
           },
           {
             role: "user",
             content: `Create a quotation request for the following problem: ${req.body.problemDescription}`
           }
         ]
       }, {
         headers: {
           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
           'Content-Type': 'application/json'
         }
       });
       res.json(response.data);
     } catch (error) {
       console.error('Error:', error.response ? error.response.data : error.message);
       res.status(500).json({ error: 'An error occurred' });
     }
   });

   const port = process.env.PORT || 3000;
   app.listen(port, () => console.log(`Server running on port ${port}`));