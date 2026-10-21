import { useState, type SubmitEvent } from "react";
import './App.css'

function App() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    console.log(trimmedQuery);
  }

  return(
    <main>
      <header>
        <h1>Public Repository Search</h1>
        <p>Search public GitHub repositories</p>
      </header>
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor='repository-search'>Repository Search</label>
        <div className="search-controls">
        <input 
          id='repository-search' 
          type='search' 
          name='query'
          placeholder='Enter repository name'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type='submit'>Search</button>
        </div>
      </form>
      <section className="results-section" aria-labelledby="results-heading">
        <h2 id="results-heading">Search results</h2>
        <p>Enter a keyword to search public repositories.</p>
      </section>
    </main>
  )
}

export default App
