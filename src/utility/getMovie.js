export async function fetchMovie(currentId) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${process.env.REACT_APP_API_KEY}& language=en - US`
        );
        return response
    } catch (error) {
        console.log(error);
    }
}