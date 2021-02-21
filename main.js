function setup() {
    let content = document.getElementById("content");
    content.style.gridTemplateColumns = "repeat(" + data.length + ", 1fr)"
    for (let [i, lecture] of data.entries()) {
        let lectureDiv = createComp("div")
        lectureDiv.style.color = toHSB(i, 50, data.length);

        let title = createTitle(lecture)
        let list = createUL(lecture)

        attachComp(title, lectureDiv);
        attachComp(list, lectureDiv);
        attachComp(lectureDiv, content)
    }
}

function createUL(lecture) {
    let ol = createComp("div");
    let li = Object.entries(lecture);
    li.forEach(([k, e]) => {
        try {
            attachComp(createSection(k, e), ol)
        } catch (err) { };
    });
    return ol;
}

function createSection(name, link) {
    if (name == "name" || !link) return null;
    let li = createComp("div");
    li.style.paddingBottom = "15px";
    let a = createComp("a");
    a.href = link;
    a.target = "_blank"
    a.innerHTML = name;
    attachComp(a, li);
    return li;
}

function createTitle(lecture) {
    let title = createComp("h1")
    if (lecture.name) {
        title.innerHTML = lecture.name;
    } else {
        console.error("lecture has no name!");
    }
    return title;

}

function createComp(name) {
    return document.createElement(name);
}

function attachComp(comp, parent) {
    parent.appendChild(comp);
}

function toHSB(deg, am, max) {
    let h = map(deg, 0, max, 0, 360);
    let s = am;
    let b = am;
    return "hsl(" + h + ", " + s + "%, " + b +  "%)"
}

function map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}