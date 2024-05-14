function generateTableHTML(data) {
    let html = '<div class="myTable">';
    html += '<table border="1" class="myTable-data">';
    if (data.length > 0) {
        // Create table headers from the first object in the data array
        html += '<tr>';
        for (let key in data[0]) {
            if (key === 'id') continue;
            if (key === 'user_id') continue;
            html += '<th>' + key + '</th>';
        }
        html += '</tr>';
        // Create table rows with data from each object in the array
        data.forEach(item => {
            html += '<tr>';
            for (let key in item) {
                if (key === 'id') continue;
                if (key === 'user_id') continue;
                if (key === 'due_date') {
                    html += '<td>' + new Date(item[key]).toLocaleDateString() + '</td>';
                    continue;
                }
                html += '<td>' + item[key] + '</td>';
            }
            html += '</tr>';
        });
    } else {
        // No results found
        html += '<tr><td colspan="8">No results found</td></tr>';
    }
    html += '</table>';
    html += '</div>';
    return html;
}

module.exports = { generateTableHTML };