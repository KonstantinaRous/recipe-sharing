function dateFormater(year, month, day) {
    let date;
    if (year)
        date = String(year);
    else
        return "invalid";
    date = date.concat("-");
    if (month)
        date = date.concat(String(month));
    else
        return "invalid";
    date = date.concat("-");
    if (day)
        date = date.concat(String(day));
    else
        return "invalid"
    console.log(date);
    return date;
}

module.exports = { dateFormater };