<h1>📱 Community Hub Mobile App</h1>

<p>
A <b>React Native</b> mobile application built as part of an assignment to demonstrate
<b>navigation</b>, <b>state management</b>, <b>data fetching</b>, <b>optimistic UI updates</b>,
and <b>offline handling</b>.
</p>

<hr />

<h2>🧩 Features Implemented</h2>

<h3>1️⃣ Authentication (Mocked)</h3>
<ul>
  <li>Simple <b>Login Screen</b> with email & password</li>
  <li>No real backend authentication</li>
  <li>Stores a <b>fake token</b> locally on login</li>
  <li>Session persists across app restarts</li>
  <li>On relaunch:
    <ul>
      <li>If token exists → user is taken to <b>Community List</b></li>
      <li>If not → <b>Login Screen</b> is shown</li>
    </ul>
  </li>
</ul>

<hr />

<h3>2️⃣ Community List</h3>
<ul>
  <li>Communities fetched from <b>JSONPlaceholder API</b></li>
  <li>Each community displays:
    <ul>
      <li><b>Name</b></li>
      <li><b>Description</b></li>
      <li><b>Member Count</b></li>
    </ul>
  </li>
  <li>Supports <b>pagination / infinite scroll</b></li>
  <li>Supports <b>pull-to-refresh</b></li>
  <li>Graceful loading states using loaders</li>
</ul>

<hr />

<h3>3️⃣ Community Details</h3>
<ul>
  <li>Tap a community to open its <b>details screen</b></li>
  <li>Displays:
    <ul>
      <li>Community header information</li>
      <li>Community status (Active / Inactive)</li>
      <li>List of posts</li>
    </ul>
  </li>
  <li><b>Join / Leave</b> community functionality</li>
  <li>Join state is managed locally using <b>Zustand</b></li>
</ul>

<hr />

<h3>4️⃣ Posts</h3>
<ul>
  <li>Posts are fetched per community</li>
  <li>Users can <b>create a new post</b> with:
    <ul>
      <li>Title</li>
      <li>Body</li>
    </ul>
  </li>
  <li><b>Optimistic UI updates</b>:
    <ul>
      <li>Post appears immediately in the list</li>
      <li>Uses React Query mutation lifecycle</li>
    </ul>
  </li>
  <li>Loading & error states handled properly</li>
</ul>

<hr />

<h3>5️⃣ Offline & Error Handling</h3>
<ul>
  <li>Network status tracked using <b>@react-native-community/netinfo</b></li>
  <li>Offline banner shown when user is disconnected</li>
  <li>API failures handled gracefully</li>
  <li>App does <b>not crash</b> on network errors</li>
</ul>

<hr />

<h2>🛠 Tech Stack</h2>
<ul>
  <li><b>React Native</b> (0.73.x)</li>
  <li><b>TypeScript</b></li>
  <li><b>React Navigation</b> (Stack + Bottom Tabs)</li>
  <li><b>@tanstack/react-query</b> for data fetching & caching</li>
  <li><b>Zustand</b> for lightweight state management</li>
  <li><b>AsyncStorage</b> for persistence</li>
</ul>

<hr />

<h2>📂 Project Structure</h2>
<pre>
src/
 ├── api/            # API layer (communities, posts)
 ├── hooks/          # Custom hooks (queries, mutations, network)
 ├── navigation/     # Navigators & route types
 ├── screens/        # App screens
 ├── store/          # Zustand stores
 ├── components/     # Reusable UI components
 └── types/          # TypeScript types
</pre>

<hr />

<h2>🚧 Known Limitations</h2>
<ul>
  <li>Backend is fully mocked (JSONPlaceholder)</li>
  <li>Created posts are not persisted on server (API limitation)</li>
  <li>Cache persistence across app restart can be added later</li>
</ul>

<hr />

<h2>✅ Assignment Status</h2>
<ul>
  <li><b>Authentication</b> – Completed</li>
  <li><b>Community List</b> – Completed</li>
  <li><b>Community Details</b> – Completed</li>
  <li><b>Create Post + Optimistic UI</b> – Completed</li>
  <li><b>Offline Handling</b> – Completed</li>
</ul>

<hr />

<p><i>Built with focus on clean architecture, type safety, and real-world React Native patterns.</i></p>