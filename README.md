# Checkmate: An ADHD-Friendly To-Do List

## Description

Checkmate is an ADHD-friendly to-do list application designed to help users stay organized and focused while tackling their tasks. My intention with this app (though not entirely fleshed out) is to incorporate visual cues and a reward system allowing users to break tasks into smaller, more manageable parts. By prioritizing tasks, setting due dates, creating a reward system, and offering customizable themes, Checkmate is designed to improve productivity for those with ADHD.

## Deployed Application

- I am currently working on the deployment on Cloudflare Pages.

## Screenshots/GIFs/Demo Video

[Include any visuals showcasing your app. You could add a few screenshots or link to a demo video if you have one.]

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/eoye1224/CheckMate.git
   ```

2. **Navigate to the project directory**  
   ```bash
   cd CheckMate
   ```

3. **Install dependencies for the backend**  
   Navigate to the `checkmate/checkmatecloudflare/src/` directory:  
   ```bash
   cd checkmate/checkmatecloudflare/src/
   ```

   Install the backend dependencies:  
   ```bash
   npm install
   ```

4. **Set up environment variables**  
   Create a `.env` file in the `checkmate/checkmatecloudflare/src/` folder and include the following:  
   ```
   MONGO_URI=[Your MongoDB URI]
   JWT_SECRET=[Your secret for JWT tokens]
   ```

5. **Start the backend**  
   Run the following command to start the server:  
   ```bash
   node server.js
   ```

6. **Install dependencies for the frontend**  
   While still in the `checkmate/checkmatecloudflare/src/` folder, install the frontend dependencies:  
   ```bash
   npm install
   ```

7. **Start the frontend**  
   Run the following command to start the React development server:  
   ```bash
   npm start
   ```

8. **Visit the application**  
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Inspiration & Impact

As someone with ADHD, staying organized and managing tasks effectively can be a challenge. Having a place to track tasks in an organized way is incredibly helpful for me, and that’s where the idea for Checkmate came from. I was inspired by Evernote, which I use to keep track of my notes and tasks, but I always wished it had a built-in reward system to help motivate me to stay on track. I wanted an app that not only helped me stay organized but also encouraged me to return to it regularly. That’s how Checkmate was born—an ADHD-friendly to-do list app that breaks tasks into smaller, manageable parts, includes visual cues, and offers progress tracking and rewards, making it easier for users to stay focused and productive.

## New Technology Learned

For this project, I’ve learned several new technologies:

- **React**: This is my first time using React, and I was excited to build a dynamic and responsive frontend.
- **Express**: I had never worked with Express before, so it was a new challenge for me to create the server and API routes. I learned how to handle requests, set up routes, and manage middleware in a streamlined way.
- **MongoDB**: I also had never worked with MongoDB, so learning how to set up a NoSQL database was challenging but rewarding. I used it to store user data and application-related information.
- **Cloudflare Pages**: Cloudflare Pages made deploying the frontend simple and fast, with automatic previews for each pull request.
- **Postman**: I used Postman to test and debug my API endpoints. It helped me understand the flow of requests and responses and allowed me to ensure my backend was working correctly before integrating it with the frontend.

## Challenges Faced & Lessons Learned

Throughout the development of Checkmate, I faced several challenges, both personal and technical. As this was my first big full-stack project, I initially struggled with knowing where to start and how to manage the complexity of integrating different technologies. Additionally, I encountered health challenges, including having to go to the ER in the middle of working and dealing with the emotional stress of my grandma being admitted to the hospital during the project. These personal hurdles made it difficult to stay on track and manage my time effectively. I also faced setbacks when I got frustrated with the design and scrapped the whole thing, only to regret it later. Another challenge was organizing my files and compartmentalizing my `server.js`, `app.css`, and `app.js` in a way that made the project more organized. I got caught up in many small details that I lost sight of the bigger picture.

From a technical perspective, setting up user authentication was tricky at first, but I was able to learn how to implement secure login and registration processes. Integrating MongoDB with Express required me to understand database schema design and how to store data effectively, which had a steep learning curve but was worth it to better understand NoSQL databases. Understanding React’s state management and lifecycle methods was also overwhelming, but after working through some tutorials, I became more comfortable with managing state and passing props.

Despite these setbacks, I am incredibly proud of how far I've come. I’ve never implemented user authentication before, and before scrapping my previous design, I had a fully functional website. I am determined to continue working on Checkmate, and I am excited to see how much more I can grow as I refine the project into its final form.

---

Let me know if you need any further edits!