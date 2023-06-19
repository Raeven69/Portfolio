var elements = [];
var volume = 100;

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

function hideMenus()
{
    for (let i = 0; i < elements.length; i++)
    {
        if (!elements[i].element.classList.contains(elements[i].classname))
        {
            elements[i].element.classList.add(elements[i].classname);
        }
    }
}

function openDatetimeMenu(event)
{
    var datetimeMenu = document.getElementById("datetimeMenu");
    if (datetimeMenu.classList.contains("hidden"))
    {
        hideMenus();
        var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "November", "December"];
        var date = new Date();
        var dayName = days[date.getDay()];
        var day = leadingZero(date.getDate().toString());
        var month = months[date.getMonth()];
        document.getElementById("menuDate").innerText = `${dayName}, ${day} ${month}`;
        event.stopPropagation();
    }
    datetimeMenu.classList.toggle("hidden");
}

function openIconMenu(event)
{
    var iconMenu = document.getElementById("iconMenu");
    if (iconMenu.classList.contains("hidden"))
    {
        hideMenus()
        event.stopPropagation();
    }
    iconMenu.classList.toggle("hidden");
}

function clickListener()
{
    for (let i = 0; i < elements.length; i++)
    {
        if (!elements[i].element.classList.contains(elements[i].classname))
        {
            elements[i].element.classList.add(elements[i].classname);
        }
    }
}

function sliderBackground(slider)
{
    var value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #606060 0%, #606060 ${value}%, #a0a0a0 ${value}%, #a0a0a0 100%)`;
}

function brightnessSlider(event)
{
    sliderBackground(this);
    var value = parseInt(event.target.value)
    document.getElementById("brightnessImage").style.rotate = `${-(100-value)}deg`;
    document.body.style.filter = `brightness(${value / 100})`;
}

function volumeSlider(event)
{
    sliderBackground(this);
    volume = parseInt(event.target.value);
    var img = document.getElementById("volumeImage");
    if (volume > 65)
    {
        img.src = "assets/sound.png";
    }
    else if (volume > 30)
    {
        img.src = "assets/sound65.png";
    }
    else if (volume > 0)
    {
        img.src = "assets/sound30.png";
    }
    else
    {
        img.src = "assets/mute.png";
    }
}

function openStartMenu(event)
{
    var start = document.getElementById("start");
    start.children[0].classList.add("startAnimate");
    setTimeout(() => {start.children[0].classList.remove("startAnimate")}, 200);
    var startMenu = document.getElementById("startMenu");
    if (startMenu.classList.contains("startHidden"))
    {
        hideMenus()
        event.stopPropagation();
    }
    startMenu.classList.toggle("startHidden");
}

window.onload = () => {
    elements = [{element: document.getElementById("datetimeMenu"), classname: "hidden"}, {element: document.getElementById("iconMenu"), classname: "hidden"}, {element: document.getElementById("startMenu"), classname: "startHidden"}];
    setInterval(dateUpdater, 100);
    document.getElementById("datetime").onclick = openDatetimeMenu;
    document.getElementById("icons").onclick = openIconMenu;
    document.getElementById("start").onclick = openStartMenu;
    document.getElementById("datetimeMenu").onclick = (event) => event.stopPropagation();
    document.getElementById("iconMenu").onclick = (event) => event.stopPropagation();
    document.getElementById("startMenu").onclick = (event) => event.stopPropagation();
    document.body.onclick = clickListener;
    new DragSelect({area: document.getElementById("desktop")});
    document.getElementById("brightness").oninput = brightnessSlider;
    document.getElementById("volume").oninput = volumeSlider;
}