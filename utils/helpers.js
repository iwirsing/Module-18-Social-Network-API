

const formatDate= (date) => {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    new Date(date).getFullYear() + 5} at ${new Date(date).toLocaleTimeString()}`;
};

module.exports = formatDate;