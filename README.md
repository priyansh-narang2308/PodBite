# 🎙️ PodBite – AI-Powered Podcast Summarizer  

PodBite is an **AI-driven podcast summarization app** built with **Next.js**, **LangChain**, **Supabase (Postgres)**, **NextAuth**, **Stripe**, and **OpenAI APIs**.  
It transforms long-form podcasts or YouTube videos into **concise, meaningful summaries** that are easy to consume on the go.  

Powered by **LangChain's text splitting, embeddings, and map-reduce summarization pipeline**, PodBite extracts the essence of any podcast or long conversation—helping you save time and retain insights.  

---

## 🚀 Features  

- 🎧 **AI Podcast Summarization** – Extracts key points and insights from YouTube podcast transcripts.  
- ⚡ **LangChain Pipeline** – Uses embeddings, text splitters, and a map-reduce summarization chain for high-quality results.  
- 🔑 **Secure Authentication** – Google OAuth via **NextAuth**.  
- 🗄️ **Database Integration** – Stores user sessions, summaries, and subscription info in **Postgres (Supabase)**.  
- 💳 **Payments & Subscriptions** – Stripe integration for premium AI features.  
- 🎨 **Modern UI** – Built with **Next.js App Router** + **TailwindCSS** + **shadcn/ui**.  
- ☁️ **Deployment-Ready** – Optimized for deployment on **Vercel**.  

---

## 🛠️ Tech Stack  

### **Core**  
- [Next.js 14](https://nextjs.org/) – React framework with App Router  
- [TypeScript](https://www.typescriptlang.org/) – Type safety  

### **AI/LLM**  
- [LangChain](https://docs.langchain.com/) – Chains, text splitting, embeddings, summarization  
- [OpenAI GPT Models](https://platform.openai.com/) – LLM-powered summarization  

### **Auth & Database**  
- [NextAuth.js](https://next-auth.js.org/) – Authentication with Google OAuth  
- [Supabase](https://supabase.com/) – Hosted Postgres database  

### **Payments**  
- [Stripe](https://stripe.com/) – Subscriptions and checkout  

### **Styling**  
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS  
- [shadcn/ui](https://ui.shadcn.com/) – Pre-built, customizable UI components  

---

## ⚙️ Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/priyansh-narang2308/PodBite.git
cd PodBite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add Environment Variables
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dagsdha6e273asfdcagsd

DATABASE_URL="POSTGRES_DB_URL"
OPENAI_API_KEY="YOUR_OPEN_API_KEY"


GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_-------------------
STRIPE_SECRET_KEY=sk_test_----------------------
STRIPE_WEBHOOK_KEY=-------
```

### 4. Run the development server
```bash
npm run dev
```

## 🧠 How It Works  

1. **Transcript Fetching** – Extracts the podcast transcript directly from YouTube.  
2. **Text Splitting** – Long transcripts are split into smaller, meaningful chunks using **LangChain’s `RecursiveCharacterTextSplitter`**.  
3. **Embeddings** – Each chunk is converted into **vector embeddings** for semantic understanding and context retention.  
4. **Map-Reduce Summarization**:  
   - **Map Step** – Each chunk is summarized independently.  
   - **Reduce Step** – All partial summaries are combined into a final, coherent podcast summary.  
5. **Display** – The generated summary is presented in a **clean and modern UI**, with optional highlights & key takeaways.  


