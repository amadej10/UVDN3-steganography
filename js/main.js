$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPlaceholder').attr('src', e.target.result);
        }
        $('#imgLabel').text(input.files[0].name);
        reader.readAsDataURL(input.files[0]);
        $('#inputsView').removeClass("d-none");
        document.getElementById("text").value = "";
        document.getElementById('decodeBtn').classList.remove("d-none");
        document.getElementById("download").classList.add("d-none");
        updateCapacity();
    }
}

$("#imgUpload").change(function () {
    readURL(this);
});


function hide() {
    var img = document.getElementById("imgPlaceholder"),
        //cover = document.getElementById("imgPlaceholderEncoded"),
        //message = document.getElementById("message"),
        textarea = document.getElementById("text"),
        download = document.getElementById("download");
    if (img && textarea) {
        img.src = steg.encode(textarea.value, img);
        download.href = img.src.replace("image/png", "image/octet-stream");
        download.classList.remove("d-none");
        document.getElementById('decodeBtn').classList.add("d-none");
    }
}
function read() {
    var img = document.getElementById("imgPlaceholder"),
        //cover = document.getElementById("cover"),
        message = document.getElementById("message"),
        textarea = document.getElementById("text");
    if (img && textarea) {
        message.innerHTML = steg.decode(img);
        if (message.innerHTML !== "") {
            message.parentNode.className = "";
            textarea.value = message.innerHTML;
            updateCapacity();
        }
    }
}

function updateCapacity() {
    var img = document.getElementById('imgPlaceholder'),
        textarea = document.getElementById('text');

    if (img.src !== "" && text) {
        var percentage = (textarea.value.length * 100) / steg.getHidingCapacity(img);
        if (percentage >= 100.0) {
            textarea.classList.add("is-invalid")
            document.getElementById('encodeBtn').disabled = true;
        } else {
            textarea.classList.remove("is-invalid")
            document.getElementById('encodeBtn').disabled = false;

        }
        //console.log(percentage);
        var progressbar = document.getElementById('txtCapacity');
        progressbar.style.width = percentage + "%";
        progressbar.innerHTML = Math.ceil(percentage) + "%";
    }

}

window.onload = function () {
    //document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('encodeBtn').addEventListener('click', hide, false);
    document.getElementById('decodeBtn').addEventListener('click', read, false);
    document.getElementById('text').addEventListener('keyup', updateCapacity, false);
    //hide();
    updateCapacity();
};
