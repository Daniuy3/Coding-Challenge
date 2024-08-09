export const timeEdition = () => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {day: "2-digit", month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'});
    const formattedDate = formatter.format(date);
    return formattedDate;
};