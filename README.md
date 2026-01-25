# About
A Japanese language learning web app built with React, Tailwind CSS, React Router and React Query. 
Features 10+ pages with libraries, routing, search, api requests, complete CRUD operations, fluid animations and much more.
# TODO
1. Make a proper logic for selecting achievements after the test and adding them to the user profile in TestResults, AchievementsSection component
2. Fix flickering of tabs on re-render triggered by settings menu opening and closing in the UserSettings component 
3. Fix a bug where if you click several config toggles in a fast, chaotic order the toggle buttons become broken. 
4. Fix issue with the search bar where if you click on a suggestion, it autofills the input and because of that (the onChange event) it triggers search once more and pops the suggestions menu.