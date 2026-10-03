K12 Hunar — Scholarship Management CRM Demo
Hi! This is my frontend demo for the K12 Hunar Full-Stack Development Internship Assessment.
I built a simple, responsive dashboard for managing state scholarships, with real-time status updates, filtering, an add/edit form, and a preview of how scholarships look to students.
🛠️ Tech Stack Used
React 19 (JavaScript / JSX)
Vite for the build setup
Tailwind CSS for simple, responsive styling
Lucide React for icons
Browser localStorage so edits stay saved on page refresh
🚀 How to Run the Project Locally
Clone or download the repository:
code
Bash
git clone <repo-url>
cd <project-folder>
Install dependencies:
code
Bash
npm install
Start the dev server:
code
Bash
npm run dev
Open your browser at:
code
Code
http://localhost:3000
To build for production:
code
Bash
npm run build
💡 How Everything Works
1. State Filter
I used a simple state variable selectedState (defaults to 'All'). When the user clicks on a state button (Bihar, Haryana, or Jharkhand), the list filters in real time using a standard .filter() check. Clicking "All States" or "Clear" resets the filter back to show all states.
2. Status Change
Each table row and card has a status dropdown (Published, Draft, Expired). When you change the dropdown, it triggers changeStatus(id, newStatus):
It updates the item's status in the React state array.
This immediately updates the four summary counter cards at the top (Total, Published, Draft, Expired).
It also pops up a brief toast notification so the user knows the status was updated.
3. Add & Edit Form
There is one reusable form modal (ScholarshipFormModal.jsx) that handles both adding a new scholarship and editing an existing one:
Includes all 9 fields from the assessment requirements:
Scholarship Name
State (Bihar, Haryana, Jharkhand)
Provider Name
Applicable Class (Class 1-10, Class 9-10, Class 11-12, UG (Undergraduate), PG (Postgraduate))
Eligibility Criteria
Scholarship Amount / Benefit
Application Deadline (with a "Not stated" checkbox)
Official Application Link (checks that it starts with https://)
Status (Published, Draft, Expired)
Basic validation prevents submitting blank required fields.
4. Student Preview Card
Clicking "Preview" on any row opens a modal (StudentPreviewModal.jsx) showing how that scholarship appears to students browsing the K12 Hunar portal (highlighted benefit amount, deadline date, eligibility requirements, student document checklist, and an "Apply on Official Portal" button).
There is also a "Student Portal" toggle in the top bar to test the directory view from a student's perspective (showing only published scholarships).
🤖 Note on AI Tools & References
AI Tools: I used Google AI Studio to help set up the React component structure, verify JavaScript syntax, and speed up building the sample dataset.
References:
The K12 Hunar scholarship website (k12hunar.com/scholarships) was referenced for designing the student card layout and fields.
Official scholarship portals (Bihar Post-Matric, Haryana Har-Chhatravratti, and Jharkhand e-Kalyan) were referenced for realistic scheme details.
Tailwind CSS documentation for utility classes.

