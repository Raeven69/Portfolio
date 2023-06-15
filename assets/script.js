function leadingZero(string)
{
    return (string.length == 1) ? `0${string}` : string;
}

function dateUpdater()
{
    var date = new Date()
    var hours = leadingZero(date.getHours().toString());
    var minutes = leadingZero(date.getMinutes().toString());
    var day = leadingZero(date.getDate().toString());
    var month = leadingZero((date.getMonth()+1).toString());
    var year = leadingZero(date.getFullYear().toString());
    document.getElementById("time").innerText = `${hours}:${minutes}`;
    document.getElementById("date").innerText = `${day}/${month}/${year}`;
}

function openDatetimeMenu()
{
    var datetimeMenu = document.getElementById("datetimeMenu");
    if (datetimeMenu.classList.contains("hidden"))
    {
        var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "November", "December"];
        var date = new Date();
        var dayName = days[date.getDay()];
        var day = leadingZero(date.getDate().toString());
        var month = months[date.getMonth()];
        document.getElementById("menuDate").innerText = `${dayName}, ${day} ${month}`;
        datetimeMenu.classList.remove("hidden");
    }
}

function clickListener(event)
{
    var elements = [document.getElementById("datetimeMenu")];
    for (let i = 0; i < elements.length; i++)
    {
    }
}

window.onload = () => {
    setInterval(dateUpdater, 100);
    document.getElementById("datetime").onclick = openDatetimeMenu;
    document.onclick = clickListener;
}