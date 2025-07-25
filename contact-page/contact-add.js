

// //Add contacts to api --------------------------------------------------------------------------------
// const add_contact = async () => {
//     let compName = document.querySelector('#company-name').value.trim();
//     let phoneNum = document.querySelector('#phoneNumber').value.trim();
//     let tags = document.querySelector('#tags').value.trim();
//     let tagArr = tags.split(",");

//     let contact_sent = JSON.stringify({
//         name: compName,
//         phoneNumber: phoneNum,
//         tags: tagArr
//     })
//     try {
//         let response = await fetch(url, {
//                 method: "POST",
//                 body: contact_sent,
//                 headers: {
//                     "content-type" : "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         )
//         if(response.ok) {
//             let jsonres = await response.json();
//             console.log(jsonres);
//             console.log('contact added');
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// export { add_contact };