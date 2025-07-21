const addBtn = document.querySelector('.add-contact-btn');
const formBox = document.querySelector('.contact-form-box')
const body = document.querySelector('body');
const cancelBtn = document.querySelector('.cancel');
const addNewContBtn = document.querySelector('.add-new-cont');
let data = [];
let table = document.querySelector('table');

addBtn.addEventListener('click', () => {
    formBox.classList.add('contact-form-visible');
    // body.classList.add('body-visible');
    // formBox.style.visibility = 'visible';
    // formBox.style.display = 'block';
})

cancelBtn.addEventListener('click', () => {
    formBox.classList.remove('contact-form-visible');
    // body.classList.remove('body-visible');
    // formBox.style.display = 'none';
})

addNewContBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //hide contact form box----------------------------------------------------------
    formBox.classList.remove('contact-form-visible');

    //declaration----------------------------------------------------------
    let compName = document.querySelector('#company-name').value;
    let emailId = document.querySelector('#email').value;
    let phoneNum = document.querySelector('#phone').value;
    let tag = document.querySelector('#tags').value;

    //validate----------------------------------------------------------
    if (phoneNum === "" || compName === "" || emailId === "") {
        alert('Fill all details properly');
        return;
    }

    //validate number----------------------------------------------------------
    if (phoneNum.length > 10 || phoneNum.length < 10) {
        alert('Enter valid phone number');
        return;
    }

    //push in array----------------------------------------------------------
    // let data_obj = {
    //     company_name: compName,
    //     email_id: emailId,
    //     contact_number: phoneNum,
    //     tag_name: tag
    // }

    // data.push(data_obj);
    // console.log(data);

    //table display----------------------------------------------------------
    let tr = document.createElement('tr');
    let nameTd = document.createElement('td');
    let emTd = document.createElement('td');
    let phnTd = document.createElement('td');
    let tagTd = document.createElement('td');
    let tagSpan = document.createElement('span');

    tagSpan.innerText = tag;
    tagSpan.classList.add('tag');
    nameTd.innerText = compName;
    emTd.innerText = emailId;
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
    tr.appendChild(emTd);
    tr.appendChild(tagTd);
    tr.appendChild(btnTd);
    table.appendChild(tr);

    //delete row----------------------------------------------------------
    let dltBtns = document.querySelectorAll('.delete-btn');
    dltBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        })
    })

    //edit row----------------------------------------------------------
    let edtBtns = document.querySelectorAll('.edit-btn');
    edtBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let tar = e.target;
            let currTr = tar.parentElement.parentElement;
            let currTd = tar.parentElement;
            let currTdChild = currTd.children;
        })
    })


})





