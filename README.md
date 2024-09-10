# Yellow Trip Dashboard

[Yellow Trip Dashboard](https://yellow-trip-dashboard.vercel.app/) is a web app that helps you see and understand your trip data. It shows different charts to help you look at travel details over time.

### Key Features

- **Interactive Charts**: View and interact with charts like doughnut and bar charts to see trip statistics clearly.
- **Efficient Data Handling**: Built with Vanilla JavaScript and uses Vite.js for fast and smooth performance.
- **User-Friendly Interface**: Easy-to-use design that makes it simple to explore your trip data.

### Data Insights

The app displays income data by hour and day to show how people's routines change over time. For example, on January 1, 2017 (a Sunday and the first day of the year), you can see more trips between 00:00 and 03:00 compared to other days of the year. During the rest of the month, there are noticeable peaks in trips during the hours people start and end their workdays.

### Technologies Used

- **Vanilla JavaScript**: Main language used for the app.
- **Vite.js**: Tool for fast builds and quick development.
- **Chart.js**: Library for creating charts that are easy to interact with.


## Getting Started

Before running the project, make sure you have the latest LTS version of Node.js installed. If you use `nvm`, the project includes an `.nvmrc` file, so you can simply run:

```zsh
nvm install
nvm use
```

## Setup
You can use `yarn`, `npm`, or any package manager to run the following scripts:

Make sure to install the dependencies:
```zsh
yarn install
```

## Development Server
Start the development server on http://localhost:5173/
```zsh
yarn dev
```

## Production
To generate the production build, use:
```zsh
yarn build
```

## Preview the build
To run the production build locally, execute:
```zsh
yarn preview
```

## Run test
To run the project's test:
```zsh
yarn test
```

## Project Structure
This project utilizes a modular structure to organize code based on functionality. It follows the **Screaming Architecture** and **Clean Architecture** principles.  
The structure is organized as follows:

```bash
src/
|- core/ # Contains essential modules used throughout the application, independent of specific features.
|-- money/ # An example of an essential module is money. This directory holds logic related to money representation
|- features/ # Encapsulates specific functionalities of the application with dedicated subdirectories. Separating data, domain, and presentation layers.
|-- dashboard/ # An example of feature is `dashboard`. This feature focuses on the dashboard functionality.
|- lib/ # Contains shared libraries and utility functions used throughout the project, as well as the assets and ui shared components.
```
Within each core module and feature CLEAN architecture is applied.
```bash
data/ # Contains services and repository implementations.
domain/ # Holds the core entities and repository interfaces (ports) as well as the use cases.
presentation/ # Handles the state management using the Bloc pattern, along with UI components.
```

### BLoC Pattern in the Project

The **BLoC (Business Logic Component) pattern** is used across the project to manage state and events in a structured way, separating business logic from the user interface (UI). This pattern ensures that the UI reacts only to changes in state, while the business logic handles all the processing.

#### General Structure

Each feature follows a similar structure, and an example can be seen in the [dashboard feature's presentation layer](https://github.com/marcosvced/yellow_trip_dashboard/tree/dev/src/features/dashboard/presentation). The main components of the **BLoC pattern** are:

- **Bloc**: The Bloc class (e.g., `DashboardBloc.js`) handles the core business logic. It listens for dispatched events and responds by updating the internal state. The Bloc doesn’t push the state to the UI directly; instead, it exposes a method to let the UI subscribe to state changes.
- **Events**: Event functions (e.g., `GetTripsEvent.js`) represent user actions or system triggers. These events are sent to the Bloc, which processes them to update the application state.
- **States**: State classes (e.g., `DashboardState.js`) define the possible states for a feature (e.g., "loading", "loaded", "error"). The Bloc updates these states based on the business logic and events it processes.

#### How BLoC is Applied

In every feature of the project:

- The **UI** or other parts of the system dispatch **events** (e.g., a user requests data by clicking a button).
- The **Bloc** receives the event, processes it, interacts with services or repositories as needed, and updates the internal **state**.
- The Bloc exposes a `subscribe` method. The **UI subscribes** to the Bloc’s state changes, so when the state is updated, the UI is notified and can react accordingly.

#### Subscription Model

The **BLoC pattern** ensures a **unidirectional data flow**:
- The UI sends events to the Bloc.
- The Bloc processes the events, updates the state, and notifies all subscribed UI components whenever the state changes.

By using the `subscribe` method, the UI is not tightly coupled to the Bloc's internal workings. It simply reacts to state changes, allowing for a clean separation of concerns. This makes the system more modular, maintainable, and scalable, as the business logic is isolated from the presentation logic.

In summary, the **BLoC pattern** in this project provides a powerful way to manage state across the application, ensuring that the UI stays responsive and up to date, while keeping the business logic completely separate.


# Some possibles improvements

### 1. Use a `<main id="app" />` Tag Instead of an `index.html` for All Pages

Instead of using a single `index.html` to display all the graphs and the navbar, it is better to use a `<main id="app" />` tag where you can "inject" a page component based on the URL route.

For example, in the dashboard feature, you can create a new folder called `page` inside the `ui/` directory. This folder would contain a web component that renders all the elements needed for that specific page.

This approach allows better separation of concerns, making each page component more modular and easier to manage.


### 2. Loading and Error Handling in the Dashboard Feature

To enhance the Dashboard feature, we can improve how we handle loading and error states. Here's how:

1. **Loading State**:
- When an event like `getTripsEvent` is triggered, we can set the `state.isLoading` property to `true`.
- In the UI component, we can then check if `state.isLoading` is `true` and display a loading spinner or message to the user. This way, users know that data is being fetched and should wait.

2. **Error Handling**:
- We can create an `Alert` component to display error messages. This component can accept a list of error messages to show to the user.
- Inside the Bloc, we can catch any exceptions that occur during data fetching or processing. When an exception is caught, we can pass an appropriate error message to the `Alert` component.
- This will allow the UI to show meaningful error messages to the user, improving the overall user experience.

By implementing these improvements, the Dashboard feature will provide better feedback to users during data loading and handle errors more gracefully.

### 3. Add Integration Tests with json-server

Currently, we use mocks to simulate API calls in our tests. To make our tests more realistic, we can add integration tests that use a real API. One way to do this is by using `json-server`, which allows us to create a fake REST API for testing purposes.

### 4. Refactor and Simplify Chart Components

The code in each `{component}Chart.js` file (inside the `dashboard` feature) could be improved by simplifying and refactoring. Many of these components share similar logic that could be abstracted into reusable functions, such as hooks or mixins. This would reduce code duplication and make the components easier to maintain.

By creating shared functions for common logic, you can make the codebase cleaner and more manageable. This will also make it easier to implement changes or fix bugs, as updates to the shared functions will automatically apply to all components that use them.