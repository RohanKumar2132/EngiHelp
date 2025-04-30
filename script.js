// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function startCarousel() {
  showSlide(currentSlide);
  setInterval(nextSlide, 3000);
}

startCarousel();

// CGPA Calculator
function createSubjectInputs() {
  const theoryCount = parseInt(document.getElementById("theory-count").value);
  const practicalCount = parseInt(document.getElementById("practical-count").value);
  const subjectsContainer = document.getElementById("subjects-container");

  if (theoryCount > 0 || practicalCount > 0) {
    document.getElementById("initial-form").style.display = "none";
    document.getElementById("subject-form").style.display = "block";
    subjectsContainer.innerHTML = "";

    for (let i = 1; i <= theoryCount; i++) {
      subjectsContainer.innerHTML += `
        <div class="form-group">
          <label>Theory Subject ${i} (Grade and Credit):</label>
          <input type="number" class="grade" placeholder="Grade (e.g., 9)" required />
          <input type="number" class="credit" placeholder="Credit (e.g., 3)" required />
        </div>
      `;
    }

    for (let i = 1; i <= practicalCount; i++) {
      subjectsContainer.innerHTML += `
        <div class="form-group">
          <label>Practical Subject ${i} (Grade and Credit):</label>
          <input type="number" class="grade" placeholder="Grade (e.g., 9)" required />
          <input type="number" class="credit" placeholder="Credit (e.g., 2)" required />
        </div>
      `;
    }
  } else {
    alert("Please enter a valid number of subjects.");
  }
}

function calculateCGPA() {
  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credit");
  let totalCredits = 0;
  let weightedGradeSum = 0;

  grades.forEach((grade, i) => {
    const gradeValue = parseFloat(grade.value);
    const creditValue = parseFloat(credits[i].value);
    totalCredits += creditValue;
    weightedGradeSum += gradeValue * creditValue;
  });

  if (totalCredits > 0) {
    const cgpa = (weightedGradeSum / totalCredits).toFixed(2);
    document.getElementById("result").textContent = `Your CGPA is: ${cgpa}`;
  } else {
    alert("Please enter valid grades and credits.");
  }
}
// Function to refresh CAPTCHA image
function refreshCaptcha() {
  const captchaImg = document.getElementById("captcha-img");
  captchaImg.src = "captcha_image.jpg?" + new Date().getTime(); // Append timestamp to avoid caching
}

// Function to fetch RGPV result based on user input
function fetchRgpvResult() {
  const enrollmentNumber = document.getElementById("enrollment-number").value;
  const semester = document.getElementById("semester").value;
  const captcha = document.getElementById("captcha").value;

  // Example of result data (replace with actual data fetching logic)
  const resultData = {
    enrollmentNumber: enrollmentNumber,
    semester: semester,
    grades: [
      { subject: "Mathematics", grade: "8.5" },
      { subject: "Computer Science", grade: "9.2" },
      { subject: "Electronics", grade: "7.8" },
    ],
    cgpa: "8.5",
  };

  // Simulate result fetching
  if (enrollmentNumber && semester && captcha) {
    // Display result
    let resultHtml = `
      <p><strong>Enrollment Number:</strong> ${resultData.enrollmentNumber}</p>
      <p><strong>Semester:</strong> ${resultData.semester}</p>
      <h4>Subjects and Grades:</h4>
      <ul>
    `;

    resultData.grades.forEach(grade => {
      resultHtml += `<li>${grade.subject}: ${grade.grade}</li>`;
    });

    resultHtml += `</ul><p><strong>CGPA:</strong> ${resultData.cgpa}</p>`;

    document.getElementById("result-details").innerHTML = resultHtml;
    document.getElementById("result-display").style.display = "block";
  } else {
    alert("Please enter all details correctly.");
  }
}

// Function to download the result as a PDF
function downloadResult() {
  const resultDetails = document.getElementById("result-details").innerHTML;
  const doc = new jsPDF();

  doc.text("RGPV Result", 20, 20);
  doc.html(resultDetails, {
    callback: function (doc) {
      doc.save("RGPV_Result.pdf");
    },
    x: 20,
    y: 30,
  });
}







