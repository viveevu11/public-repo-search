# Public Repository Search

Public Repository Search is a React application that searches public GitHub repositories using the GitHub Search API. It displays each repository’s name, description, owner, star count, and primary language while presenting loading, error, empty, and successful-result states separately.

## Live application

[View the deployed application](https://public-repo-search.vercel.app/)

## Features

- Searches real public repositories through the GitHub API
- Displays up to 10 matching repositories
- Shows repository descriptions, owners, stars, and languages
- Distinguishes loading, error, empty, and successful-result states
- Supports keyboard navigation
- Uses responsive styling for narrow screens

## Technologies

- React
- TypeScript
- Vite
- CSS
- GitHub Search API

## Running locally

### Requirements

Install Node.js and npm before following these instructions.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/viveevu11/public_repo_search.git
   ```

2. Open the project directory:

   ```bash
   cd public_repo_search
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal, usually:

   ```text
   http://localhost:5173
   ```

## Environment variables

This project does not require environment variables or an API key. It makes unauthenticated requests to GitHub’s public repository search endpoint.

## How to use it

1. Enter a repository name or keyword in the search field.
2. Select **Search** or press Enter.
3. Review the returned repositories.
4. Select a repository name to open its GitHub page in a new tab.

## Testing the required states

### Successful results

1. Enter `react`.
2. Select **Search**.
3. Matching public repositories should appear.

### Empty result

1. Enter `zzzxxyy-no-repository-should-match-928374`.
2. Select **Search**.
3. The request should succeed and display **No repositories found**.

An empty result is treated as a successful search rather than an error.

### Loading state

1. Open the browser’s developer tools.
2. Open the **Network** panel.
3. Change network throttling from **No throttling** to **Slow 3G**.
4. Perform a search.
5. A loading message and spinner should appear while the request is pending.
6. Restore **No throttling** afterward.

### Error state

1. Open the browser’s developer tools.
2. Open the **Network** panel.
3. Change the network setting to **Offline**.
4. Perform a search.
5. The page should explain that the GitHub search failed and ask the user to check their connection and try again.
6. Restore the network setting to **Online** or **No throttling** afterward.

## Keyboard operation

1. Press Tab to focus the search field.
2. Enter a search term.
3. Press Tab to focus the Search button.
4. Press Enter or Space to perform the search.
5. Continue pressing Tab to move through the repository links.
6. Use Shift + Tab to move backward.

All interactive elements have visible focus indicators.

## Testing and validation

The project was checked using:

- Keyboard-only navigation
- Loading, error, empty, and successful searches
- Narrow-screen layouts
- Long repository names
- `npm run lint`
- `npm run build`

To run the project checks:

```bash
npm run lint
npm run build
```

## Architecture

`App.tsx` contains the search form, request logic, application state, and conditional rendering. The application tracks:

- The current input value
- The submitted search term
- The repositories returned by GitHub
- The current request status: idle, loading, success, or error

`App.css` contains the page layout, responsive styling, state presentation, loading animation, repository cards, and focus indicators.

## Key decisions

### GitHub Search API

The project uses GitHub’s public repository search endpoint instead of sample data.

The alternative was to use a local list of repositories, which would have been simpler and more predictable. The GitHub API was chosen because it provides current, real-world results. The accepted cost is that the application depends on GitHub’s availability and unauthenticated rate limits.

### Explicit request status

The interface uses an explicit `idle`, `loading`, `success`, or `error` status.

The alternative was to infer the state from whether the repository array was empty. That approach could not distinguish an initial screen, a pending request, and a successful search with no matches. The accepted cost is additional state and conditional rendering logic.

### Ten results per search

Each request asks for up to 10 repositories.

The alternative was to request more results or implement pagination. Ten results keep the interface focused and the project scope manageable. The accepted cost is that users cannot browse every matching repository.

## Limitations

- Only public GitHub repositories can be searched.
- Results are limited to 10 repositories per search.
- The application does not provide pagination, sorting, or filtering.
- Searches depend on the availability of the GitHub API.
- Unauthenticated GitHub API rate limits apply.
- The application does not save search history.
- Repository information is limited to the fields returned by GitHub.
