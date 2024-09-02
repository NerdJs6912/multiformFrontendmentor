const steps = document.querySelectorAll(".stp"); //get all steps
const circleSteps = document.querySelectorAll(".step"); //get all step circles
const formInputs = document.querySelectorAll(".step-1 form inputs"); //get step-1 inputs
const plans = document.querySelectorAll(".plan-card"); //get all the plans
const switcher = document.querySelector(".switch"); //get the switcher
const addons = document.querySelectorAll(".box"); //get all the addons
const total = document.querySelector(".total b"); //get all the total price
const planPrice = document.querySelector(".plan-price"); //get all price of the selected plan
let time;
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};

eps.forEach((step) =>{
  const nextBtn = document.querySelector(".next-stp");
  const prevBtn = document.querySelector(".prev-stp");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`.step-${currentStep}`).style.display = "none";
      currentStep--;
      document.querySelector(`.step-${currentStep}`).style.display = "flex";
      circleSteps[currentCircle].classList.remove("active");
      currentCircle--;
    })
  }
  nextBtn.addEventListener("click", () => {
    document.querySelector(`.step-${currentStep}`).style.display = "none"
    if (currentStep < 5 && validateForm()) {
      currentStep++;
      currentCircle++;
      setTotal()
    }
    document.querySelector(`step-${currentStep}`).style.display = "flex";
    circleSteps[currentCircle].classList.add("active");
    summary(obj)
  })
})
function summary(obj) {
  const planName = document.querySelector(".plan-name");
  const planPrice = document.querySelector(".plan-price");
  planPrice.innerHTML = `${obj.price.innerText}`;
  planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? "yearly" : "monthly"})`;
}
function validateForm() {
  let valid = true;
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value) {
      valid = false;
      formInputs[i].classList.add('err');
      findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
    }else {
      valid = true;
      formInputs[i].classList.remove("err");
      findLabel(formInputs[i].nextElementSibling.style.display = "none");
    }
  }
  return valid;
}
function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
}

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    plan.classList.add("selected");
    const planName = plan.querySelector("b");
    const planPrice = plan.querySelector(".plan-priced");
    obj.plan = planName;
    obj.price = planPrice;
  })
})

switcher.addEventListener("click", () => {
  const val = switcher.querySelector("input").checked;
  if (val) {
    document.querySelector(".monthly").classList.remove("sw-active");
    document.querySelector(".yearly").classList.add("sw-active");
  } else {
    document.querySelector(".monthly").classList.add("sw-active");
    document.querySelector(".yearly").classList.remove("sw-active");
  }
  switchPrice(val);
  obj.kind = val;
})

addons.forEach((addon) => {
  addon.addEventListener("click", (e) => {
    const addonSelect = addon.querySelector("input");
    const ID = adddon.getAttribute(data-id);
    if (addonSelect.checked) {
      adddon.classList.remove("ad-selected");
      showAddon(ID, false);
    } else {
      addonSelect.checked = true;
      
    }
  })
})