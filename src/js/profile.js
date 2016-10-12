function verifySize() {
    const SIZELIMIT = 15728640; /* This is in bytes for 15 MB */
    var size = document.getElementById('attachement').files[0].size;

    if (size > SIZELIMIT) {
      document.getElementById('fileError').text = "Tu imagen no puede ser mayor a 15 MB"
      document.getElementById('attachement').value = null;
    }
}
