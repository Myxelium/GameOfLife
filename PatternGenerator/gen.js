//Sorry for the terrible code, got annoyed at creating patterns by hand. So threw this garbage together. Does its job.

let checkboxContainer = document.getElementById("checkboxwrapper");
let y = document.getElementById("y").value;
let x = document.getElementById("x").value;

document.getElementById("y").addEventListener("change", function () {
  y = document.getElementById("y").value;
  checkboxContainer.innerHTML = "";
  createCheckboxes(y, x);
});

document.getElementById("x").addEventListener("change", function () {
  x = document.getElementById("x").value;
  checkboxContainer.innerHTML = "";
  createCheckboxes(y, x);
});

function createCheckboxes(y, x) {
  var boxarray = [];
  
  for (let i = 0; i < y; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < x; j++) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.y = i;
      checkbox.x = j;

      checkbox.addEventListener("click", function () {
        let y = checkbox.y;
        let x = checkbox.x;

        if (checkbox.checked == false) {
          boxarray.splice([x + 1, y + 1], 1);
        } else {
          boxarray.push([x + 1, y + 1]);
        }

        document.getElementById("rawArray").innerHTML =
          JSON.stringify(boxarray);
      });

      row.appendChild(checkbox);
    }
    checkboxContainer.appendChild(row);
  }
}
