
import './App.css'

function App() {
  return(
    <main>
      <header>
        <h1>Public Repository Search</h1>
        <p>Search public GitHub repositories</p>
      </header>
      <form role="search">
        <label htmlFor='repository-search'>Repository Search</label>
        <input 
          id='repository-search' 
          type='search' 
          name='query'
          placeholder='Enter repository name'
        />
        <button type='submit'>Search</button>
      </form>
      <section aria-labelledby="results-heading">
  <h2 id="results-heading">Search results</h2>
  <p>Enter a keyword to search public repositories.</p>
</section>
    </main>
  )
}

export default App
