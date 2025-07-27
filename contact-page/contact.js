let dataArr;
const formBox = document.querySelector('.contact-form-box');
const editForm = document.querySelector('.edit-form-box');

async function fetchData() {
    try {
        let response = await fetch('http://localhost:3000/contacts', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            let jsonres = await response.json();
            console.log(jsonres);
            dataArr = jsonres.data;
            console.log(dataArr);
        }
    }
    catch (error) {
        console.log(error);
    }

    //render display table---------------------------------------------------------------------------------
    for (let i = 0; i < dataArr.length; i++) {
        let tr = document.createElement('tr');

        let id = dataArr[i]['id'];
        let name = dataArr[i]['name'];
        let phoneNumber = dataArr[i]['phoneNumber'];
        let tagsArr = dataArr[i]['tags'];


        let nameTd = document.createElement('td');
        let phnTd = document.createElement('td');
        let tagTd = document.createElement('td');
        let idTd = document.createElement('td');
        tagsArr.forEach(tag => {
            let tagSpan = document.createElement('span');

            tagSpan.innerText = tag;
            tagSpan.classList.add('tag');
            tagTd.appendChild(tagSpan);
        })

        nameTd.innerText = name;
        phnTd.innerText = phoneNumber;
        idTd.innerText = id;

        let btnTd = document.createElement('td');
        let edtBtn = document.createElement('button');
        edtBtn.innerText = 'Edit';
        edtBtn.classList.add('edit-btn');
        let dltBtn = document.createElement('button');
        dltBtn.innerText = 'Delete';
        dltBtn.classList.add('delete-btn');

        btnTd.appendChild(edtBtn);
        btnTd.appendChild(dltBtn);

        tr.appendChild(idTd);
        tr.appendChild(nameTd);
        tr.appendChild(phnTd);
        tr.appendChild(tagTd);
        tr.appendChild(btnTd);
        document.querySelector('table').appendChild(tr);

        document.querySelector('#company-name').value = "";
        document.querySelector('#phoneNumber').value = "";
        document.querySelector('#tags').value = "";
    }
}
//fetch data from api---------------------------------------------------------------------------
fetchData();

///delete row rendering and also in api-------------------------------------------------------------
let currentTr = null;
document.querySelector('table').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.preventDefault();
        currentTr = e.target.closest('tr');
        let delId = currentTr.firstElementChild.innerText;
        console.log(delId);

        async function deleteData() {
            try {
                let response = await fetch(`http://localhost:3000/contacts/${delId}`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    console.log("Data deleted");
                    currentTr.remove();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        deleteData();
    }
})


//Visible the add contact box---------------------------------------------------------------------
document.querySelector('.add-contact-btn').addEventListener('click', () => {
    formBox.classList.toggle('form-visible');
    editForm.classList.remove('form-visible');
})

//inVisible the the add contact box---------------------------------------------------------------------
document.querySelector('.cancel').addEventListener('click', () => {
    formBox.classList.remove('form-visible');
    document.querySelector('#company-name').value = "";
    document.querySelector('#phoneNumber').value = "";
    document.querySelector('#tags').value = "";
})

//Add new contact---------------------------------------------------------------------
document.querySelector('.add-new-cont').addEventListener('click', (e) => {
    e.preventDefault();

    //hide contact form box----------------------------------------------------------
    formBox.classList.remove('form-visible');

    //declaration--------------------------------------------------------------------
    let compName = document.querySelector('#company-name').value.trim();
    let phoneNum = document.querySelector('#phoneNumber').value.trim();
    let tags = document.querySelector('#tags').value.trim();
    let tagArr = tags.split(',');

    //validate----------------------------------------------------------
    if (phoneNum === "" || compName === "" || tags === "") {
        alert('Fill all details properly');
        document.querySelector('#company-name').value = "";
        document.querySelector('#phoneNumber').value = "";
        document.querySelector('#tags').value = "";
        return;
    }

    //validate number----------------------------------------------------------
    if (phoneNum.length > 10 || phoneNum.length < 10) {
        alert('Enter valid phone number');
        document.querySelector('#company-name').value = "";
        document.querySelector('#phoneNumber').value = "";
        document.querySelector('#tags').value = "";
        return;
    }

    //check for duplicate number-------------------------------------------------
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i]['phoneNumber'] === phoneNum) {
            alert("Contact already exist");
            document.querySelector('#company-name').value = "";
            document.querySelector('#phoneNumber').value = "";
            document.querySelector('#tags').value = "";
            return;
        }
    }

     // new data added to the prebuilt api---------------------------------------------
    async function addData() {
        try {
            let response = await fetch('http://localhost:3000/contacts', {
                method: 'POST',
                body: JSON.stringify({
                    "name": compName,
                    "phoneNumber": phoneNum,
                    "tags": tagArr
                }),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.ok) {
                let jsonres = await response.json();
                console.log(jsonres);
                console.log("contact added");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    addData();

})


//edit row selecting current row----------------------------------------------------------
var currentRow = null;
document.querySelector('table').addEventListener("click", (e) => {
    if (e.target.classList.contains('edit-btn')) {
        currentRow = e.target.closest('tr');
    }
})

//edit row rendering and editing object in api----------------------------------------------------------
document.querySelector('.edit-cont').addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentRow) return;

    // Get edit form values------------------------------------------------
    let editName = document.querySelector('#edit-name').value.trim();
    let editPhone = document.querySelector('#edit-phone').value.trim();
    let editTags = document.querySelector('#edit-tags').value.trim();
    let editTagArr = editTags.split(',');
    console.log(editTagArr);

    //validation----------------------------------------------------
    if (editName === "" || editPhone === "" || editTags === "") {
        alert('Fill all details properly');
        editForm.classList.remove('form-visible');
        document.querySelector('#edit-name').value = "";
        document.querySelector('#edit-phone').value = "";
        document.querySelector('#edit-tags').value = "";
        return;
    }

    //validate number----------------------------------------------------------
    if (editPhone.length > 10 || editPhone.length < 10) {
        alert('Enter valid phone number');
        editForm.classList.remove('form-visible');
        document.querySelector('#edit-name').value = "";
        document.querySelector('#edit-phone').value = "";
        document.querySelector('#edit-tags').value = "";
        return;
    }

    // Update row values-------------------------------------------------
    let td = currentRow.children;
    td[1].innerText = editName;
    td[2].innerText = editPhone;
    let spans = td[3].children;
    console.log(spans);
    for (let i = 0; i < spans.length; i++) {
        spans[i].remove();
    }
    td[3].firstElementChild.remove();
    editTagArr.forEach(editTag => {
        let tagSpan = document.createElement('span');

        tagSpan.innerText = editTag;
        tagSpan.classList.add('tag');
        td[3].appendChild(tagSpan);
    })

    //edit the contact in api-----------------------------------------------
    // let ediId = currentRow.firstElementChild.innerText;
    // async function editContact() {
    //     try {
    //         let response = await fetch(`http://localhost:3000/contacts/${ediId}`, {
    //             method: 'PUT',
    //             body: JSON.stringify({
    //                 "name": editName,
    //                 "phoneNumber": editPhone,
    //                 "tags": editTagArr
    //             }),
    //             headers: {
    //                 "content-type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         if (response.ok) {
    //             let jsonres = await response.json();
    //             console.log(jsonres);
    //             console.log("contact edited");
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    // editContact();


    // Hide form-------------------------------------------
    editForm.classList.remove('form-visible');
    document.querySelector('#edit-name').value = "";
    document.querySelector('#edit-phone').value = "";
    document.querySelector('#edit-tags').value = "";

    // Reset tracker
    currentRow = null;

    document.querySelector('.edit-cancel').addEventListener('click', () => {
        editForm.classList.remove('form-visible');
        document.querySelector('#edit-name').value = "";
        document.querySelector('#edit-phone').value = "";
        document.querySelector('#edit-tags').value = "";
    })
})



//removing the local storage token-----------------------------------------
document.querySelector('.signout').addEventListener('click', () => {

    let alertVal = confirm("Do you want to logout");

    if (alertVal) {
        localStorage.removeItem("token");
        window.open('../login-page/login.html', '_blank');
    }

})


