module.exports.getColor = (rating) => {
    if (!isNaN(rating)) {
        if (rating >= 70) {
            return { color: '#198754', text: '#fff' };
        } else if (rating >= 50) {
            return { color: '#ffc107', text: 'black' };
        } else {
            return { color: '#dc3545', text: '#fff' };
        }
    } else {
        return { color: '#777', text: '#fff' };
    }
}