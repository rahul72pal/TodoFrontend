export function convertDateToHoursMinutes(dateString) {
    const date = new Date(dateString);

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the result
    const formattedResult = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedResult;
}