document.getElementById('tshirtBtn').addEventListener('click', function() {
    showSection('tshirtSection');
});

document.getElementById('jeansBtn').addEventListener('click', function() {
    showSection('jeansSection');
});

document.getElementById('shirtBtn').addEventListener('click', function() {
    showSection('shirtSection');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}
