export async function fetchAutocomplete(query) {
    if (!query) return [];
  
    try {
      const res = await fetch(
        `http://localhost:3001/autocomplete?query=${encodeURIComponent(query)}`
      );
      if (!res.ok) return [];
      return await res.json(); // [{ value, secundvalue }]
    } catch (err) {
      console.error('Autocomplete error:', err);
      return [];
    }
  }
  