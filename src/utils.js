export const fetchBallotById = async id => {
    const response = await fetch(import.meta.env.VITE_API_ROOT + "/polls/" + id);
    return await response.json();
};


export const formatTimeLeft = s => {
    if (s <= 0) {
        return "Ballot closed!";
    }
    return `Ballot closes in ${Math.floor(s / 60)}:${s % 60 < 10 ? "0" + s % 60 : s % 60}`;
};

