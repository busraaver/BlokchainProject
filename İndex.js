import { backend } from "declarations/backend";

// Öğrenci ismi eklemek için form submit işlemi
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");
  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Backend ile etkileşim, greet metodunu çağırıyoruz
  const greeting = await backend.greet(name);
  button.removeAttribute("disabled");

  // Yeni öğrenci ismini tabloya ekliyoruz
  const studentsList = document.getElementById("greeting");
  const newRow = document.createElement("tr");
  const cell1 = document.createElement("td");
  const cell2 = document.createElement("td");
  const cell3 = document.createElement("td");
  const deleteButton = document.createElement("button");

  // Öğrenci numarası ve ismi
  cell1.textContent = studentsList.children.length + 1; // Otomatik numara
  cell2.textContent = name; // Öğrenci adı

  // Silme butonunu oluşturuyoruz
  deleteButton.textContent = "Sil";
  deleteButton.style.border = "1px solid red";
  deleteButton.addEventListener("click", async () => {
    await backend.deleteName(name); // Backend'den silme işlemi
    newRow.remove(); // Frontend'de satırı kaldırıyoruz
  });

  // Butonu hücreye ekliyoruz
  cell3.appendChild(deleteButton);

  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
  studentsList.appendChild(newRow);

  return false;
});

// Tüm öğrencileri listele butonu
document.getElementById("show-names-btn").addEventListener("click", async () => {
  const names = await backend.getNames(); // Backend'den tüm isimleri alıyoruz
  const studentsList = document.getElementById("greeting");

  // Listeyi temizlemeden öğrenci isimlerini ekleyelim
  names.forEach((name, index) => {
    const newRow = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const deleteButton = document.createElement("button");

    // Öğrenci numarası ve ismi
    cell1.textContent = index + 1;
    cell2.textContent = name;

    // Silme butonunu oluşturuyoruz
    deleteButton.textContent = "Sil";
    deleteButton.style.border = "1px solid red";
    deleteButton.addEventListener("click", async () => {
      await backend.deleteName(name); // Backend'den silme işlemi
      newRow.remove(); // Frontend'de satırı kaldırıyoruz
    });

    // Butonu hücreye ekliyoruz
    cell3.appendChild(deleteButton);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    studentsList.appendChild(newRow);
  });

  // Tabloyu göstermek
  const tableSection = document.querySelector("section");
  tableSection.style.display = "block"; // Tabloyu her zaman görünür kıl
});
