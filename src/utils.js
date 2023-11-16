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

export const calculateExpiry = ballot => {
    const secondsSinceCreation = Math.floor((new Date() - new Date(ballot.created_utc)) / 1000);

    const timeLeft = ballot.exp_s - secondsSinceCreation;

    return timeLeft <= 0 ? 0 : timeLeft;
};
