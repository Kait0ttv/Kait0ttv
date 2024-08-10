document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("uploadForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const pseudo = document.getElementById("pseudo").value;
        const caption = document.getElementById("caption").value;
        const photoInput = document.getElementById("photo");

        if (photoInput.files.length > 0) {
            const photo = photoInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const photoURL = e.target.result;
                addPhotoToGallery(photoURL, pseudo, caption);
            };

            reader.readAsDataURL(photo); 
        }
    });

    function initializePhotoCardEvents() {
        const photoCards = document.querySelectorAll('.photo-card');
        
        photoCards.forEach(card => {
            card.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                photoCards.forEach(c => c.classList.remove('expanded'));
                
                if (!isExpanded) {
                    card.classList.add('expanded');
                }
            });
        });
    }

    initializePhotoCardEvents();
});

function addPhotoToGallery(photoURL, pseudo, caption) {
    const gallery = document.getElementById("gallery");

    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";

    const img = document.createElement("img");
    img.src = photoURL;  
    img.alt = caption;

    const captionElement = document.createElement("p");
    captionElement.textContent = caption;

    const pseudoElement = document.createElement("p");
    pseudoElement.className = "pseudo";
    pseudoElement.textContent = "Publié par : " + pseudo;

    photoCard.appendChild(img);
    photoCard.appendChild(captionElement);
    photoCard.appendChild(pseudoElement);

    gallery.appendChild(photoCard);

    initializePhotoCardEvents();
}
