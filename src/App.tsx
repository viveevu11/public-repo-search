import { useState, type SubmitEvent } from "react";
import './App.css'

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: {
    login: string;
  };
};

type GitHubSearchResponse = {
  items: Repository[];
};

type SearchStatus = "idle" | "loading" | "success" | "error";

function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchedQuery, setSearchedQuery] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setSearchedQuery(trimmedQuery);

    setStatus("loading");

    setRepositories([]);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(trimmedQuery)}&per_page=10`
      );

      if (!response.ok) {
        throw new Error("GitHub repository search failed.");
      }

      const data = (await response.json()) as GitHubSearchResponse;

      setRepositories(data.items);
      setStatus("success");
    } catch {
      setStatus("error");
    }

  }

  return(
    <main>
      <header>
        <h1>Public Repository Search</h1>
        <p>Search public GitHub repositories</p>
      </header>
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor='repository-search'>Search Repositories</label>
        <div className="search-controls">
        <input 
          id='repository-search' 
          type='search' 
          name='query'
          placeholder='Enter repository name'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Searching…" : "Search"}
        </button>
        </div>
      </form>
      <section className="results-section" aria-labelledby="results-heading" aria-busy={status === "loading"}>
        <h2 id="results-heading">Search results</h2>
        {status === "idle" && (
          <p>Enter a keyword to search public repositories.</p>
        )}

        {status === "loading" && (
          <div className="status-message loading-message" role="status">
          <div className="loading-spinner" aria-hidden="true"></div>
          <h3>Searching repositories</h3>
          <p>Please wait while GitHub returns the results.</p>
        </div>
        )}
        {status === "error" && (
          <div className="status-message error-message" role="alert">
            <h3>Search failed</h3>
            <p>
              We couldn’t search GitHub repositories. Check your connection and try
              again.
            </p>
          </div>
        )}
        {status === "success" && repositories.length === 0 && (
          <div className="status-message empty-message" role='status'>
            <h3>No repositories found</h3>
            <p>
              No public repositories matched “{searchedQuery}.” Try a different
              keyword.
            </p>
          </div>
        )}
        {status === "success" && repositories.length > 0 && (
          <ul className="repository-list">
            {repositories.map((repository) => (
              <li key={repository.id}>
                <article className="repository-card">
                  <h3>
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repository.full_name}
                    </a>
                  </h3>

                  <p>{repository.description ?? "No description provided."}</p>
                  <p>Owner: {repository.owner.login}</p>
                  <p>Stars: {repository.stargazers_count}</p>
                  <p>Language: {repository.language ?? "Not specified"}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
