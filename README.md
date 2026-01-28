## Japanese langauge learning platform

A Japanese language learning web app built with React, Tailwind CSS, React Router and React Query. 
Features 10+ responsive pages with dynamic routing, caching, state management, API requests, complete CRUD operations, fluid animations and more.
## Technologies

- React
- TypeScript
- Tailwind CSS
- React Router
- Tanstack Query
- Vite
## Features
1. Search, sort and filter courses and vocabulary decks; add them to a personal library
2. Review course contents, which includes curriculum, pop-up lesson dictionary with audio, chat-bot menu and the course material itself. All progress is automatically saved
3. Pass a course final test. Tests include multiple and single choice questions. They also include optional image and paragraph attachments. On wrong answer, an explanation appears on each wrong choice. At the end of the test, an interactive, gamified results page appears with dynamic, sequantial animations
4. Start a spaced repetition session where users memorize the vocabulary from their vocabulary decks
5. Search, filter and review articles
6. Search a dictionary, which includes audio, example sentences and translations of words
7. Change website theme (dark/light). The theme is decided automatically by default according to users' browser preferences
8. Edit profile (name, about, studying goals)
9. Edit settings (email, password, interface, payments, devices and more)
* Note: the platform has a fully ready API architecture of services and queries for the future implementation of a complete cycle of content management (complete CRUD operations for courses, articles, vocabulary decks, dictionary entires and others)

## The process

I started working on the project by writing a product requirements document (features, pages). With that in hand I designed the pages in Figma according to the product requirements and product vision. 

Once the planning and design steps were completed, I moved to the development process. I decided to use React, Typescript and Tailwind CSS as the core, with React Router and Tanstack Query as supplementary libraries. The desicion was driven because of the lightweght, yet powerful nature of React, TypeScript's strong typization of data and speed of styling thanks to Tailwind CSS. React Router and Tanstack Query were chosen as industry standards for the tasks of robust routing and querying.

I decided to use a feature-based project architecture, as it is proven to be scalable and maintainable solution, as well as reduces the chance of code duplication. The project is separated into 4 main architectural clusters:
- fakeServer: implements fake database layer and well as its async API abstraction layer over it
- features: implemets the frontend reception point of API data; has services and TackStack Queries that use them. It also includes components folder that would incapsulate a singular representation of a feature, but is not utilized in the current version of the project (to be done in the future)
- pages: bundles the UI of pages; separates into additional subcomponents if the page is large
- shared: sources shared across the website UI components
It also includes 4 supportive folders:
- context: stores React context variables shared across the component tree
- hooks: includes custom hooks (such as useMediaQuery, useDeviceType and others)
- types: defines TypeScript types for type entities used in the project
- utils: utility funcitons

Once the technologies and architecture were in place, I started implementing each feature and page, one-by-one. During the process I faced challanges, but overcame them by time input, strategic narrowing of cause of issues and research. I also kept filling a TODO list, noting possible improvements and required fixes to features. 

## What I learned
to be done
