import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useSpring, useMotionValue } from 'motion/react';
import { Linkedin, Mail, MessageSquare, ArrowRight, Menu, X, ArrowLeft, ExternalLink, Cpu, BarChart3, BrainCircuit, Feather, HeartPulse, Sparkles, Globe } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import LiquidGradient from './components/LiquidGradient';
import portraitImage from './assets/images/regenerated_image_1778511595814.png';
import aboutPortraitImage from './assets/images/regenerated_image_1778509068409.png';
import aiToolsHeroImage from './assets/images/regenerated_image_1781797455425.jpg';
import batteryPredictiveImage from './assets/images/pump.png';
import batteryPredictiveLandscapeImage from './assets/images/smart_pump_landscape_1781769349520.jpg';
import milkBagsImage from './assets/images/elvie-breastfeeding-elvie-breast-milk-storage-bags-pack-of-100-1125072807_1200x.webp';
import brandCulturalImage from './assets/images/images.jpeg';
import userBehaviorHoverImage from './assets/images/04.png';
import reviewsChatbotHoverImage from './assets/images/05.jpg';
import sentimentAnalysisImage from './assets/images/06.jpg';
import deviceUsageDashboardHoverImage from './assets/images/07.jpg';
import psychologyNeuroscienceHoverImage from './assets/images/08.jpg';
import femtechHeroImage from './assets/images/regenerated_image_1781856008959.webp';

const IMAGES = {
  PORTRAIT: portraitImage,
  ABOUT_PORTRAIT: aboutPortraitImage,
  AI_TOOLS: aiToolsHeroImage,
  PROJECT_1: batteryPredictiveLandscapeImage,
  PROJECT_1_HOVER: batteryPredictiveImage,
  PROJECT_2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOg8Yay0D1hkxV0zMHa9fqYCtnDXHLWwzSvQhs7LyelRkc9DgT6iI87RxnWoB0W0p4Z94iJgtPkS2aPbaev8BFLUsRf71K5J0G56Z2muRNmSoROZ4vfWnZw4OGsDgf50FMCAfO8DeiijKZ30F28zaWoN4bHKS-xSnJEU2dlnvMx-qAC4iM5ykpXfUREBwQoEp3GZpeccW_AZPEOyJJzKU-yDBOGsPLW9bFfjlEqRsymJxEktiDl924vKNtgAhgp-8cbuUh9N2K34=s1200-rw",
  PROJECT_2_HOVER: milkBagsImage,
  PROJECT_3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsI2ZgL921SMQg0yA-P9v7QrQk07cYw4k7k6Qoj0BIYf7bTNpsWqFKaEUQaBbSddupPs9jNzp3lSTQcg29IqHczDWaKnIcTO0yB1DkBl4tgd974IkEIuRuV20c-QCPWlkFDz4D8FP1q6j6suldpCFyeJfNF88rRzgsQkYDC3g7o1vZ2Pm9uC66qvhE2gYiyQgeI5bI1mGlEnPFGXwApAX1qgrSTe4XeBd-tHgkOZygb-QnNKp8XzYIcOp66K6pYe5DOXtLpL6szkQ=s1200-rw",
  PROJECT_3_HOVER: brandCulturalImage,
  PROJECT_4: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  PROJECT_4_HOVER: userBehaviorHoverImage,
  PROJECT_5: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  PROJECT_5_HOVER: reviewsChatbotHoverImage,
  PROJECT_6: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
  PROJECT_6_HOVER: sentimentAnalysisImage,
  PROJECT_7: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  PROJECT_7_HOVER: deviceUsageDashboardHoverImage,
  PROJECT_8: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200",
  PROJECT_8_HOVER: psychologyNeuroscienceHoverImage,
  FEMTECH: femtechHeroImage
};

const projects = [
  {
    id: "battery-life-prediction",
    title: "Battery Life Prediction",
    category: "Python, ML, SQL, Predictive Modelling",
    description: "Evaluating machine learning pipelines to estimate remaining user sessions from hardware telemetry and battery wear patterns.",
    overview: "This project explored whether a smart device could estimate remaining battery life in a more useful way: not just as a percentage, but as an approximate number of remaining user sessions.\n\nThe work was completed as a research and scoping project. The goal was to evaluate whether machine learning could support this feature, understand which data signals were reliable, and recommend a practical product direction.",
    problem: "Battery percentage alone did not fully answer the user’s real question: “How many more sessions can I complete before I need to charge?”\n\nThe business challenge was to translate battery level into a personalised, session-based estimate using historical usage and hardware telemetry.\n\nThe technical challenge was that battery depletion depended on several factors, including session length, temperature, device age, and user behaviour. Some of the strongest predictors were not always available before a future session started, which created a risk of overpromising accuracy.",
    myRole: "Lead Data Scientist / Machine Learning Researcher\n\nI was responsible for turning a broad product idea into a structured data science feasibility study.\n\nMy work included:\n• Reviewing previous battery depletion analysis\n• Building a modeling dataset from multiple data sources\n• Cleaning and aggregating raw hardware telemetry\n• Engineering battery, temperature, runtime, and user-behaviour features\n• Performing exploratory data analysis\n• Testing multiple regression approaches\n• Evaluating model feasibility for a user-facing product",
    approach: "I created a session-level dataset by combining anonymised user-session data, device-session data, hardware telemetry, and manufacturing metadata.\n\nThe raw hardware data included battery readings, temperature readings, mode changes, intensity-setting changes, and stage timestamps. I aggregated this data so each row represented one device session, with features such as battery start, battery end, battery drop, runtime, temperature rise, number of mode changes, number of intensity changes, and estimated battery age.\n\nDuring exploratory analysis, I found that runtime was the strongest practical driver of battery drop. Temperature rise was also strongly associated with depletion. Mode and intensity-setting changes were less useful than expected because most users rarely changed settings, making those variables highly imbalanced.\n\nI tested several regression approaches, including user-level average prediction, session-level prediction, and hybrid models combining historical user averages with session-level features.\n\nThe models performed better when runtime was included, but this created a product limitation: future session runtime would not be known in advance. Because of this, I recommended treating the work as a feasibility study rather than a production-ready ML model.\n\nThe final recommendation was to use a historical-average approach that estimates remaining sessions based on a user’s previous short, average, and long sessions.",
    toolsUsed: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "SQL", "Google Cloud Storage", "Matplotlib", "Seaborn", "Plotly", "Jupyter Notebook", "Linear Regression", "Random Forest Regressor", "K-Nearest Neighbors Regressor", "Support Vector Regression", "XGBoost Regressor", "Ridge Regression", "Lasso Regression", "ElasticNet Regression"],
    outcome: "The project clarified that machine learning could identify useful battery-depletion patterns, but the available data did not support a reliable production-ready prediction model for this specific user-facing feature.\n\nThe main outcome was a product-safe recommendation: use personalized historical session averages instead of a precise ML prediction.\n\nThis shifted the proposed feature from a fragile prediction model to a more explainable user insight, such as:\n\n“Based on your historical usage, your current battery level may support around five average-length sessions.”\n\nThis approach was easier to explain, easier to implement, and less likely to mislead users.",
    whatThisDemonstrates: "Demonstrates my capability to combine low-level hardware telemetry with robust regression workflows to solve device management issues.",
    image: IMAGES.PROJECT_1,
    hoverImage: IMAGES.PROJECT_1_HOVER,
    bgColor: "bg-[#F9F5F6]"
  },
  {
    id: "text-OCR",
    title: "Text Extraction With OCR and AI",
    category: "OCR, Multimodal AI, GCP",
    description: "Explored OCR and multimodal AI methods to automatically extract volume, date, and time from milk bag labels.",
    overview: "This project explored how OCR and multimodal AI could be used to extract structured information from milk-related images and documents.\n\nThe goal was to evaluate whether fields such as name, date, time, and volume could be automatically captured from images instead of being entered manually. The project compared traditional OCR methods with newer multimodal AI tools to understand which approach was most suitable for messy real-world images.",
    problem: "Manual extraction of information from images is slow, repetitive, and error-prone.\n\nThe technical challenge was that the source images were not always clean digital documents. They could include photographed labels, handwritten or printed fields, low contrast, inconsistent lighting, and measurement markings.\n\nThe project needed to answer a practical feasibility question:\n\nCan we reliably extract useful structured information from these images, and which OCR or AI approach works best?",
    myRole: "Lead Data Scientist \n\nI was responsible for testing multiple OCR and AI-based extraction approaches and assessing their suitability for structured data capture.\n\nMy work included:\n• Testing traditional OCR with Tesseract\n• Applying image preprocessing to improve OCR readability\n• Testing OCR.space as an external OCR API\n• Exploring Google Document AI for document parsing and key-value extraction\n• Testing GPT-4 Vision for field extraction and visual reasoning\n• Testing Gemini Vision for multimodal document understanding\n• Comparing approaches based on extraction quality and practical implementation fit",
    approach: "I started with traditional OCR using Tesseract and OpenCV. I tested preprocessing steps such as grayscale conversion, thresholding, noise removal, contrast enhancement, dilation, erosion, edge detection, and deskewing to improve text recognition.\n\nI then tested OCR.space as an API-based OCR option, using image preprocessing to improve input quality before sending images for extraction.\n\nNext, I explored Google Document AI to extract full text and structured form fields. This approach was useful for testing whether the images could be treated as semi-structured documents with field names and field values.\n\nFinally, I tested multimodal AI models, including GPT-4 Vision and Gemini Vision. Instead of only reading raw text, these models were prompted to extract specific fields such as name, date, time, and volume. I also tested whether vision models could reason about liquid volume using measurement lines in the image.\n\nThe project compared rule-based OCR, document parsing, and multimodal AI to understand the strengths and limitations of each approach.",
    toolsUsed: ["Python", "OpenCV", "Pillow", "pytesseract", "Tesseract OCR", "OCR.space API", "Google Document AI", "Google Cloud", "OpenAI GPT-4 Vision", "Google Vertex AI", "Gemini Vision", "requests", "pandas", "Jupyter Notebook", "Google Colab"],
    outcome: "The project showed that traditional OCR could extract text from simple images, but performance depended heavily on image quality and preprocessing.\n\nDocument AI provided a stronger option for structured form extraction, especially when the image contained recognisable field names and values.\n\nMultimodal AI models offered the most flexible approach for messy images because they could follow task-specific prompts and extract targeted fields rather than only returning raw OCR text.\n\nThe outcome was a clearer understanding of which extraction method was most appropriate depending on the image type:\n\nTraditional OCR for cleaner text-heavy images\n\nDocument AI for structured forms\n\nMultimodal AI for more flexible visual understanding and field extraction\n\nThis helped shape a more practical direction for automating milk-related data capture from images.",
    whatThisDemonstrates: "Demonstrates my specialization in developing ultra-clean enterprise analytics and custom graphics that clarify messy, dense relational operations.",
    image: IMAGES.PROJECT_2,
    hoverImage: IMAGES.PROJECT_2_HOVER,
    bgColor: "bg-[#E6EAEB]"
  },
  {
    id: "CPI",
    title: "Cultural Power Index",
    category: "Data Analysis, Statistical Modelling, LLM",
    description: "Created a multi-source data transformation and scoring pipeline to quantify brand cultural relevance across markets.",
    overview: "This project supported the development of an AI-powered Cultural Power Index for a global creative agency group.\n\nThe index was designed to measure how strongly brands show up in culture by combining signals from brand, media, search, social, trend, and AI-generated datasets. The project covered 42 brands across multiple markets and turned fragmented cultural data into a structured scoring system for brand strategy and competitive analysis.",
    problem: "The client needed a scalable way to compare brands across many different cultural signals.\n\nThe challenge was that the raw data came from multiple sources, formats, scales, and metric types. Some metrics were traffic or search volumes, some were social and media signals, some captured brand impact, and others came from AI-based cultural analysis.\n\nA second challenge was insight generation. The index could produce scores, but the client also needed a way to explain what was driving those scores and extract meaningful strategic insights from the data.\n\nThe project needed both a robust scoring methodology and AI tools that could help translate complex data into clear brand intelligence.",
    myRole: "Data Scientist \n\nI worked on both the data transformation pipeline and the AI-powered insight extraction layer.\n\nMy contributions included:\n• Organising brand datasets from cloud storage\n• Preparing data across 42 brands and multiple markets\n• Designing repeatable data transformation workflows\n• Supporting index methodology and scoring logic\n• Handling inconsistent metric scales, outliers, and low-signal data\n• Creating market-ready outputs for analysis and reporting\n• Building AI tools using the OpenAI API to extract, summarise, and structure cultural insights\n• Designing prompts and structured outputs to support faster interpretation of brand performance",
    approach: "I supported the development of a scalable data workflow that brought together multiple brand and cultural intelligence datasets across 42 brands and several markets.\n\nThe work involved preparing diverse inputs for analysis, aligning them into a consistent structure, and creating a repeatable process for comparing brand performance across different cultural dimensions. Because the source data varied significantly in format, scale, and reliability, I focused on making the pipeline robust enough to handle inconsistent metrics, outliers, and market-level differences.\n\nI also contributed to the index scoring layer, helping transform raw signals into comparable brand-level outputs that could support strategic interpretation. The methodology was designed to balance analytical rigor with practical usability, so that the results could be understood by both data teams and brand strategists.\n\nAlongside the index pipeline, I built AI-powered tools using the OpenAI API to help extract and summarise cultural insights. These tools supported faster interpretation of brand performance by turning complex data outputs into clearer strategic narratives.\n\nThe final workflow combined structured data processing, scoring logic, and AI-assisted insight generation to support a broader cultural intelligence product.",
    toolsUsed: ["Python", "pandas", "NumPy", "SciPy", "scikit-learn", "OpenAI API", "Prompt engineering", "Structured outputs", "boto3", "AWS S3", "Excel", "CSV", "Jupyter Notebook", "PowerPoint"],
    outcome: "The project produced a repeatable data transformation and scoring workflow for an AI-powered Cultural Power Index covering 42 brands across multiple markets.\n\nThe pipeline made it possible to combine very different cultural, media, search, social, and AI-derived signals into comparable brand scores.\n\nThe work also clarified key methodology decisions, including how to normalise metrics, how to handle extreme outliers, how to protect low-variability metrics, and how to apply weighting across index pillars.\n\nThe OpenAI-powered tools added an insight layer on top of the scoring system, helping turn complex index outputs into clearer explanations of brand performance and cultural relevance.",
    whatThisDemonstrates: "Demonstrates my capability to design and implement niche, hyper-customized Generative AI workflows that solve direct operational bottlenecks in professional services.",
    image: IMAGES.PROJECT_3,
    hoverImage: IMAGES.PROJECT_3_HOVER,
    bgColor: "bg-[#F1EEF4]"
  },
  {
    id: "user-segmentation",
    title: "User Behaviour Segmentation",
    category: "Clustering, Feature Engineering, Big Data",
    description: "Used unsupervised machine learning to segment users by smart device interaction patterns.",
    overview: "This project explored whether users of a smart pumping product could be grouped into meaningful behaviour segments based on how they interacted with pumping modes, intensity settings, pauses, presets, and session patterns.\n\nThe work used unsupervised machine learning and dimensionality reduction techniques, including UMAP and t-SNE, to visualise high-dimensional usage patterns and identify natural groups of users.\n\nThe analysis revealed that the majority of users relied on default pumping settings, while a smaller group actively experimented with modes and intensity levels. Deeper analysis of this experimental group surfaced more advanced behaviours, including “power users” who rapidly switched between stimulation and pumping modes.\n\nThese insights helped inform product thinking around pumping modes and how different user groups interact with the app and device.",
    problem: "One of the main challenges was transforming raw hardware and session logs into meaningful user-level behaviour features. The source data included session duration, pauses, mode changes, intensity settings, preset usage, and timestamps, but these signals had to be aggregated carefully to describe each user’s typical behaviour.\n\nThe dataset was also highly imbalanced. Around 80% of users mainly used default settings, while only a smaller group experimented with modes and intensity levels. This made it important not to let the dominant default-user behaviour hide smaller but strategically important segments.\n\nAnother challenge was interpreting unsupervised learning results. Clustering methods can reveal patterns, but the clusters are not automatically meaningful. I had to translate the model outputs into understandable user behaviour groups that could be discussed with product stakeholders.\n\nThe analysis also required testing multiple ways to represent high-dimensional behaviour. UMAP and t-SNE were useful for visual exploration, but their outputs needed to be interpreted carefully because visual separation does not always mean a segment is product-relevant.\n\nFinally, the project had to balance technical exploration with product usefulness. The goal was not just to find clusters, but to identify behaviour patterns that could inform app design, mode strategy, and a better understanding of how different users interact with the device.",
    myRole: "Data Scientist\n\nI worked on the exploratory analysis and unsupervised machine learning research.\n\nMy work included:\n• Preparing large-scale pump-session and hardware behaviour datasets\n• Aggregating session-level data into user-level behavioural features\n• Engineering features around mode usage, intensity settings, pauses, presets, and session duration\n• Testing unsupervised learning methods to identify natural user groups\n• Using dimensionality reduction to visualise behavioural patterns\n• Interpreting clusters in collaboration with product stakeholders\n• Translating model findings into user behaviour insights for product strategy",
    approach: "I worked with a large dataset of users and pump sessions, including session timing, pauses, mode usage, intensity settings, preset usage, and hardware interaction logs.\n\nThe data was transformed from raw session-level logs into behavioural features describing how each user typically pumped. These features likely included signals such as average session length, number of mode switches, number of intensity changes, pause behaviour, preset usage, and consistency of settings across sessions.\n\nI then explored unsupervised machine learning methods to identify whether users formed natural groups. This included dimensionality reduction techniques such as UMAP to visualise high-dimensional behaviour patterns, along with clustering approaches to group users based on similarity.\n\nThe analysis showed that most users followed relatively simple behaviour patterns, with around 80% mainly using default pumping settings. A smaller group, around 20%, experimented more actively with settings.\n\nZooming in on the more experimental users revealed more specific behavioural patterns. One important segment was “power pumpers,” who rapidly switched between pumping and stimulation modes. Other segments appeared to reflect different levels of experimentation, consistency, and control over pumping settings.",
    toolsUsed: ["Python", "pandas", "NumPy", "scikit-learn", "UMAP", "Clustering algorithms", "K-nearest-neighbor similarity analysis", "Matplotlib", "Seaborn", "Jupyter Notebook", "Behavioural feature engineering", "Exploratory data analysis"],
    outcome: "The project turned complex hardware and session logs into understandable behavioural segments.\n\nThe main finding was that most users relied on default settings, while a smaller but important group actively experimented with modes and intensity settings. Within that experimental group, the analysis identified distinct behaviours such as rapid switching between stimulation and expression modes.\n\nThese insights helped the product team better understand how different users interacted with pumping settings and informed thinking around introducing or improving pumping modes in the app.",
    whatThisDemonstrates: "Demonstrates my capability to design and implement niche, hyper-customized algorithms that solve direct operational bottlenecks and uncover hidden users' insights.",
    image: IMAGES.PROJECT_4,
    hoverImage: IMAGES.PROJECT_4_HOVER,
    bgColor: "bg-[#FDF2F2]"
  },
  {
    id: "chatbot",
    title: "Customer Review ChatBot",
    category: "LLM, RAG, Text Preprocessing",
    description: "GenAI chatbot that let marketing team upload customer reviews, ask natural language questions and uncover pain points.",
    overview: "This project involved building a RAG-style chatbot that allowed a marketing team to explore large volumes of customer reviews through a simple Streamlit interface.\n\nInstead of manually reading and categorising reviews, users could upload review data and ask natural language questions such as “What are the biggest customer pain points?”, “What do customers love most?”, or “What complaints appear most often?”\n\nThe work was completed during a full-time data science role at a consumer health-tech company, during the early adoption period of LLM tools.",
    problem: "The marketing team had access to large amounts of customer review data, but extracting useful insights was slow and manual.\n\nCustomer reviews contained valuable information about product pain points, customer satisfaction, feature requests, emotional language, and repeated complaints. However, this feedback was spread across many individual reviews, making it difficult to summarise quickly.\n\nThe challenge was to create a tool that helped non-technical users interact with review data conversationally while reducing the risk of hallucinated or unsupported answers from the language model.\n\nAdditional Challenges:\n• Early LLM adoption hurdles: Building this during the early days of LLM adoption, when patterns for reliable retrieval, chunking, and grounding were still developing quickly.\n• Messy and varied review data: Customers often described the same pain point in different ways, and many reviews contained multiple topics in one response. This made it important to design retrieval and prompting logic that could surface recurring themes without flattening the nuance.\n• Troubleshooting hallucinations: Early versions of the chatbot sometimes produced plausible-sounding but unsupported summaries. I addressed this by making the workflow more retrieval-grounded, constraining answers to the uploaded review data, and encouraging the model to cite or summarise the evidence behind its conclusions.\n• Interface simplicity: The interface needed to be simple enough for marketing users. The goal was not to expose technical complexity, but to create a usable tool for exploring customer pain points, positive feedback, recurring complaints, and product opportunities.",
    myRole: "Data Scientist\n\nI designed and prototyped the review chatbot workflow, including the user-facing Streamlit app and the retrieval-based question-answering logic.\n\nMy contributions included:\n• Building a lightweight Streamlit interface for marketing users\n• Enabling review file upload and question answering\n• Preparing and structuring customer review text for LLM analysis\n• Experimenting with chunking strategies for long review datasets\n• Creating a retrieval-grounded workflow to improve answer relevance\n• Designing prompts for pain-point analysis, theme extraction, and customer insight summaries\n• Reducing hallucinations by grounding responses in retrieved review snippets\n• Creating a prototype that allowed non-technical users to explore reviews conversationally",
    approach: "I built a prototype workflow that allowed users to upload customer review data into a Streamlit app and ask questions through a chat-style interface.\n\nThe core of the system followed a RAG-style approach. Reviews were cleaned, split into meaningful chunks, and searched for the most relevant snippets based on the user’s question. The language model then generated answers using the retrieved review evidence rather than relying on the full dataset or general model knowledge.\n\nA major part of the work was testing chunking strategies. If chunks were too small, the model lost context. If chunks were too large, retrieval became noisy, and answers were less precise. I experimented with review-level and theme-aware chunking to preserve enough context while keeping retrieval focused.\n\nTo reduce hallucinations, I added prompt guardrails that instructed the model to answer only from the retrieved reviews, avoid unsupported claims, and state when there was not enough evidence. Where useful, the chatbot returned supporting snippets or summarised themes so marketing users could understand what the answer was based on.\n\nThe Streamlit app made the workflow accessible to non-technical users, allowing the marketing team to upload review files, ask follow-up questions, and explore customer feedback without needing to run code.",
    toolsUsed: ["Python", "Streamlit", "pandas", "OpenAI API", "LLMs", "Embeddings", "RAG-style retrieval", "Vector search", "Prompt engineering", "Text preprocessing", "Customer review analysis", "Prototype chatbot workflow"],
    outcome: "The project produced a working prototype that allowed marketing users to upload customer reviews and ask natural language questions through a simple Streamlit app.\n\nThe tool helped reduce the manual effort required to identify customer pain points, recurring complaints, positive themes, and product feedback patterns.\n\nThe most important shift was moving from static review analysis to an interactive customer insight workflow. Marketing users could ask questions, explore themes, and generate summaries grounded in the uploaded review data.\n\nThe project also demonstrated the importance of retrieval grounding, careful chunking, and prompt guardrails when building LLM tools for business insight generation.",
    whatThisDemonstrates: "Demonstrates my capability to design and implement custom LLM workflows, context retrieval strategies, and prompt engineering solutions for conversational business intelligence.",
    image: IMAGES.PROJECT_5,
    hoverImage: IMAGES.PROJECT_5_HOVER,
    bgColor: "bg-[#F0FDF4]"
  },
  {
    id: "nlp-review",
    title: "Customer Review Sentiment Analysis With NLP",
    category: "NLP, Sentiment Analysis, NLTK",
    description: "Analysed customer reviews with NLP techniques to classify sentiment.",
    overview: "This project focused on analysing customer reviews using traditional NLP and sentiment analysis techniques.\n\nThe goal was to turn large volumes of unstructured review text into structured insights about customer satisfaction, recurring complaints, product strengths, and areas for improvement.\n\nUnlike the review chatbot project, this work was focused on batch analysis and reporting rather than interactive question answering.",
    problem: "Customer reviews contained valuable product and marketing insights, but the feedback was difficult to analyse manually at scale.\n\nThe team needed a way to understand:\n• Which reviews were positive, neutral, or negative\n• What customers were complaining about most often\n• Which product features were mentioned positively\n• Whether sentiment differed across products, channels, or time periods\n• What recurring themes could inform product, marketing, or customer support decisions\n\nThe challenge was to process messy customer language and create a structured view of customer sentiment and feedback themes.\n\nAdditional Challenges:\n• Messy and emotionally nuanced reviews: A short review can contain both praise and criticism, which makes simple sentiment classification difficult.\n• Standard tools and product-specific language: Generic sentiment tools do not always understand product-specific language. Words that look negative in general may not always indicate a bad customer experience, and some complaints may be hidden in otherwise positive reviews.\n• Messy raw review data: The review data likely contained duplicates, very short reviews, inconsistent wording, spelling issues, and mixed topics, making preprocessing and manual validation important.\n• Usability for non-technical stakeholders: Making the analysis useful for non-technical stakeholders by going beyond sentiment labels to explain what customers were actually saying.",
    myRole: "Data Scientist\n\nI worked on the customer review analysis workflow, from text cleaning through to sentiment classification and insight generation.\n\nMy contributions included:\n• Cleaning and preparing customer review text\n• Removing noise such as punctuation, casing inconsistencies, duplicates, and irrelevant text\n• Applying sentiment analysis methods to classify reviews\n• Exploring positive, neutral, and negative review patterns\n• Extracting frequent keywords and recurring themes\n• Comparing sentiment across review groups\n• Creating summaries and visual outputs for stakeholders\n• Translating NLP results into product and marketing insights",
    approach: "I started by cleaning and standardising the review text so it could be analysed consistently. This included text normalisation, tokenisation, stop-word handling, and preparing the data for NLP analysis.\n\nI then applied sentiment analysis techniques to classify reviews into sentiment categories. The analysis likely combined rule-based or pre-trained NLP sentiment tools with exploratory review inspection to check whether the classifications made sense in context.\n\nAlongside sentiment scoring, I explored recurring terms, phrases, and topics in the review data. This helped identify repeated pain points, common praise, and product-related themes.\n\nThe output was designed to help stakeholders understand customer feedback at a higher level, rather than manually reading individual reviews one by one.",
    toolsUsed: ["Python", "pandas", "NumPy", "NLTK", "spaCy", "TextBlob or VADER", "scikit-learn", "Regular expressions", "Matplotlib", "Seaborn", "Jupyter Notebook", "Text preprocessing", "Sentiment analysis", "Keyword and theme extraction"],
    outcome: "The project helped transform unstructured customer reviews into structured insight.\n\nThe analysis made it easier to identify broad sentiment patterns, recurring customer pain points, common positive themes, and areas where product or messaging could be improved.\n\nThe work gave teams a clearer view of customer opinion at scale and created a foundation for more advanced review intelligence tools, including later GenAI and chatbot-based approaches.",
    whatThisDemonstrates: "Demonstrates my capability to apply traditional NLP techniques, text preprocessing, and sentiment classification to extract structured business insights from unstructured customer feedback.",
    image: IMAGES.PROJECT_6,
    hoverImage: IMAGES.PROJECT_6_HOVER,
    bgColor: "bg-[#EFF6FF]"
  },
  {
    id: "device-usage-dashboard",
    title: "Smart Device Usage Tableau Dashboard",
    category: "Tableau, Data Viz",
    description: "Tableau dashboard to help product and business teams explore user activity.",
    overview: "This project involved building a Tableau dashboard to help internal teams understand how users interacted with a smart pumping product.\n\nThe dashboard brought together key product and user behaviour metrics, including pumping time, average number of sessions, milk volume, device model usage, and country-level adoption.\n\nThe work was completed during a full-time data science role at a consumer health-tech company.",
    problem: "Product and business teams needed a clearer way to monitor user behaviour and understand how the product was being used across markets and device models.\n\nThe data existed across product usage and user activity tables, but it was not easy for non-technical stakeholders to explore without asking analysts for repeated reports.\n\nThe goal was to create a self-serve dashboard that allowed teams to answer common questions such as:\n• Which countries have the most active users?\n• How often do users pump?\n• How long are typical sessions?\n• Which device models are most used?\n• How much milk volume is being recorded?\n• How do usage patterns vary across markets or products?\n\nAdditional Challenges:\n• Designing accurate metrics: Designing metrics that were both technically accurate and easy for stakeholders to understand. For example, session frequency, average pumping time, and milk volume needed to be calculated consistently so they could be compared across groups.\n• Multi-level granularity data: Working with behavioural data at different levels of granularity. User-level summaries, session-level activity, country-level adoption, and device model usage all needed to fit into one coherent dashboard.\n• Usability vs detail: Dashboard design needed to balance detail with usability. Too many charts would make it overwhelming, while too little detail would limit its usefulness. I focused on giving teams a clear overview first, with filters and breakdowns for deeper exploration.\n• Multi-stakeholder utility: Making the dashboard useful across different teams. Product teams cared about behaviour and engagement, while business stakeholders were more interested in market and device-level trends.",
    myRole: "Data Scientist\n\nI was responsible for preparing the data and building the Tableau dashboard for stakeholder use.\n\nMy work included:\n• Defining the key product and user behaviour metrics\n• Preparing user, session, pump model, geography, and milk volume data\n• Creating calculated fields for average pumping time, session frequency, and volume summaries\n• Building Tableau visualisations for trends, comparisons, and geographic breakdowns\n• Adding filters so teams could explore usage by country, device model, date range, and user segment\n• Designing the dashboard layout for non-technical stakeholders\n• Translating product usage data into business and product insights",
    approach: "I started by identifying the main questions product, marketing, and business stakeholders wanted to answer about user behaviour.\n\nThe dashboard was designed around a set of core usage metrics, including active users, pumping sessions, average session duration, average sessions per user, milk volume, country distribution, and device model usage.\n\nI prepared the data so that it could be analysed at different levels, such as user level, session level, country level, and device model level. This made it possible to compare behaviour across markets and products.\n\nIn Tableau, I created a dashboard with high-level KPI cards, trend charts, geographic views, and breakdowns by pump model. I also added filters to make the dashboard self-serve, allowing stakeholders to explore patterns without needing new custom analysis each time.\n\nThe dashboard helped turn raw user activity data into a practical product analytics tool.",
    toolsUsed: ["Tableau", "SQL", "Python", "pandas", "Product analytics", "Data cleaning", "Calculated fields", "Dashboard design", "Data visualisation", "User behaviour analysis"],
    outcome: "The dashboard gave internal teams a self-serve way to explore product usage and user behaviour.\n\nIt helped stakeholders understand how users were engaging with the product across countries, device models, session patterns, and milk volume records.\n\nInstead of relying only on ad hoc analyst requests, teams could use the dashboard to monitor key metrics, compare markets, and identify behaviour patterns more quickly.",
    whatThisDemonstrates: "Demonstrates my capability to translate multi-granular product and user behaviour logs into clean, self-serve, and highly insightful visual reporting systems.",
    image: IMAGES.PROJECT_7,
    hoverImage: IMAGES.PROJECT_7_HOVER,
    bgColor: "bg-[#F8FAFC]"
  },
  {
    id: "psychology-neuroscience-stats",
    title: "Statistical Analysis for Neuroscience Research",
    category: "Statistical Analysis, Pandas, Python",
    description: "Supported published academic studies through data preparation and statistical analysis.",
    overview: "This project represents my academic research work as a Research Assistant in psychology and neuroscience.\n\nI contributed to peer-reviewed studies investigating emotion regulation, smoking behaviour, childhood trauma, novelty processing, and neuroimaging markers linked to mental health risk.\n\nThe work involved preparing research data, supporting participant data collection, organising behavioural and questionnaire datasets, and contributing to statistical analysis workflows used in published academic papers.",
    problem: "Academic research data needs to be handled with a high level of accuracy, transparency, and methodological care.\n\nThe studies involved complex psychological and behavioural questions, including how smokers regulate negative emotions and how childhood trauma may be associated with altered brain activation and functional connectivity during novelty detection.\n\nThe challenge was to prepare and analyse data in a way that supported valid statistical testing, reproducible research outputs, and clear interpretation for publication.",
    myRole: "Research Assistant\n\nI supported published academic studies through research setup, participant data collection, data preparation, and analysis support.\n\nMy contributions included:\n• Preparing and organising participant datasets\n• Supporting questionnaire and behavioural task data collection\n• Cleaning and structuring research data for analysis\n• Using Python to support data preparation and statistical workflows\n• Preparing data for group comparisons and experimental condition analysis\n• Supporting analysis of behavioural task outcomes\n• Contributing to manuscript preparation\n• Working within ethical and reproducible academic research standards",
    approach: "Across the research projects, I worked with behavioural, questionnaire, and neuroimaging-related datasets.\n\nFor the smoking and emotion regulation study, the analysis compared smokers and non-smokers on their ability to use cognitive reappraisal during an online emotion regulation task. The dataset included task responses, smoking history variables, alcohol and cannabis use, and Difficulties in Emotion Regulation Scale scores.\n\nThe analysis involved comparing emotional responses across experimental conditions, including image valence, regulation instruction, image perspective, and smoking group. The work supported statistical testing of whether smokers had more difficulty regulating negative emotions, particularly in self-relevant situations.\n\nFor the childhood trauma and neuroimaging study, the research compared high and low childhood trauma groups during an auditory novelty detection task. The study involved questionnaire data, behavioural task performance, and fMRI-derived measures of brain activation and functional connectivity.\n\nMy work focused on preparing and organising research data so it could be used reliably in downstream statistical and neuroimaging analyses.",
    toolsUsed: ["Python", "pandas", "NumPy", "SciPy", "Jupyter Notebook", "SPSS", "SPM12", "Qualtrics", "Inquisit", "Behavioural task data", "Questionnaire data", "fMRI data preparation", "Statistical analysis", "Data cleaning", "Academic reporting"],
    outcome: "The work contributed to peer-reviewed academic publications in psychology, psychiatry, neuroscience, and addiction research.\n\nOne study found that smokers showed reduced success using cognitive reappraisal to regulate negative emotions, especially for first-person negative images.\n\nAnother study found that high childhood trauma was associated with altered hippocampal activation and reduced hippocampal-temporal-prefrontal functional connectivity during novelty detection.\n\nThese projects strengthened my experience in rigorous statistical analysis, research data preparation, and careful interpretation of behavioural and neuroimaging findings.",
    whatThisDemonstrates: "Demonstrates my capability to apply rigorous statistical methodology, data cleaning protocols, and academic reporting standards to complex behavioural and neuroimaging datasets.",
    bibliography: [
      "Signatures of exposure to childhood trauma in young adults in the structure and neurochemistry of the superior temporal gyrus. Journal of Psychopharmacology, 37(5), 510-519.",
      "High levels of childhood trauma associated with changes in hippocampal functional activity and connectivity in young adults during novelty salience. European Archives of Psychiatry and Clinical Neuroscience, 273(5), 1061-1072.",
      "Cigarette smoking is associated with difficulties in the use of reappraisal for emotion regulation. Drug and Alcohol Dependence, 234, 109416."
    ],
    image: IMAGES.PROJECT_8,
    hoverImage: IMAGES.PROJECT_8_HOVER,
    bgColor: "bg-[#F5F3FF]"
  }
];

const FemtechPage = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background selection:bg-[#fa709a] selection:text-white"
    >
      <header className="absolute top-0 left-0 w-full z-50 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 font-bold text-primary hover:text-white transition-all bg-white hover:bg-[#fa709a] border border-[#fa709a]/30 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(250,112,154,0.4)] px-5 py-2.5 rounded-full hover:scale-[1.03] active:scale-95 duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <LiquidGradient variant="schema1" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-[100px] font-light text-white leading-[0.9] tracking-tighter"
                  >
                    Advancing <br />
                    <span className="font-elegant italic">Femtech</span> <br />
                    with Data & AI
                  </motion.h1>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-white/80 max-w-xl font-sans font-light leading-relaxed"
                >
                  Building practical data products, AI tools, and insights for women’s health teams. 
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="relative hidden lg:block"
              >
                <TiltCard>
                  <div className="relative w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl border border-white/10">
                    <img 
                      src={IMAGES.FEMTECH} 
                      alt="Innovation in Health" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>
                </TiltCard>
                <DitheredShape type="droplet" color="#fa709a" className="-top-12 -right-12 w-48 h-48 opacity-20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-6">
              <div className="space-y-8">
                <div className="p-8 md:p-10 bg-gradient-to-br from-[#fa709a]/5 to-[#fee140]/5 rounded-[32px] border border-[#fa709a]/10 space-y-4">
                  <p className="text-2xl md:text-3xl font-bold font-syne text-primary leading-snug">
                    Women spend <span className="text-[#fa709a]">25% more</span> of their lives in poor health than men.
                  </p>
                  <p className="text-lg md:text-xl text-primary/70 font-sans leading-relaxed">
                    Closing that gap could unlock at least <span className="font-semibold text-primary">$1 trillion</span> in annual economic value by 2040.
                  </p>
                </div>
                <div className="space-y-6 text-xl text-primary/80 font-sans leading-relaxed">
                  <p>
                    My interest in FemTech started when I read <em>Invisible Women</em> by Caroline Criado Perez. It made the gender data gap impossible to ignore: the way women are often missing, underrepresented, or misunderstood in data, research, product design, and healthcare.
                  </p>
                  <p>
                    That changed how I thought about technology. I became passionate about using data science and AI to build better tools for women’s health, not just smarter algorithms, but products that reflect real female experiences.
                  </p>
                  <p>
                    I then spent almost three years at <strong>Elvie, a fast-growing FemTech startup</strong>, where I worked on data science and AI solutions across product analytics, user behaviour, customer insights, and smart device data.
                  </p>
                  <p>
                    I also <strong>co-founded <a href="https://femtechpo.pl" target="_blank" rel="noreferrer" className="text-[#fa709a] underline hover:opacity-80 transition-opacity">FemTech po Polsku</a></strong>, a platform popularising FemTech in Poland and Central and Eastern Europe through education, community, LinkedIn content, and podcast conversations.
                  </p>
                  <p>
                    This combination gives me both technical expertise and deep domain knowledge in FemTech, women’s health, and consumer health technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-[#fdf9f1] rounded-[40px] border border-black/5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Globe className="w-6 h-6 text-[#fa709a]" />
                </div>
                <h3 className="text-2xl font-bold font-syne text-primary">Femtech Po Polsku</h3>
                <p className="text-primary/70 font-sans leading-relaxed">
                  Building the central hub for the Polish femtech community, offering insights, market analysis, and networking opportunities for startups and health professionals.
                </p>
                <a 
                  href="https://femtechpo.pl" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all pt-2"
                >
                  Visit Platform <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="p-10 bg-primary rounded-[40px] text-white space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-syne">Work With Me</h3>
                <p className="text-white/70 font-sans leading-relaxed">
                  I love to collaborate in FemTech projects where data can play a transformative role!
                </p>
                <a 
                  href="mailto:machonsm@gmail.com" 
                  className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all pt-2"
                >
                  Let's collaborate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>


      </main>

      <footer className="bg-[#fdf9f1] py-12 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-bebas text-2xl tracking-wider text-primary">Sandra Machon</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary/40 font-syne font-bold">
            © {new Date().getFullYear()} Femtech Advocacy
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const GreenSunburst = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L53 47L100 50L53 53L50 100L47 53L0 50L47 47L50 0Z" fill="currentColor" opacity="1" />
  </svg>
);

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-background">
        <div className="space-y-6">
          <h1 className="text-4xl font-black text-on-background">Project Not Found</h1>
          <button 
            onClick={() => navigate('/#work')}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background selection:bg-primary selection:text-white"
    >
      {/* Detail Header */}
      <div className="w-full py-16 md:py-24 px-6 md:px-12 relative overflow-hidden border-b border-black/5 min-h-[320px] flex items-center justify-center">
        <LiquidGradient variant="schema1" />
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center space-y-8 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/#work')}
            className="self-start flex items-center gap-2 font-bold text-white bg-white/10 border border-white/20 hover:bg-white hover:text-primary backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm text-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </motion.button>
          
          <div className="space-y-4 max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#eae2e9] block"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold font-syne text-white tracking-tight"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-20 px-6 md:px-12 space-y-16">
        
        {/* Overview Row */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">01 / Overview</div>
          <div className="space-y-6">
            {project.overview.split('\n\n').map((para, idx) => (
              <p key={idx} className="text-2xl md:text-3xl font-light text-primary/95 font-sans leading-relaxed tracking-tight">
                {para}
              </p>
            ))}
          </div>
        </section>

        <div className="h-[1px] bg-black/10 w-full" />

        {/* Problem & My Role Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">02 / The Problem</div>
            <h3 className="text-xl font-bold font-syne text-primary">Challenge & Needs</h3>
            <div className="space-y-4">
              {project.problem.split('\n\n').map((para, idx) => {
                if (para.includes('\n•') || para.trim().startsWith('•') || para.trim().startsWith('-')) {
                  const lines = para.split('\n').filter(line => line.trim() !== '');
                  return (
                    <div key={idx} className="space-y-2.5">
                      {lines.map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                          return (
                            <div key={lIdx} className="flex items-start gap-2.5 text-primary/80 font-sans leading-relaxed text-[17px] pl-2">
                              <span className="text-[#fa709a] mt-2.5 h-1.5 w-1.5 rounded-full bg-[#fa709a] shrink-0" />
                              <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                            </div>
                          );
                        }
                        return (
                          <p key={lIdx} className="text-primary/80 font-sans leading-relaxed text-[17px]">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-primary/80 font-sans leading-relaxed text-[17px]">
                    {para}
                  </p>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">03 / My Role</div>
            <h3 className="text-xl font-bold font-syne text-primary">Contributions</h3>
            <div className="space-y-4">
              {project.myRole.split('\n\n').map((para, idx) => {
                if (para.includes('\n•') || para.trim().startsWith('•') || para.trim().startsWith('-')) {
                  const lines = para.split('\n').filter(line => line.trim() !== '');
                  return (
                    <div key={idx} className="space-y-2.5">
                      {lines.map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                          return (
                            <div key={lIdx} className="flex items-start gap-2.5 text-primary/80 font-sans leading-relaxed text-[17px] pl-2">
                              <span className="text-[#fa709a] mt-2.5 h-1.5 w-1.5 rounded-full bg-[#fa709a] shrink-0" />
                              <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                            </div>
                          );
                        }
                        return (
                          <p key={lIdx} className="text-primary/80 font-sans leading-relaxed text-[17px]">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  );
                }
                const isRoleTitle = idx === 0 && para.trim().length < 80;
                return (
                  <p key={idx} className={`${isRoleTitle ? "font-bold text-lg text-primary" : "text-primary/80"} font-sans leading-relaxed text-[17px]`}>
                    {para}
                  </p>
                );
              })}
            </div>
          </section>
        </div>

        <div className="h-[1px] bg-black/10 w-full" />

        {/* Approach Section */}
        <section className="space-y-6">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">04 / Approach</div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold font-syne text-primary tracking-tight">Strategy & Engineering</h3>
            <div className="space-y-6">
              {project.approach.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-primary/80 font-sans leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-black/10 w-full" />

        {/* Tools Used Pills */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">05 / Tools Used</div>
          <div className="flex flex-wrap gap-2.5">
            {project.toolsUsed.map((tool, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 bg-white border border-black/10 rounded-full text-xs font-mono font-medium text-primary shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <div className="h-[1px] bg-black/10 w-full" />

        {/* Outcome Row */}
        <section className="p-8 md:p-12 bg-primary rounded-[40px] text-white relative overflow-hidden group space-y-4 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 relative z-10">06 / Outcome</div>
          <h3 className="text-3xl font-bold font-syne relative z-10">Direct Business Impact</h3>
          <div className="space-y-6 relative z-10 max-w-2xl">
            {project.outcome.split('\n\n').map((para, idx) => {
              const isQuote = para.trim().startsWith('“') || para.trim().startsWith('"');
              return (
                <p 
                  key={idx} 
                  className={`font-sans leading-relaxed text-lg ${
                    isQuote 
                      ? 'text-[#fdf9f1] font-serif italic text-xl border-l-[3px] border-[#fa709a] pl-4 my-6 font-medium bg-white/5 py-3 pr-4 rounded-r-md' 
                      : 'text-white/90 font-light'
                  }`}
                >
                  {para}
                </p>
              );
            })}
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </section>

        {/* Bibliography Section */}
        {project.bibliography && (
          <>
            <div className="h-[1px] bg-black/10 w-full" />
            <section className="space-y-6">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#fa709a]">07 / Selected Publications</div>
              <h3 className="text-2xl font-bold font-syne text-primary tracking-tight">Research Bibliography</h3>
              <div className="space-y-4">
                {project.bibliography.map((pub, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-primary/[0.03] rounded-2xl border border-primary/5 shadow-sm hover:border-[#fa709a]/20 transition-all duration-300">
                    <span className="text-xs font-mono font-bold text-[#fa709a] p-1.5 bg-white border border-[#fa709a]/10 rounded-lg shrink-0 h-fit self-start shadow-sm leading-none">
                      [{idx + 1}]
                    </span>
                    <p className="text-primary/90 font-sans text-base leading-relaxed">
                      {pub}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}



      </div>

      {/* Footer Contact Redirect */}
      <div className="bg-[#8D93D1]/10 py-16 px-6 border-t border-black/5 text-center mt-12">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold font-syne text-primary">Need a tailored data or ML solution on your next project?</h3>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/#work')}
              className="px-6 py-3 border border-primary/20 hover:border-primary/50 text-primary rounded-full font-bold text-sm transition-colors bg-white shadow-sm"
            >
              Back to Home
            </button>
            <a 
              href="mailto:machonsm@gmail.com" 
              className="px-6 py-3 bg-primary text-white rounded-full font-bold text-sm hover:scale-105 transition-all shadow-md inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NOISE = "url('data:image/png;base64,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')";

const DitheredShape = ({ 
  type = 'sphere', 
  color = '#8D93D1', 
  className = '', 
  animate = true 
}: { 
  type?: 'sphere' | 'egg' | 'droplet' | 'vase'; 
  color?: string; 
  className?: string; 
  animate?: boolean;
}) => {
  const shapeStyles = {
    sphere: 'rounded-full w-40 h-40 md:w-64 md:h-64',
    egg: 'rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] w-36 h-52 md:w-44 md:h-64',
    droplet: 'rounded-[5%_100%_50%_65%_/_5%_65%_50%_100%] rotate-45 w-44 h-44 md:w-56 md:h-56',
    vase: 'rounded-[40%_40%_70%_70%_/_100%] w-32 h-52 md:w-40 md:h-64'
  };

  return (
    <motion.div
      className={`absolute opacity-25 pointer-events-none mix-blend-multiply overflow-hidden ${shapeStyles[type]} ${className}`}
      style={{
        backgroundColor: color,
        maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
      }}
      animate={animate ? {
        y: [0, -80, 0],
        x: [0, 50, 0],
        rotate: type === 'droplet' ? [35, 65, 35] : [-15, 15, -15],
        scale: [1, 1.25, 1],
      } : {}}
      transition={{
        duration: 6 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="absolute inset-0 opacity-[0.8] mix-blend-overlay contrast-[150%]"
        style={{
          backgroundImage: NOISE,
          backgroundSize: '64px 64px'
        }}
      />
    </motion.div>
  );
};

const CursorBlob = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const particles = [
    { color: 'bg-[#8D93D1]', size: 'w-40 h-40 md:w-56 md:h-56', stiffness: 45, damping: 25 }, 
    { color: 'bg-[#E65901]', size: 'w-48 h-48 md:w-64 md:h-64', stiffness: 35, damping: 22 }, 
    { color: 'bg-[#8D93D1]', size: 'w-32 h-32 md:w-44 md:h-44', stiffness: 55, damping: 28 }, 
    { color: 'bg-[#E65901]', size: 'w-48 h-48 md:w-60 md:h-60', stiffness: 25, damping: 20 }, 
    { color: 'bg-[#8D93D1]', size: 'w-40 h-40 md:w-52 md:h-52', stiffness: 40, damping: 24 }, 
    { color: 'bg-[#E65901]', size: 'w-64 h-64 md:w-80 md:h-80', stiffness: 20, damping: 18 }, 
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <Particle 
          key={i} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          {...p} 
        />
      ))}
    </div>
  );
};

const Particle = ({ mouseX, mouseY, color, size, stiffness, damping }: { 
  mouseX: any; 
  mouseY: any; 
  color: string; 
  size: string; 
  stiffness: number; 
  damping: number;
  [key: string]: any;
}) => {
  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });

  return (
    <motion.div
      style={{ 
        x, 
        y, 
        translateX: "-50%", 
        translateY: "-50%" 
      }}
      className={`absolute top-0 left-0 ${size} ${color} rounded-full opacity-30 blur-[40px] md:blur-[60px]`}
      animate={{
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

interface ProjectRowProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    hoverImage?: string;
    bgColor: string;
  };
  index: number;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    const event = new CustomEvent('project-hover', { 
      detail: { image: project.hoverImage || project.image, active: true } 
    });
    window.dispatchEvent(event);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const event = new CustomEvent('project-hover', { 
      detail: { active: false } 
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative border-b border-black py-10 md:py-20 group cursor-pointer md:cursor-none project-item-reveal"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="flex flex-row items-center justify-between gap-4 md:gap-12 relative z-10 px-4 md:px-0">
        <div className="flex items-center gap-4 md:gap-20 flex-grow">
          <span className="font-syne text-sm md:text-xl text-primary/40 transition-colors duration-300 group-hover:text-[#E65901]">
            0{index + 1}
          </span>
          <div className="project-info">
            <h3 
              className="text-2xl md:text-[60px] font-bold font-syne text-primary leading-tight tracking-tighter transition-all duration-500 group-hover:text-transparent translate-x-0 group-hover:translate-x-4" 
              style={{ WebkitTextStroke: isHovered ? '1px #3b0764' : '0px transparent' }}
            >
              {project.title}
            </h3>
            <p className="hidden md:block font-sans text-sm md:text-lg text-primary/70 mt-4 max-w-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-4 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-8 shrink-0">
          <span className="hidden lg:block text-[10px] font-bold tracking-[0.2em] text-primary bg-primary/5 border border-primary/10 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
            {project.category}
          </span>
          <div className="text-2xl md:text-5xl transition-transform duration-500 group-hover:-rotate-45 group-hover:text-[#E65901]">
            <ArrowRight className="w-6 h-6 md:w-12 md:h-12" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CustomProjectCursor = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLImageElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const reveal = revealRef.current;
    const revealImg = revealImgRef.current;

    if (!cursor || !reveal || !revealImg) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const revealXTo = gsap.quickTo(reveal, "x", { duration: 0.5, ease: "power3.out" });
    const revealYTo = gsap.quickTo(reveal, "y", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      xTo(x);
      yTo(y);
      revealXTo(x);
      revealYTo(y);
    };

    const handleProjectHover = (e: any) => {
      const { image, active } = e.detail;
      if (active) {
        setActiveImage(image);
        setIsActive(true);
        gsap.to(reveal, { opacity: 0.6, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.fromTo(revealImg, { scale: 1.4 }, { scale: 1, duration: 0.4 });
        gsap.to(cursor, { scale: 4, opacity: 1, duration: 0.2 });
      } else {
        setIsActive(false);
        gsap.to(reveal, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.out" });
        gsap.to(cursor, { scale: 1, opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("project-hover", handleProjectHover as EventListener);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("project-hover", handleProjectHover as EventListener);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="absolute top-0 left-0 w-5 h-5 bg-primary rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block opacity-0"
      />
      <div 
        ref={revealRef} 
        className="absolute top-0 left-0 w-[240px] h-[320px] pointer-events-none z-[1] opacity-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden hidden lg:block"
      >
        <div className="w-full h-full relative overflow-hidden">
          <img 
            ref={revealImgRef}
            src={activeImage || undefined} 
            className="w-full h-full object-cover" 
            alt="Project Preview" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0.15, 0, 0.15]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div 
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
        
        {/* Glare effect */}
        <motion.div
          style={{
            left: glareX,
            opacity: glareOpacity,
          }}
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white/20 via-white/40 to-transparent blur-md -skew-x-12 translate-z-[60px]"
        />
      </div>
    </motion.div>
  );
};

const GrainyOverlay = () => {
  return (
    <div 
      className="fixed inset-0 z-[999] pointer-events-none opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: NOISE,
        backgroundSize: '128px 128px'
      }}
    />
  );
};

const SplitMenuItem: React.FC<{ 
  children: string, 
  href: string, 
  className?: string, 
  onClick?: () => void
}> = ({ 
  children, 
  href, 
  className = "", 
  onClick
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={`relative group/menu-item cursor-pointer inline-block transition-opacity duration-300 pb-1 ${className}`}
    >
      <span>{children}</span>
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/menu-item:w-full"></span>
    </a>
  );
};

const SplitTextMenu = ({ 
  items, 
  onItemClick,
  containerClassName = "",
  itemClassName = ""
}: { 
  items: { name: string, href: string }[], 
  onItemClick?: () => void,
  containerClassName?: string,
  itemClassName?: string
}) => {
  return (
    <div 
      className={`Menu-list ${containerClassName}`}
    >
      {items.map((item) => (
        <SplitMenuItem 
          key={item.name} 
          href={item.href} 
          onClick={onItemClick}
          className={itemClassName}
        >
          {item.name}
        </SplitMenuItem>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const workSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white overflow-x-hidden font-sans bg-background">
      <GrainyOverlay />
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent h-16 md:h-20">
        <div className="max-w-[1400px] w-full h-full mx-auto px-6 md:px-8 flex justify-between items-center relative">
          <a href="#about" className="font-bebas text-xl md:text-2xl tracking-wider text-white shrink-0 font-normal uppercase group/name relative">
            Sandra Machon
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover/name:w-full"></span>
          </a>
          
          <nav className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center">
            <SplitTextMenu 
              containerClassName="!flex-row gap-10 !text-lg"
              itemClassName="font-bebas tracking-wider text-white"
              items={[
                { name: 'Work', href: '#work' },
                { name: 'About', href: '#about' },
                { name: 'Contact', href: '#contact' },
                { name: 'FemTech', href: '/femtech' }
              ]}
            />
          </nav>
          
          <nav className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/sandra-machon/" 
              target="_blank" 
              rel="noreferrer"
              className="text-white hover:opacity-70 transition-opacity p-2 hidden sm:flex items-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 xl:hidden text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#8D93D1] pt-20 px-6 xl:hidden"
          >
            <nav className="flex flex-col gap-6 items-center justify-center h-full text-center">
              <SplitTextMenu 
                containerClassName="gap-8"
                itemClassName="text-4xl md:text-6xl font-bebas text-white uppercase tracking-wider block mb-2"
                onItemClick={() => setIsMenuOpen(false)}
                items={[
                  { name: 'Work', href: '#work' },
                  { name: 'About', href: '#about' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'FemTech', href: '/femtech' }
                ]}
              />
              
              <div className="flex gap-8 mt-12">
                <a 
                  href="https://www.linkedin.com/in/sandra-machon/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white hover:opacity-70 transition-opacity p-3 bg-black/10 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="bg-background relative overflow-hidden flex flex-col items-center justify-center h-screen min-h-[600px]">
          <LiquidGradient variant="schema1" />
          
          <div className="max-w-4xl mx-auto z-10 text-center relative px-4 flex flex-col items-center">
            {/* Top Info */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-bebas text-lg md:text-xl tracking-[0.2em] uppercase mb-6 md:mb-8 text-white opacity-60"
            >
              Freelance Data Scientist
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,6.5vw,6rem)] font-bold leading-[0.9] text-center tracking-[-0.02em] text-white max-w-4xl text-balance font-syne"
            >
              I
              <a href="#about" className="inline-flex items-center align-middle group/portrait mx-2 sm:mx-4">
                <motion.div 
                  initial={{ scale: 0, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                >
                  <TiltCard>
                    <div className="relative w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md group-hover/portrait:shadow-xl transition-shadow bg-about-bg">
                      <img src={IMAGES.PORTRAIT} alt="Me" className="w-full h-full object-cover" />
                    </div>
                  </TiltCard>
                </motion.div>
              </a>
              turn messy data into insights
              <a href="#work" className="inline-flex items-center align-middle mx-2 sm:mx-4 group/tools">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                  <TiltCard>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md bg-[#8D93D1]/20 flex items-center justify-center group-hover/tools:shadow-xl transition-shadow">
                        <img 
                          src={IMAGES.AI_TOOLS} 
                          alt="AI Tools" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TiltCard>
                  </motion.div>
              </a>
              and AI tools
            </motion.h1>
          </div>
        </section>

        <section id="work" ref={workSectionRef} className="pt-16 pb-24 md:pt-24 md:pb-40 bg-background overflow-hidden relative">
          <DitheredShape type="sphere" color="#5e21d6" className="-top-24 -right-24 md:w-[500px] md:h-[500px] opacity-10" animate={true} />
          <CustomProjectCursor containerRef={workSectionRef} />
          
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col items-center justify-center gap-8 mb-16 md:mb-24 text-center">
              <h2 className="text-4xl md:text-[80px] font-bold font-syne text-primary tracking-tighter">Selected Projects</h2>
            </div>
            <div className="flex flex-col border-t border-black">
              {projects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#8D93D1] pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-8 relative">
          <div className="wavy-divider"></div>
          <DitheredShape type="droplet" color="#fa709a" className="-bottom-20 -left-20 md:w-[450px] md:h-[450px] opacity-10 blur-2xl" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex justify-center lg:sticky lg:top-32"
              >
                <div className="relative group">
                  <motion.div>
                    <TiltCard>
                      <motion.div 
                        whileHover={{ y: -10 }}
                        className="relative w-full max-w-[360px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-[24px_24px_0px_0px_rgba(255,255,255,0.1)] bg-background/20 backdrop-blur-sm"
                      >
                        <img 
                          src={IMAGES.ABOUT_PORTRAIT} 
                          alt="Sandra Machon" 
                          className="w-full h-full object-cover" 
                        />
                      </motion.div>
                    </TiltCard>
                  </motion.div>
                  {/* Decorative Badge */}
                  <motion.div 
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 -right-6 bg-white border border-white/40 px-6 py-4 rounded-2xl shadow-lg z-20 hidden md:block"
                  >
                    <span className="text-black font-black uppercase tracking-widest text-xs">Freelance Data Scientist</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Column */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-light text-white leading-[0.9] tracking-tighter"
                  >
                    Hello, I'm <br />
                    <span className="font-elegant italic">Sandra.</span>
                  </motion.h2>
                </div>

                <div className="space-y-8 pr-4">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-[22px] md:text-[26px] text-white font-sans leading-relaxed tracking-tight"
                  >
                    I’m a Freelance Data Scientist who works with messy, real-world data and turns it into useful algorithms, insights and LLM tools.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <p className="text-[18px] md:text-[20px] text-white leading-relaxed">
                      My experience spans sensor data, connected devices, research datasets, and AI automation. Whether I’m building a prediction model or a GenAI tool, my goal is the same: make data useful, reliable, and actionable. I primarily work with UK and European clients, and I’m open to remote projects with teams around the world!
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
                      <div>
                        <span className="block text-[32px] font-light text-white tracking-tighter">5+</span>
                        <span className="block text-xs font-bold uppercase tracking-widest text-white/60">Years Experience</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <a href="#contact" className="group inline-flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest hover:gap-6 transition-all">
                      Work with me <ArrowRight className="w-5 h-5" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-background py-32 md:py-48 px-6 text-center relative overflow-hidden">
          <LiquidGradient />
          {/* Subtle decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0.5px,_transparent_0.5px)] [background-size:24px_24px]" />
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 space-y-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl md:text-9xl font-light text-white leading-[0.8] tracking-tighter">
                Let's work together!
              </h2>
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-sans font-light tracking-tight">
                Reach out to discuss your data or AI challenges.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 pt-8">
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:machonsm@gmail.com" 
                className="group relative flex items-center gap-4 bg-white text-black px-10 py-6 rounded-full font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:shadow-[#8D93D1]/20 transition-all"
              >
                <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-[#8D93D1] group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                Email Me
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/sandra-machon/" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-10 py-6 rounded-full font-black uppercase text-sm tracking-[0.2em] transition-all"
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#8D93D1] group-hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                LinkedIn
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-20 px-6 relative">
        <div className="wavy-divider-footer"></div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="font-bebas text-4xl tracking-wider text-primary uppercase">Sandra Machon</div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-12">
              <div className="flex flex-wrap justify-center md:justify-end gap-6 items-center">
                <div className="flex items-center gap-6">
                  <a 
                    href="mailto:machonsm@gmail.com" 
                    className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-100 opacity-70"
                    aria-label="Email"
                  >
                    <div className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                      <Mail className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-syne font-bold">Email</span>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/sandra-machon/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-100 opacity-70"
                    aria-label="LinkedIn"
                  >
                    <div className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                      <Linkedin className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-syne font-bold">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://sandra-maria-machon.medium.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-100 opacity-70"
                    aria-label="Medium"
                  >
                    <div className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                      <Feather className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-syne font-bold">Medium</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary/40 font-syne font-bold">
              © {new Date().getFullYear()} Sandra Machon — All rights reserved.
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[10px] uppercase tracking-[0.3em] text-primary/40 hover:text-primary transition-all font-syne font-bold cursor-pointer group"
              >
                <span className="group-hover:mr-2 transition-all">Back to top</span> ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/femtech" element={<FemtechPage />} />
      </Routes>
    </BrowserRouter>
  );
}
