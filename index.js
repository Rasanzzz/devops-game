const stages = document.querySelectorAll('.stage');
const dropzones = document.querySelectorAll('.dropzone');
const result = document.getElementById('result');

stages.forEach(stage => {
    stage.addEventListener('dragstart', dragStart);
    stage.addEventListener('dragend', dragEnd);
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragenter', dragEnter);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', dragDrop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
}

function dragLeave(e) {
    e.target.classList.remove('hovered');
}

function dragDrop(e) {
    e.target.classList.remove('hovered');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    if (e.target.children.length === 0) {
        e.target.appendChild(draggable);
    }
}

function checkPipeline() {
    const stagesOrder = ['plan', 'code', 'build', 'test', 'deploy', 'monitor', 'operate'];
    let isCorrect = true;

    dropzones.forEach((zone, index) => {
        if (zone.children[0] && zone.children[0].id === stagesOrder[index]) {
            zone.style.border = '2px solid green';
        } else {
            zone.style.border = '2px solid red';
            isCorrect = false;
        }
    });

    result.textContent = isCorrect ? 'Correct Pipeline!' : 'Incorrect Pipeline!';
}
