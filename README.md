# MindMeld: Collaborative Brainstorming for Social Impact

## Description
**MindMeld** is a collaborative brainstorming platform designed to turn innovative ideas into actionable solutions for global challenges. This prototype, built using **Bolt**, allows users to share, refine, and collaborate on social impact projects. It focuses on core features like idea submission, collaboration, and user interaction, providing a foundation for future scalability.

---

## Features
- **Idea Submission:** Users can submit ideas with a title, description, and tags.
- **Collaboration Hub:** Comment on ideas and upvote/downvote to show interest.
- **Idea Feed:** Browse and filter ideas by tags or popularity.
- **User Dashboard:** Track your submitted ideas and interactions.
- **Search Functionality:** Find ideas by keywords or tags.

---

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript (Bolt's built-in UI tools)
- **Backend:** Bolt's backend services
- **Database:** Bolt's integrated database
- **Authentication:** Bolt's built-in authentication system

---

## Installation Instructions
Follow these steps to set up the MindMeld prototype locally:

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Bolt CLI (install via `npm install -g bolt-cli`)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/mindmeld.git
   cd mindmeld
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   DATABASE_URL=your_database_url
   SECRET_KEY=your_secret_key
   ```

4. **Run Migrations:**
   ```bash
   bolt db:migrate
   ```

5. **Start the Development Server:**
   ```bash
   bolt start
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## Usage
### Submitting an Idea
1. Log in or sign up for an account.
2. Click the "Submit Idea" button on the homepage.
3. Fill out the form with the following details:
   - **Title:** A concise title for your idea.
   - **Description:** A brief explanation of your idea (200-300 characters).
   - **Tags:** Add relevant tags (e.g., environment, education).
4. Click "Submit" to post your idea to the feed.

### Collaborating on Ideas
1. Browse the idea feed to find ideas you’re interested in.
2. Click on an idea to view its details and comments.
3. Add your comments or suggestions in the discussion thread.
4. Upvote ideas you find valuable.

### Searching for Ideas
1. Use the search bar at the top of the page to find ideas by keywords or tags.
2. Filter ideas by "Most Recent," "Most Upvoted," or "Trending."

---

## Contributors
We welcome contributions from the community! If you'd like to contribute to MindMeld, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

### Current Contributors
- Janani(https://github.com/Janani-prog) - Project Lead

---

## License
This project is licensed under the **MIT License**. See the LICENSE file for details.
