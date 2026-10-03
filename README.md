# K12 Hunar — Scholarship Management CRM 

**Live Demo Link:** [https://k12-hunar-scholarship-crm-one.vercel.app/](https://k12-hunar-scholarship-crm-one.vercel.app/)
  
Hi! This is my frontend demo submission for the **K12 Hunar Full-Stack Development Internship Assessment**.

I built a simple, responsive dashboard for managing state scholarships, featuring real-time status updates, cross-state filtering, an add/edit form workflow, and a functional preview showing how these scholarships look to students.

---

## 🛠️ Tech Stack Used

* **React 19** (JavaScript / JSX)
* **Vite** for the build and fast HMR setup
* **Tailwind CSS** for responsive styling
* **Lucide React** for UI icons
* **Browser localStorage** so edits stay saved on page refresh

---

## 🚀 How to Run the Project Locally

### 1. Clone or download the repository
```bash
git clone <repo-url>
cd K12-Hunar-Scholarship-CRM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```
*Open your browser at the local port provided by Vite (e.g., `http://localhost:5175`).*

### 4. Build for production
```bash
npm run build
```

---

## 💡 How Everything Works

### 1. State Filter
* Handled via a simple state variable `selectedState` (defaults to `'All'`). 
* When a user clicks on a specific state button (**Bihar**, **Haryana**, or **Jharkhand**), the list filters in real time using a standard `.filter()` array check. 
* Clicking **"All States"** or **"Clear"** resets the filter back to show all records.

### 2. Status Change
* Each table row and mobile card has an interactive status dropdown (**Published**, **Draft**, **Expired**). 
* Changing the dropdown triggers `changeStatus(id, newStatus)` which updates the item's status in the React state array.
* This instantly updates the four summary counter cards at the top (**Total**, **Published**, **Draft**, **Expired**) and flashes a brief toast notification.

### 3. Add & Edit Form
* Utilizes a reusable form modal (`ScholarshipFormModal.jsx`) that handles both adding new entries and updating existing records.
* Includes all **9 mandatory fields** required by the assessment guidelines:
  * **Scholarship Name**
  * **State** (Bihar, Haryana, Jharkhand)
  * **Provider Name**
  * **Applicable Class** (Class 1-10, Class 9-10, Class 11-12, UG, PG)
  * **Eligibility Criteria**
  * **Scholarship Amount / Benefit**
  * **Application Deadline** (with a "Not stated" toggle option)
  * **Official Application Link** (with secure protocol parsing)
  * **Status** (Published, Draft, Expired)

### 4. Student Preview Card
* Clicking **"Preview"** on any row opens a modal (`StudentPreviewModal.jsx`) demonstrating how that specific scholarship scheme maps to the student directory view on the portal.
* Features a **"Student Portal"** structural toggle in the main top navbar to easily simulate the directory view from a student's perspective (hiding all non-published drafts).

