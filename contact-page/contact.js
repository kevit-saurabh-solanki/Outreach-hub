const addBtn = document.querySelector('.add-contact-btn');
const formBox = document.querySelector('.contact-form-box');
const editForm = document.querySelector('.edit-form-box');
const body = document.querySelector('body');
const cancelBtn = document.querySelector('.cancel');
const addNewContBtn = document.querySelector('.add-new-cont');
let table = document.querySelector('table');

addBtn.addEventListener('click', () => {
    formBox.classList.add('form-visible');
})

cancelBtn.addEventListener('click', () => {
    formBox.classList.remove('form-visible');
    document.querySelector('#company-name').value = "";
    document.querySelector('#phoneNumber').value = "";
    document.querySelector('#tags').value = "";
})

addNewContBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //hide contact form box----------------------------------------------------------
    formBox.classList.remove('form-visible');

    //declaration--------------------------------------------------------------------
    let compName = document.querySelector('#company-name').value.trim();
    let phoneNum = document.querySelector('#phoneNumber').value.trim();
    let tags = document.querySelector('#tags').value.trim();

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

    //table display----------------------------------------------------------
    let tr = document.createElement('tr');

    let nameTd = document.createElement('td');
    let phnTd = document.createElement('td');
    let tagTd = document.createElement('td');
    let tagSpan = document.createElement('span');

    tagSpan.innerText = tags;
    tagSpan.classList.add('tag');
    nameTd.innerText = compName;
    phnTd.innerText = phoneNum;

    tagTd.appendChild(tagSpan);

    let btnTd = document.createElement('td');
    let edtBtn = document.createElement('button');
    edtBtn.innerText = 'Edit';
    edtBtn.classList.add('edit-btn');
    let dltBtn = document.createElement('button');
    dltBtn.innerText = 'Delete';
    dltBtn.classList.add('delete-btn');

    btnTd.appendChild(edtBtn);
    btnTd.appendChild(dltBtn);

    tr.appendChild(nameTd);
    tr.appendChild(phnTd);
    tr.appendChild(tagTd);
    tr.appendChild(btnTd);
    table.appendChild(tr);

    document.querySelector('#company-name').value = "";
    document.querySelector('#phoneNumber').value = "";
    document.querySelector('#tags').value = "";

    //delete row----------------------------------------------------------
    let dltBtns = document.querySelectorAll('.delete-btn');
    dltBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })
    })

    //edit row----------------------------------------------------------
    var currentRow = null;
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentRow = e.target.closest('tr');
            editForm.classList.add('form-visible');
        });
    });

    document.querySelector('.edit-cont').addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentRow) return;

        // Get form values
        let editName = document.querySelector('#edit-name').value.trim();
        let editPhone = document.querySelector('#edit-phone').value.trim();
        let editTags = document.querySelector('#edit-tags').value.trim();

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

        // Update row values
        let td = currentRow.children;
        td[0].innerText = editName;
        td[1].innerText = editPhone;
        td[2].firstElementChild.innerText = editTags;

        // Hide form
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
    });
})





