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
    var datetime = document.getElementById("datetime");
    datetime.classList.add("animate");
    setTimeout(() => datetime.classList.remove("animate"), 200);
    var datetimeMenu = document.getElementById("datetimeMenu");
    if (datetimeMenu.classList.contains("hidden"))
    {
        hideMenus();
        var days = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"];
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
    var icons = document.getElementById("icons");
    icons.classList.add("animate");
    setTimeout(() => icons.classList.remove("animate"), 200);
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
    for (element of document.getElementsByTagName("video"))
    {
        element.volume = volume / 100;
    }
}

function openStartMenu(event)
{
    var start = document.getElementById("start");
    start.children[0].classList.add("startAnimate");
    setTimeout(() => start.children[0].classList.remove("startAnimate"), 200);
    var startMenu = document.getElementById("startMenu");
    if (startMenu.classList.contains("startHidden"))
    {
        hideMenus()
        event.stopPropagation();
    }
    startMenu.classList.toggle("startHidden");
}

function addWindowHandler(wndw)
{
    wndw.getElementsByClassName("windowClose")[0].onclick = () =>
    {
        wndw.classList.add("reverseAnimate");
        setTimeout(() => document.body.removeChild(wndw), 200);
    }
    var pos1, pos2, pos3, pos4;
    wndw.getElementsByClassName("windowHeader")[0].onmousedown = (event) =>
    {
        event.preventDefault();
        var highestIndex = 1;
        for (wndw2 of document.getElementsByClassName("window"))
        {
            if (parseInt(wndw2.style.zIndex) >= highestIndex)
            {
                highestIndex = parseInt(wndw2.style.zIndex) + 1;
            }
        }
        wndw.style.zIndex = highestIndex;
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = () =>
        {
            document.onmouseup = null;
            document.onmousemove = null;
        }
        document.onmousemove = (event) =>
        {
            event.preventDefault();
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;
            wndw.style.top = (wndw.offsetTop - pos2) + "px";
            wndw.style.left = (wndw.offsetLeft - pos1) + "px";
        }
    }
}

function addPdfFile(name, path = "")
{
    var program = document.createElement("div");
    program.classList.add("program");
    var image = document.createElement("img");
    image.src = "assets/pdf.png";
    image.alt = "PDF file";
    program.appendChild(image);
    var filename = document.createElement("p");
    filename.innerText = name;
    program.appendChild(filename);
    document.getElementById("programs").appendChild(program);
    program.ondblclick = () =>
    {
        var wndw = document.createElement("div");
        wndw.classList.add("window");
        wndw.style.left = Math.round(Math.random() * (window.innerWidth - 680)) + "px";
        wndw.style.top = Math.round(Math.random() * (window.innerHeight - 420)) + "px";
        var header = document.createElement("header");
        header.classList.add("windowHeader");
        var label = document.createElement("label");
        label.innerText = name;
        header.appendChild(label);
        wndw.appendChild(header);
        var close = document.createElement("div");
        close.classList.add("windowClose");
        wndw.appendChild(close);
        close.appendChild(document.createElement("span"));
        close.appendChild(document.createElement("span"));
        var embed = document.createElement("embed");
        embed.src = path;
        wndw.appendChild(embed);
        document.body.appendChild(wndw);
        wndw.classList.add("windowAnimate");
        setTimeout(() => wndw.classList.remove("windowAnimate"), 200);
        addWindowHandler(wndw);
    }
}

function addTextFile(name, text = "")
{
    var program = document.createElement("div");
    program.classList.add("program");
    var image = document.createElement("img");
    image.src = "assets/text.png";
    image.alt = "Text document";
    program.appendChild(image);
    var filename = document.createElement("p");
    filename.innerText = name;
    program.appendChild(filename);
    document.getElementById("programs").appendChild(program);
    program.ondblclick = () =>
    {
        var wndw = document.createElement("div");
        wndw.classList.add("window");
        wndw.style.left = Math.round(Math.random() * (window.innerWidth - 680)) + "px";
        wndw.style.top = Math.round(Math.random() * (window.innerHeight - 420)) + "px";
        var header = document.createElement("header");
        header.classList.add("windowHeader");
        var label = document.createElement("label");
        label.innerText = name;
        header.appendChild(label);
        wndw.appendChild(header);
        var close = document.createElement("div");
        close.classList.add("windowClose");
        wndw.appendChild(close);
        close.appendChild(document.createElement("span"));
        close.appendChild(document.createElement("span"));
        var textarea = document.createElement("textarea");
        textarea.innerText = text;
        wndw.appendChild(textarea);
        document.body.appendChild(wndw);
        wndw.classList.add("windowAnimate");
        setTimeout(() => wndw.classList.remove("windowAnimate"), 200);
        addWindowHandler(wndw);
    }
}

function addVideoFile(name, path = "")
{
    var program = document.createElement("div");
    program.classList.add("program");
    var image = document.createElement("img");
    image.src = "assets/video.png";
    image.alt = "Video file";
    program.appendChild(image);
    var filename = document.createElement("p");
    filename.innerText = name;
    program.appendChild(filename);
    document.getElementById("programs").appendChild(program);
    program.ondblclick = () =>
    {
        var wndw = document.createElement("div");
        wndw.classList.add("window");
        wndw.style.left = Math.round(Math.random() * (window.innerWidth - 680)) + "px";
        wndw.style.top = Math.round(Math.random() * (window.innerHeight - 420)) + "px";
        var header = document.createElement("header");
        header.classList.add("windowHeader");
        var label = document.createElement("label");
        label.innerText = name;
        header.appendChild(label);
        wndw.appendChild(header);
        var close = document.createElement("div");
        close.classList.add("windowClose");
        wndw.appendChild(close);
        close.appendChild(document.createElement("span"));
        close.appendChild(document.createElement("span"));
        var video = document.createElement("video");
        video.src = path;
        video.autoplay = true;
        wndw.appendChild(video);
        var button = document.createElement("button");
        wndw.appendChild(button);
        var icon = document.createElement("div");
        button.appendChild(icon);
        document.body.appendChild(wndw);
        wndw.classList.add("windowAnimate");
        setTimeout(() => wndw.classList.remove("windowAnimate"), 200);
        video.onended = () =>
        {
            icon.style.backgroundImage = "url(\"assets/play.png\")";
        }
        button.onclick = () =>
        {
            button.classList.add("animate");
            setTimeout(() => button.classList.remove("animate"), 200);
            if (video.paused)
            {
                icon.style.backgroundImage = "url(\"assets/pause.png\")";
                video.play();
            }
            else
            {
                icon.style.backgroundImage = "url(\"assets/play.png\")";
                video.pause();
            }
        }
        addWindowHandler(wndw);
    }
}

function addPdfFile(name, path = "")
{
    var program = document.createElement("div");
    program.classList.add("program");
    var image = document.createElement("img");
    image.src = "assets/pdf.png";
    image.alt = "PDF file";
    program.appendChild(image);
    var filename = document.createElement("p");
    filename.innerText = name;
    program.appendChild(filename);
    document.getElementById("programs").appendChild(program);
    program.ondblclick = () =>
    {
        var wndw = document.createElement("div");
        wndw.classList.add("window");
        wndw.style.left = Math.round(Math.random() * (window.innerWidth - 680)) + "px";
        wndw.style.top = Math.round(Math.random() * (window.innerHeight - 420)) + "px";
        var header = document.createElement("header");
        header.classList.add("windowHeader");
        var label = document.createElement("label");
        label.innerText = name;
        header.appendChild(label);
        wndw.appendChild(header);
        var close = document.createElement("div");
        close.classList.add("windowClose");
        wndw.appendChild(close);
        close.appendChild(document.createElement("span"));
        close.appendChild(document.createElement("span"));
        var embed = document.createElement("embed");
        embed.src = path;
        wndw.appendChild(embed);
        document.body.appendChild(wndw);
        wndw.classList.add("windowAnimate");
        setTimeout(() => wndw.classList.remove("windowAnimate"), 200);
        addWindowHandler(wndw);
    }
}

function initializeMenus()
{
    elements = [{element: document.getElementById("datetimeMenu"), classname: "hidden"}, {element: document.getElementById("iconMenu"), classname: "hidden"}, {element: document.getElementById("startMenu"), classname: "startHidden"}];
    setInterval(dateUpdater, 100);
    document.getElementById("datetime").onclick = openDatetimeMenu;
    document.getElementById("icons").onclick = openIconMenu;
    document.getElementById("start").onclick = openStartMenu;
    document.getElementById("datetimeMenu").onclick = (event) => event.stopPropagation();
    document.getElementById("iconMenu").onclick = (event) => event.stopPropagation();
    document.getElementById("startMenu").onclick = (event) => event.stopPropagation();
    document.body.onclick = clickListener;
    document.getElementById("brightness").oninput = brightnessSlider;
    document.getElementById("volume").oninput = volumeSlider;
}

window.onload = () => {
    initializeMenus();
    addPdfFile("Feedback Aman Trechsel.pdf", "assets/Feedback Aman Trechsel.pdf");
    addPdfFile("Feedback Roan Hoogeveen.pdf", "assets/Feedback Roan Hoogeveen.pdf");
    addPdfFile("Feedback Tim de Geus.pdf", "assets/Feedback Tim de Geus.pdf");
    addPdfFile("English Letter.pdf", "assets/English Letter.pdf");
    addPdfFile("English Survey.pdf", "assets/English Survey.pdf");
    addPdfFile("Onderzoek.pdf", "assets/Onderzoek.pdf");
    new DragSelect({selectables: document.getElementsByClassName("program"), area: document.getElementById("desktop")});
}