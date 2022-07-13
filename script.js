const form = document.querySelector("form");
const progresses = document.querySelectorAll(".progress-block");
const inputs = document.querySelectorAll(".progress-block .value-info");
const requiredInputs = document.querySelectorAll(".value-info[required]");
const requiredTooltips = document.querySelectorAll(".required__tooltip");

function showRequiredTooltips() {
  for (let i = 0; i < requiredInputs.length; i++) {
    if (!requiredInputs[i].value) {
      requiredTooltips[i].style.display = "block";
      requiredInputs[i].style.borderColor = "#F40C53";
    }
  }
}

function hideRequiredTooltips() {
  for (let i = 0; i < requiredInputs.length; i++) {
    if (requiredInputs[i].value) {
      requiredTooltips[i].style.display = "none";
      requiredInputs[i].style.borderColor = "#c3c3c3";
    }
  }
}

function checkProgress(item) {
  const input = item.querySelectorAll(".value-info");
  for (let i = 0; i < input.length; i++) {
    if (!input[i].value && input[i].hasAttribute("required")) {
      return false;
    }
  }
  return true;
}

function readyToPost() {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value && inputs[i].hasAttribute("required")) {
      return false;
    }
  }
  return true;
}

const btn = document.querySelector(".btn-submit");

function changeFields() {
  progresses.forEach((item) => {
    if (checkProgress(item)) {
      item.style.borderLeft = "4px solid #0CE2F4";
      return true;
    } else {
      item.style.borderLeft = "4px solid #F40C53";
      return false;
    }
  });
}

inputs.forEach((item) => {
  item.addEventListener("input", () => {
    hideRequiredTooltips();
    if (readyToPost()) {
      changeFields();
      btn.style.background = "#0CE2F4";
    }
  });
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  changeFields();
  if (readyToPost()) {
    btn.style.background = "#0CE2F4";
    setTimeout(() => {
      btn.style.background = "#86C621";
      btn.innerHTML = `
			Отправлено <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M40.4334 0H36.9816C36.4976 0 36.0384 0.222217 35.7421 0.602455L15.3821 26.3945L5.61933 14.0244C5.47164 13.8369 5.2834 13.6852 5.06873 13.5809C4.85406 13.4766 4.61854 13.4222 4.37985 13.4219H0.928078C0.597222 13.4219 0.414509 13.8022 0.616974 14.0589L14.1426 31.1944C14.7747 31.9943 15.9895 31.9943 16.6265 31.1944L40.7445 0.632085C40.9469 0.380238 40.7642 0 40.4334 0V0Z" fill="white"/>
			</svg>
		`;
      progresses.forEach(
        (item) => (item.style.borderLeft = "4px solid #86C621")
      );
    }, 1000);
    setTimeout(() => {
      form.reset();
      progresses.forEach(
        (item) => (item.style.borderLeft = "4px solid #c3c3c3")
      );
      btn.style.background = "#c3c3c3";
      btn.textContent = "Отправить";
    }, 3000);
  } else {
    showRequiredTooltips();
  }
});

// slider range


const rangeSlider = document.querySelectorAll(".range__slider");

rangeSlider.forEach( item => {
	const rangeInput = item.querySelector('input[type="range"]');
	const slideValue = item.querySelector(".sliderValue span");
	const maxVal = item.querySelector(".max-val");
	
	function handleInputChange(e) {
	  let target = e.target;

	  const min = target.min;
	  const max = target.max;
	  const val = target.value;
	  slideValue.textContent = val + "%";
	  slideValue.style.left = val + "%";
	  slideValue.classList.add("show");
	  if(slideValue.textContent === '100%') {
		maxVal.style.color = "#0CE2F4"
	  } else {
		maxVal.style.color = "#000"
	  }
	  if(slideValue.textContent === '100%' || slideValue.textContent === '0%') {
		slideValue.classList.remove("show");
	  }
	  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
	}
	
	rangeInput.addEventListener("input", handleInputChange);

	
})


