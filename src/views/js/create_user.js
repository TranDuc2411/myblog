var listJob = []
var countJob = 1

function addJob() {
    console.log("add job ...")
    if (document.getElementById("inputJob").value != "") {
        // add giá trị vào list
        listJob.push(document.getElementById("inputJob").value)

        // tạo thêm 1 dòng input job mới
        // console.log(document.getElementById("#templateAddJob"))
        const templateJob = document.getElementById("templateAddJob")
        const newInputJob = templateJob.cloneNode(true)

        //set up lại các attribute 
        const idInputJob = "inputJob" + countJob.toString()
        newInputJob.setAttribute("id", idInputJob)
        newInputJob.setAttribute("style", "")
        newInputJob.querySelector("button").onclick = () => { removeElemeWithId(idInputJob) }
        console.log(newInputJob.querySelector("button.btn"))

        console.log("newInputJob", newInputJob)

        //thêm phần tử mới clone vào cha của nó 
        document.getElementById("jobInputArea").appendChild(newInputJob)
        document.getElementById(idInputJob).querySelector("input").setAttribute("class", "form-control jobinput")
        document.getElementById(idInputJob).querySelector("input").focus()
        console.log("new : ", document.getElementById(idInputJob).querySelector("input"))

        // console.log("listjob : ", listJob)
        countJob = countJob + 1
    }
}

function addJobWithEnter(event) {
    if (event.key == "Enter") addJob()
}

//gỡ 1 job đi 
function removeElemeWithId(idinput) {
    console.log("remove...")
        // const idInputJob = "inputJob" + idinput
    console.log(idinput)
    const jobInputArea = document.getElementById(idinput)
        // listJob.pop()
        // console.log(jobInputArea)
    jobInputArea.remove()
}

var socialCount = 1

function addSocial() {
    console.log("Add social ..")
    const firstSoical = document.getElementById("socialNetwork")
    console.log(firstSoical.querySelector("select").value)
    console.log(firstSoical.querySelector("input").value)
    if (firstSoical.querySelector("select").value != 'Select social network' && firstSoical.querySelector("input").value != '') {
        const templateAddSocial = document.getElementById("templateAddSocial")
        const newSocial = templateAddSocial.cloneNode(true)

        const socialNetworkId = "socialNetwork" + socialCount.toString()

        newSocial.setAttribute("style", "")
        newSocial.setAttribute("id", socialNetworkId)
        newSocial.setAttribute("style", "")
        newSocial.querySelector("button").onclick = () => { removeElemeWithId(socialNetworkId) }

        //thêm vào cha
        document.getElementById("socialArea").appendChild(newSocial)
        socialCount++
    }
}

//set lại dữ liệu trước khi gửi form
function handleSubmit(event) {
    event.preventDefault();
    console.log("set data ...")

    // Tạo đối tượng FormData để chứa dữ liệu form
    var formData = new FormData();

    // Jobs
    var inputList = document.getElementById("jobInputArea").querySelectorAll("input");
    var favoriteJobs = [];

    for (var i = 0; i < inputList.length; i++) {
        favoriteJobs.push(inputList[i].value);
    }

    // Social
    var socialList = document.getElementById("socialArea").querySelectorAll(".input-group.mb-4")
    var socialListData = [];

    for (var i = 0; i < socialList.length; i++) {
        const socialAcc = {
            social: socialList[i].querySelector("select").value,
            link: socialList[i].querySelector("input").value
        }
        socialListData.push(socialAcc)
    }
    console.log(JSON.stringify(socialListData))

    // Thêm dữ liệu vào đối tượng FormData
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("displayname", document.getElementById("displayname").value);
    formData.append("nickname", document.getElementById("nickname").value);
    formData.append("age", document.getElementById("age").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("favoriteJob", JSON.stringify(favoriteJobs));
    formData.append("aboutme", document.getElementById("aboutme").value);
    formData.append("social_network", JSON.stringify(socialListData));

    // Lấy file từ input có id là 'avatar'
    var avatarFile = document.getElementById("avatar").files[0];

    // Thêm file vào đối tượng FormData
    if (avatarFile) {
        formData.append("avatar", avatarFile);
    }

    console.log(formData)

    console.log("submit...");
    fetch('/user/regiter', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                alert("Bạn đã đăng ký thành công !")
                window.location.href = "login"
            }
        })
        .catch(error => console.error('Error:', error));
}