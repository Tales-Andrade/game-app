module.exports.createDate = (timestamp) => {
    const d = new Date(timestamp * 1000);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = d.getDate() + '/' + months[d.getMonth()] + '/' + d.getFullYear();

    return date;
}