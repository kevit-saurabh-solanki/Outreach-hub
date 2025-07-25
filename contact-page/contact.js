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
        var edtBtn = document.createElement('button');
        edtBtn.innerText = 'Edit';
        edtBtn.classList.add('edit-btn');
        var dltBtn = document.createElement('button');
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

        ///delete row rendering and also in api-------------------------------------------------------------
        let currentTr = null;
        let dltBtns = document.querySelectorAll('.delete-btn');
        dltBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('clicked');
                currentTr = e.target.closest('tr');
                let deleteObj;
                let tdArr = currentTr.children;
                let num = tdArr[1].innerText;
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i]['phoneNumber'] === num) {
                        deleteObj = dataArr[i];
                        break;
                    }
                }
                console.log(deleteObj);
                let delId = deleteObj["id"];
                // currentTr.remove();

                // Delete the data from api------------------------------------------------------------------
                // async function deleteData() {
                //     try {
                //         let response = await fetch(`http://localhost:3000/contacts/${delId}`, {
                //             method: "DELETE",
                //             headers: {
                //                 "content-type": "application/json",
                //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
                //             }
                //         });

                //         if (response.ok) {
                //             let jsonres = await response.json();
                //             console.log(jsonres);
                //             console.log("Data deleted");
                //         }
                //     }
                //     catch (error) {
                //         console.log(error);
                //     }
                // }
                // deleteData();
            })
        })
    }

}
//fetch data from api---------------------------------------------------------------------------
fetchData();


//Visible the the add contact box---------------------------------------------------------------------
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
document.querySelector('.add-new-cont').addEventListener('click', async (e) => {
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


    //edit row----------------------------------------------------------
    var currentRow = null;
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentRow = e.target.closest('tr');
            editForm.classList.add('form-visible');
            formBox.classList.remove('form-visible');
        });
    });

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
        td[0].innerText = editName;
        td[1].innerText = editPhone;
        let spans = td[2].children;
        console.log(spans);
        for (let i = 0; i < spans.length; i++) {
            spans[i].remove();
        }
        td[2].firstElementChild.remove();
        editTagArr.forEach(editTag => {
            let tagSpan = document.createElement('span');

            tagSpan.innerText = editTag;
            tagSpan.classList.add('tag');
            td[2].appendChild(tagSpan);
        })

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
})



// async function deleteData() {
//     try {
//         let response = await fetch('http://localhost:3000/contacts/2', {
//             method: "DELETE",
//             headers: {
//                 "content-type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         });

//         if (response.ok) {
//             let jsonres = await response.json();
//             console.log(jsonres);
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }



