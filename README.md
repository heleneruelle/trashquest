# TrashQuest

TrashQuest is an app designed to empower anyone who wants to take action and protect the environment at a local level by cleaning up public spaces. Inspired by community efforts like beach cleanups and cigarette butt collections, TrashQuest allows users to organize and join cleanup events — or "quests" — in their neighborhoods, parks, rivers, and other public spaces.

The strength of TrashQuest lies in the collective participation of individuals. Each user can create a quest for others to join, contributing to a larger movement of grassroots ecology. We are all deeply connected to the places we live, whether they are already valued by environmental policies — like forests or rivers — or often overlooked, such as urban neighborhoods that suffer from neglect and pollution. In these areas, it is crucial to recognize that urban landscapes are just as important for grassroots ecology as the more traditionally preserved natural spaces.

The app merges the worlds of environmental action and adventure, incorporating a slightly gamified experience where users can track their progress and level up based on the number of quests they’ve completed. While this adds a fun, engaging element, the core mission of TrashQuest remains focused on promoting environmental sustainability and raising awareness about the growing issue of waste disposal, whether it happens close to home or at the other end of the world.

The app’s user interface (UI) will reflect this blend, incorporating a slightly gamified aspect. However, the focus remains on promoting popular ecology and raising awareness about the growing problem of waste production and disposal in both local communities and globally.

TrashQuest is an open-source project built on the following technologies:

- Remix and React (open-source)
- Jest (open-source)
- Firebase
- Mapbox
- Netlify
  You can contact me for questions or if you’d like to join me in this adventure at: heleneruelle@hotmail.com.

You'll find all UIB specs in [Figma](https://www.figma.com/design/93vR4JInUUmtSvRG6wKKDP/Trashquest-2024?node-id=2002-2&t=VYhrI3aQq1FO5CEf-1) (email for edit access).

And of course, start using TrashQuest here: https://trashquest.netlify.app/

## Scope of V1

**Authentication** is done through email and password using Firebase Authentication.

---

## Features & Views in Version 1

### Available Views

1. **Authentication**

   - Email and password-based authentication (via Firebase).

2. **Onboarding**

   - Profile creation and onboarding process.

3. **Home (Main Screen)**

   - Displays a list of available quests.
   - Includes a map showing the location of quests.

4. **Quest Creation**

   - Form to create a new quest (environmental cleanup event).

5. **Profile**
   - Displays user profile with an editable mode for each value (e.g., name, avatar).

---

### Onboarding: Profile Creation

During the onboarding process, users are prompted to:

- **Allow Location Access** (optional).
- Enter a **User Name**.
- Select their **Location (City Only)** (TODO: Integrate auto-complete suggestion tool for France, Belgium, and Germany).
- Upload a **Photo/Avatar** (optional).
- Provide an optional **Description** of themselves.

---

### Quest Creation (Event Form)

Users can create a new event (quest) using the following fields:

- **Event Name**: (text input, short).
- **Location**: Pick on a map + TODO: Integrate auto-complete suggestion tool for France, Belgium, and Germany.
- **Date and Time**: Date and time picker.
- **End Time**: Time picker.
- **Organizer**: Pre-filled with the current user (non-editable).
- **Event Description**: Text input (short).
- **Environment Type**: Select from predefined types (e.g., beach, forest, river, city) or create new ones (multi-select).
- **Materials Needed**: Select from predefined items (e.g., boots, gloves, mask, fishing net) or create new ones (multi-select).
- **Difficulty Level**: Select from checkboxes (e.g., kid-friendly, accessible, etc.).
- **Desired Number of Participants**: Numeric input.

---

### Main Screen (Home)

The home screen consists of:

- **Top Bar**: Includes a link to the Profile page.
- **Left Sidebar**: Displays a list of available quests, with filters for quick sorting (e.g., location, environment type, difficulty). Quests are listed by default based on proximity to the user's location (if location access is granted). A "Create New Quest" button is located at the bottom of the sidebar.
- **Right Side**: A map showing quests and their locations. When hovering over a quest on the map, a short summary of the quest is shown in a popup. Clicking on a quest will switch the left sidebar to display the full quest details.

---

### Quest Summary (Short Version)

When viewing a quest in the sidebar or on the map, the short version includes:

- **Quest Name**: e.g., "Clean Up of Chaussée de Waterloo".
- **Location**: Address of the meeting point.
- **Date and Time**: When the cleanup is scheduled.
- **Number of Participants**: How many people are expected.
- **Join/Leave CTA**: Depending on whether the user has already joined the event.

Clicking on the short version will open the quest details in the sidebar, and the map will center on that quest.

---

### Quest Details (Full Version)

When viewing a quest in full, the details include:

- **Quest Name**: e.g., "Clean Up of Chaussée de Waterloo".
- **Location**: Address of the meeting point.
- **Date and Time**: The event's start time.
- **Number of Participants**: How many people have already signed up.
- **Organizer**: The user who created the event.
- **Join/Leave CTA**: Allows the user to join or leave the event based on their current participation status.
- **Event Description**: Brief explanation of the event’s goal.
- **Environment Type**: Tags such as beach, forest, river, city, etc.
- **Materials Needed**: Tags for materials such as boots, gloves, masks, etc.
- **Difficulty Level**: Tags such as "kid-friendly", "accessible".
- **Desired Number of Participants**: The number of participants the organizer hopes to recruit.
- **Estimated Duration**: Based on the end time.

---

## Data Model: Quest Object

A **Quest** object in TrashQuest is structured as follows:

```json
{
  "id": "quest_id",
  "name": "Clean Up of Chaussée de Waterloo",
  "location": "Chaussée de Waterloo 60, 1060 Brussels, Belgium",
  "lon": "4.344737097493441",
  "lat": "50.83095205360295",
  "date": "2023-11-12T14:00:00Z",
  "endTime": "2023-11-12T16:00:00Z",
  "organizer": "user_id",
  "description": "A community effort to clean up the Chaussée de Waterloo.",
  "environmentType": ["city", "street"],
  "materialsNeeded": ["gloves", "bags", "masks"],
  "difficultyLevel": ["kid-friendly", "accessible"],
  "participants": [
    { "user_id": "user1", "name": "Alice" },
    { "user_id": "user2", "name": "Bob" }
  ],
  "desiredParticipants": 20
}
```

### Fields:

- **id**: Unique identifier for the quest.
- **name**: The name of the event.
- **location**: The address where the event takes place.
- **lon**: Longitude of the meeting point
- **lat**: Latitude of the meeting point
- **date**: The scheduled start date and time.
- **endTime**: The scheduled end time.
- **organizer**: The user who created the event.
- **description**: A brief explanation of the event.
- **environmentType**: Tags indicating the type of environment (e.g., beach, forest, city).
- **materialsNeeded**: Tags for the materials needed (e.g., gloves, bags).
- **difficultyLevel**: Tags indicating difficulty or accessibility (e.g., kid-friendly).
- **participants**: List of users who have joined the event.
- **desiredParticipants**: The target number of participants.
- **duration**: Estimated duration of the event.

---

## Future Development

The current version (V1) lays the foundation for creating and joining quests, with key features focused on creating cleanups, managing participant lists, and tracking progress. Future versions will improve the app with:

- Enhanced location-based features.
- Integration with community tools for improved ecological impact.
- More advanced user profiles and social features.
- Documentation center on public space cleanup (like Surf Rider Foundation for beach cleanups)
- Support for photographs (before/after)
- E-mail reminders
- In-app notification banners
- Feedback on quests
- Major UI improvements

---

Feel free to contact us for further information or to join the project.
