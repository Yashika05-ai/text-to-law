# Legal Ease AI

BUILD NYAYASAATHI AI

You are a senior full-stack engineer, UI/UX designer, AI application architect and security-focused developer.

Build a production-quality hackathon MVP called:

NyayaSaathi AI

Tagline:

"Understand your legal documents. Prepare better questions."

1. PROJECT PURPOSE

NyayaSaathi AI is a GenAI-powered legal document assistance platform.

It helps ordinary users:

Understand complex legal documents

Convert legal language into simpler language

Identify important clauses

Identify obligations

Identify important dates and deadlines

Identify financial/payment terms

Identify sections that deserve attention

Ask questions about uploaded documents

Compare two legal documents

Generate actionable checklists

Prepare questions for a qualified legal professional

Generate a concise legal consultation brief

IMPORTANT:

This product provides informational assistance and document analysis.

It must NOT claim to provide professional legal advice.

It must NOT replace a lawyer.

It must NOT tell users that a clause is definitely legal, illegal, valid or invalid unless the system has an appropriate authoritative legal basis and the claim can be reliably supported.

Prefer language such as:

"Attention area"

"Potential ambiguity"

"Material change detected"

"Consider discussing this with a qualified legal professional."

2. TARGET USER

The target user is a normal person who receives a legal document but does not easily understand legal terminology.

Example:

A user receives an employment agreement.

They upload it to NyayaSaathi AI.

The application helps them understand:

What the document is about

What they are required to do

Important deadlines

Important financial terms

Clauses that deserve attention

Questions they may want to ask a lawyer

3. MAIN DIFFERENTIATOR

Do NOT build a generic legal chatbot.

The central product concept is:

Understand → Detect → Compare → Question → Prepare

Core message:

"Don't replace the lawyer. Prepare the user for the lawyer."

4. TECH STACK

Use:

Frontend:

React

TypeScript

Tailwind CSS

Lovable-compatible UI components

Backend:

Supabase

Database:

Supabase PostgreSQL

Authentication:

Supabase Auth

Storage:

Supabase Storage

AI:

Gemini API

Server-side AI calls:

Supabase Edge Functions or another secure server-side mechanism supported by the project

Deployment:

Lovable/Vercel-compatible deployment

Version control:

GitHub

Do NOT add unnecessary technologies.

Do not introduce:

Firebase

MongoDB

Pinecone

LangChain

Docker

Kubernetes

Multiple backend services

unless there is a clear requirement.

Keep the architecture beginner-friendly and hackathon-friendly.

5. IMPORTANT DEVELOPMENT RULE

DO NOT attempt to build every feature in one step.

Build the project in phases.

PHASE 1:
UI and application shell

PHASE 2:
Authentication

PHASE 3:
Supabase database and storage

PHASE 4:
PDF upload

PHASE 5:
Gemini document analysis

PHASE 6:
Document analysis dashboard

PHASE 7:
Document Q&A

PHASE 8:
Document comparison

PHASE 9:
Lawyer preparation

PHASE 10:
Multilingual/simple-language support

PHASE 11:
Security and testing

PHASE 12:
Deployment

After each major phase, test the feature before moving forward.

Do not replace working functionality unnecessarily.

6. DESIGN STYLE

Create a professional legal-tech SaaS design.

Visual style:

Clean

Modern

Trustworthy

Minimal

Accessible

Responsive

Desktop + mobile

Professional typography

Clear cards

Clear hierarchy

Subtle animations only

Do NOT make it look like:

A generic ChatGPT clone

A dark hacker dashboard

An overly colorful AI website

A complicated enterprise legal portal

The design should communicate:

Trust + Simplicity + Accessibility + AI assistance.

7. LANDING PAGE

Create:

Hero

Heading:

Understand your legal documents. Prepare better questions.

Subheading:

NyayaSaathi AI transforms complex legal documents into clear, understandable information and helps you prepare for conversations with qualified legal professionals.

Primary CTA:

Analyze a Document

Secondary CTA:

Compare Documents

Add a small disclaimer:

Informational assistance only. Not legal advice.

Features

Show:

📄 Simplify Documents

Turn complex legal language into plain-language explanations.

🔍 Find Important Clauses

Identify obligations, dates, financial terms and sections that deserve attention.

🔄 Compare Documents

See what changed between two agreements.

💬 Ask Your Document

Ask questions and receive answers grounded in the uploaded document.

👨‍⚖️ Prepare for a Lawyer

Generate organized questions and information to discuss with a qualified legal professional.

8. HOW IT WORKS

Create a 4-step section:

1. Upload

Upload your legal document.

2. Understand

AI summarizes and explains important sections.

3. Explore

Ask questions or compare documents.

4. Prepare

Generate a consultation brief and checklist.

9. DASHBOARD

Create an authenticated dashboard.

Sidebar:

Overview

Analyze Document

Compare Documents

Ask My Document

Lawyer Preparation

Document History

Settings

Dashboard cards:

Documents analyzed

Documents compared

Recent documents

Pending analysis

Add a large CTA:

+ Analyze New Document

10. AUTHENTICATION

Use Supabase Authentication.

Create:

/login

/signup

/forgot-password

Requirements:

Email/password authentication

Logout

Protected dashboard routes

Redirect unauthenticated users to login

Redirect authenticated users to dashboard

Create a profiles table associated with the authenticated user.

Never expose authentication secrets in frontend code.

11. DATABASE

Create Supabase tables.

profiles

Fields:

id

user_id

full_name

created_at

documents

Fields:

id

user_id

file_name

storage_path

document_type

file_size

analysis_status

created_at

updated_at

document_analysis

Fields:

id

document_id

summary

important_clauses

obligations

important_dates

financial_terms

attention_areas

ambiguities

questions

checklist

created_at

document_comparisons

Fields:

id

user_id

document_a_id

document_b_id

comparison_result

created_at

chat_messages

Fields:

id

user_id

document_id

role

message

created_at

lawyer_briefs

Fields:

id

user_id

document_id

main_concerns

important_clauses

questions

information_to_bring

checklist

created_at

Create proper foreign-key relationships.

12. SECURITY

Enable Row Level Security.

A user must only be able to access:

Their own documents

Their own analyses

Their own comparisons

Their own chat history

Their own lawyer briefs

Uploaded documents should remain private.

Do NOT make the document storage bucket public.

Do not expose private storage URLs unnecessarily.

Do not put API keys in frontend code.

Use environment variables/secrets.

Do not log document contents or sensitive user information unnecessarily.

13. DOCUMENT UPLOAD

Create:

/analyze

Features:

Drag-and-drop PDF

Browse files

PDF validation

File size validation

Upload progress

Upload error handling

Cancel/reset

Analyze button

Start with PDF support.

Do not implement DOCX until PDF functionality works reliably.

Store uploaded files in a private Supabase Storage bucket.

14. DOCUMENT ANALYSIS

After uploading a PDF:

User clicks:

Analyze Document

Flow:

User

↓

Supabase Storage

↓

Secure server-side function

↓

Gemini API

↓

Structured analysis

↓

Supabase database

↓

Analysis dashboard

Do not call Gemini using a secret API key directly from client-side React code.

15. GEMINI ANALYSIS

Use Gemini to analyze the uploaded document.

The AI should return structured information:

{
  "summary": "",
  "importantClauses": [],
  "obligations": [],
  "importantDates": [],
  "financialTerms": [],
  "attentionAreas": [],
  "ambiguities": [],
  "questionsForProfessional": [],
  "checklist": []
}


For each important finding, preserve source information when available:

Page number

Clause number

Section title

Never invent page numbers or clause numbers.

If information is not found:

Return:

"Not found in the uploaded document."

16. AI SYSTEM INSTRUCTION

Use the following conceptual instruction for the Gemini document analysis:

"You are an AI legal information assistant.

Analyze the provided legal document only for informational purposes.

Help the user understand the document in simple language.

Do not provide legal advice.

Do not determine that a clause is definitely legal or illegal.

Do not predict legal outcomes.

Do not recommend legal action.

Do not fabricate information.

Only make claims supported by the provided document.

Clearly distinguish between:

What the document explicitly says.

What appears unclear.

What may deserve attention.

What information is missing.

Questions the user may want to ask a qualified legal professional.

For important findings, provide page, section or clause references whenever available.

Use simple language.

If the document does not contain enough information to answer a question, explicitly say so."

17. ANALYSIS DASHBOARD

Create a polished analysis page.

Top:

Document name

Analysis date

Document type

Status

Then tabs:

Summary

Plain-language overview.

Important Clauses

Each clause card should show:

Clause/section

Simple explanation

Source/page

Attention indicator

Obligations

Show:

User obligation

Simple explanation

Source

Important Dates

Show:

Date

What it relates to

Source

Financial Terms

Show:

Amount

Payment requirement

Frequency

Source

Attention Areas

Do NOT call these "illegal clauses."

Use:

Attention Area

Example:

"Notice period increased to 90 days."

Then:

"Consider discussing this change with a qualified legal professional if it affects your circumstances."

Questions

Show questions the user may want to ask a legal professional.

Checklist

Show interactive checkboxes.

18. DOCUMENT Q&A

Create:

/ask

The user can ask questions about the uploaded document.

Example:

User:

"What is the notice period?"

Good response:

"The agreement states a 90-day notice period in Clause 8.2."

Then:

Source: Clause 8.2 — Page 6

The answer must be based on the uploaded document.

If the information cannot be found:

"I could not find this information in the uploaded document."

Never guess.

19. RAG / DOCUMENT GROUNDING

Implement document-grounded Q&A.

Preferred flow:

PDF

↓

Text/content extraction

↓

Relevant document sections

↓

User question

↓

Retrieve relevant content

↓

Gemini

↓

Answer

↓

Source reference

Start with the simplest reliable implementation.

Only introduce embeddings/vector search when necessary.

Do not add a complex RAG framework unless needed.

20. DOCUMENT COMPARISON

Create:

/compare

Allow:

Document A

Document B

Then:

Compare Documents

Output:

Comparison Summary

Short neutral overview.

Added Clauses

Show clauses present in B but not A.

Removed Clauses

Show clauses present in A but not B.

Modified Clauses

Show changed wording or meaning.

Changed Obligations

Highlight changed responsibilities.

Changed Dates

Highlight changed deadlines or durations.

Changed Financial Terms

Highlight changed:

Salary

Fees

Deposits

Payments

Penalties

Other financial terms

Example:

OLD:

Notice period: 30 days

NEW:

Notice period: 90 days

Display:

Material change detected

30 days → 90 days

Do not label this as good/bad or legal/illegal.

21. LAWYER PREPARATION

Create:

/lawyer-preparation

Button:

Prepare for Legal Consultation

Generate:

Document Overview

What the document is about.

Main Areas to Discuss

Important areas identified from the document.

Important Clauses

Clause references.

Questions to Ask

Generate clear questions for a qualified legal professional.

Information to Bring

List useful documents/information based on the situation.

Action Checklist

Simple checklist.

The feature should organize the user's concerns.

It must NOT tell the user what legal action to take.

22. MULTILINGUAL SUPPORT

Add language selector:

English

Hindi

Hinglish

The user should be able to request simple explanations in the selected language.

Preserve important legal terminology and original clause references.

Example:

Legal wording:

"The lessee shall indemnify the lessor..."

Simple Hinglish:

"Iska simple meaning hai ki kuch situations mein tenant ko landlord ke loss ka compensation dena pad sakta hai."

Always preserve the original source.

23. ERROR HANDLING

Create clear errors for:

Invalid PDF

File too large

Upload failure

Gemini API failure

Analysis failure

Empty document

Document with unreadable content

Authentication failure

Database failure

Unauthorized document access

Never show raw technical errors to normal users.

24. LOADING STATES

Add:

Upload progress

Analyzing document animation

Comparing documents animation

Generating consultation brief animation

Use friendly messages:

"Reading your document..."

"Identifying important sections..."

"Preparing a plain-language summary..."

"Checking for changes..."

Do not imply that the AI is making a legal judgment.

25. EMPTY STATES

For example:

No documents:

"You haven't analyzed any documents yet."

CTA:

"Analyze your first document"

No comparison:

"Compare two versions of an agreement to identify changes."

No questions:

"Ask a question about your uploaded document."

26. LEGAL DISCLAIMER

Show this clearly:

"NyayaSaathi AI provides informational assistance and document analysis. It does not provide legal advice and does not replace a qualified legal professional."

Place this:

Landing page

Dashboard/footer

Analysis page

Q&A page

Lawyer preparation page

Do not use alarming language.

27. ACCESSIBILITY

Make the interface accessible.

Use:

Good contrast

Keyboard navigation

Clear labels

Descriptive buttons

Responsive layout

Readable font sizes

Accessible form errors

Semantic HTML where appropriate

28. DEMO DATA

For initial UI development, use clearly labeled mock/demo data if necessary.

Do not present fake AI analysis as real analysis.

Once backend integration is implemented, replace mock results with real data.

29. HACKATHON DEMO

The main demo should be:

Employment Agreement

↓

Upload

↓

AI summary

↓

Important clauses

↓

Attention areas

↓

Ask:

"What is the notice period?"

↓

Answer with source

↓

Upload old agreement

↓

Compare

↓

Show:

30 days → 90 days

↓

Prepare for Legal Consultation

↓

Generate:

Questions + Important Clauses + Checklist

End with:

"Don't replace the lawyer. Prepare the user for the lawyer."

30. PERFORMANCE

Keep the application fast.

Avoid unnecessary API calls.

Do not analyze the same document repeatedly if an analysis already exists.

Show cached analysis where appropriate.

Use loading states.

Handle API timeouts gracefully.

31. FINAL QUALITY REQUIREMENTS

Before considering the project complete, verify:

Authentication works

Users can upload PDFs

Documents are private

Gemini analysis works

Analysis is saved

Dashboard displays results

Q&A is grounded in the document

Sources are displayed

Comparison works

Lawyer preparation works

Language selection works

RLS prevents cross-user access

API keys are secure

Mobile UI works

Errors are handled

Loading states work

No major console errors

No fake legal claims

No fake citations

No invented document information

32. IMPORTANT: BUILDING METHOD

For the FIRST generation:

Build the complete UI and application shell.

Create:

Landing page

Login

Signup

Dashboard

Upload page

Analysis page

Compare page

Q&A page

Lawyer Preparation page

History page

Settings

Use mock data where necessary.

Do NOT implement Gemini yet.

Do NOT create complex RAG yet.

Do NOT create comparison AI yet.

First make the UI polished and navigable.

Then we will connect Supabase.

Then we will connect Gemini.

Then we will implement each AI feature one by one.

33. DO NOT DO THESE THINGS

Do not:

Build a generic ChatGPT clone

Give legal advice

Invent legal information

Invent document clauses

Invent sources

Expose API keys

Make uploaded documents public

Add unnecessary technologies

Build everything in one huge backend

Overcomplicate the UI

Add unnecessary animations

Create fake AI output and present it as real

34. FIRST TASK

Start with PHASE 1 only.

Build the polished frontend and application shell.

Do not implement Gemini.

Do not implement complex backend functionality yet.

Create the pages, routing, navigation, reusable components, responsive design, empty states and mock/demo data.

After completing Phase 1:

Tell me what was created.

List the pages.

List important files created.

Explain how to test the UI.

Tell me what we should do next.

Do not move automatically to the next phase.

Wait for my instruction:

"NEXT PHASE"

before implementing Supabase.

</Lovable_build_instructions>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://text-to-law.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a47c3cdd-8ff2-4f11-8518-3c56379b44fd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
