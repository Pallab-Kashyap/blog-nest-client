
import { Post, User, Comment } from "../types";

export const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Senior Frontend Developer with a passion for UI/UX design and accessibility.",
    socialLinks: {
      twitter: "https://twitter.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
    },
  },
  {
    id: "2",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Full Stack Developer specializing in React, Node.js, and GraphQL.",
    socialLinks: {
      twitter: "https://twitter.com/johnsmith",
      github: "https://github.com/johnsmith",
    },
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Tech writer and JavaScript enthusiast.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alicejohnson",
    },
  },
  {
    id: "4",
    name: "Robert Davis",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export const comments: Comment[] = [
  {
    id: "1",
    content: "Great article! I've been looking for a good explanation of this topic.",
    author: users[2],
    createdAt: "2025-04-20T15:32:00Z",
    upvotes: 5,
  },
  {
    id: "2",
    content: "This was really helpful, thanks for sharing your insights!",
    author: users[1],
    createdAt: "2025-04-20T16:45:00Z",
    upvotes: 2,
    replies: [
      {
        id: "3",
        content: "I totally agree with your comment, very insightful post indeed.",
        author: users[3],
        createdAt: "2025-04-20T17:15:00Z",
        upvotes: 1,
      },
    ],
  },
  {
    id: "4",
    content: "I have a question about the third part. Could you elaborate more on that?",
    author: users[3],
    createdAt: "2025-04-21T09:20:00Z",
    upvotes: 0,
  },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "Understanding React Hooks: A Comprehensive Guide",
    description: "Learn how to use React Hooks effectively in your applications and avoid common pitfalls.",
    content: `
# Understanding React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class.

## useState

The useState hook lets you add React state to functional components.

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## useEffect

The useEffect hook lets you perform side effects in function components:

\`\`\`jsx
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]); // Only re-run the effect if count changes
\`\`\`

## Custom Hooks

Creating custom hooks lets you extract component logic into reusable functions.

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
`,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800&q=80",
    readingTime: 5,
    createdAt: "2025-04-18T10:30:00Z",
    updatedAt: "2025-04-18T10:30:00Z",
    author: users[0],
    status: "published",
    upvotes: 42,
    views: 1024,
    saved: true,
    comments: comments.slice(0, 2),
    tags: ["react", "javascript", "frontend"],
  },
  {
    id: "2",
    title: "Building a RESTful API with Node.js and Express",
    description: "Step-by-step guide on creating a modern API with Node.js and Express from scratch.",
    content: `
# Building a RESTful API with Node.js and Express

In this tutorial, we'll build a complete RESTful API using Node.js and Express.

## Setting Up the Project

First, let's initialize a new Node.js project:

\`\`\`bash
mkdir my-rest-api
cd my-rest-api
npm init -y
npm install express mongoose dotenv
\`\`\`

## Creating the Server

\`\`\`javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
\`\`\`

## Defining Routes

\`\`\`javascript
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
\`\`\`
`,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=800&q=80",
    readingTime: 8,
    createdAt: "2025-04-15T14:20:00Z",
    updatedAt: "2025-04-17T09:15:00Z",
    author: users[1],
    status: "published",
    upvotes: 28,
    views: 837,
    saved: false,
    comments: [comments[2]],
    tags: ["node.js", "express", "api", "backend"],
  },
  {
    id: "3",
    title: "CSS Grid Layout: A Complete Tutorial",
    description: "Master the CSS Grid Layout system to create complex and responsive web layouts effortlessly.",
    content: `
# CSS Grid Layout: A Complete Tutorial

CSS Grid is a powerful layout system that allows for complex two-dimensional layouts.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

## Placing Items

\`\`\`css
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
\`\`\`

## Auto Placement

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}
\`\`\`

## Alignment

\`\`\`css
.container {
  display: grid;
  justify-items: center;
  align-items: center;
}
\`\`\`
`,
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&w=800&q=80",
    readingTime: 6,
    createdAt: "2025-04-12T09:45:00Z",
    updatedAt: "2025-04-12T11:30:00Z",
    author: users[2],
    status: "published",
    upvotes: 35,
    views: 912,
    saved: false,
    comments: [],
    tags: ["css", "layout", "frontend"],
  },
  {
    id: "4",
    title: "Getting Started with TypeScript",
    description: "Learn the basics of TypeScript and how to integrate it into your JavaScript projects.",
    content: `
# Getting Started with TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## Installation

\`\`\`bash
npm install -g typescript
\`\`\`

## Basic Types

\`\`\`typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // Tuple
\`\`\`

## Interfaces

\`\`\`typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number; // Optional property
}

function greet(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
\`\`\`

## Functions

\`\`\`typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = (a: number, b: number): number => a + b;
\`\`\`
`,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=800&q=80",
    readingTime: 7,
    createdAt: "2025-04-10T16:50:00Z",
    updatedAt: "2025-04-14T08:25:00Z",
    author: users[0],
    status: "draft",
    upvotes: 19,
    views: 542,
    saved: false,
    comments: [],
    tags: ["typescript", "javascript", "programming"],
  },
  {
    id: "5",
    title: "Introduction to Docker for Developers",
    description: "Learn how Docker can simplify your development workflow and improve application deployment.",
    content: `
# Introduction to Docker for Developers

Docker is a platform for developing, shipping, and running applications in containers.

## Installation

Visit [Docker's official website](https://www.docker.com/get-started) to download and install Docker Desktop.

## Basic Docker Commands

\`\`\`bash
# Pull an image
docker pull nginx

# Run a container
docker run -d -p 80:80 nginx

# List running containers
docker ps

# Stop a container
docker stop container_id
\`\`\`

## Creating a Dockerfile

\`\`\`dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Docker Compose

\`\`\`yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: mongo
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
\`\`\`
`,
    image: "https://images.unsplash.com/photo-1605745341495-cffea6ae6d1c?auto=format&w=800&q=80",
    readingTime: 9,
    createdAt: "2025-04-05T11:10:00Z",
    updatedAt: "2025-04-07T14:20:00Z",
    author: users[1],
    status: "archived",
    upvotes: 15,
    views: 374,
    saved: true,
    comments: [],
    tags: ["docker", "devops", "containers"],
  },
];

export const myPosts: Post[] = [
  posts[0],
  posts[3],
  {
    id: "6",
    title: "Advanced TypeScript Patterns",
    description: "Explore advanced TypeScript patterns for enterprise applications.",
    content: "Draft content...",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&w=800&q=80",
    readingTime: 10,
    createdAt: "2025-04-22T08:30:00Z",
    updatedAt: "2025-04-22T08:30:00Z",
    author: users[0],
    status: "draft",
    upvotes: 0,
    views: 0,
    saved: false,
    comments: [],
    tags: ["typescript", "patterns", "advanced"],
  },
  {
    id: "7",
    title: "Optimizing React Performance",
    description: "Techniques to improve React application performance and user experience.",
    content: "Draft content...",
    image: "https://images.unsplash.com/photo-1585432959315-d9342fd58eb6?auto=format&w=800&q=80",
    readingTime: 8,
    createdAt: "2025-04-20T14:15:00Z",
    updatedAt: "2025-04-20T14:15:00Z",
    author: users[0],
    status: "draft",
    upvotes: 0,
    views: 0,
    saved: false,
    comments: [],
    tags: ["react", "performance", "optimization"],
  },
];
