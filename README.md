# SEMS
Software Engineering Management System

## This website is developed for students taking the SE course in the German University in Cairo.
- It was developed by Abdelrahman Alkady and Ali Hassan in 2016.
- New features were added in 2017 by Yasmeen Wafa and Karim Ahmed.

## Features added in 2016:
- Users
- Teams
- Course Schedule
- Hall of fame
- Discussions
- Announcements
- Notifications

## Features added in 2017
- Team Management tools (By Karim)
  - Backlog
  - User Stories
  - Issues
  - Calender
  - Assigning team members to user stories
  - Sprint work Progress
- Features added to increase usability (By Yasmeen)
  - Tags
  - Tags subscriptions
  - Discussions Filters
  - Follow/Unfollow questions
  - Open/Close questions
  - Markdown Preview
  - Staff Groups
  - Posts
  - User Rating
  - News Feed
 
 ### Performance Enhancements were applied to: (By Yasmeen)
 
 - Profile Route
 - Discussions Route
 - Teams Route
 
 ## To run this project on Localhost:
  
  1. Make a new file "settings.json".
  2. Copy the content of the file "settings.template.json" in the new file.
  3. Fill in the content of the file with real data, you shall need:
    - A sendgrid mail url
    - Mixpanel token
    - admin email: could be any email of yours.
    - system email: could be any email of yours.
    - 2 slack team hook urls: one for the announcements channel and one for the JTAs channel.
    - Root Url is not needed in the case of running on the localhost, otherwise it needs an IP address of a domain.
  4. Install MeteorJS on your machine, see [this link](https://www.meteor.com/).
  5. After installing meteor, open the terminal and cd to the project.
  6. Run this command: _meteor npm install_
  7. Finally, run: _meteor --settings settings.json_
