async function getWorkout(year: string, mon: string) {
    // Example:
    // https://raw.githubusercontent.com/codebymad/cfit-wod-fetcher/refs/heads/deploy/data/2002/apr_2002.json

    const url = `https://raw.githubusercontent.com/codebymad/cfit-wod-fetcher/refs/heads/deploy/data/${year}/${mon}_${year}.json`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch WOD: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data; // array of WOD objects
    } catch (err) {
        console.error("Error fetching workout:", err);
        return null;
    }
}

export default getWorkout;
