document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengambil data dan menampilkannya di halaman
    function displayData() {
        const sections = {
            'personalData': 'personal-data-section',
            'institusiData': 'institusi-data-section',
            'kontakDaruratData': 'kontak-darurat-section',
            'pendidikanData': 'pendidikan-data-section'
        };

        for (const key in sections) {
            const data = JSON.parse(localStorage.getItem(key));
            const section = document.getElementById(sections[key]);

            if (data && section) {
                // Hapus konten lama
                section.innerHTML = `<h3>${section.querySelector('h3').textContent}</h3>`;
                for (const itemKey in data) {
                    if (data[itemKey]) {
                        const dataItem = document.createElement('div');
                        dataItem.className = 'data-item';

                        const labelText = itemKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        dataItem.innerHTML = `<label>${labelText}:</label> <p>${data[itemKey]}</p>`;
                        section.appendChild(dataItem);
                    }
                }
            }
        }
        
        // Tampilkan pas foto
        const pasFotoUrl = localStorage.getItem('pasFotoFile');
        const pasFotoPreview = document.getElementById('foto-preview');
        const pasFotoName = document.getElementById('pas-foto-name');
        
        if (pasFotoUrl) {
            pasFotoPreview.src = pasFotoUrl;
            pasFotoPreview.style.display = 'block';
            pasFotoName.textContent = "pas_foto.png"; // Nama file statis untuk display
        }
    }

    // Fungsi untuk membuat PDF
    document.getElementById('cetak-pdf-btn').addEventListener('click', function() {
        const input = document.getElementById('print-area');
        
        // Mengubah elemen HTML menjadi kanvas
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            
            // Ukuran kertas A4 dalam milimeter
            const pdfWidth = 210;
            const pdfHeight = 297;

            const doc = new jsPDF('p', 'mm', 'a4');

            const imgProps = doc.getImageProperties(imgData);
            const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
            const imgX = (pdfWidth - imgProps.width * ratio) / 2;
            const imgY = 10; // Margin atas

            doc.addImage(imgData, 'PNG', imgX, imgY, imgProps.width * ratio, imgProps.height * ratio);
            doc.save('Data_Pendaftaran.pdf');
        });
    });

    // Panggil fungsi untuk menampilkan data saat halaman dimuat
    displayData();
});