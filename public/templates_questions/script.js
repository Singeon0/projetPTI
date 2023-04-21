document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("matchingCanvas");
    const ctx = canvas.getContext("2d");
    const leftListItems = document.querySelectorAll(".left-list li");
    const rightListItems = document.querySelectorAll(".right-list li");
    const clearBtn = document.getElementById("clearBtn");
    const submitBtn = document.getElementById("submitBtn");

    let connections = {};
    let isDrawing = false;
    let currentItem = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function getPosition(el) {
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
    }

    function drawLine(start, end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#333";
        ctx.stroke();
        ctx.closePath();
    }

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const key in connections) {
            const start = getPosition(document.getElementById(key));
            const end = getPosition(document.getElementById(connections[key]));
            drawLine(start, end);
        }
    }

    function onMouseDown(event) {
        isDrawing = true;
        currentItem = event.target;
    }

    function onMouseUp(event) {
        if (isDrawing && currentItem !== event.target) {
            if (currentItem.parentNode.classList.contains("left-list")) {
                connections[currentItem.id] = event.target.id;
            } else {
                connections[event.target.id] = currentItem.id;
            }
            drawConnections();
        }
        isDrawing = false;
        currentItem = null;
    }

    function onClear() {
        connections = {};
        drawConnections();
    }

    function onSubmit() {
        // Process the answer and validate it
        console.log(connections);
    }

    function addListeners() {
        leftListItems.forEach((item) => {
            item.addEventListener("mousedown", onMouseDown);
            item.addEventListener("mouseup", onMouseUp);
        });

        rightListItems.forEach((item) => {
            item.addEventListener("mousedown", onMouseDown);
            item.addEventListener("mouseup", onMouseUp);
        });

        clearBtn.addEventListener("click", onClear);
        submitBtn.addEventListener("click", onSubmit);
    }

    function init() {
        resizeCanvas();
        addListeners();
    }

    init();
});
