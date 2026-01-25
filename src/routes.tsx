import { createHashRouter, Navigate } from 'react-router'

import App from './App';
import Home from './pages/Home/Home'
import Library from './pages/Library/Library';
import NotFound from './pages/NotFound/NotFound';
import UserSettings from './pages/UserSettings/UserSettings';
import Search from './pages/Search/Search';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import Course from './pages/Course/Course';
import SpacedRepetition from './pages/SpacedRepetition/SpacedRepetition';
import Dictionary from './pages/Dictionary/Dictionary';
import Articles from './pages/Articles/Articles';
import Article from './pages/Article/Article';
import Test from './pages/Test/Test';
import KanaTable from './pages/KanaTable/KanaTable';
import About from './pages/About/About';

export const router = createHashRouter([
  { path: "/", element: <App />, 
    children: [
      { index: true, element: <Navigate to='home' replace></Navigate>, },
      { path: "home", element: <Home />, },
      { path: "library", element: <Library />, },
      { path: "profile", element: <UserSettings />, },
      { path: "search", element: <Search />, },
      { 
        path: "course-details/:courseDetailsId", 
        loader: async ({params}) => {
          const { courseDetailsId } = params;
          if (!courseDetailsId) {
            throw new Response("Missing proper course details id", { status: 400 });
          }
          return { courseDetailsId, };
        },
        element: <CourseDetails />, 
      },
      { 
        path: "courses/:courseId/modules/:moduleId/lessons/:lessonId", 
        loader: async ({ params }) => {
          const { 
            courseId,
            moduleId,
            lessonId,
           } = params;
          if (!courseId || !moduleId || !lessonId) {
            throw new Response("Missing proper course, module or lesson id", { status: 400 });
          }
          return { courseId, moduleId, lessonId, };
        },
        element: <Course />,
      },
      { path: "spaced-repetition/:deckId", 
        loader: async ({params}) => {
          const { deckId } = params;
          if (!deckId) {
            throw new Response("Missing proper deck id", { status: 400 });
          }
          return { deckId, };
        },
        element: <SpacedRepetition />, },
      { path: "dictionary", element: <Dictionary />, },
      { path: "articles", element: <Articles />, },
      { path: "articles/:articleId",
        loader: async ({params}) => {
          const { articleId } = params;
          if (!articleId) {
            throw new Response("Missing proper article id", { status: 400 });
          }
          return { articleId, };
        }, 
        element: <Article />, 
      },
      { path: "test/:courseId", 
        loader: async ({params}) => {
          const { courseId } = params;
          if (!courseId) {
            throw new Response("Missing proper course id", { status: 400 });
          }
          return { courseId, };
        }, 
        element: <Test />, 
      },
      { path: "kana-table", element: <KanaTable />, },
      { path: "about", element: <About />, },
      { path: "*", element: <NotFound />, },
    ]
  },
]);