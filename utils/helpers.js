module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    format_plural: (number, thing) => {
        if (number !== 1) {
            return `${thing}s`;
        }

        return thing;
    }
};